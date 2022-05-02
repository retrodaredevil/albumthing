package me.retrodaredevil.albumthing.view

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist

data class ArtistView(
        val artist: Artist,
        val albumCount: Int,
        val firstAlbum: Album?,
        val latestAlbum: Album?,
)