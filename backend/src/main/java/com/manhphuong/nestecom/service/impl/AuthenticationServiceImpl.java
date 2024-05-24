package com.manhphuong.nestecom.service.impl;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.dto.request.auth.*;
import com.manhphuong.nestecom.dto.request.user.RegisterUserDtoRequest;
import com.manhphuong.nestecom.dto.response.auth.AuthenticationResponse;
import com.manhphuong.nestecom.dto.response.auth.IntrospectResponse;
import com.manhphuong.nestecom.dto.response.user.RegisterUserDtoResponse;
import com.manhphuong.nestecom.dto.response.user.UserInfoDtoResponse;
import com.manhphuong.nestecom.entity.InvalidatedToken;
import com.manhphuong.nestecom.entity.Role;
import com.manhphuong.nestecom.entity.User;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.model.MailStructure;
import com.manhphuong.nestecom.repository.InvalidatedTokenRepository;
import com.manhphuong.nestecom.repository.RoleRepository;
import com.manhphuong.nestecom.repository.UserRepository;
import com.manhphuong.nestecom.service.AuthenticationService;
import com.manhphuong.nestecom.service.MailService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final MailService mailService;
    private final StringRedisTemplate redisTemplate;
    private static final String LOGOUT_TOKEN_PREFIX = "logoutToken-";
//    private final PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @Override
    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token);
        } catch (ApiException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    @Override
    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByEmail(request.getUsername())
                .orElseThrow(() -> new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "user not found"));

        boolean authenticated = passwordEncoder.matches(request.getPassword(),
                user.getPassword());

        if (!authenticated)
            throw new ApiException("FS-GET-401", HttpStatus.UNAUTHORIZED, "Unauthenticated");

        var token = generateToken(user);
        System.out.println("user: " + user.toString());
        System.out.println("Common.currentTime()" + Common.currentTime());
        userRepository.updateLastLogin(user.getUuidUser(), Common.currentTime());

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    @Override
    @Transactional
    public RegisterUserDtoResponse registerUser(RegisterUserDtoRequest registerUserDtoRequest) {
        // Kiểm tra xem email đã tồn tại hay chưa
        Optional<User> existingUser = userRepository.findByEmail(registerUserDtoRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new ApiException("U-POST-409", HttpStatus.CONFLICT, "Email already exists");
        }

        String activeCode = Common.generateRandomCode(6);
        String emailSubject = "Email notification of account registration confirmation code";
        String emailMessage = "The confirmation code of the VNPT-EnestEcom e-commerce system is " + activeCode;
        User user = userRepository.save(User.builder()
                .email(registerUserDtoRequest.getEmail())
                .password(Common.passwordEncoder().encode(registerUserDtoRequest.getPassword()))
                .firstName(registerUserDtoRequest.getFirstName())
                .middleName(registerUserDtoRequest.getMiddleName())
                .lastName(registerUserDtoRequest.getLastName())
                .activationCode(activeCode)
                .build());

        mailService.sendEmail(registerUserDtoRequest.getEmail(), MailStructure.builder()
                .subject(emailSubject)
                .message(emailMessage)
                .build());
        return RegisterUserDtoResponse.from(user);
    }

    @Override
    @Transactional
    public UserInfoDtoResponse verifyCodeUser(VerifyCodeUserDtoRequest verifyCodeUserDtoRequest) {
        User user = this.userRepository.findById(verifyCodeUserDtoRequest.getUuidUser()).orElseThrow(() ->
                new ApiException("U-POST-404", HttpStatus.NOT_FOUND, "user not found"));
        if(verifyCodeUserDtoRequest.getActivationCode().equals(user.getActivationCode())) {
            int userActive = this.userRepository.verifySuccess(verifyCodeUserDtoRequest.getUuidUser());
            User userActiveResponse = null;
            if (userActive != 0) {
                userActiveResponse = this.userRepository.findById(verifyCodeUserDtoRequest.getUuidUser()).orElseThrow(() ->
                        new ApiException("U-POST-404", HttpStatus.NOT_FOUND, "user not found"));
            }
            return UserInfoDtoResponse.from(userActiveResponse);
        } else {
            if (user.getVerifyError() >= 4) {
                String activeCode = Common.generateRandomCode(6);
                String emailSubject = "Email notification of account registration confirmation code";
                String emailMessage = "The confirmation code of the VNPT-EnestEcom e-commerce system is " + activeCode;
                this.userRepository.regenerateActivationCode(verifyCodeUserDtoRequest.getUuidUser(), activeCode);

                mailService.sendEmail(user.getEmail(), MailStructure.builder()
                        .subject(emailSubject)
                        .message(emailMessage)
                        .build());
            }
            else {
                this.userRepository.updateVerifyError(verifyCodeUserDtoRequest.getUuidUser(), user.getVerifyError() + 1);
            }
            return null;
        }
    }


