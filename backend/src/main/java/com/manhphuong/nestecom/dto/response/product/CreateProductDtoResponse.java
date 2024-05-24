package com.manhphuong.nestecom.dto.response.product;

import com.manhphuong.nestecom.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProductDtoResponse {
    private String uuidProduct;

    private String title;

    private String metaTitle;

    private String summary;

    private short type;

    private double price;

    private short quantity;

    private Timestamp createdDate;

    private Timestamp updatedDate;

    private Timestamp publishedDate;

    private String description;

    private String uuidBranch;

    private String uuidUser;

    public static CreateProductDtoResponse from(Product product) {
        return CreateProductDtoResponse.builder()
                .uuidProduct(product.getUuidProduct())
                .title(product.getTitle())
                .metaTitle(product.getMetaTitle())
                .summary(product.getSummary())
                .type(product.getType())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .createdDate(product.getCreatedDate())
                .updatedDate(product.getUpdatedDate())
                .publishedDate(product.getPublishedDate())
                .description(product.getDescription())
                .uuidBranch(product.getUuidBranch())
                .uuidUser(product.getUuidUser())
                .build();
    }
}
