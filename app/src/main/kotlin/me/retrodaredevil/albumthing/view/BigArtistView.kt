package me.retrodaredevil.albumthing.view

import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist


data class NestedAlbumView(
        val album: Album,
        // TODO eventually have download records here
)

data class BigArtistView(
        val artist: Artist,
        val albumViews: List<NestedAlbumView>
)
