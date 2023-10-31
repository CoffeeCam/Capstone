import { useState } from 'react'
import './App.css'

const House = ({house, setSelectedHouse}) => {
  console.log(house)
  return (
  <div className={house} onClick={() => setSelectedHouse(house)}></div>
  )
}
const App = () => {

  const [seclectedHouse, setSelectedHouse] = useState("")

  return (
    <div id="container">
      <div id="navbar">
        <header>Hogwarts Rank-a-thon</header>
        <div>House</div>
        <div className={seclectedHouse}>{seclectedHouse}</div>
      </div>
      <div id="houses">
          <House house="Gryffindor" setSelectedHouse={setSelectedHouse}/>
          <House house="Hufflepuff" setSelectedHouse={setSelectedHouse}/>
          <House house="Ravenclaw" setSelectedHouse={setSelectedHouse}/>
          <House house="Slytherin" setSelectedHouse={setSelectedHouse}/>
      </div>
    </div>
  );
};

export default App;