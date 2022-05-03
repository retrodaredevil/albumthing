import React from "react";

function NewArtist() {
  // const {data, error, isLoading, isSuccess} = useQueryArtistQuery(graphQLClient, {youtubeId: youtubeId ?? ""});
  return (
    <div className="App">
      YouTube ID: <input/>
      <br/>
      Artist name: <input/>
    </div>
  );
}


export default NewArtist;
