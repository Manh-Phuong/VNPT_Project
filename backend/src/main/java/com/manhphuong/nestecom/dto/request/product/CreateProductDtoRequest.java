package com.manhphuong.nestecom.dto.request.product;

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
public class CreateProductDtoRequest {
    private String title;

    private String metaTitle;

    private String summary;

    private short type;

    private double price;

    private short quantity;

    private Timestamp publishedDate;

    private String description;

//    private String uuidUser;

//    private String uuidBranch;

}
