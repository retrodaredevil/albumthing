import {useQueryArtist} from "../useRequest";
import React from "react";
import {useParams} from "react-router-dom";

function Artist() {
  const { youtubeId } = useParams();
  const {data, error, isLoading, isSuccess} = useQueryArtist(youtubeId ?? "");
  console.log(youtubeId);
  return (
    <div className="App">
      {isLoading && "Loading"}
      {isSuccess && data.artist.name}
      <table style={{width: "1500px"}}>
        <tr>
          <th>Album</th>
          <th>Year</th>
        </tr>
        {isSuccess && <>
          {data.albumViews.map((albumView: any) =>
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
