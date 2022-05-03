import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAddAlbumMutation} from "../generated/graphql";
import {graphQLClient} from "../client";

function NewAlbum() {
  const { youtubeId } = useParams();
  if (youtubeId === undefined) {
    throw "youtubeId is undefined!";
  }
  const mutation = useAddAlbumMutation(graphQLClient);
  const navigate = useNavigate();

  let playlistIdInput = React.createRef<HTMLInputElement>();
  let nameInput = React.createRef<HTMLInputElement>();
  let releaseYearInput = React.createRef<HTMLInputElement>();

  return (
    <div className="App">
      <Link to={"/artist/" + youtubeId}>
        Back
      </Link>
      <br/>
      <br/>
      Playlist ID: <input ref={playlistIdInput}/>
      <br/>
      Album name: <input ref={nameInput}/>
      <br/>
      Release Year: <input type={"number"} ref={releaseYearInput}/>
      <br/>
      <button
        onClick={() => {
          // good mutation tutorial: https://www.reactjstutorials.com/react-query/14/react-query-use-mutation
          if (mutation.isLoading) {
            alert("Already loading!");
            return;
          }
          const playlistId = playlistIdInput.current!.value;
          const name = nameInput.current!.value;
          const releaseYearString = releaseYearInput.current!.value;
          const releaseYear = parseInt(releaseYearString);
          if (isNaN(releaseYear)) {
            alert("Invalid release year!");
            return;
          }
          mutation.mutate(
            {
              youtubePlaylistId: playlistId,
              artistYoutubeId: youtubeId,
              name: name,
              releaseYear: releaseYear
            },
            {
              onSuccess: () => {
                navigate("/artist/" + youtubeId);
              },
              onError: () => {
                alert("Got error");
              }
            }
          );
        }}
      >Add</button>
    </div>
  );
}


export default NewAlbum;
