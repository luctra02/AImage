package com.luctra.aimage_backend.config

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
class CorsConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") // Allow all endpoints
            .allowedOrigins("http://localhost:3000") // Allow local and production frontend URLs
            .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") // Allow necessary HTTP methods
            .allowCredentials(true); // Allow credentials if needed
    }
}
