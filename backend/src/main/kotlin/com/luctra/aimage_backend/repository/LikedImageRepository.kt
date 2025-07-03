package com.luctra.aimage_backend.repository


import com.luctra.aimage_backend.model.LikedImage
import com.luctra.aimage_backend.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface LikedImageRepository : JpaRepository<LikedImage, Long> {
    fun findAllByUser(user: User): List<LikedImage>
}
