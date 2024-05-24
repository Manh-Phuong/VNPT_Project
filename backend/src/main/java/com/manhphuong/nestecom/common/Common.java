package com.manhphuong.nestecom.common;

import com.manhphuong.nestecom.exception.ApiException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;

import com.manhphuong.nestecom.model.UserInfo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

public class Common {
    public static String uuid() {
        String uuidString = UUID.randomUUID().toString();
        if (uuidString.length() > 40) {
            return uuidString.substring(0, 40);
        } else {
            return uuidString;
        }
//        return UUID.randomUUID().toString();
    }

    public static String subString(String str, int len) {
        if (str == null) return null;
        return str.substring(0, Math.min(len, str.length()));
    }

    public static String toUpperCase(String s) {
        if (s == null) return null;
        return s.toUpperCase();
    }

    public static String toLowerCase(String s) {
        if (s == null) return null;
        return s.toLowerCase();
    }

    public static Date currentTime() {
        return Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
    }

    public static LocalDateTime currentDateTime() {
        return LocalDateTime.now();
    }

    public static String generateRandomCode(int size) {
        return RandomStringUtils.randomNumeric(size);
    }

    public static UserInfo getUserInfoLogin(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                return getUserInfo(authorizationHeader);
            } catch (Exception e) {
                throw new ApiException("FS-00-401", HttpStatus.UNAUTHORIZED, e.getMessage());
            }
        } else {
            System.out.println("Missing Bearer token");
        }

        return null;
    }

    public static Claims decodeJwtToken(String token) {
        String[] splitToken = token.split("\\.");
        String unsignedToken = splitToken[0] + "." + splitToken[1] + ".";

        Claims claims = Jwts.parser()
                .parseClaimsJwt(unsignedToken)
                .getBody();

        return claims;
    }

    public static UserInfo getUserInfo(String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Map<String, Object> claims = decodeJwtToken(token);
        System.out.println(claims.toString());
        UserInfo userInfo = new UserInfo();

//        String sub = (String) claims.get("sub");
//        String preferred_username = (String) claims.get("preferred_username");
//        String given_name = (String) claims.get("given_name");
//        String name = (String) claims.get("name");
//        String family_name = (String) claims.get("family_name");
        String email = (String) claims.get("email");
        String userId = (String) claims.get("sub");

//        return null;

        return userInfo.builder()
                .email(email)
                .userId(userId)
                .build();
    }

    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}
