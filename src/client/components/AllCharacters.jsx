import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import { Navigate, useNavigate } from "react-router-dom";

const AllCharacters = ({token,userId,isAdmin}) => {
  const navigate=useNavigate();
  const [categoryLists, setCategoryLists] = useState({
    Gryffindor: [],
    Hufflepuff: [],
    Ravenclaw: [],
    Slytherin: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchDataForAllCategories();
  }, []);

  const fetchDataForCategory = async (house) => {
    try {
      const response = await fetch(`/api/characters/searchCharacter?house=${house}`);
      const categoryData = await response.json();
      return { house, data: categoryData['chars'] };
    } catch (error) {
      console.error(`Error fetching ${house} data:`, error);
      return { house, data: [] };
    }
  };

  const fetchDataForAllCategories = async () => {
    setLoading(true);
    try {
      const gryffindorData = await fetchDataForCategory('Gryffindor');
      const hufflepuffData = await fetchDataForCategory('Hufflepuff');
      const ravenclawData = await fetchDataForCategory('Ravenclaw');
      const slytherinData = await fetchDataForCategory('Slytherin');

      setCategoryLists({
        Gryffindor: gryffindorData.data,
        Hufflepuff: hufflepuffData.data,
        Ravenclaw: ravenclawData.data,
        Slytherin: slytherinData.data,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters/searchCharacter?query=${searchQuery}`);
      if (response.ok) {
        const searchData = await response.json();
        // Update category lists with search results
        setCategoryLists({ ...searchData });
      } else {
        console.error('Failed to fetch search data');
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleSubmitReview = (reviewData) => {
    console.log('Review submitted:', reviewData);
    // Logic to handle submitting the review
  };
  const navToCharacterDetails=async(id)=>{
    navigate(`/character/${id}`);
    }
   const handleCharacterDelete=async(id)=>{
    const response = await fetch(`api/characters/character/${id}`,{
      method:'DELETE'
    })
    fetchDataForAllCategories();
   }
   const handleUpdateCharacter=async(id)=>{

   }
  return (
    <div>
      <div>
        {/* Search functionality */}
        <input
          type="text"
          placeholder="Search for a character"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Displaying lists for each house */}
      {Object.entries(categoryLists).map(([house, characters]) => (
  <div key={house}>
    <h2 className="house">{house}</h2>
    {characters.length === 0 ? (
      <p>Still working on content.</p>
    ) : (
      <ul className="listings">
        {characters.map((character) => (
          <li key={character.id} className="listing-item">
            <div className="listing-content">
              <img
                src={character.image}
                alt={`${character.firstname} ${character.lastname}`}
                className="character-image"
              />
              <div className="character-details">
                <p className="charname">{character.firstname} {character.lastname}</p>
                <p className="charrole">{character.role}</p>
                <p>{character.summary}</p>
                <button onClick={()=>{navToCharacterDetails(character.id)}}>see details</button>
                {token&& !isAdmin &&
                <button onClick={() => handleCharacterClick(character)}>Write a Review</button>}
                 {isAdmin &&<button onClick={()=>handleCharacterDelete(character.id)}> Delete</button>}
                 {isAdmin &&<button onClick={()=>handleUpdateCharacter(character.id)}> Update</button>}
                {selectedCharacter && selectedCharacter.id === character.id && (
                  <ReviewForm
                  charId={selectedCharacter.id} userId={userId} token={token} selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
))}

      {/* Review form */}
      {selectedCharacter && (
        <ReviewForm selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview} />
      )}
    </div>
  );
};

export default AllCharacters;
