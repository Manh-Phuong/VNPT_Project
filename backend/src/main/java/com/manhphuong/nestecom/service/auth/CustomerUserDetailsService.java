//package com.manhphuong.folderservice.service.auth;
//
//import com.manhphuong.folderservice.common.Common;
//import jakarta.ws.rs.NotFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class CustomerUserDetailsService implements UserDetailsService {
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws NotFoundException {
//        System.out.println("loadUserByUsername: " + email);
////        String username = Common.getUserInfo()
//        List<String> roles = new ArrayList<>();
//        roles.add("ADMIN");
//
//        return new User("manhphuong1702@gmail.com", "99999", mapRolesToAuthorities(roles));
//    }
//
//    private Collection<GrantedAuthority> mapRolesToAuthorities(List<String> roles) {
//        return roles.stream().map(role -> new SimpleGrantedAuthority(role.toString())).collect(Collectors.toList());
//    }
//}
