package com.manhphuong.nestecom.service.impl;

import com.manhphuong.nestecom.common.enums.PaymentMethodEnum;
import com.manhphuong.nestecom.common.enums.StatusOrderEnum;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.order.CreateOrderItemDtoRequest;
import com.manhphuong.nestecom.dto.request.order.OrderDtoRequest;
import com.manhphuong.nestecom.dto.request.order.OrderItemDtoRequest;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderItemInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderProductListDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderUserListDtoResponse;
import com.manhphuong.nestecom.entity.Order;
import com.manhphuong.nestecom.entity.OrderItem;
import com.manhphuong.nestecom.entity.Product;
import com.manhphuong.nestecom.entity.User;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.repository.OrderItemRepository;
import com.manhphuong.nestecom.repository.OrderRepository;
import com.manhphuong.nestecom.repository.ProductRepository;
import com.manhphuong.nestecom.repository.UserRepository;
import com.manhphuong.nestecom.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public PageDtoResponse<OrderUserListDtoResponse> listOrderUser(PageDtoRequest pageDtoRequest) {
        return null;
    }

    @Override
    public PageDtoResponse<OrderProductListDtoResponse> listOrderProduct(PageDtoRequest pageDtoRequest) {
        return null;
    }

    @Override
    @Transactional
    public OrderInfoDtoResponse createOrder(OrderDtoRequest orderDtoRequest, String currentUser) {
        // Lấy uuid người bán của order item đầu
//        String firstProductId = orderDtoRequest.getOrderItems().get(0).getUuidProduct();
//        Product firstProduct = productRepository.findById(firstProductId).orElseThrow(
//                () ->  new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "product not found"));
//        String firstProductSeller = firstProduct.getUuidUser();

        double subtotal = 0;
        double total = 0;
        double promo = 0;
        double discount = 0;
        double grandTotal = 0;

        // Kiểm tra order item cùng 1 người bán
        String uuidSeller = getUuidSeller(orderDtoRequest.getOrderItems());

        // Kiểm tra order item đủ quantity
        for (OrderItemDtoRequest orderItemDto : orderDtoRequest.getOrderItems()) {
            String productId = orderItemDto.getUuidProduct();
            Product product = productRepository.findById(productId).orElseThrow(
                    () -> {
//                        new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "product not found");
                        log.error("product not found", HttpStatus.NOT_FOUND);
                        return null;
                    });
//            if (!product.getUuidUser().equals(firstProductSeller)) {
//                throw new ApiException("OS-GET-400", HttpStatus.BAD_REQUEST, "All products in an order must have the same seller");
//            }
            if (product.getQuantity() < orderItemDto.getQuantity()) {
                log.error("Not enough product quantity", HttpStatus.BAD_REQUEST);
//                throw new RuntimeException("Not enough product quantity");
                return null;
//                throw new ApiException("OS-GET-400", HttpStatus.BAD_REQUEST, "Not enough product quantity");
            }

            subtotal += product.getPrice() * orderItemDto.getQuantity();
        }

        total = subtotal + orderDtoRequest.getTax() + orderDtoRequest.getShipping() - orderDtoRequest.getItemDiscount();
//        promo = promoRepository.getCode().getValue()
        discount = promo;
//        grandTotal = total - promo
        grandTotal = total - 0;

        // Lấy thông tin người dùng hiện tại
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUser = authentication.getName();

//        User user = userRepository.findById(currentUser).orElseThrow(
//                () ->  new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "user sell not found"));

        Order order = Order.builder()
                .userId(currentUser)
                .status((short) StatusOrderEnum.ORDER_PLACED.getActivateCode())
                .subtotal(subtotal)
                .itemDiscount(orderDtoRequest.getItemDiscount())
                .tax(orderDtoRequest.getTax())
                .shipping(orderDtoRequest.getShipping())
                .total(total)
                .promo(orderDtoRequest.getPromo())
                .discount(discount)
                .grandTotal(grandTotal)
                .phone(orderDtoRequest.getPhone())
                .paymentMethods(PaymentMethodEnum.CASH_ON_DELIVERY.getName())
                .note(orderDtoRequest.getNote())
                .addressShip(orderDtoRequest.getAddressShip())
                .sellerId(uuidSeller)
                .build();

        order = orderRepository.save(order);

        createOrderItem(orderDtoRequest.getOrderItems(), order.getUuidOrder());

        return OrderInfoDtoResponse.from(order);
    }

    @Override
    public String getUuidSeller(List<OrderItemDtoRequest> orderItemDtoRequests) {
        String firstProductId = orderItemDtoRequests.get(0).getUuidProduct();
        Product firstProduct = productRepository.findById(firstProductId).orElseThrow(
                () -> {
//                    new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "product not found");
                    log.error("product not found", HttpStatus.NOT_FOUND);
                    return null;
                });
        String firstProductSeller = firstProduct.getUuidUser();
        for (OrderItemDtoRequest orderItemDto : orderItemDtoRequests) {
            String productId = orderItemDto.getUuidProduct();
            Product product = productRepository.findById(productId).orElseThrow(
                    () -> {
//                        new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "product not found");
                        log.error("product not found", HttpStatus.NOT_FOUND);
                        return null;
                    });
            if (!product.getUuidUser().equals(firstProductSeller)) {
//                throw new ApiException("OS-GET-400", HttpStatus.BAD_REQUEST, "All products in an order must have the same seller");
                log.error("All products in an order must have the same seller", HttpStatus.BAD_REQUEST);
                return null;
            }
        }
        return firstProductSeller;
    }

    @Override
    @Transactional
    public void createOrderItem(List<OrderItemDtoRequest> orderItemDtoRequests, String uuidOrder) {
        List<OrderItem> orderItems = orderItemDtoRequests.stream()
                .map(orderItemDto -> {
                    Product product = productRepository.findById(orderItemDto.getUuidProduct()).orElseThrow(
                            () -> {
//                                new ApiException("OS-GET-404", HttpStatus.NOT_FOUND, "product not found");
                                log.error("product not found", HttpStatus.NOT_FOUND);
                                return null;
                            });
                    product.setQuantity((short)(product.getQuantity() - orderItemDto.getQuantity()));
                    productRepository.save(product);
                    return OrderItem.builder()
                            .uuidProduct(orderItemDto.getUuidProduct())
                            .uuidOrder(uuidOrder)
                            .price(product.getPrice())
                            .discount(orderItemDto.getDiscount())
                            .quantity(orderItemDto.getQuantity())
                            .content(orderItemDto.getContent())
                            .build();
                })
                .collect(Collectors.toList());

        // Save the OrderItems
        orderItemRepository.saveAll(orderItems);
    }

    @Override
    public OrderInfoDtoResponse getOrderDetail(String uuidOrder) {
        return null;
    }

    @Override
    @Transactional
    public void cancelOrder(String uuidOrder) {

    }
}
