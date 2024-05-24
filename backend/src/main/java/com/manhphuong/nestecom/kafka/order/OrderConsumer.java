package com.manhphuong.nestecom.kafka.order;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manhphuong.nestecom.dto.response.order.OrderInfoDtoResponse;
import com.manhphuong.nestecom.model.OrderMessage;
import com.manhphuong.nestecom.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class OrderConsumer {
    private final OrderService orderService;
    private final OrderProducer orderProducer;

    @KafkaListener(topicPattern = "seller-.*", groupId = "orderGroup")
    public void consumeOrder(String orderJson) {
//        System.out.println("*************************************************************");
        ObjectMapper mapper = new ObjectMapper();
        OrderMessage orderMessage = null;
        try {
            orderMessage = mapper.readValue(orderJson, OrderMessage.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println("orderJson receive " + orderJson);
//        System.out.println("orderDtoRequest " + orderMessage.getOrderDtoRequest().toString());
        OrderInfoDtoResponse response = orderService.createOrder(orderMessage.getOrderDtoRequest(), orderMessage.getUserId());

        orderProducer.completeOrder(orderMessage.getUserId(), response);
    }


}
