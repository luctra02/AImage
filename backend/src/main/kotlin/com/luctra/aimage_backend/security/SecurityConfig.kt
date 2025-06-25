package com.luctra.aimage_backend.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // You can re-enable with tokens later
            .authorizeHttpRequests {
                it.requestMatchers("/api/auth/**").permitAll() // ✅ Allow login/signup
                it.anyRequest().authenticated() // All other requests require login
            }

        return http.build()
    }
}
