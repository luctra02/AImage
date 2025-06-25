package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.service.AuthService
import org.springframework.web.bind.annotation.*

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
    fun login(@RequestBody request: LoginRequest): Map<String, String> {
        return authService.login(request.email, request.password)
    }
}
