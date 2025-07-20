package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.service.AuthService
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletResponse

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
        val token = authService.login(request)

        // Set cookie
        val cookie = Cookie("jwt", token)
        cookie.isHttpOnly = true
        cookie.secure = true // use only with HTTPS in production
        cookie.path = "/"
        cookie.maxAge = 24 * 60 * 60 // 1 day

        response.addCookie(cookie)

        return ResponseEntity.ok("Login successful")
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
