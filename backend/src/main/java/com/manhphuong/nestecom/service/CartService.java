package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.dto.request.cart.CreateCartItemDtoRequest;
import com.manhphuong.nestecom.dto.request.cart.UpdateCartItemDtoRequest;
import com.manhphuong.nestecom.dto.response.cart.CartItemInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.cart.CartItemListDtoResponse;

import java.util.List;

public interface CartService {
    // xem danh sách item trong giỏ hàng
    // thêm item vào giỏ hàng
    // sửa item trong giỏ hàng
    // xóa item trong giỏ hàng
    List<CartItemListDtoResponse> listCartItem(String uuidCart);
    CartItemInfoDtoResponse createCartItem(CreateCartItemDtoRequest createCartItemDtoRequest, String uuidCart);
    CartItemInfoDtoResponse updateCartItem(UpdateCartItemDtoRequest updateCartItemDtoRequest);
    void deleteCartItem(String id);

}
