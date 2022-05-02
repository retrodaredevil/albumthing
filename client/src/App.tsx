import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useListArtists } from "./useRequest";

function App() {
  const { data, error, isLoading, isSuccess } = useListArtists();

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          AlbumThing made by Joshua Shannon
        </p>
        <table style={{width: "1500px"}}>
          <tr>
            <th style={{width:"40%"}}>Artist</th>
            <th style={{width:"20%"}}>Album Count</th>
            <th style={{width:"20%"}}></th>
            <th style={{width:"20%"}}></th>
          </tr>
          {isSuccess && data.map((artistView: any) => <>
            <tr>
              <th>{artistView.artist.name}</th>
              <th>{artistView.artist.name}</th>
              <th>{artistView.artist.name}</th>
              <th>{artistView.artist.name}</th>
            </tr>
          </>)}
        </table>
      </header>
    </div>
  );
}

export default App;
