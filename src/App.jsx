import React from 'react';
import NavBar from './components/NavBar.jsx';
import './App.css';
// import Login from './components/Login.jsx';

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <h2>Main Content</h2>
        <div>
            <img src="./src/assets/gryffindor/crest-gryffindor.png"/>
        </div>
        <div>
            <img src="./src/assets/hufflepuff/crest-hufflepuff.png"/>
        </div>
        <div>
            <img src="./src/assets/ravenclaw/crest-ravenclaw.png"/>
        </div>
        <div>
            <img src="./src/assets/slytherin/crest-slytherin.png"/>
        </div>
      </div>
    </div>
  );
};

export default App;