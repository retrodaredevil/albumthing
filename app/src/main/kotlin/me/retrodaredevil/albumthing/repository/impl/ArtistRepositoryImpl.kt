package me.retrodaredevil.albumthing.repository.impl

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.view.AlbumView
import me.retrodaredevil.albumthing.view.ArtistView
import me.retrodaredevil.albumthing.view.BigArtistView
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service("artistRepository")
class ArtistRepositoryImpl(
        private val jdbcTemplate: JdbcTemplate
) : ArtistRepository {
    override fun save(artist: Artist) {
        jdbcTemplate.update("INSERT INTO artist(youtube_id, name) VALUES(?, ?)", artist.youtubeId, artist.name)
    }

    override fun listArtists(): List<ArtistView> {
        val sql = """
            SELECT artist.youtube_id, artist.name, album_count.album_count,
                first_album.youtube_playlist_id as first_youtube_playlist_id, first_album.name as first_name, first_album.release_year as first_release_year,
                latest_album.youtube_playlist_id as latest_youtube_playlist_id, latest_album.name as latest_name, latest_album.release_year as latest_release_year
            FROM artist AS artist
            LEFT JOIN (SELECT COUNT(*) AS album_count, artist_youtube_id FROM album GROUP BY artist_youtube_id) as album_count
            ON artist.youtube_id = album_count.artist_youtube_id
            LEFT JOIN album as first_album
            ON artist.youtube_id = first_album.artist_youtube_id 
                AND first_album.youtube_playlist_id = (SELECT youtube_playlist_id FROM album WHERE artist.youtube_id = artist_youtube_id ORDER BY release_year LIMIT 1)
            LEFT JOIN album as latest_album
            ON artist.youtube_id = latest_album.artist_youtube_id 
                AND latest_album.youtube_playlist_id = (SELECT youtube_playlist_id FROM album WHERE artist.youtube_id = artist_youtube_id ORDER BY release_year DESC LIMIT 1)
        """.trimIndent()
        return jdbcTemplate.query(sql) { rs, _ ->
            val artist = Artist(rs.getString("youtube_id"), rs.getString("name"))

            val albumCount = rs.getInt("album_count")
            val firstAlbum: Album?
            val latestAlbum: Album?
            if (albumCount > 0) {
                firstAlbum = Album(
                        rs.getString("first_youtube_playlist_id"),
                        artist.youtubeId,
                        rs.getString("first_name"),
                        rs.getInt("first_release_year"),
                )
                latestAlbum = Album(
                        rs.getString("latest_youtube_playlist_id"),
                        artist.youtubeId,
                        rs.getString("latest_name"),
                        rs.getInt("latest_release_year"),
                )
            } else {
                firstAlbum = null
                latestAlbum = null
            }
            ArtistView(artist, albumCount, firstAlbum, latestAlbum)
        }
    }

    override fun queryArtist(youtubeId: String): BigArtistView {
        val sql = """
            SELECT artist.youtube_id, artist.name as artist_name, 
                album.youtube_playlist_id, album.name as album_name, album.release_year
            FROM artist
            LEFT JOIN album
            ON artist.youtube_id = album.artist_youtube_id
            WHERE artist.youtube_id = ?
            ORDER BY album.release_year
        """.trimIndent()
        val data = jdbcTemplate.query(sql, { rs, _ ->
            val albumName: String? = rs.getString("album_name")
            IntermediateAlbum(
                    Artist(rs.getString("youtube_id"), rs.getString("artist_name")),
                    if(albumName == null) null else Album(rs.getString("youtube_playlist_id"), rs.getString("youtube_id"), albumName, rs.getInt("release_year"))
            )
        }, youtubeId)
        if (data.size == 0) {
            throw NoSuchElementException("Could not find artist: $youtubeId")
        }
        val artist = data[0].artist
        val albumViews = mutableListOf<AlbumView>()
        for (album in data) {
            if (album.album != null) {
                albumViews.add(AlbumView(album.album))
            }
        }
        return BigArtistView(artist, albumViews)
    }

    private data class IntermediateAlbum(
            val artist: Artist,
            val album: Album?
    )
}
