package com.manhphuong.nestecom.dto.request.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCartItemDtoRequest {
    private String uuidProduct;
//    private double price;
    private double discount;
    private short quantity;
    private short active;
    //    private String content;
//    private String titleProduct;

}
