package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.model.Album
import org.springframework.data.repository.CrudRepository

interface AlbumRepository : CrudRepository<Album, String> {
}