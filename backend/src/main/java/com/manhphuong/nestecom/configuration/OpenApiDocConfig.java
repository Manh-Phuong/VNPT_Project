package com.manhphuong.nestecom.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Nguyễn Mạnh Phương",
                        email = "manhphuong1702@gmail.com",
                        url = "http://manhphuong.com.vn"
                ),
                version = "1.0.0",
                title = "API doc for sample project"
        ),
//        tags = {
//                @Tag(
//                        name = "User",
//                        description = "Quản lý user"
//                )
//        },
        servers = {
                @Server(
                        url = "http://localhost:8080",
                        description = "Localhost"
                )
        }
//        ,security = {
//                @SecurityRequirement(
//                        name = "bearerFormat"
//                )
//}
)
@SecurityScheme(
        name = "Authorization",
        description = "access token auth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
//        ,in = SecuritySchemeIn.HEADER
)
@Configuration
public class OpenApiDocConfig {
}
