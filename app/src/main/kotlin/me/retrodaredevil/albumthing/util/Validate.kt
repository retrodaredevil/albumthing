package me.retrodaredevil.albumthing.util

import me.retrodaredevil.albumthing.exception.ValidationException
import java.nio.file.Paths
import java.util.Base64


private fun requireValidBase64(text: String) {
    try {
        Base64.getUrlDecoder().decode(text)
    } catch (ex: IllegalArgumentException) {
        throw ValidationException("Invalid base64 data! text: $text")
    }
}
private fun requireLengthAtLeast(text: String, length: Int) {
    if (text.length < length) {
        throw ValidationException("too small! text: $text")
    }
}

/** Requires a valid channel ID or a valid topic ID */
fun requireValidChannelId(channelId: String) {
    requireLengthAtLeast(channelId, 11)
    requireValidBase64(channelId)
}
fun requireValidPlaylistId(playlistId: String) {
    requireLengthAtLeast(playlistId, 11)
    requireValidBase64(playlistId)
}
fun requireValidVideoId(videoId: String) {
    requireLengthAtLeast(videoId, 11)
    requireValidBase64(videoId)
}
fun requireValidFilePath(filePath: String) {
    val path = Paths.get(filePath)
    if (!path.isAbsolute) {
        throw ValidationException("path must be absolute! filePath: $filePath")
    }
    if (path.normalize() != path) {
        // Cannot have .. or . in path
        throw ValidationException("path must already be normalized! filePath: $filePath")
    }
}
fun requireValidDisplayName(name: String) {
    if (name.isBlank()) {
        throw ValidationException("name cannot be blank! name: '$name'")
    }
}
