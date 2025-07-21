package com.luctra.aimage_backend.service

import com.luctra.aimage_backend.model.LikedImage
import com.luctra.aimage_backend.model.User
import com.luctra.aimage_backend.repository.LikedImageRepository
import com.luctra.aimage_backend.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class LikedImageService(
    private val likedImageRepository: LikedImageRepository,
    private val userRepository: UserRepository
) {
    data class LikedImageDto(val id: Long, val imageUrl: String)

    @Transactional
    fun addLikedImage(user: User, imageUrl: String): LikedImageDto {
        // Prevent duplicate likes
        if (likedImageRepository.findAllByUser(user).any { it.imageUrl == imageUrl }) {
            throw IllegalArgumentException("Image already liked")
        }
        val likedImage = likedImageRepository.save(LikedImage(imageUrl = imageUrl, user = user))
        return LikedImageDto(likedImage.id, likedImage.imageUrl)
    }

    @Transactional
    fun removeLikedImage(user: User, imageUrl: String) {
        val likedImage = likedImageRepository.findAllByUser(user).find { it.imageUrl == imageUrl }
            ?: throw IllegalArgumentException("Liked image not found")
        likedImageRepository.delete(likedImage)
    }

    fun getLikedImagesForUser(user: User): List<LikedImageDto> {
        return likedImageRepository.findAllByUser(user).map { LikedImageDto(it.id, it.imageUrl) }
    }
} 