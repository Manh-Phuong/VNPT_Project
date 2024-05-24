package com.manhphuong.nestecom.dto.response.order;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.entity.Order;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderInfoDtoResponse {
    private String uuidOrder;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private String userId;
    private String sessionId;
    private String token;
    private short status;
    private double subtotal;
    private double itemDiscount;
    private double tax;
    private double shipping;
    private double total;
    private String promo;
    private double discount;
    private double grandTotal;
    private String phone;
    private String paymentMethods;
    private String note;
    private String addressShip;
    private String sellerId;

    public static OrderInfoDtoResponse from(Order order) {
        return OrderInfoDtoResponse.builder()
                .uuidOrder(order.getUuidOrder())
                .createdDate(order.getCreatedDate())
                .updatedDate(order.getUpdatedDate())
                .userId(order.getUserId())
                .sessionId(order.getSessionId())
                .token(order.getToken())
                .status(order.getStatus())
                .subtotal(order.getSubtotal())
                .itemDiscount(order.getItemDiscount())
                .tax(order.getTax())
                .shipping(order.getShipping())
                .total(order.getTotal())
                .promo(order.getPromo())
                .discount(order.getDiscount())
                .grandTotal(order.getGrandTotal())
                .phone(order.getPhone())
                .paymentMethods(order.getPaymentMethods())
                .note(order.getNote())
                .addressShip(order.getAddressShip())
                .sellerId(order.getSellerId())
                .build();
    }

}
