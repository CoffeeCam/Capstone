import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

const HomeTest = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterReviews, setCharacterReviews] = useState({});


  useEffect(() => {
    fetchDataForCategory('Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin');
  }, []);

  const fetchDataForCategory = async (selectedCategory) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/characters/searchCharacter?house=${selectedCategory}`);
      const categoryData = await response.json();
  
      if (response.ok) {
        setCategoryList(categoryData['chars']);
        // Fetch reviews data for each character
        const reviewsData = await Promise.all(
          categoryData['chars'].map(async (character) => {
            const reviewsResponse = await fetch(`http://localhost:3000/api/reviews/${character.id}`);
            const reviewsData = await reviewsResponse.json();
            return { characterId: character.id, reviews: reviewsData };
          })
        );
        // Organize reviews data in the state
        const reviewsMap = reviewsData.reduce((acc, { characterId, reviews }) => {
          acc[characterId] = reviews;
          return acc;
        }, {});
        setCharacterReviews(reviewsMap);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // Handle empty search query if needed
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/characters/searchCharacter?house=${searchQuery}`);
      if (response.ok) {
        const categoryData = await response.json();
        setCategoryList(categoryData);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleSubmitReview = (reviewData) => {
    // Handle the submission of the review data, e.g., send it to your backend
    console.log('Review submitted:', reviewData);
  };

  return (
    <div>
      <div className="main-content">
        <h2>Main Content</h2>
        <div>
        <h2>Search Bar</h2>
        <input
          type="text"
          placeholder="Search for a character"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
        <div>
          <img
            src="./src/client/assets/gryffindor/crest-gryffindor.png"
            alt="Gryffindor"
            onClick={() => fetchDataForCategory('Gryffindor')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/hufflepuff/crest-hufflepuff.png"
            alt="Hufflepuff"
            onClick={() => fetchDataForCategory('Hufflepuff')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/ravenclaw/crest-ravenclaw.png"
            alt="Ravenclaw"
            onClick={() => fetchDataForCategory('Ravenclaw')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/slytherin/crest-slytherin.png"
            alt="Slytherin"
            onClick={() => fetchDataForCategory('Slytherin')}
          />
        </div>
      </div>
      <div>
        <h2>Category List</h2>
          <ul>
          {categoryList.map((category) => (
            <li key={category.id}>
              <div>
                <img src={category.image} alt={category.firstname} /> <br />
                {category.firstname} {category.lastname} <br />
                {category.role} <br />
                {category.summary} <br />
                <button onClick={() => handleCharacterClick(category)}>Start Review</button>
                <button onClick={() => console.log('See Reviews clicked for', category.firstname)}>
                  See Reviews
                </button>
                {selectedCharacter && selectedCharacter.id === category.id && (
                  <>
                    <ReviewForm selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview} />
                    <Reviews reviews={characterReviews[selectedCharacter.id] || []} />
                  </>
                )}
              </div>
            </li>
          ))}
          </ul>
          {/* {selectedCharacter && (
        <ReviewForm selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview} />
      )} */}
      </div>
    </div>
  );
};

export default HomeTest;