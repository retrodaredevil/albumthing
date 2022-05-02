import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Artist from "./pages/Artist";

function App() {
  // Tutorial followed for routing: https://blog.logrocket.com/react-router-v6/
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {/*<Link to={"/"}>*/}
            AlbumThing made by Joshua Shannon
          {/*</Link>*/}
        </p>
        <Router>
          <Routes>
            {/*<Route path='/' element={<Home/>}/>*/}
            <Route path='/' element={<Home/>}>
              <Route path="artist"> {/* TODO don't use Home here?*/}
                <Route path=":youtubeId" element={<Artist />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
