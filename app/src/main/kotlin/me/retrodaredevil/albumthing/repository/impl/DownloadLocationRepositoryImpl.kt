package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.DownloadLocation
import me.retrodaredevil.albumthing.repository.DownloadLocationRepository
import me.retrodaredevil.albumthing.view.DownloadLocationView
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service("downloadLocationRepository")
class DownloadLocationRepositoryImpl(
        private val jdbcTemplate: JdbcTemplate
) : DownloadLocationRepository {
    override fun queryDownloadLocations(): DownloadLocationView {
        val sql = """
            SELECT file_path, display_name, (file_path = default_download_location) as is_default FROM download_location, settings
        """.trimIndent()
        val locations = jdbcTemplate.query(sql) { rs, _ ->
            IntermediateDownloadLocation(
                    DownloadLocation(
                            rs.getString("file_path"),
                            rs.getString("display_name")
                    ),
                    rs.getBoolean("is_default")
            )
        }

        return DownloadLocationView(locations.first { it.isDefault }.downloadLocation.filePath, locations.map { it.downloadLocation })
    }

    override fun setDefaultDownloadLocation(filePath: String) {
        jdbcTemplate.update("UPDATE settings SET default_download_location = ?", filePath)
    }

    override fun addDownloadLocation(filePath: String, displayName: String) {
        jdbcTemplate.update("INSERT INTO download_location(file_path, display_name) VALUES(?, ?)", filePath, displayName)
    }

    override fun updateDisplayName(filePath: String, displayName: String) {
        jdbcTemplate.update("UPDATE download_location SET display_name = ? WHERE file_path = ?", displayName, filePath)
    }

    override fun deleteDownloadLocation(filePath: String) {
        jdbcTemplate.update("DELETE FROM download_location WHERE file_path = ?", filePath)
    }

    private data class IntermediateDownloadLocation(
            val downloadLocation: DownloadLocation,
            val isDefault: Boolean
    )
}
