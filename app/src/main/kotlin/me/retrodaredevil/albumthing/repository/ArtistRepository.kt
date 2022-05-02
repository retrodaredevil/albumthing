package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.view.ArtistView

//interface ArtistRepository : Repository<Artist, String> {
interface ArtistRepository {
    fun save(artist: Artist)
    fun listArtists(): List<ArtistView>
}