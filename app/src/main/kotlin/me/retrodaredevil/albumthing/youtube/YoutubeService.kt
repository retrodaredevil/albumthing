package me.retrodaredevil.albumthing.youtube

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.JsonFactory
import com.google.api.client.json.gson.GsonFactory
import com.google.api.services.youtube.YouTube
import com.google.api.services.youtube.YouTubeScopes
import com.google.auth.oauth2.GoogleCredentials
import org.springframework.stereotype.Service
import java.io.*
import java.security.GeneralSecurityException
import java.time.Instant
import java.time.ZoneId


@Service("youtubeService")
class YoutubeService {
    companion object {
        private val JSON_FACTORY: JsonFactory = GsonFactory.getDefaultInstance()
    }


    /**
     * Create an authorized Credential object.
     *
     * @return an authorized Credential object.
     * @throws IOException
     */
    @Throws(IOException::class)
    fun authorize(httpTransport: NetHttpTransport): Credential {
        // might need this later: https://stackoverflow.com/questions/65816603/how-to-generate-client-secret-json-for-google-api-with-offline-access

        // Load client secrets.
//        val input: InputStream = this.javaClass.getResourceAsStream("client_secret.json")!!
        val input: InputStream = FileInputStream(File("client_secret.json"))
        /*
        val clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, InputStreamReader(input))!!
        // Build flow and trigger user authorization request.
        val flow = GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, clientSecrets, listOf(YouTubeScopes.YOUTUBE_READONLY))
                .build()
        return AuthorizationCodeInstalledApp(flow, LocalServerReceiver()).authorize("user")
         */
//        val credentials: GoogleCredentials = GoogleCredentials.fromStream(FileInputStream("/path/to/credentials.json"))


        return GoogleCredential.fromStream(input)
                .createScoped(setOf(YouTubeScopes.YOUTUBE_READONLY))
    }

    @Throws(GeneralSecurityException::class, IOException::class)
    private fun getService(): YouTube {
        val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
        val credential: Credential = authorize(httpTransport)
        return YouTube.Builder(httpTransport, JSON_FACTORY, credential)
                .setApplicationName("AlbumThing")
                .build()
    }

    fun getChannelName(channelId: String): String {
//        val request = getService().channels().list(listOf("localizations", "snippet")).setId(listOf(channelId))
        val request = getService().channels().list(listOf("snippet")).setId(listOf(channelId))
        val response = request.execute()!!
        val channel = response.items.first { it.id == channelId }
//        val title = channel.localizations["en"]!!.title
        val title = channel.snippet.localized.title
        if (!title.endsWith(" - Topic")) {
            throw IllegalStateException("Got a title we don't know how to handle! title: $title")
        }
        return title.substring(0, title.length - " - Topic".length)
    }

    fun getPlaylistName(playlistId: String): String {
        val request = getService().playlists().list(listOf("snippet")).setId(listOf(playlistId))
        val response = request.execute()!!
        val playlist = response.items.first { it.id == playlistId }
        println(playlist.snippet)
//        val releaseYear = Instant.ofEpochMilli(playlist.snippet.publishedAt.value).atZone(ZoneId.systemDefault()).year
        val title = playlist.snippet.title
        if (!title.startsWith("Album - ")) {
            throw IllegalStateException("got a title we don't know how to handle! title: $title")
        }
        return title.substring("Album - ".length)
    }
}
