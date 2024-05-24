package com.manhphuong.nestecom.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerifyCodeUserDtoRequest {
    private String uuidUser;
    private String activationCode;
}
