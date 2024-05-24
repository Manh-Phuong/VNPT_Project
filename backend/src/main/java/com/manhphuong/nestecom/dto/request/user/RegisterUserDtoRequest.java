package com.manhphuong.nestecom.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterUserDtoRequest {
    private String email;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
}
