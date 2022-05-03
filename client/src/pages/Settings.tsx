import React from "react";
import {
  useAddDownloadLocationMutation, useDeleteDownloadLocationMutation,
  useQueryDownloadLocationsQuery,
  useSetDefaultDownloadLocationMutation,
  useUpdateDisplayNameMutation
} from "../generated/graphql";
import {graphQLClient} from "../client";

function Settings() {
  const {data, error, isLoading, isSuccess, refetch} = useQueryDownloadLocationsQuery(graphQLClient);
  const displayNameMutation = useUpdateDisplayNameMutation(graphQLClient);
  const setDefaultDownloadLocationMutation = useSetDefaultDownloadLocationMutation(graphQLClient);
  const addDownloadLocationMutation = useAddDownloadLocationMutation(graphQLClient);
  const deleteDownloadLocationMutation = useDeleteDownloadLocationMutation(graphQLClient);


  let filePathInput = React.createRef<HTMLInputElement>();
  let displayNameInput = React.createRef<HTMLInputElement>();

  return (
    <div className="App">
      <p>Settings</p>

      <table style={{width: "800px"}}>
        <tr>
          <th>Is Default</th>
          <th>File Path</th>
          <th>Display Name</th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th>
            <input ref={filePathInput}/>
          </th>
          <th>
            <input ref={displayNameInput}/>
          </th>
          <th>
            <button
              onClick={() => {
                if (addDownloadLocationMutation.isLoading) {
                  alert("Already in middle of adding a download location");
                  return;
                }
                const filePath = filePathInput.current!.value;
                const displayName = displayNameInput.current!.value;
                filePathInput.current!.value = "";
                displayNameInput.current!.value = "";
                addDownloadLocationMutation.mutate(
                  {
                    filePath: filePath,
                    displayName: displayName,
                  },
                  {
                    onSuccess: () => {
                      refetch();
                    },
                    onError: () => {
                      alert("Could not add download location");
                    }
                  }
                )
              }}
            >Add</button>
          </th>
        </tr>
        {
          !isSuccess ? <tr>
            <th></th>
            <th>Loading</th>
            <th>Loading</th>
            <th></th>
          </tr> : data!.queryDownloadLocations!.downloadLocations.map((downloadLocation) => <tr>
            <th>
              <input
                type={"checkbox"}
                value={downloadLocation.filePath}
                checked={data!.queryDownloadLocations?.defaultDownloadLocationFilePath == downloadLocation.filePath}
                onChange={(event) => {
                  const wasChecked = data!.queryDownloadLocations?.defaultDownloadLocationFilePath == downloadLocation.filePath;
                  const isChecked = event.target.checked;
                  if (!wasChecked && isChecked) {
                    if (setDefaultDownloadLocationMutation.isLoading) {
                      alert("Request in progress");
                      return;
                    }
                    setDefaultDownloadLocationMutation.mutate(
                      {
                        filePath: downloadLocation.filePath
                      },
                      {
                        onSuccess: () => {
                          // noinspection JSIgnoredPromiseFromCall
                          refetch();
                        }
                      }
                    )
                  }
                }}
              />
            </th>
            <th><label htmlFor={downloadLocation.filePath}>{downloadLocation.filePath}</label></th>
            <th>
              <input
                defaultValue={downloadLocation.displayName}
                onBlur={(event) => {
                  const desiredDisplayName = event.target.value;
                  if (desiredDisplayName != downloadLocation.displayName) {
                    console.log("Set display name to " + desiredDisplayName + " for " + downloadLocation.filePath);
                    displayNameMutation.mutate(
                      {
                        filePath: downloadLocation.filePath,
                        displayName: desiredDisplayName
                      },
                      {
                        onError: () => {
                          alert("Failed to save new display name!");
                        }
                      }
                    )
                  }
                }}
              />
            </th>
            <th>
              <button
                onClick={() => {
                  if (deleteDownloadLocationMutation.isLoading) {
                    alert("In process of deleting something");
                    return;
                  }
                  deleteDownloadLocationMutation.mutate(
                    {
                      filePath: downloadLocation.filePath
                    },
                    {
                      onSuccess: () => {
                        refetch();
                      },
                      onError: () => {
                        alert("Could not delete");
                      }
                    }
                  )
                }}
              >
                Delete
              </button></th>
          </tr>)
        }
      </table>
    </div>
  );
}


export default Settings;
