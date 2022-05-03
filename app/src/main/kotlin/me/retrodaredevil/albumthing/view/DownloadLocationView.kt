package me.retrodaredevil.albumthing.view

import me.retrodaredevil.albumthing.model.DownloadLocation

data class DownloadLocationView(
        val defaultDownloadLocationFilePath: String,
        val downloadLocations: List<DownloadLocation>
)
