package com.luctra.aimage_backend.model

import jakarta.persistence.*

@Entity
@Table(name = "liked_images")
data class LikedImage(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val imageUrl: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
)