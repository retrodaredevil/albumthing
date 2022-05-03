package me.retrodaredevil.albumthing.view

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.model.DownloadLocation
import me.retrodaredevil.albumthing.model.DownloadRecord

data class DownloadRecordView(
        val downloadRecord: DownloadRecord,
        val downloadLocation: DownloadLocation,
)

data class BigAlbumView(
        val album: Album,
        val artist: Artist,
        val downloadRecordViews: List<DownloadRecordView>
)
