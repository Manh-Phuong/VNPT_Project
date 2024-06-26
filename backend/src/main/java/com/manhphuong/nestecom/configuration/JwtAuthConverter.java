//package com.manhphuong.nestecom.configuration;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.jwt.JwtClaimNames;
//import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
//import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//@Component
//public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
//
//    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter =
//            new JwtGrantedAuthoritiesConverter();
//
//    @Value("${jwt.auth.converter.principle-attribute}")
//    private String principleAttribute;
//    @Value("${jwt.auth.converter.resource-id}")
//    private String resourceId;
//
//    @Override
//    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
//        Collection<GrantedAuthority> authorities = Stream.concat(
//                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
//                extractResourceRoles(jwt).stream()
//        ).collect(Collectors.toSet());
//
//        return new JwtAuthenticationToken(
//                jwt,
//                authorities,
//                getPrincipleClaimName(jwt)
//        );
//    }
//
//    private String getPrincipleClaimName(Jwt jwt) {
//        String claimName = JwtClaimNames.SUB;
////        System.out.println("JwtAuthConverter claimName 1: " + claimName);
//        if (principleAttribute != null) {
//            claimName = principleAttribute;
//        }
////        System.out.println("JwtAuthConverter claimName 2: " + claimName);
////        System.out.println("JwtAuthConverter getPrincipleClaimName: " + jwt.getClaim(claimName));
//        return jwt.getClaim(claimName);
//    }
//
//    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
//        Map<String, Object> resourceAccess;
//        Map<String, Object> resource;
//        Collection<String> resourceRoles;
//        if (jwt.getClaim("resource_access") == null) {
//            return Set.of();
//        }
//        resourceAccess = jwt.getClaim("resource_access");
//
//        Map<String, Object> resourceAccess2;
//        Collection<String> resource2;
//        resourceAccess2 = jwt.getClaim("realm_access");
//        resource2 = (Collection<String>) resourceAccess2.get("roles");
//
//        for (String role: resource2) {
////            System.out.println("JwtAuthConverter resource2 realm_access: " + role);
//        }
//
////        System.out.println("JwtAuthConverter realm_access: " + jwt.getClaim("realm_access"));
//
//        if (resourceAccess.get(resourceId) == null) {
//            return Set.of();
//        }
//        resource = (Map<String, Object>) resourceAccess.get(resourceId);
//
//        resourceRoles = (Collection<String>) resource.get("roles");
//
//        for (String role: resourceRoles) {
////            System.out.println("JwtAuthConverter resourceRoles: " + role);
//        }
//
//        return resourceRoles
//                .stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
//                .collect(Collectors.toSet());
//    }
//}
