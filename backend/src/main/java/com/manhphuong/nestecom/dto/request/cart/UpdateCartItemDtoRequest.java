package com.manhphuong.nestecom.dto.request.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateCartItemDtoRequest {
    private String uuidCartItem;
//    private String uuidProduct;
//    private double price;
    private double discount;
    private short quantity;
    private short active;
    //    private String content;
//    private String titleProduct;

}
