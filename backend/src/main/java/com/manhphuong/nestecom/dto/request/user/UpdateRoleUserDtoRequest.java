package com.manhphuong.nestecom.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateRoleUserDtoRequest {
    private String uuidUser;
    private String uuidRole;
}
