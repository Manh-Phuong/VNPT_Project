package com.manhphuong.nestecom.dto.response.user;

import com.manhphuong.nestecom.entity.Role;
import com.manhphuong.nestecom.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserListDtoResponse {
    private String uuidUser;
    private String uuidCart;
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;
    private String avatar;
    private String description;
//    private int admin;
    private Timestamp registerDate;
    private Timestamp lastLogin;
    private int activate;
    private List<String> userRole;

    public static UserListDtoResponse from(User user) {
        return UserListDtoResponse.builder()
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
                .userRole(null)
                .build();
    }

    public static UserListDtoResponse from(User user, List<String> userRole) {
        return UserListDtoResponse.builder()
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
                .userRole(userRole)
                .build();
    }

}
