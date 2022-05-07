import React from "react";
import {useAddArtistMutation} from "../generated/graphql";
import {graphQLClient} from "../client";
import {useNavigate} from "react-router-dom";

function NewArtist() {
  // const {data, error, isLoading, isSuccess} = useQueryArtistQuery(graphQLClient, {youtubeId: youtubeId ?? ""});
  const mutation = useAddArtistMutation(graphQLClient);
  const navigate = useNavigate();

  let youtubeIdInput = React.createRef<HTMLInputElement>();
  let nameInput = React.createRef<HTMLInputElement>();
  return (
    <div className="App">
      YouTube ID: <input ref={youtubeIdInput}/>
      <br/>
      Artist name: <input ref={nameInput}/>
      <br/>
      <button
        onClick={() => {
          // good mutation tutorial: https://www.reactjstutorials.com/react-query/14/react-query-use-mutation
          if (mutation.isLoading) {
            alert("Already loading!");
            return;
          }
          const youtubeId = youtubeIdInput.current!.value;
          const name = nameInput.current!.value || undefined; // if empty string, default to undefined, which will give null to backend to use default
          mutation.mutate(
            {
              youtubeId: youtubeId,
              name: name
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


export default NewArtist;
