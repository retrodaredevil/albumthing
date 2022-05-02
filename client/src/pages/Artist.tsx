import {useListArtists} from "../useRequest";
import React from "react";
import {Link, useParams} from "react-router-dom";
import Home from "./Home";

function Artist() {
  // const {data, error, isLoading, isSuccess} = useListArtists();
  const { youtubeId } = useParams();
  console.log(youtubeId);
  return (
    <div className="App">
      <table style={{width: "1500px"}}>
        <tr>
          <th>Album</th>
          <th>Year</th>
        </tr>
      </table>
    </div>
  );
}


export default Artist;
