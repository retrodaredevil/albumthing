// import {useListArtists} from "../useRequest";
import React from "react";
import {Link } from "react-router-dom";
// import {useListArtists} from "../useRequest";
import {useListArtistsQuery} from "../generated/graphql";
import {graphQLClient} from "../client";

function Home() {
  const stuff = useListArtistsQuery(graphQLClient);
  console.log(stuff);
  const { data, error, isLoading, isSuccess } = stuff;
  console.log(data);
  console.log();

  if (error) return <h1>Something went wrong!</h1>;
  return (
    <div className="App">
      <table style={{width: "1500px"}}>
        <tr>
          <th style={{width:"40%"}}>Artist</th>
          <th style={{width:"20%"}}>Album Count</th>
          <th style={{width:"20%"}}>First Album</th>
          <th style={{width:"20%"}}>Latest Album</th>
        </tr>
        {isLoading && <tr>
          <th>Loading</th>
          <th>Loading</th>
          <th>Loading</th>
          <th>Loading</th>
        </tr>}
        {isSuccess && data!.listArtists!.map((artistView: any) => <>
          <tr>
            <th>
              <Link to={"/artist/" + artistView.artist.youtubeId}>
                {artistView.artist.name}
              </Link>
            </th>
            <th>{artistView.albumCount} album{artistView.albumCount == 1 ? "" : "s"}</th>
            <th>{artistView.firstAlbum?.name ?? ""}</th>
            <th>{artistView.latestAlbum?.name ?? ""}</th>
          </tr>
        </>)}
      </table>
    </div>
  );
}

export default Home;
