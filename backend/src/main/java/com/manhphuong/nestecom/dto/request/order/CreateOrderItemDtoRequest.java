package com.manhphuong.nestecom.dto.request.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateOrderItemDtoRequest {
    private String uuidProduct;
    private String uuidOrder;
//    private double price;
    private double discount;
    private short quantity;
    private String content;
//    private Timestamp createdDate;
//    private Timestamp updatedDate;
}
