package me.retrodaredevil.albumthing.model

import java.time.Instant

data class DownloadRecord(
        val startTime: Instant,
        val youtubePlaylistId: String,
        val endTime: Instant?,
        val backgroundProcessId: Int,
        /** References [DownloadLocation.filePath] */
        val downloadLocationFilePath: String,
        val downloadLocationSubpath: String,
)
