package com.luctra.aimage_backend.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*

@Service
class JwtService (
    @Value("\${spring.jwt.secret}")
    private val secret: String,

    @Value("\${spring.jwt.expiration-ms}")
    private val expirationMs: Long
){

    private val algorithm = Algorithm.HMAC256(secret)

    fun generateToken(email: String): String {
        return JWT.create()
            .withSubject(email)
            .withIssuedAt(Date())
            .withExpiresAt(Date(System.currentTimeMillis() + expirationMs))
            .sign(algorithm)
    }

    fun validateToken(token: String): Boolean {
        return try {
            val verifier = JWT.require(algorithm).build()
            verifier.verify(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun extractEmail(token: String): String? {
        return try {
            val verifier = JWT.require(algorithm).build()
            val decodedJWT = verifier.verify(token)
            decodedJWT.subject
        } catch (e: JWTVerificationException) {
            null
        }
    }
}
