package com.manhphuong.nestecom.exception;

import com.manhphuong.nestecom.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ApiExceptionHandler {
    private ResponseEntity<Object> responseEntity(String errorCode, HttpStatusCode statusCode, String msg) {
        return new ResponseEntity<>(
                ApiResponse.builder()
                        .errorCode(errorCode)
                        .statusCode(statusCode.value())
                        .message(msg)
                        .build(),
                statusCode);
    }

    @ExceptionHandler
    public ResponseEntity<?> handleCommonException(ApiException e){
        log.error(String.format("Common error: %s %s %s", e.getErrorCode(), e.getHttpStatus(),e.getMessage()));
        return  responseEntity(e.getErrorCode(), e.getHttpStatus(), e.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<?> handleJwtException(JwtException e) {
        // Log the exception if needed
        return responseEntity("401", HttpStatus.UNAUTHORIZED, "Token invalid");
    }

//    @ExceptionHandler(AuthenticationServiceException.class)
//    public ResponseEntity<String> handleAuthenticationServiceException(AuthenticationServiceException ex) {
//        // Log the exception if needed
//        return new ResponseEntity<>("Authentication service exception: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
//    }
//
//    @ExceptionHandler(AuthenticationException.class)
//    public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex) {
//        // Log the exception if needed
//        return new ResponseEntity<>("Authentication exception: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
//    }


}
