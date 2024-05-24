package com.manhphuong.nestecom.dto.response.order;

import com.manhphuong.nestecom.entity.Order;
import com.manhphuong.nestecom.entity.User;
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
public class OrderUserListDtoResponse {
    private String uuidOrder;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private short status;
    private double subtotal;
    private double itemDiscount;
    private double tax;
    private double shipping;
    private double total;
    private String promo;
    private double discount;
    private double grandTotal;
    private String paymentMethods;

    public static OrderUserListDtoResponse from(Order order) {
        return OrderUserListDtoResponse.builder()
                .uuidOrder(order.getUuidOrder())
                .createdDate(order.getCreatedDate())
                .updatedDate(order.getUpdatedDate())
                .status(order.getStatus())
                .subtotal(order.getSubtotal())
                .itemDiscount(order.getItemDiscount())
                .tax(order.getTax())
                .shipping(order.getShipping())
                .total(order.getTotal())
                .promo(order.getPromo())
                .discount(order.getDiscount())
                .grandTotal(order.getGrandTotal())
                .paymentMethods(order.getPaymentMethods())
                .build();
    }

}
