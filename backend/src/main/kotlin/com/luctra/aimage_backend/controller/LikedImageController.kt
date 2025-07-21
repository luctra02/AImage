package com.luctra.aimage_backend.controller

import com.luctra.aimage_backend.model.User
import com.luctra.aimage_backend.repository.UserRepository
import com.luctra.aimage_backend.service.LikedImageService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/liked-images")
class LikedImageController(
    private val likedImageService: LikedImageService,
    private val userRepository: UserRepository
) {
    data class LikedImageRequest(val imageUrl: String)

    private fun getCurrentUser(principal: UserDetails): User {
        return userRepository.findByEmail(principal.username)
            ?: throw RuntimeException("User not found")
    }

    @PostMapping
    fun addLikedImage(
        @AuthenticationPrincipal principal: UserDetails,
        @RequestBody request: LikedImageRequest
    ): LikedImageService.LikedImageDto {
        val user = getCurrentUser(principal)
        return likedImageService.addLikedImage(user, request.imageUrl)
    }

    @DeleteMapping
    fun removeLikedImage(
        @AuthenticationPrincipal principal: UserDetails,
        @RequestBody request: LikedImageRequest
    ) {
        val user = getCurrentUser(principal)
        likedImageService.removeLikedImage(user, request.imageUrl)
    }

    @GetMapping
    fun getLikedImages(
        @AuthenticationPrincipal principal: UserDetails
    ): List<LikedImageService.LikedImageDto> {
        val user = getCurrentUser(principal)
        return likedImageService.getLikedImagesForUser(user)
    }
} 