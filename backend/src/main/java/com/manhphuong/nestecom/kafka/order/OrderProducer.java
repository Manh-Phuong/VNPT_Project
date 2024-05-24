package com.manhphuong.nestecom.kafka.order;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manhphuong.nestecom.common.response.ApiResponse;
import com.manhphuong.nestecom.dto.request.order.OrderDtoRequest;
import com.manhphuong.nestecom.dto.response.order.OrderInfoDtoResponse;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.model.OrderMessage;
import com.manhphuong.nestecom.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Service
@AllArgsConstructor
@Slf4j
public class OrderProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final OrderService orderService;
    private final Map<String, CompletableFuture<OrderInfoDtoResponse>> futures = new ConcurrentHashMap<>();

    public CompletableFuture<?> sendOrder(OrderMessage orderMessage) {
        ObjectMapper mapper = new ObjectMapper();
        String orderJson = null;
        try {
            orderJson = mapper.writeValueAsString(orderMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println("orderJson send " + orderJson);
        log.warn(orderJson);
        String uuidSeller = orderService.getUuidSeller(orderMessage.getOrderDtoRequest().getOrderItems());
        System.out.println("uuidSeller: " + uuidSeller);
        kafkaTemplate.send("seller-" + uuidSeller, orderJson);

        CompletableFuture<OrderInfoDtoResponse> future = new CompletableFuture<>();
        futures.put(orderMessage.getUserId(), future);
        return future;
    }

    public void completeOrder(String userId, OrderInfoDtoResponse response) {
        CompletableFuture<OrderInfoDtoResponse> future = futures.remove(userId);

        if (future != null) {
            if (response != null) {
                future.complete(response);
            } else {
                future.completeExceptionally(new RuntimeException("Order processing failed"));
            }
        }
    }
}

