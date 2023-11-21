import React, { useState, useEffect } from 'react';

const HomeTest = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data for the initial category (e.g., 'gryffindor') when the component mounts
    fetchDataForCategory('Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin');
  }, []);

  const fetchDataForCategory = async (selectedCategory) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/characters/searchCharacter?house=${selectedCategory}`);
      console.log(response)
      const categoryData = await response.json();
console.log(categoryData)
      if (response.ok) {
        setCategoryList(categoryData['chars']);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      console.log(categoryList)
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
            {categoryList.map((category) => {
              console.log('here2')
              return <li key={category.id}><div><img src={category.image}/> <br/> {category.firstname} {category.lastname} <br/> {category.role} <br/> {category.summary}</div></li>
            })}
          </ul>
      </div>
    </div>
  );
};

export default HomeTest;