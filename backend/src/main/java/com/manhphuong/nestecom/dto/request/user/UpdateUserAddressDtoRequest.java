package com.manhphuong.nestecom.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserAddressDtoRequest {
//    private String uuidAddress;
    private String mobile;
    private String city;
    private String street;
    private String district;
    private Integer postalCode;

}
