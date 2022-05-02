import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

// const API_URL = `/graphql`;
const API_URL = `http://localhost:8080/graphql`;

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

export function useQueryArtist(youtubeId: string) {
  return useQuery(["query-artist", youtubeId], async () => {
    const { queryArtist } = await graphQLClient.request(
      gql`
        query queryArtist($youtubeId: String!) {
          queryArtist(youtubeId: $youtubeId) {
            artist {
              youtubeId
              name
            }
            albumViews {
              album {
                name
                youtubePlaylistId
                artistYoutubeId
                releaseYear
              }
            }
          }
        }
      `,
      { youtubeId }
    );
    return queryArtist;
  });
}
