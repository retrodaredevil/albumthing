package me.retrodaredevil.albumthing.exception

/**
 * An exception to indicate the user has provided invalid input
 */
class ValidationException : RequestException {
    constructor() : super()
    constructor(message: String?) : super(message)
    constructor(message: String?, cause: Throwable?) : super(message, cause)
    constructor(cause: Throwable?) : super(cause)
}
