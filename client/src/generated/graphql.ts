import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
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

export type DownloadLocation = {
  __typename?: 'DownloadLocation';
  displayName: Scalars['String'];
  filePath: Scalars['String'];
};

export type DownloadLocationView = {
  __typename?: 'DownloadLocationView';
  defaultDownloadLocationFilePath: Scalars['String'];
  downloadLocations: Array<DownloadLocation>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  addAlbum: Scalars['Boolean'];
  addArtist: Scalars['Boolean'];
  addDownloadLocation: Scalars['Boolean'];
  deleteDownloadLocation: Scalars['Boolean'];
  setDefaultDownloadLocation: Scalars['Boolean'];
  updateDisplayName: Scalars['Boolean'];
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


/** Mutation root */
export type MutationAddDownloadLocationArgs = {
  displayName?: InputMaybe<Scalars['String']>;
  filePath?: InputMaybe<Scalars['String']>;
};


/** Mutation root */
export type MutationDeleteDownloadLocationArgs = {
  filePath?: InputMaybe<Scalars['String']>;
};


/** Mutation root */
export type MutationSetDefaultDownloadLocationArgs = {
  filePath?: InputMaybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdateDisplayNameArgs = {
  displayName?: InputMaybe<Scalars['String']>;
  filePath?: InputMaybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  listArtists?: Maybe<Array<Maybe<ArtistView>>>;
  queryArtist?: Maybe<BigArtistView>;
  queryDownloadLocations?: Maybe<DownloadLocationView>;
  queryMilli: Scalars['Int'];
};


/** Query root */
export type QueryQueryArtistArgs = {
  youtubeId?: InputMaybe<Scalars['String']>;
};

export type AddAlbumMutationVariables = Exact<{
  youtubePlaylistId: Scalars['String'];
  artistYoutubeId: Scalars['String'];
  name: Scalars['String'];
  releaseYear: Scalars['Int'];
}>;


export type AddAlbumMutation = { __typename?: 'Mutation', addAlbum: boolean };

export type AddArtistMutationVariables = Exact<{
  youtubeId: Scalars['String'];
  name: Scalars['String'];
}>;


export type AddArtistMutation = { __typename?: 'Mutation', addArtist: boolean };

export type AddDownloadLocationMutationVariables = Exact<{
  filePath: Scalars['String'];
  displayName: Scalars['String'];
}>;


export type AddDownloadLocationMutation = { __typename?: 'Mutation', addDownloadLocation: boolean };

export type DeleteDownloadLocationMutationVariables = Exact<{
  filePath: Scalars['String'];
}>;


export type DeleteDownloadLocationMutation = { __typename?: 'Mutation', deleteDownloadLocation: boolean };

export type ListArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListArtistsQuery = { __typename?: 'Query', listArtists?: Array<{ __typename?: 'ArtistView', albumCount: number, artist: { __typename?: 'Artist', youtubeId: string, name: string }, firstAlbum?: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } | null, latestAlbum?: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } | null } | null> | null };

export type QueryArtistQueryVariables = Exact<{
  youtubeId: Scalars['String'];
}>;


export type QueryArtistQuery = { __typename?: 'Query', queryArtist?: { __typename?: 'BigArtistView', artist: { __typename?: 'Artist', youtubeId: string, name: string }, albumViews: Array<{ __typename?: 'AlbumView', album: { __typename?: 'Album', name: string, youtubePlaylistId: string, artistYoutubeId: string, releaseYear: number } }> } | null };

export type QueryDownloadLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryDownloadLocationsQuery = { __typename?: 'Query', queryDownloadLocations?: { __typename?: 'DownloadLocationView', defaultDownloadLocationFilePath: string, downloadLocations: Array<{ __typename?: 'DownloadLocation', filePath: string, displayName: string }> } | null };

export type SetDefaultDownloadLocationMutationVariables = Exact<{
  filePath: Scalars['String'];
}>;


export type SetDefaultDownloadLocationMutation = { __typename?: 'Mutation', setDefaultDownloadLocation: boolean };

export type UpdateDisplayNameMutationVariables = Exact<{
  filePath: Scalars['String'];
  displayName: Scalars['String'];
}>;


export type UpdateDisplayNameMutation = { __typename?: 'Mutation', updateDisplayName: boolean };


export const AddAlbumDocument = `
    mutation addAlbum($youtubePlaylistId: String!, $artistYoutubeId: String!, $name: String!, $releaseYear: Int!) {
  addAlbum(
    youtubePlaylistId: $youtubePlaylistId
    artistYoutubeId: $artistYoutubeId
    name: $name
    releaseYear: $releaseYear
  )
}
    `;
