package br.com.peer.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // desativa CSRF (ok para APIs públicas ou testes locais)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // permite tudo sem autenticação
                );
        return http.build();
    }
}
