package me.retrodaredevil.albumthing

import com.fasterxml.jackson.databind.ObjectMapper
import graphql.GraphQL
import io.leangen.graphql.GraphQLSchemaGenerator
import io.leangen.graphql.metadata.strategy.query.AnnotatedResolverBuilder
import io.leangen.graphql.metadata.strategy.query.ResolverBuilder
import io.leangen.graphql.metadata.strategy.value.jackson.JacksonValueMapperFactory
import me.retrodaredevil.albumthing.repository.AlbumRepository
import me.retrodaredevil.albumthing.repository.ArtistRepository
import me.retrodaredevil.albumthing.repository.DownloadLocationRepository
import me.retrodaredevil.albumthing.service.SimpleGraphQLService
import me.retrodaredevil.albumthing.util.KotlinNullableTypeMapper
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.time.ZoneId
import javax.annotation.PostConstruct

@Component
class GraphQLProvider(
//        private val jdbcTemplate: NamedParameterJdbcTemplate
        private val artistRepository: ArtistRepository,
        private val albumRepository: AlbumRepository,
        private val downloadLocationRepository: DownloadLocationRepository,
) {
    private lateinit var graphQL: GraphQL

    @PostConstruct
    fun init() {
        val objectMapper = ObjectMapper()

        val jacksonValueMapperFactory = JacksonValueMapperFactory.builder()
                .withPrototype(objectMapper)
                .build()
        val resolverBuilder: ResolverBuilder = AnnotatedResolverBuilder()
        val zoneId = ZoneId.systemDefault() // In the future, we could make this customizable, but like, bro just make sure your system time is correct


        val schemaGenerator = GraphQLSchemaGenerator()
                .withBasePackages("me.retrodaredevil.albumthing")
                .withOperationsFromSingleton(SimpleGraphQLService(artistRepository, albumRepository, downloadLocationRepository))
                .withValueMapperFactory(jacksonValueMapperFactory)
                .withTypeMappers(KotlinNullableTypeMapper())
                .withResolverBuilders(resolverBuilder)

        graphQL = GraphQL.newGraphQL(schemaGenerator.generate()).build()
    }
    @Bean
    fun graphQL() = graphQL
}
