import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `/graphql`;
// const API_URL = `http://localhost:8080/graphql`;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    // Authorization: `Bearer ${process.env.API_KEY}`
  }
});
