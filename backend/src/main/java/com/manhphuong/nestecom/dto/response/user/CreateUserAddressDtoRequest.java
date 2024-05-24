package com.manhphuong.nestecom.dto.response.user;

import com.manhphuong.nestecom.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserAddressDtoRequest {
    private String mobile;
    private String city;
    private String street;
    private String district;
    private Integer postalCode;
}
