import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import About from "./pages/About";
import NewArtist from "./pages/NewArtist";
import NewAlbum from "./pages/NewAlbum";
import Settings from "./pages/Settings";
import Album from "./pages/Album";
import DownloadAlbum from "./pages/DownloadAlbum";

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
            <br/>
            <Link to={"/artist/new"}>New Artist</Link>
            <br/>
            <Link to={"/settings"}>Settings</Link>
          </p>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path="/artist/new" element={<NewArtist />} />
            <Route path="/artist/:youtubeId" element={<Artist />} />
            <Route path="/artist/:youtubeId/new" element={<NewAlbum />} />
            <Route path="/album/:playlistId" element={<Album />} />
            <Route path="/album/:playlistId/download" element={<DownloadAlbum />} />
            {/*<Route path="/album/:playlistId/artist" element={<Album />} /> TODO make this redirect to /artist/:youtubeId*/}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
