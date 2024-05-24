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
public class OrderItemDtoRequest {
    private String uuidProduct;
//    private double price;
    private double discount;
    private short quantity;
    private String content;
}
