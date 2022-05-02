package me.retrodaredevil.albumthing.model

data class Album(
        val youtubePlaylistId: String,
        /** The artist's youtubeId. References [Artist#youtubeId]*/
        val artistYoutubeId: String,
        val name: String,
        val releaseYear: Int,
)