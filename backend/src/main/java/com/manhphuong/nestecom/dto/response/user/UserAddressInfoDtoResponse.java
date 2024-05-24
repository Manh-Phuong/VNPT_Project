package com.manhphuong.nestecom.dto.response.user;

import com.manhphuong.nestecom.entity.UserAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAddressInfoDtoResponse {
    private String uuidAddress;
    private String mobile;
    private String city;
    private String street;
    private String district;
    private Integer postalCode;

    public static UserAddressInfoDtoResponse from(UserAddress userAddress) {
        return UserAddressInfoDtoResponse.builder()
                .uuidAddress(userAddress.getUuidAddress())
                .mobile(userAddress.getMobile())
                .city(userAddress.getCity())
                .street(userAddress.getStreet())
                .district(userAddress.getDistrict())
                .postalCode(userAddress.getPostalCode())
                .build();
    }
}
