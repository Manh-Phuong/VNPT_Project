package com.manhphuong.nestecom.dto.response.order;

import com.manhphuong.nestecom.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderProductListDtoResponse {
    private String uuidOrder;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private String userId;
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

    public static OrderProductListDtoResponse from(Order order) {
        return OrderProductListDtoResponse.builder()
                .uuidOrder(order.getUuidOrder())
                .createdDate(order.getCreatedDate())
                .updatedDate(order.getUpdatedDate())
                .userId(order.getUserId())
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
                .build();
    }
}
