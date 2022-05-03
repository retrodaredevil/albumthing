package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.model.DownloadLocation
import me.retrodaredevil.albumthing.model.DownloadRecord
import me.retrodaredevil.albumthing.repository.AlbumRepository
import me.retrodaredevil.albumthing.view.BigAlbumView
import me.retrodaredevil.albumthing.view.DownloadRecordView
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.Instant

@Service("albumRepository")
class AlbumRepositoryImpl(
        private val jdbcTemplate: JdbcTemplate
) : AlbumRepository {
    override fun save(album: Album) {
        jdbcTemplate.update("INSERT INTO album(youtube_playlist_id, name, release_year, artist_youtube_id) VALUES(?, ?, ?, ?)", album.youtubePlaylistId, album.name, album.releaseYear, album.artistYoutubeId)
    }

    override fun queryAlbum(playlistId: String): BigAlbumView {
        val sql = """
            SELECT album.youtube_playlist_id, album.name, release_year, artist_youtube_id, artist.name as artist_name,
                start_time, end_time, background_process_id, download_location_subpath, download_location_file_path, download_location.display_name
            FROM album
            JOIN artist ON artist_youtube_id = youtube_id
            LEFT JOIN download_record ON download_record.youtube_playlist_id = album.youtube_playlist_id
            LEFT JOIN download_location on download_record.download_location_file_path = download_location.file_path
            WHERE album.youtube_playlist_id = ?
        """.trimIndent()
        val data = jdbcTemplate.query(sql, { rs, _ ->
            IntermediateAlbum(
                    Album(
                            rs.getString("youtube_playlist_id"),
                            rs.getString("artist_youtube_id"),
                            rs.getString("name"),
                            rs.getInt("release_year"),
                    ),
                    Artist(
                            rs.getString("artist_youtube_id"),
                            rs.getString("artist_name"),
                    ),
                    if (rs.getTimestamp("start_time") == null) null else
                        DownloadRecordView(
                                DownloadRecord(
                                        rs.getTimestamp("start_time").toInstant(),
                                        rs.getString("youtube_playlist_id"),
                                        rs.getTimestamp("end_time")?.toInstant(),
                                        rs.getInt("background_process_id"),
                                        rs.getString("download_location_file_path"),
                                        rs.getString("download_location_subpath"),
                                ),
                                DownloadLocation(
                                        rs.getString("download_location_file_path"),
                                        rs.getString("display_name"),
                                )
                        )
            )
        }, playlistId)
        if (data.isEmpty()) {
            throw NoSuchElementException("Could not find album with playlistId: $playlistId")
        }
        val album = data[0].album
        val artist = data[0].artist
        return BigAlbumView(album, artist, data.mapNotNull { it.downloadRecordView })
    }

    override fun createDownloadRecord(startTime: Instant, youtubePlaylistId: String, backgroundProcessId: Int, downloadLocationFilePath: String, downloadLocationSubpath: String) {
        val sql = """
            INSERT INTO download_record (start_time, youtube_playlist_id, background_process_id, download_location_file_path, download_location_subpath)
            VALUES(?, ?, ?, ?, ?)
        """.trimIndent()
        jdbcTemplate.update(sql, Timestamp.from(startTime), youtubePlaylistId, backgroundProcessId, downloadLocationFilePath, downloadLocationSubpath)
    }

    private data class IntermediateAlbum(
            val album: Album,
            val artist: Artist,
            val downloadRecordView: DownloadRecordView?,
    )
}
