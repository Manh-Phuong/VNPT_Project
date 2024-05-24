package com.manhphuong.nestecom.model;

import com.manhphuong.nestecom.dto.request.order.OrderDtoRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderMessage {
    private String userId;
    private OrderDtoRequest orderDtoRequest;
}
