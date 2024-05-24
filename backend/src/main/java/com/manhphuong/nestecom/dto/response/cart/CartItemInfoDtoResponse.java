package com.manhphuong.nestecom.dto.response.cart;

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
public class CartItemInfoDtoResponse {
    private String uuidCartItem;
    private String uuidCart;
    private String uuidProduct;
    private double price;
    private double discount;
    private short quantity;
    private short active;
    //    private String content;
    private String titleProduct;
    private Timestamp createdDate;
    private Timestamp updatedDate;

    public static CartItemInfoDtoResponse from(CartItem cartItem) {
        return CartItemInfoDtoResponse.builder()
                .uuidCartItem(cartItem.getUuidCartItem())
                .uuidCart(cartItem.getUuidCart())
                .uuidProduct(cartItem.getUuidProduct())
                .price(cartItem.getPrice())
                .discount(cartItem.getDiscount())
                .quantity(cartItem.getQuantity())
                .active(cartItem.getActive())
                .titleProduct(cartItem.getTitleProduct())
                .createdDate(cartItem.getCreatedDate())
                .updatedDate(cartItem.getUpdatedDate())
                .build();
    }
}
