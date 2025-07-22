package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.model.User
import com.luctra.aimage_backend.repository.UserRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import com.luctra.aimage_backend.service.AuthService

data class UserProfileResponse(
    val email: String,
    val name: String?,
    val profilePicture: String?
)

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userRepository: UserRepository,
    private val authService: AuthService
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

    data class ProfilePictureRequest(val profilePictureUrl: String)
    data class ProfilePictureResponse(val profilePictureUrl: String)

    @PutMapping("/profile-picture")
    fun updateProfilePicture(
        @AuthenticationPrincipal principal: UserDetails,
        @RequestBody request: ProfilePictureRequest
    ): ProfilePictureResponse {
        val user: User = userRepository.findByEmail(principal.username)
            ?: throw RuntimeException("User not found")
        val updatedUser = authService.updateProfilePicture(user, request.profilePictureUrl)
        return ProfilePictureResponse(profilePictureUrl = updatedUser.profilePicture ?: "")
    }
}
