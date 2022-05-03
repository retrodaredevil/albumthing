import React from "react";
import {Link, useParams} from "react-router-dom";
import {useQueryArtistQuery} from "../generated/graphql";
import {graphQLClient} from "../client";

function Artist() {
  const { youtubeId } = useParams();
  const {data, error, isLoading, isSuccess} = useQueryArtistQuery(graphQLClient, {youtubeId: youtubeId ?? ""});
  console.log(youtubeId);
  return (
    <div className="App">
      <table style={{width: "1500px"}}>
        <tr>
          <th>
            {isSuccess ? data!.queryArtist!.artist.name : "Loading"}
          </th>
          <th>
            <Link to={"./new"}>Add Album</Link>
          </th>
        </tr>
        <tr>
          <th>.</th>
          <th>.</th>
        </tr>
        {isSuccess && <>
          {data!.queryArtist!.albumViews.map((albumView: any) =>
            <tr>
              <th><Link to={"/album/" + albumView.album.youtubePlaylistId}>{albumView.album.name}</Link></th>
              <th>{albumView.album.releaseYear}</th>
            </tr>
          )}
        </>}
      </table>
    </div>
  );
}


export default Artist;
