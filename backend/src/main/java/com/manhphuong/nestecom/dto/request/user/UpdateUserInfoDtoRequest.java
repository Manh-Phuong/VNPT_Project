package com.manhphuong.nestecom.dto.request.user;

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
public class UpdateUserInfoDtoRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String avatar;
    private String description;
}
