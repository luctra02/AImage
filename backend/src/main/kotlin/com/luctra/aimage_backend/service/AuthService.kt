package com.luctra.aimage_backend.service

import com.luctra.aimage_backend.model.User
import com.luctra.aimage_backend.repository.UserRepository
import com.luctra.aimage_backend.controller.AuthController
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun signup(request: AuthController.SignupRequest): Map<String, String> {
        if (userRepository.findByEmail(request.email) != null) {
            return mapOf("error" to "Email already in use")
        }

        if (request.password != request.confirmPassword) {
            return mapOf("error" to "Passwords do not match")
        }

        val hashedPassword = passwordEncoder.encode(request.password)

        val user = User(email = request.email, password = hashedPassword, name = request.name)
        userRepository.save(user)

        return mapOf("message" to "Signup successful")
    }
}
