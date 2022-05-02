package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.model.Artist

//interface ArtistRepository : Repository<Artist, String> {
interface ArtistRepository {
    fun save(artist: Artist)
}