package me.retrodaredevil.albumthing.service

import io.leangen.graphql.annotations.GraphQLMutation
import io.leangen.graphql.annotations.GraphQLQuery
import me.retrodaredevil.albumthing.TestConstants
import me.retrodaredevil.albumthing.model.Album
import me.retrodaredevil.albumthing.model.Artist
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.view.ArtistView

class SimpleGraphQLService(
        private val artistRepository: ArtistRepository
) {

    @GraphQLQuery
    fun queryMilli(): Int {
        return (System.currentTimeMillis() % 1000).toInt()
    }
    @GraphQLQuery
    fun listArtists(): List<ArtistView> {
        return artistRepository.listArtists()
//        return listOf(
//                ArtistView(
//                        Artist(TestConstants.CHANNEL_ID_AVANTASIA, "Avantasia"),
//                        10,
//                        Album(
//                                TestConstants.PLAYLIST_ID_AVANTASIA_THE_METAL_OPERA_PT_1,
//                                TestConstants.CHANNEL_ID_AVANTASIA,
//                                "The Metal Opera Pt. I",
//                                2001
//                        ),
//                        Album(
//                                TestConstants.PLAYLIST_ID_AVANTASIA_MOONGLOW,
//                                TestConstants.CHANNEL_ID_AVANTASIA,
//                                "Moonglow",
//                                2019
//                        ),
//                )
//        )
    }


    @GraphQLMutation
    fun addArtist(youtubeId: String, name: String) {
        // TODO make name optional
        println("Adding $youtubeId $name")
        // TODO add validation to youtubeId and name
        artistRepository.save(Artist(youtubeId, name))
    }
}
