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
        return jdbcTemplate.query("SELECT artist.youtube_id, artist.name from artist AS artist", { rs, _ ->
            val artist = Artist(rs.getString("youtube_id"), rs.getString("name"))

            ArtistView(artist, 0, null, null)
        })
    }
}