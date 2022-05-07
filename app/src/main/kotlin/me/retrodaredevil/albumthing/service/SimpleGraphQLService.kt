package me.retrodaredevil.albumthing.service

import io.leangen.graphql.annotations.GraphQLMutation
import io.leangen.graphql.annotations.GraphQLQuery
import me.retrodaredevil.albumthing.TestConstants
import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.AlbumRepository
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.repository.DownloadLocationRepository
import me.retrodaredevil.albumthing.util.requireValidChannelId
import me.retrodaredevil.albumthing.util.requireValidDisplayName
import me.retrodaredevil.albumthing.util.requireValidFilePath
import me.retrodaredevil.albumthing.util.requireValidPlaylistId
import me.retrodaredevil.albumthing.view.ArtistView
import me.retrodaredevil.albumthing.view.BigAlbumView
import me.retrodaredevil.albumthing.view.BigArtistView
import me.retrodaredevil.albumthing.view.DownloadLocationView
import me.retrodaredevil.albumthing.youtube.YoutubeService
import java.nio.file.Paths
import java.time.Instant

class SimpleGraphQLService(
        private val artistRepository: ArtistRepository,
        private val albumRepository: AlbumRepository,
        private val downloadLocationRepository: DownloadLocationRepository,
        private val youtubeService: YoutubeService,
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
        requireValidChannelId(youtubeId)
        return artistRepository.queryArtist(youtubeId)
    }

    @GraphQLQuery
    fun queryAlbum(playlistId: String): BigAlbumView {
        requireValidPlaylistId(playlistId)
        return albumRepository.queryAlbum(playlistId)
    }


    @GraphQLMutation
    fun addArtist(youtubeId: String, name: String?) {
        requireValidChannelId(youtubeId)
        val actualName: String = if (name != null) {
            requireValidDisplayName(name)
            name
        } else {
            youtubeService.getChannelName(youtubeId)
        }
        artistRepository.save(Artist(youtubeId, actualName))
    }
    @GraphQLMutation
    fun addAlbum(youtubePlaylistId: String, artistYoutubeId: String, name: String, releaseYear: Int) {
        // TODO make everything except youtubePlaylistId optional. All can be queried from YouTube API
        requireValidPlaylistId(youtubePlaylistId)
        requireValidChannelId(artistYoutubeId)
        requireValidDisplayName(name)
        albumRepository.save(Album(youtubePlaylistId, artistYoutubeId, name, releaseYear))
    }

    @GraphQLQuery
    fun queryDownloadLocations(): DownloadLocationView {
        return downloadLocationRepository.queryDownloadLocations()
    }

    @GraphQLMutation
    fun setDefaultDownloadLocation(filePath: String) {
        requireValidFilePath(filePath)
        downloadLocationRepository.setDefaultDownloadLocation(filePath)
    }

    @GraphQLMutation
    fun addDownloadLocation(filePath: String, displayName: String) {
        requireValidFilePath(filePath)
        requireValidDisplayName(displayName)
        downloadLocationRepository.addDownloadLocation(filePath, displayName)
    }

    @GraphQLMutation
    fun updateDisplayName(filePath: String, displayName: String) {
        requireValidDisplayName(displayName)
        downloadLocationRepository.updateDisplayName(filePath, displayName)
    }

    @GraphQLMutation
    fun deleteDownloadLocation(filePath: String) {
        downloadLocationRepository.deleteDownloadLocation(filePath)
    }

    @GraphQLMutation
    fun startDownload(playlistId: String, downloadLocationFilePath: String) {
        requireValidChannelId(playlistId)
        // don't need to validate downloadLocationFilePath because it should be referring to a valid download record
        val startTime = Instant.now()
        val albumView = queryAlbum(playlistId)
        val subpath = Paths.get(albumView.artist.name, albumView.album.name).toString()
        val backgroundProcessId = 0 // TODO make this useful

        albumRepository.createDownloadRecord(startTime, playlistId, backgroundProcessId, downloadLocationFilePath, subpath)
    }

    @GraphQLQuery
    fun getChannelName(channelId: String): String {
        return youtubeService.getChannelName(channelId)
    }
}
