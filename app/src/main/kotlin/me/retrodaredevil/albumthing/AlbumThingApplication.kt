package me.retrodaredevil.albumthing

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class AlbumThingApplication {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(AlbumThingApplication::class.java, *args)
        }
    }
}