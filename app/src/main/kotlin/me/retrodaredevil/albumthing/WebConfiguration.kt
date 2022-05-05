package me.retrodaredevil.albumthing

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
open class WebConfiguration : WebMvcConfigurer {
    // thanks https://stackoverflow.com/a/42998817/5434860
    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/{spring:[a-zA-Z0-9-_]+}")
                .setViewName("forward:/")
    }
}
