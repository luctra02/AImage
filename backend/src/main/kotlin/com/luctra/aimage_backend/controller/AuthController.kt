package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.service.AuthService
import jakarta.servlet.http.Cookie
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    data class SignupRequest(val email: String, val password: String, val confirmPassword: String, val name: String?)
    data class LoginRequest(val email: String, val password: String)

    @PostMapping("/signup")
    fun signup(@RequestBody request: SignupRequest): Map<String, String> {
        return authService.signup(request)
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest, response: HttpServletResponse): ResponseEntity<String> {
        return try {
            val token = authService.login(request.email, request.password)
            val cookie = Cookie("jwt", token)
            cookie.isHttpOnly = true
            cookie.secure = false // set to true in production with HTTPS
            cookie.path = "/"
            cookie.maxAge = 24 * 60 * 60 // 1 day
            response.addCookie(cookie)
            ResponseEntity.ok("Login successful")
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(401).body("Invalid email or password")
        }
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<String> {
        val cookie = Cookie("jwt", "")
        cookie.isHttpOnly = true
        cookie.path = "/"
        cookie.maxAge = 0 // This deletes the cookie

        response.addCookie(cookie)
        return ResponseEntity.ok("Logged out successfully")
    }
}
