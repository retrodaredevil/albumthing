import React from "react";
import {useParams} from "react-router-dom";
import {useQueryArtistQuery} from "../generated/graphql";

function Artist() {
  const { youtubeId } = useParams();
  const {data, error, isLoading, isSuccess} = useQueryArtistQuery({youtubeId: youtubeId ?? ""});
  console.log(youtubeId);
  return (
    <div className="App">
      {isLoading && "Loading"}
      {isSuccess && data!.queryArtist!.artist!.name}
      <table style={{width: "1500px"}}>
        <tr>
          <th>Album</th>
          <th>Year</th>
        </tr>
        {isSuccess && <>
          {data!.queryArtist!.albumViews!.map((albumView: any) =>
            <tr>
              <th>{albumView.album.name}</th>
              <th>{albumView.album.releaseYear}</th>
            </tr>
          )}
        </>}
      </table>
    </div>
  );
}


export default Artist;
