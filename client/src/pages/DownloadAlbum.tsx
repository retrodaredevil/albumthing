import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useQueryAlbumQuery, useQueryDownloadLocationsQuery, useStartDownloadMutation} from "../generated/graphql";
import {graphQLClient} from "../client";

function DownloadAlbum() {
  const {playlistId} = useParams();
  if (playlistId === undefined) {
    throw "playlistId is undefined!";
  }
  const {data, error, isLoading, isSuccess} = useQueryDownloadLocationsQuery(graphQLClient);
  const startDownloadMutation = useStartDownloadMutation(graphQLClient);
  // const {data, error, isLoading, isSuccess} = useQueryAlbumQuery(graphQLClient, {playlistId: playlistId});
  const navigate = useNavigate();

  const downloadLocationSelect = React.createRef<HTMLSelectElement>();

  return (
      <div className="App">
        <Link to={"/album/" + playlistId}>
          Back
        </Link>
        <br/>
        <br/>
        {!isSuccess ? <p>Loading</p>:
          <>
            Download Location Select:
            <br/>
            <select ref={downloadLocationSelect}>
              {data!.queryDownloadLocations!.downloadLocations.map((downloadLocation) =>
                <option
                  selected={downloadLocation.filePath == data!.queryDownloadLocations!.defaultDownloadLocationFilePath}
                  value={downloadLocation.filePath}
                >
                  {downloadLocation.displayName} ({downloadLocation.filePath})
                </option>
              )}
            </select>
            <br/>
            <button
              onClick={() => {
                if (startDownloadMutation.isLoading) {
                  alert("Already in process of starting a download!");
                  return;
                }
                const downloadLocationFilePath = downloadLocationSelect.current!.value;
                startDownloadMutation.mutate(
                  {
                    playlistId: playlistId,
                    downloadLocationFilePath: downloadLocationFilePath
                  },
                  {
                    onSuccess: () => {
                      navigate("/album/" + playlistId);
                    },
                    onError: () => {
                      alert("Failed to start download");
                    }
                  }
                );
              }}
            >Start Download</button>
          </>
        }

      </div>
    )
}

export default DownloadAlbum;
