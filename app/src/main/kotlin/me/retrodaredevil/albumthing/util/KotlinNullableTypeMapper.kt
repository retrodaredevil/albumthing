package me.retrodaredevil.albumthing.util

import graphql.schema.GraphQLInputType
import graphql.schema.GraphQLNonNull
import graphql.schema.GraphQLOutputType
import io.leangen.graphql.generator.mapping.TypeMapper
import io.leangen.graphql.generator.mapping.TypeMappingEnvironment
import io.leangen.graphql.metadata.TypedElement
import java.lang.reflect.AnnotatedElement
import java.lang.reflect.AnnotatedType
import java.lang.reflect.Field
import kotlin.reflect.jvm.kotlinProperty


/**
 * Credit to https://github.com/leangen/graphql-spqr/issues/392#issuecomment-823605434
 */
class KotlinNullableTypeMapper : TypeMapper {
    override fun toGraphQLType(
            javaType: AnnotatedType,
            mappersToSkip: MutableSet<Class<out TypeMapper>>,
            env: TypeMappingEnvironment
    ): GraphQLOutputType {
        mappersToSkip.add(this.javaClass)
        val inner = env.operationMapper.toGraphQLType(javaType, mappersToSkip, env)
        val nullable = isNullable(env)
        return if (!nullable) {
            GraphQLNonNull(inner)
        } else inner
    }

    override fun toGraphQLInputType(
            javaType: AnnotatedType,
            mappersToSkip: MutableSet<Class<out TypeMapper>>,
            env: TypeMappingEnvironment
    ): GraphQLInputType {
        mappersToSkip.add(this.javaClass)
        val inner = env.operationMapper.toGraphQLInputType(javaType, mappersToSkip, env)
        val nullable = isNullable(env)
        return if (!nullable) {
            GraphQLNonNull(inner)
        } else inner
    }

    private fun isNullable(
            env: TypeMappingEnvironment,
    ): Boolean {
        val elements = env.rootElement.elements
        val field = elements.first { it is Field } as Field
        val kotlinProperty = field.kotlinProperty
        return kotlinProperty?.returnType?.isMarkedNullable.let { it != null && it }
    }

    override fun supports(element: AnnotatedElement, type: AnnotatedType): Boolean {
        return if (element is TypedElement) {
            (emptyList<AnnotatedElement>() + element.elements).firstOrNull { it is Field } != null
        } else {
            false
        }
    }
}
