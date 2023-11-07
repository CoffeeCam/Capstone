import React, { useState } from 'react';

const HomeTest = () => {
  const [categoryList, setCategoryList] = useState([]);
  
  const handleImageClick = async (selectedCategory) => {
    try {
      const response = await fetch(`/api/character/searchCharacter?house=${selectedCategory}`);
      if (response.ok) {
        const categoryData = await response.json();
        setCategoryList(categoryData);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  return (
    <div>
      <div className="main-content">
        <h2>Main Content</h2>
        <div>
          <img
            src="./src/client/assets/gryffindor/crest-gryffindor.png"
            alt="Gryffindor"
            onClick={() => handleImageClick('gryffindor')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/hufflepuff/crest-hufflepuff.png"
            alt="Hufflepuff"
            onClick={() => handleImageClick('hufflepuff')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/ravenclaw/crest-ravenclaw.png"
            alt="Ravenclaw"
            onClick={() => handleImageClick('ravenclaw')}
          />
        </div>
        <div>
          <img
            src="./src/client/assets/slytherin/crest-slytherin.png"
            alt="Slytherin"
            onClick={() => handleImageClick('slytherin')}
          />
        </div>
      </div>
      <div>
        <h2>Category List</h2>
        <ul>
          {categoryList.map((category) => (
            <li key={category.id}>{category.firstname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeTest;
