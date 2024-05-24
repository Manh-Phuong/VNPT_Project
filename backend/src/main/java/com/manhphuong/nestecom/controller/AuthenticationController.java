package com.manhphuong.nestecom.controller;

import com.manhphuong.nestecom.common.controller.AbstractResponseController;
import com.manhphuong.nestecom.common.response.ApiResponse;
import com.manhphuong.nestecom.dto.request.auth.*;
import com.manhphuong.nestecom.dto.request.user.RegisterUserDtoRequest;
import com.manhphuong.nestecom.dto.response.auth.AuthenticationResponse;
import com.manhphuong.nestecom.dto.response.auth.IntrospectResponse;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Auth")
public class AuthenticationController  extends AbstractResponseController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        return responseEntity(() ->  authenticationService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDtoRequest registerUserDtoRequest) {
        return responseEntity(() ->  authenticationService.registerUser(registerUserDtoRequest));
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCodeUser(@RequestBody VerifyCodeUserDtoRequest verifyCodeUserDtoRequest) {
        if(authenticationService.verifyCodeUser(verifyCodeUserDtoRequest) != null) {
            return responseEntity(() ->  authenticationService.verifyCodeUser(verifyCodeUserDtoRequest));
        } else{
            throw new ApiException("U-POST-400", HttpStatus.BAD_REQUEST, "active code is wrong");
        }
    }

//
//    @PostMapping("/token")
//    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
//        var result = authenticationService.authenticate(request);
//        return ApiResponse.<AuthenticationResponse>builder()
//                .object(result)
//                .build();
//    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .statusCode(200)
                .message("Success")
                .data(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refreshToken(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .statusCode(200)
                .message("Success")
                .data(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .statusCode(200)
                .message("Success")
                .build();
    }
}
