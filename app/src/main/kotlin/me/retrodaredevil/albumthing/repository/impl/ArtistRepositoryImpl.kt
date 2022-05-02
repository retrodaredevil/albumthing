package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.ArtistRepository
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
}