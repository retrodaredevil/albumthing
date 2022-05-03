import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use SPQR's SchemaPrinter to remove this from SDL */
  UNREPRESENTABLE: any;
};

export type Album = {
  __typename?: 'Album';
  artistYoutubeId: Scalars['String'];
  name: Scalars['String'];
  releaseYear: Scalars['Int'];
  youtubePlaylistId: Scalars['String'];
};

export type AlbumView = {
  __typename?: 'AlbumView';
  album: Album;
};

export type Artist = {
  __typename?: 'Artist';
  name: Scalars['String'];
  youtubeId: Scalars['String'];
};

export type ArtistView = {
  __typename?: 'ArtistView';
  albumCount: Scalars['Int'];
  artist: Artist;
  firstAlbum?: Maybe<Album>;
  latestAlbum?: Maybe<Album>;
};

export type BigArtistView = {
  __typename?: 'BigArtistView';
  albumViews: Array<AlbumView>;
  artist: Artist;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  addAlbum: Scalars['Boolean'];
  addArtist: Scalars['Boolean'];
};


/** Mutation root */
export type MutationAddAlbumArgs = {
  artistYoutubeId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  releaseYear: Scalars['Int'];
  youtubePlaylistId?: InputMaybe<Scalars['String']>;
};


/** Mutation root */
export type MutationAddArtistArgs = {
  name?: InputMaybe<Scalars['String']>;
  youtubeId?: InputMaybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  listArtists?: Maybe<Array<Maybe<ArtistView>>>;
  queryArtist?: Maybe<BigArtistView>;
  queryMilli: Scalars['Int'];
};


/** Query root */
export type QueryQueryArtistArgs = {
  youtubeId?: InputMaybe<Scalars['String']>;
};

export type ListArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListArtistsQuery = { __typename?: 'Query', listArtists?: Array<{ __typename?: 'ArtistView', albumCount: number, artist: { __typename?: 'Artist', youtubeId: string, name: string }, firstAlbum?: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } | null, latestAlbum?: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } | null } | null> | null };

export type QueryArtistQueryVariables = Exact<{
  youtubeId: Scalars['String'];
}>;


export type QueryArtistQuery = { __typename?: 'Query', queryArtist?: { __typename?: 'BigArtistView', artist: { __typename?: 'Artist', youtubeId: string, name: string }, albumViews: Array<{ __typename?: 'AlbumView', album: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } }> } | null };


export const ListArtistsDocument = `
    query listArtists {
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
    `;
export const useListArtistsQuery = <
      TData = ListArtistsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListArtistsQueryVariables,
      options?: UseQueryOptions<ListArtistsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListArtistsQuery, TError, TData>(
      variables === undefined ? ['listArtists'] : ['listArtists', variables],
      fetcher<ListArtistsQuery, ListArtistsQueryVariables>(client, ListArtistsDocument, variables, headers),
      options
    );
export const QueryArtistDocument = `
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
    `;
export const useQueryArtistQuery = <
      TData = QueryArtistQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: QueryArtistQueryVariables,
      options?: UseQueryOptions<QueryArtistQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryArtistQuery, TError, TData>(
      ['queryArtist', variables],
      fetcher<QueryArtistQuery, QueryArtistQueryVariables>(client, QueryArtistDocument, variables, headers),
      options
    );