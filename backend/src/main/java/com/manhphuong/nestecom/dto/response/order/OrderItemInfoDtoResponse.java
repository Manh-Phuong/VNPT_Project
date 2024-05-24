package com.manhphuong.nestecom.dto.response.order;

import com.manhphuong.nestecom.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemInfoDtoResponse {
    private String uuidOrderItem;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private String uuidProduct;
    private String uuidOrder;
    private double price;
    private double discount;
    private short quantity;
    private String content;

    public static OrderItemInfoDtoResponse from(OrderItem orderItem) {
        return OrderItemInfoDtoResponse.builder()
                .uuidOrderItem(orderItem.getUuidOrderItem())
                .createdDate(orderItem.getCreatedDate())
                .updatedDate(orderItem.getUpdatedDate())
                .uuidProduct(orderItem.getUuidProduct())
                .uuidOrder(orderItem.getUuidOrder())
                .price(orderItem.getPrice())
                .discount(orderItem.getDiscount())
                .quantity(orderItem.getQuantity())
                .content(orderItem.getContent())
                .build();
    }


}
