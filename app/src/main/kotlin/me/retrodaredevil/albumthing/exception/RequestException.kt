package me.retrodaredevil.albumthing.exception

/**
 * An exception used to indicate there was a problem with something user requested
 */
abstract class RequestException : RuntimeException {
    protected constructor() : super()
    protected constructor(message: String?) : super(message)
    protected constructor(message: String?, cause: Throwable?) : super(message, cause)
    protected constructor(cause: Throwable?) : super(cause)
}
