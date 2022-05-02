import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import About from "./pages/About";

function App() {
  // Tutorial followed for routing: https://blog.logrocket.com/react-router-v6/
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            <Link to={"/"}>
              AlbumThing made by Joshua Shannon
            </Link>
            <br/>
            <Link to={"/about"}>About</Link>
          </p>
          <Routes>
            {/*<Route path='/' element={<Home/>}/>*/}
            <Route path='/' element={<Home/>}>
              <Route path='about' element={<About/>}/>
              <Route path="artist">
                <Route path=":youtubeId" element={<Artist />} />
              </Route>
            </Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
