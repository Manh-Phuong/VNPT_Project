package com.manhphuong.nestecom.controller;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.common.controller.AbstractResponseController;
import com.manhphuong.nestecom.common.response.ApiResponse;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.order.OrderDtoRequest;
import com.manhphuong.nestecom.dto.response.order.OrderInfoDtoResponse;
import com.manhphuong.nestecom.kafka.order.OrderConsumer;
import com.manhphuong.nestecom.kafka.order.OrderProducer;
import com.manhphuong.nestecom.model.OrderMessage;
import com.manhphuong.nestecom.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/order")
@Slf4j
@AllArgsConstructor
@Tag(name = "Order", description = "Quản lý order")
@SecurityRequirement(name = "Authorization")
public class OrderController extends AbstractResponseController {
    public final OrderService orderService;
    public final OrderProducer orderProducer;
    public final OrderConsumer orderConsumer;

    @GetMapping()
    public ResponseEntity<?> listOrderUser(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> orderService.listOrderUser(pageDtoRequest));
    }

    @GetMapping("/sell")
    public ResponseEntity<?> listOrderProduct(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> orderService.listOrderProduct(pageDtoRequest));
    }


    @PostMapping()
    public CompletableFuture<?> createOrder(@RequestBody @Valid OrderDtoRequest orderDtoRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String userId = Common.getUserInfoLogin(authorizationHeader).getUserId();
        OrderMessage orderMessage = OrderMessage.builder()
                .userId(userId)
                .orderDtoRequest(orderDtoRequest)
                .build();

        return orderProducer.sendOrder(orderMessage)
                .thenApply(response -> ResponseEntity.ok(response))
                .exceptionally(e -> ResponseEntity.ok(ApiResponse.error("OC-CO-400", HttpStatus.BAD_REQUEST, "Order processing failed")));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(@PathVariable(value = "id") String id) {
        return responseEntity(() -> orderService.getOrderDetail(id));
    }

    @PostMapping("/sell/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable(value = "id") @Valid String id) {
        return responseEntity(() -> {
            orderService.cancelOrder(id);
            return new HashMap<>();
        });
    }


}