import React from 'react';
import './App.css';
import DogsListContainer from './components/DogsListContainer';
import { Route } from 'react-router-dom';
import DetailPageContainer from './components/DetailPageContainer';
import Game1Container from './components/Game1Container';
import Game2Container from './components/Game2Container';
import Game3Container from './components/Game3Container';
import { Link } from 'react-router-dom';
import AboutGame from './components/AboutGame';

function App() {

  return (
    <div className="App">
      <div className="buttons-container">
        <Link to="/"><button className="home">HOME</button></Link>
        <Link to="/Game1/"><button className="game-one">GAME 1</button></Link>
        <Link to="/Game2/"><button className="game-two">GAME 2</button></Link>
        <Link to="/Game3/"><button className="game-three">GAME 3</button></Link> 
      </div>
      <div className="landing-container">
        <Route exact path="/" component={AboutGame} />
        <Route exact path="/" component={DogsListContainer} /> 
      </div>
      <div className='main-container'>
        <Route path="/detailpage/:breed" component={DetailPageContainer} />
        <Route exact path="/game1/" component={Game1Container} />
        <Route exact path="/game2/" component={Game2Container} />  
        <Route exact path="/game3/" component={Game3Container} /> 
      </div>
    </div>
  );
}

export default App;
