package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.dto.request.auth.*;
import com.manhphuong.nestecom.dto.request.user.RegisterUserDtoRequest;
import com.manhphuong.nestecom.dto.response.auth.AuthenticationResponse;
import com.manhphuong.nestecom.dto.response.auth.IntrospectResponse;
import com.manhphuong.nestecom.dto.response.user.RegisterUserDtoResponse;
import com.manhphuong.nestecom.dto.response.user.UserInfoDtoResponse;
import com.manhphuong.nestecom.entity.User;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;

public interface AuthenticationService {
    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
    AuthenticationResponse authenticate(AuthenticationRequest request);
    RegisterUserDtoResponse registerUser(RegisterUserDtoRequest registerUserDtoRequest);
    UserInfoDtoResponse verifyCodeUser(VerifyCodeUserDtoRequest verifyCodeUserDtoRequest);
    void logout(LogoutRequest request) throws ParseException, JOSEException;
    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
    String generateToken(User user);
    SignedJWT verifyToken(String token) throws JOSEException, ParseException;
    String buildScope(User user);

}
