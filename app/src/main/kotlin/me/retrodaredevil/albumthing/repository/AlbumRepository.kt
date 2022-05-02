package me.retrodaredevil.albumthing.repository

import me.retrodaredevil.albumthing.model.Album

interface AlbumRepository {
    fun save(album: Album)
}