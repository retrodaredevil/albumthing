import React from "react";
import {Link, useParams} from "react-router-dom";

function NewAlbum() {
  const { youtubeId } = useParams();
  // const {data, error, isLoading, isSuccess} = useQueryAlbumQuery(graphQLClient, {youtubeId: youtubeId ?? ""});
  return (
    <div className="App">
      <Link to={"/artist/" + youtubeId}>
        Back
      </Link>
      <br/>
      <br/>
      Playlist ID: <input/>
      <br/>
      Album name: <input/>
      <br/>
      Release Year: <input type={"number"}/>
    </div>
  );
}


export default NewAlbum;
