import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    // Authorization: `Bearer ${process.env.API_KEY}`
  }
});

export function useListArtists() {
  return useQuery("list-artists", async () => {
    const { listArtists } = await graphQLClient.request(gql`
      query {
        listArtists {
          artist {
            youtubeId
            name
          }
          albumCount
          firstAlbum {
            name
            youtubePlaylistId
            artistYoutubeId
            releaseYear
          }
          latestAlbum {
            name
            youtubePlaylistId
            artistYoutubeId
            releaseYear
          }
        }
      }
    `);
    return listArtists;
  });
}

export function useGetPost(postId: string) {
  return useQuery(["get-post", postId], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}
