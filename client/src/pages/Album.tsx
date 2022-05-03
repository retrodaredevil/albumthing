import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAddAlbumMutation, useQueryAlbumQuery} from "../generated/graphql";
import {graphQLClient} from "../client";

function Album() {
  const {playlistId} = useParams();
  if (playlistId === undefined) {
    throw "playlistId is undefined!";
  }
  const {data, error, isLoading, isSuccess} = useQueryAlbumQuery(graphQLClient, { playlistId: playlistId });
  const navigate = useNavigate();


  return (
    <>
      <div className="App">
        {isSuccess && <Link to={"/artist/" + data!.queryAlbum!.artist.youtubeId}>{data!.queryAlbum!.artist.name}</Link>}
        <br/>
        <Link to={"/album/" + playlistId + "/download"}>Download</Link>
        <br/>
        {!isSuccess ? <p>Loading</p> :
          <table style={{width:"1500px"}}>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Download Location</th>
              <th>Subpath</th>
              <th>Download Location Name</th>
            </tr>
            {data!.queryAlbum!.downloadRecordViews.map((downloadRecordView) => <tr>
              <th>{downloadRecordView.downloadRecord.startTime}</th>
              <th>{downloadRecordView.downloadRecord.endTime ?? ""}</th>
              <th>{downloadRecordView.downloadRecord.downloadLocationFilePath}</th>
              <th>{downloadRecordView.downloadRecord.downloadLocationSubpath}</th>
              <th>{downloadRecordView.downloadLocation.displayName}</th>
            </tr>)}
          </table>
        }

      </div>
    </>
  )
}

export default Album;