//    @Override
//    public void logout(LogoutRequest request) throws ParseException, JOSEException {
//        var signToken = verifyToken(request.getToken());
//
//        String jit = signToken.getJWTClaimsSet().getJWTID();
//        Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
//
//        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
//                .id(jit)
//                .expiryTime(expiryTime)
//                .build();
//
//        redisTemplate.opsForValue().set("logoutToken-" + jit, "true", expiryTime, TimeUnit.MILLISECONDS);
//
//        invalidatedTokenRepository.save(invalidatedToken);
//    }


    @Override
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        var signToken = verifyToken(request.getToken());

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

        // Tính toán thời gian tồn tại (TTL) từ thời điểm hiện tại đến thời điểm hết hạn
        long currentTimeMillis = System.currentTimeMillis();
        long expiryTimeMillis = expiryTime.getTime();
        long ttl = expiryTimeMillis - currentTimeMillis;

        if (ttl > 0) {
            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();

            log.info("thong tin ttl: " + ttl);

            // Lưu token bị logout vào Redis với TTL tính bằng milliseconds
            redisTemplate.opsForValue().set(LOGOUT_TOKEN_PREFIX + jit, "true", ttl, TimeUnit.MILLISECONDS);

            invalidatedTokenRepository.save(invalidatedToken);
        } else {
            // Token đã hết hạn, không cần lưu vào Redis
            throw new ApiException("AS-400", HttpStatus.BAD_REQUEST, "Token đã hết hạn");
        }
    }

    @Override
    public AuthenticationResponse refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {
        var signedJWT = verifyToken(request.getToken());

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);

        var username = signedJWT.getJWTClaimsSet().getSubject();

        var user = userRepository.findByEmail(username).orElseThrow(
                () -> new ApiException("FS-GET-401", HttpStatus.UNAUTHORIZED, "Unauthenticated")
        );

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    @Override
    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUuidUser())
                .issuer("manhphuong")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(7, ChronoUnit.DAYS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .claim("email", user.getEmail())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        if(token == null) {
            log.error("verifyToken error");
            return null;
        }

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new ApiException("FS-GET-401", HttpStatus.UNAUTHORIZED, "Unauthenticated");

//        if (invalidatedTokenRepository
//                .existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
//            throw new ApiException("FS-GET-401", HttpStatus.UNAUTHORIZED, "Unauthenticated");
//        }

//        boolean isLogout = redisTemplate.hasKey(LOGOUT_TOKEN_PREFIX + signedJWT.getJWTClaimsSet().getJWTID());

        boolean isLogout =false;
        System.out.println("signedJWT.getJWTClaimsSet().getJWTID(): " + signedJWT.getJWTClaimsSet().getJWTID());
        try {
            isLogout = redisTemplate.hasKey(LOGOUT_TOKEN_PREFIX + signedJWT.getJWTClaimsSet().getJWTID());
        } catch (Exception e) {
            log.error("Error accessing Redis: " + e.getMessage());
            isLogout = false; // Assume token is not logged out if there's an error accessing Redis
        }

        if (isLogout) {
            throw new ApiException("FS-GET-401", HttpStatus.UNAUTHORIZED, "Unauthenticated");
        }


        return signedJWT;
    }

    @Override
    public String buildScope(User user){
        StringJoiner stringJoiner = new StringJoiner(" ");
        List<Role> roles = roleRepository.getListRoleUser(user.getUuidUser());

        if (!CollectionUtils.isEmpty(roles))
            roles.forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
//                if (!CollectionUtils.isEmpty(role.getPermissions()))
//                    role.getPermissions()
//                            .forEach(permission -> stringJoiner.add(permission.getName()));
            });

        return stringJoiner.toString();
    }

}