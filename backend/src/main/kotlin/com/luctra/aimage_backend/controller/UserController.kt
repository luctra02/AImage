package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.model.User
import com.luctra.aimage_backend.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class UserProfileResponse(
    val email: String,
    val name: String?,
    val profilePicture: String?
)

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userRepository: UserRepository
) {

    @GetMapping("/profile")
    fun getProfile(@AuthenticationPrincipal principal: UserDetails): UserProfileResponse {
        val user: User = userRepository.findByEmail(principal.username)
            ?: throw RuntimeException("User not found")

        return UserProfileResponse(
            email = user.email,
            name = user.name,
            profilePicture = user.profilePicture
        )
    }
}
