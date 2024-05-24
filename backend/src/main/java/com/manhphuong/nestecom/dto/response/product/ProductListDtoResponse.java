package com.manhphuong.nestecom.dto.response.product;

import com.manhphuong.nestecom.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductListDtoResponse {
    private String uuidProduct;

    private String title;

    private short type;

    private double price;

    private short quantity;

    private String uuidUser;

    public static ProductListDtoResponse from(Product product) {
        return ProductListDtoResponse.builder()
                .uuidProduct(product.getUuidProduct())
                .title(product.getTitle())
                .type(product.getType())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .uuidUser(product.getUuidUser())
                .build();
    }
}
