package com.manhphuong.nestecom.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateRoleUserDtoResponse {
    private String uuidUser;
    private List<String> listRole;


    public static UpdateRoleUserDtoResponse from(String uuidUser, List<String> listRole) {
        return UpdateRoleUserDtoResponse.builder()
                .uuidUser(uuidUser)
                .listRole(listRole)
                .build();
    }
}