export const useAddAlbumMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddAlbumMutation, TError, AddAlbumMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddAlbumMutation, TError, AddAlbumMutationVariables, TContext>(
      ['addAlbum'],
      (variables?: AddAlbumMutationVariables) => fetcher<AddAlbumMutation, AddAlbumMutationVariables>(client, AddAlbumDocument, variables, headers)(),
      options
    );
export const AddArtistDocument = `
    mutation addArtist($youtubeId: String!, $name: String!) {
  addArtist(youtubeId: $youtubeId, name: $name)
}
    `;
export const useAddArtistMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddArtistMutation, TError, AddArtistMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddArtistMutation, TError, AddArtistMutationVariables, TContext>(
      ['addArtist'],
      (variables?: AddArtistMutationVariables) => fetcher<AddArtistMutation, AddArtistMutationVariables>(client, AddArtistDocument, variables, headers)(),
      options
    );
export const AddDownloadLocationDocument = `
    mutation addDownloadLocation($filePath: String!, $displayName: String!) {
  addDownloadLocation(filePath: $filePath, displayName: $displayName)
}
    `;
export const useAddDownloadLocationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddDownloadLocationMutation, TError, AddDownloadLocationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddDownloadLocationMutation, TError, AddDownloadLocationMutationVariables, TContext>(
      ['addDownloadLocation'],
      (variables?: AddDownloadLocationMutationVariables) => fetcher<AddDownloadLocationMutation, AddDownloadLocationMutationVariables>(client, AddDownloadLocationDocument, variables, headers)(),
      options
    );
export const DeleteDownloadLocationDocument = `
    mutation deleteDownloadLocation($filePath: String!) {
  deleteDownloadLocation(filePath: $filePath)
}
    `;
export const useDeleteDownloadLocationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDownloadLocationMutation, TError, DeleteDownloadLocationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDownloadLocationMutation, TError, DeleteDownloadLocationMutationVariables, TContext>(
      ['deleteDownloadLocation'],
      (variables?: DeleteDownloadLocationMutationVariables) => fetcher<DeleteDownloadLocationMutation, DeleteDownloadLocationMutationVariables>(client, DeleteDownloadLocationDocument, variables, headers)(),
      options
    );
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
export const QueryDownloadLocationsDocument = `
    query queryDownloadLocations {
  queryDownloadLocations {
    defaultDownloadLocationFilePath
    downloadLocations {
      filePath
      displayName
    }
  }
}
    `;
export const useQueryDownloadLocationsQuery = <
      TData = QueryDownloadLocationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: QueryDownloadLocationsQueryVariables,
      options?: UseQueryOptions<QueryDownloadLocationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryDownloadLocationsQuery, TError, TData>(
      variables === undefined ? ['queryDownloadLocations'] : ['queryDownloadLocations', variables],
      fetcher<QueryDownloadLocationsQuery, QueryDownloadLocationsQueryVariables>(client, QueryDownloadLocationsDocument, variables, headers),
      options
    );
export const SetDefaultDownloadLocationDocument = `
    mutation setDefaultDownloadLocation($filePath: String!) {
  setDefaultDownloadLocation(filePath: $filePath)
}
    `;
export const useSetDefaultDownloadLocationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetDefaultDownloadLocationMutation, TError, SetDefaultDownloadLocationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetDefaultDownloadLocationMutation, TError, SetDefaultDownloadLocationMutationVariables, TContext>(
      ['setDefaultDownloadLocation'],
      (variables?: SetDefaultDownloadLocationMutationVariables) => fetcher<SetDefaultDownloadLocationMutation, SetDefaultDownloadLocationMutationVariables>(client, SetDefaultDownloadLocationDocument, variables, headers)(),
      options
    );
export const UpdateDisplayNameDocument = `
    mutation updateDisplayName($filePath: String!, $displayName: String!) {
  updateDisplayName(filePath: $filePath, displayName: $displayName)
}
    `;
export const useUpdateDisplayNameMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateDisplayNameMutation, TError, UpdateDisplayNameMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateDisplayNameMutation, TError, UpdateDisplayNameMutationVariables, TContext>(
      ['updateDisplayName'],
      (variables?: UpdateDisplayNameMutationVariables) => fetcher<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>(client, UpdateDisplayNameDocument, variables, headers)(),
      options
    );