package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.view.BigAlbumView
import java.time.Instant

interface AlbumRepository {
    fun save(album: Album)
    fun queryAlbum(playlistId: String): BigAlbumView
    fun createDownloadRecord(startTime: Instant, youtubePlaylistId: String, backgroundProcessId: Int, downloadLocationFilePath: String, downloadLocationSubpath: String)
}
