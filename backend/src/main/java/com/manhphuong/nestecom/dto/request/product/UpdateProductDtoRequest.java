package com.manhphuong.nestecom.dto.request.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateProductDtoRequest {
    private String uuidProduct;

    private String title;

    private String metaTitle;

    private String summary;

    private short type;

    private double price;

    private short quantity;

    private Timestamp publishedDate;

    private String description;
}
