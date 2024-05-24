package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.order.CreateOrderItemDtoRequest;
import com.manhphuong.nestecom.dto.request.order.OrderDtoRequest;
import com.manhphuong.nestecom.dto.request.order.OrderItemDtoRequest;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderItemInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderProductListDtoResponse;
import com.manhphuong.nestecom.dto.response.order.OrderUserListDtoResponse;

import java.util.List;

public interface OrderService {
    // Xem danh sách các đơn hàng đang đặt (pending, success, cancel, error, return, ...) - người mua
    // Tạo đơn hàng - người mua
    // Tạo orderItem
    // Thanh toán khi nhận hàng
    // Thanh toán chuyển khoản (đã thanh toán)
    // Xem chi tiết đơn hàng -
    // Xem danh sách đơn hàng - người bán
    // Hủy đơn hàng
    PageDtoResponse<OrderUserListDtoResponse> listOrderUser(PageDtoRequest pageDtoRequest);

    PageDtoResponse<OrderProductListDtoResponse> listOrderProduct(PageDtoRequest pageDtoRequest);

    OrderInfoDtoResponse createOrder(OrderDtoRequest orderDtoRequest, String userId);

    String getUuidSeller(List<OrderItemDtoRequest> orderItemDtoRequests);

    //    OrderItemInfoDtoResponse createOrderItem(CreateOrderItemDtoRequest createOrderItemDtoRequest);
//    OrderItemInfoDtoResponse createOrderItem(List<OrderItemDtoRequest> orderItemDtoRequests, String uuidOrder);
    void createOrderItem(List<OrderItemDtoRequest> orderItemDtoRequests, String uuidOrder);

    OrderInfoDtoResponse getOrderDetail(String uuidOrder);

    void cancelOrder(String uuidOrder); // cộng lại quantity, lý do hủy
}
