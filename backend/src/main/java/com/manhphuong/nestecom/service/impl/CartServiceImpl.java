package com.manhphuong.nestecom.service.impl;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.dto.request.cart.CreateCartItemDtoRequest;
import com.manhphuong.nestecom.dto.request.cart.UpdateCartItemDtoRequest;
import com.manhphuong.nestecom.dto.response.cart.CartItemInfoDtoResponse;
import com.manhphuong.nestecom.dto.response.cart.CartItemListDtoResponse;
import com.manhphuong.nestecom.entity.CartItem;
import com.manhphuong.nestecom.entity.Product;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.repository.CartItemRepository;
import com.manhphuong.nestecom.repository.ProductRepository;
import com.manhphuong.nestecom.repository.UserRepository;
import com.manhphuong.nestecom.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;


@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    @Override
    public List<CartItemListDtoResponse> listCartItem(String uuidCart) {
        List<CartItem> cartItems = this.cartItemRepository.findAllByUuidCart(uuidCart);
        return cartItems.stream().map(CartItemListDtoResponse::from).toList();
    }

    @Override
    @Transactional
    public CartItemInfoDtoResponse createCartItem(CreateCartItemDtoRequest createCartItemDtoRequest, String uuidCart) {
        Product product = this.productRepository.findById(createCartItemDtoRequest.getUuidProduct()).orElseThrow(
                () -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));

        if(createCartItemDtoRequest.getQuantity() > product.getQuantity()) {
            throw new ApiException("FS-UP-400", HttpStatus.BAD_REQUEST, "Cannot add more products than available products");
        }

        if(product.getPublishedDate().getTime() > Common.currentTime().getTime()) {
            throw new ApiException("FS-UP-403", HttpStatus.FORBIDDEN, "product not publish");
        }

        CartItem cartItem = this.cartItemRepository.save(CartItem.builder()
                .uuidCart(uuidCart)
                .uuidProduct(createCartItemDtoRequest.getUuidProduct())
                .price(product.getPrice())
                .discount(createCartItemDtoRequest.getDiscount())
                .quantity(createCartItemDtoRequest.getQuantity())
                .active(createCartItemDtoRequest.getActive())
                .titleProduct(product.getTitle())
                .build());
        return CartItemInfoDtoResponse.from(cartItem);
    }

    @Override
    @Transactional
    public CartItemInfoDtoResponse updateCartItem(UpdateCartItemDtoRequest updateCartItemDtoRequest) {
        CartItem cartItem = this.cartItemRepository.findById(updateCartItemDtoRequest.getUuidCartItem()).orElseThrow(
                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "cart item not found")
        );

        String uuidUser = this.userRepository.findByUuidCart(cartItem.getUuidCart()).getUuidUser();

        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Kiểm tra xem người dùng hiện tại có phải là người tạo sản phẩm hoặc có quyền admin
        if (!currentUser.equals(uuidUser) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "update cart item failed");
        }

        Product product = this.productRepository.findById(cartItem.getUuidProduct()).orElseThrow(
                () -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));

        if(updateCartItemDtoRequest.getQuantity() > product.getQuantity()) {
            throw new ApiException("FS-UP-400", HttpStatus.BAD_REQUEST, "Cannot add more products than available products");
        }

        if(product.getPublishedDate().getTime() > Common.currentTime().getTime()) {
            throw new ApiException("FS-UP-403", HttpStatus.FORBIDDEN, "product not publish");
        }

        CartItem cartItemUpdate = this.cartItemRepository.save(CartItem.builder()
                .uuidCartItem(updateCartItemDtoRequest.getUuidCartItem())
                .uuidCart(cartItem.getUuidCart())
                .uuidProduct(product.getUuidProduct())
                .price(product.getPrice())
                .discount(updateCartItemDtoRequest.getDiscount())
                .quantity(updateCartItemDtoRequest.getQuantity())
                .active(updateCartItemDtoRequest.getActive())
                .titleProduct(product.getTitle())
                .createdDate(cartItem.getCreatedDate())
                .build());
        return CartItemInfoDtoResponse.from(cartItemUpdate);
    }

    @Override
    @Transactional
    public void deleteCartItem(String id) {
        CartItem cartItem = this.cartItemRepository.findById(id).orElseThrow(
                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "delete cart item not found")
        );

        String uuidUser = this.userRepository.findByUuidCart(cartItem.getUuidCart()).getUuidUser();

        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Kiểm tra xem người dùng hiện tại có phải là người tạo sản phẩm hoặc có quyền admin
        if (!currentUser.equals(uuidUser) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "delete cart item failed");
        }
        System.out.println("authentication " + authentication);
        System.out.println("authorities " + authorities);

        this.cartItemRepository.deleteById(id);
    }
}
