package com.manhphuong.nestecom.common.enums;

import lombok.Getter;

@Getter
public enum StatusOrderEnum {
    ORDER_PLACED(0, "Order has been placed"),     // Đơn hàng đã được đặt
    ORDER_CONFIRMED(1, "Order has been confirmed"),      // Đơn hàng đã được xác nhận
    ORDER_REJECTED(2, "Order has been rejected"),       // Đơn hàng đã bị từ chối
    ORDER_SHIPPED(3, "Order has been shipped"),     // Đơn hàng đã được gửi đi
    DELIVERED(4, "Order has been delivered"),       // Đơn hàng đã được giao
    CANCELLED(5, "Order has been cancelled"),       // Đơn hàng đã bị hủy
    RETURN_REQUESTED(6, "Return has been requested"),       // Yêu cầu trả hàng
    RETURN_APPROVED(7, "Return request has been approved"),     // Yêu cầu trả hàng đã được chấp nhận
    PICK_UP_INITIATED(8, "Pick up has been initiated"),     // Bắt đầu quá trình lấy hàng trả lại
    PICK_UP_COMPLETED(9, "Pick up has been completed"),     // Hoàn thành quá trình lấy hàng trả lại
    REFUND_INITIATED(10, "Refund has been initiated"),      // Bắt đầu quá trình hoàn tiền
    REFUND_COMPLETED(11, "Refund has been completed");      // Hoàn thành quá trình hoàn tiền
//    CLOSED(12, "Order has been closed");      // Đơn hàng đã được đóng

    private final int activateCode;
    private final String description;

    StatusOrderEnum(int activateCode, String description) {
        this.activateCode = activateCode;
        this.description = description;
    }
}
