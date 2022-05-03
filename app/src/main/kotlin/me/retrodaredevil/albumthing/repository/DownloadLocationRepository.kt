package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.view.DownloadLocationView

interface DownloadLocationRepository {
    fun queryDownloadLocations(): DownloadLocationView
    fun setDefaultDownloadLocation(filePath: String)

    fun addDownloadLocation(filePath: String, displayName: String)
    fun updateDisplayName(filePath: String, displayName: String)
    fun deleteDownloadLocation(filePath: String)

}
