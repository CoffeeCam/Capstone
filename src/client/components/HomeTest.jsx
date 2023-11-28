import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import { Navigate, useNavigate } from "react-router-dom";

const HomeTest = ({token,userId,isAdmin}) => {
  const navigate=useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchDataForCategory('Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin');
  }, []);

  const fetchDataForCategory = async (selectedCategory) => {
    setLoading(!loading);
    try {
      const response = await fetch(`http://localhost:3000/api/characters/searchChar?q=${selectedCategory}`);
      console.log(response)
      const categoryData = await response.json();
console.log(categoryData)
      if (response.ok) {
        setCategoryList(categoryData);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      console.log(categoryList)
      setLoading(!loading);
    }
  };

  const handleSearch = async () => {
    let str=searchQuery.trim()  
    if(str.length<1){
      return;
    }
    else{
      fetchDataForCategory(searchQuery);
    }
   
  };

const fetchCharacterByName = async (firstName, lastName) => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:3000/api/characters/searchChar?q=${firstName}&lastName=${lastName}`);
    const characterData = await response.json();

    if (response.ok && characterData.length > 0) {
      // If character data exists, navigate to the details of the first character found
      const firstCharacter = characterData[0];
      navToCharacterDetails(firstCharacter.id);
    } else {
      console.error('Character not found');
      // Handle the case where the character is not found
    }
  } catch (error) {
    console.error('Error fetching character data:', error);
  } finally {
    setLoading(false);
  }
};

const handleCharacterSearch = async () => {
  const [firstName, lastName] = searchQuery.trim().split(' ');

  if (!firstName || !lastName) {
    // Handle case where either first or last name is missing
    console.error('Both first and last names are required for the search');
    return;
  }

  fetchCharacterByName(firstName.toLowerCase(), lastName.toLowerCase());
};

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleSubmitReview = (reviewData) => {
    // Handle the submission of the review data, e.g., send it to your backend
    console.log('Review submitted:', reviewData);
  };

  const navToCharacterDetails=async(id)=>{
    navigate(`/character/${id}`);
    }
  
  return (
    <div>

   
      <div>
        <div>
        <input
          type="text"
          placeholder="Search for a character"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleCharacterSearch}>Search</button>
      </div>
      <div className="main-content">
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
      
     
      <div className="house">
  {currentCategory && <h2>{currentCategory}</h2>}
</div>
          <ul className="listings">
            {categoryList.map((category) => {
              console.log('here2')
              return <li key={category.id} className="listing-item">
                        <div className="listing-content">
                          <img src={category.image}
                          alt={`${category.firstname} ${category.lastname}`}
                          className="character-image"/> <br/> 
                                      <div className="character-details">
                <p className="charname">{category.firstname} {category.lastname}</p>
                <p className="charrole">{category.role}</p>
                <p>{category.summary}</p>
                <button onClick={()=>{navToCharacterDetails(category.id)}}>see details</button>
                         
                         {token&&
                         <button onClick={() => handleCharacterClick(category)}>Start Review</button>}
                         

                {selectedCharacter && selectedCharacter.id === category.id && (
                  <ReviewForm charId={selectedCharacter.id} userId={userId} token={token}selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview}/>
                )}
              </div>
                        </div>
                      </li>
            })}
          </ul>
          {/* {selectedCharacter && (
        <ReviewForm selectedCharacter={selectedCharacter} onSubmitReview={handleSubmitReview} />
      )} */}
      </div>
    </div>
  );
};

export default HomeTest;
