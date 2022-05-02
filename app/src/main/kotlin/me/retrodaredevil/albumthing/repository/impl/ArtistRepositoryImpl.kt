package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.view.ArtistView
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

//@Component
@Service("artistRepository")
class ArtistRepositoryImpl(
        private val jdbcTemplate: JdbcTemplate
) : ArtistRepository {
    override fun save(artist: Artist) {
        jdbcTemplate.update("INSERT INTO artist(youtube_id, name) VALUES(?, ?)", artist.youtubeId, artist.name)
    }

    override fun listArtists(): List<ArtistView> {
        val sql = """
            SELECT artist.youtube_id, artist.name, album_count.album_count
            FROM artist AS artist
            LEFT JOIN (SELECT COUNT(*) AS album_count, artist_youtube_id FROM album GROUP BY youtube_playlist_id) as album_count
            ON artist.youtube_id = album_count.artist_youtube_id
        """.trimIndent()
        return jdbcTemplate.query(sql) { rs, _ ->
            val artist = Artist(rs.getString("youtube_id"), rs.getString("name"))

            ArtistView(artist, rs.getInt("album_count"), null, null)
        }
    }
}