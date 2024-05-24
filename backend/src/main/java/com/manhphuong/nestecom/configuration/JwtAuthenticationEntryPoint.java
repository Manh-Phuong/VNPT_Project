package com.manhphuong.nestecom.configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.manhphuong.nestecom.common.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
//        ApiResponse<?> apiResponse = ApiResponse.error("401", HttpStatus.UNAUTHORIZED, "Unauthenticated");
//        ObjectMapper objectMapper = new ObjectMapper();
//        System.out.println("authException: " + authException);
//
//        response.setContentType("application/json");
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.getOutputStream().println("{ \"error\": \"Unauthorized\", \"message\": \"" + authException.getMessage() + "\" }");
//
//        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
//        response.flushBuffer();

        ApiResponse<?> apiResponse = ApiResponse.error("401", HttpStatus.UNAUTHORIZED, "Unauthenticated");
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println("authException: " + authException);

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}