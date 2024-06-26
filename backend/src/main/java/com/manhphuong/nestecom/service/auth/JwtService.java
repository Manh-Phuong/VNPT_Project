//package com.manhphuong.folderservice.service.auth;
//
//import com.manhphuong.folderservice.exception.ApiException;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Service
//@AllArgsConstructor
////@RequiredArgsConstructor
//public class JwtService {
//
////    @Value("${application.security.jwt.secret-key}")
////    private String SECRET_KEY;
//
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    private Claims extractAllClaims(String token) {
//        try {
//            return Jwts
//                    .parserBuilder()
////                    .setSigningKey(getSigningKey())
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//        } catch (Exception e) {
//            throw new ApiException("FS-JWT-401", HttpStatus.UNAUTHORIZED, "JWT Unauthenticated");
//        }
//    }
//
////    private Key getSigningKey() {
////        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
////        return Keys.hmacShaKeyFor(keyBytes);
////    }
//
//    public boolean isTokenValid(String token, String phone) {
//        try {
//            final String username = extractUsername(token);
//            return (username.equals(phone)) && !isTokenExpired(token);
//        } catch (Exception e) {
//            throw new ApiException("FS-JWT-401", HttpStatus.UNAUTHORIZED, "JWT Unauthenticated");
//        }
//
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//}
