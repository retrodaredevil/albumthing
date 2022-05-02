package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.repository.AlbumRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service("albumRepository")
class AlbumRepositoryImpl(
        private val jdbcTemplate: JdbcTemplate
) : AlbumRepository {
    override fun save(album: Album) {
        jdbcTemplate.update("INSERT INTO album(youtube_playlist_id, name, release_year, artist_youtube_id) VALUES(?, ?, ?, ?)", album.youtubePlaylistId, album.name, album.releaseYear, album.artistYoutubeId)
    }
}