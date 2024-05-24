package com.manhphuong.nestecom.dto.request.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDtoRequest {
    //    private String sessionId;
//    private String token;
//    private short status;
//    private double subtotal;
    private double itemDiscount;
    private double tax;
    private double shipping;
    //    private double total;
    private String promo;
    //    private double discount;
//    private double grandTotal;
    private String phone;
    private String paymentMethods;
    private String note;
    private String addressShip;
    private List<OrderItemDtoRequest> orderItems;
}
