package com.manhphuong.nestecom.dto.response.user;

import com.manhphuong.nestecom.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterUserDtoResponse {
    private String uuidUser;
    private String uuidCart;
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;
    private String avatar;
    private String description;
    private Timestamp registerDate;
    private Timestamp lastLogin;
    private int activate;

    public static RegisterUserDtoResponse from(User user) {
        return RegisterUserDtoResponse.builder()
                .uuidUser(user.getUuidUser())
                .uuidCart(user.getUuidCart())
                .firstName(user.getFirstName())
                .middleName(user.getMiddleName())
                .lastName(user.getLastName())
                .mobile(user.getMobile())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .description(user.getDescription())
                .registerDate(user.getRegisterDate())
                .lastLogin(user.getLastLogin())
                .activate(user.getActivate())
                .build();
    }

}
