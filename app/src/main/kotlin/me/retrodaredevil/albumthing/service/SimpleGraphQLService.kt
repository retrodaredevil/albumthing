package me.retrodaredevil.albumthing.service

import io.leangen.graphql.annotations.GraphQLMutation
import io.leangen.graphql.annotations.GraphQLQuery
import me.retrodaredevil.albumthing.TestConstants
import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.AlbumRepository
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.repository.DownloadLocationRepository
import me.retrodaredevil.albumthing.view.ArtistView
import me.retrodaredevil.albumthing.view.BigAlbumView
import me.retrodaredevil.albumthing.view.BigArtistView
import me.retrodaredevil.albumthing.view.DownloadLocationView
import java.nio.file.Paths
import java.time.Instant

class SimpleGraphQLService(
        private val artistRepository: ArtistRepository,
        private val albumRepository: AlbumRepository,
        private val downloadLocationRepository: DownloadLocationRepository,
) {

    @GraphQLQuery
    fun queryMilli(): Int {
        return (System.currentTimeMillis() % 1000).toInt()
    }
    @GraphQLQuery
    fun listArtists(): List<ArtistView> {
        return artistRepository.listArtists()
    }

    @GraphQLQuery
    fun queryArtist(youtubeId: String): BigArtistView {
        return artistRepository.queryArtist(youtubeId)
    }

    @GraphQLQuery
    fun queryAlbum(playlistId: String): BigAlbumView {
        return albumRepository.queryAlbum(playlistId)
    }


    @GraphQLMutation
    fun addArtist(youtubeId: String, name: String) {
        // TODO make name optional so we query YouTube API
        println("Adding $youtubeId $name")
        // TODO add validation to youtubeId and name
        artistRepository.save(Artist(youtubeId, name))
    }
    @GraphQLMutation
    fun addAlbum(youtubePlaylistId: String, artistYoutubeId: String, name: String, releaseYear: Int) {
        // TODO make everything except youtubePlaylistId optional. All can be queried from YouTube API
        albumRepository.save(Album(youtubePlaylistId, artistYoutubeId, name, releaseYear))
    }

    @GraphQLQuery
    fun queryDownloadLocations(): DownloadLocationView {
        return downloadLocationRepository.queryDownloadLocations()
    }

    @GraphQLMutation
    fun setDefaultDownloadLocation(filePath: String) {
        downloadLocationRepository.setDefaultDownloadLocation(filePath)
    }

    @GraphQLMutation
    fun addDownloadLocation(filePath: String, displayName: String) {
        downloadLocationRepository.addDownloadLocation(filePath, displayName)
    }

    @GraphQLMutation
    fun updateDisplayName(filePath: String, displayName: String) {
        downloadLocationRepository.updateDisplayName(filePath, displayName)
    }

    @GraphQLMutation
    fun deleteDownloadLocation(filePath: String) {
        downloadLocationRepository.deleteDownloadLocation(filePath)
    }

    @GraphQLMutation
    fun startDownload(playlistId: String, downloadLocationFilePath: String) {
        val startTime = Instant.now()
        val albumView = queryAlbum(playlistId)
        val subpath = Paths.get(albumView.artist.name, albumView.album.name).toString()
        val backgroundProcessId = 0 // TODO make this useful

        albumRepository.createDownloadRecord(startTime, playlistId, backgroundProcessId, downloadLocationFilePath, subpath)
    }
}
