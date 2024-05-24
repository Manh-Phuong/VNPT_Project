package com.manhphuong.nestecom.configuration;

import com.manhphuong.nestecom.entity.Role;
import com.manhphuong.nestecom.entity.User;
import com.manhphuong.nestecom.repository.RoleRepository;
import com.manhphuong.nestecom.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository){
        return args -> {
            if (userRepository.findByEmail("admin").isEmpty()){
                var roles = new HashSet<String>();
//                roles.add(Role.ADMIN.name());

                User user = User.builder()
                        .email("admin")
                        .password(passwordEncoder.encode("admin"))
                        // .roles(roles)
                        .admin(0)
                        .build();

                System.out.println(user.toString());

                Role roleAdmin = Role.builder()
                                .name("admin")
                                .build();

                System.out.println(roleAdmin.toString());

                Role roleUser = Role.builder()
                        .name("user")
                        .build();
                System.out.println(roleUser.toString());

                userRepository.save(user);
                roleRepository.save(roleAdmin);
                roleRepository.save(roleUser);
                log.warn("admin user has been created with default password: admin, please change it");
            }
        };
    }
}
