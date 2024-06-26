package com.manhphuong.nestecom.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOrigin("http://localhost:5173"); // Cho phép truy cập từ origin này
        corsConfig.addAllowedMethod("*"); // Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, vv)
        corsConfig.addAllowedHeader("*"); // Cho phép tất cả các tiêu đề HTTP

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }
}
