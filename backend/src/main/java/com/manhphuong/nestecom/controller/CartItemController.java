package com.manhphuong.nestecom.controller;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.common.controller.AbstractResponseController;
import com.manhphuong.nestecom.dto.request.cart.CreateCartItemDtoRequest;
import com.manhphuong.nestecom.dto.request.cart.UpdateCartItemDtoRequest;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.repository.UserRepository;
import com.manhphuong.nestecom.service.CartService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/cart")
@Slf4j
@AllArgsConstructor
@Tag(name = "CartItem", description = "Quản lý cart item")
@SecurityRequirement(name = "Authorization")
public class CartItemController extends AbstractResponseController {
    public final CartService cartService;
    public final UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<?> listCartItem(@RequestHeader("Authorization") String authorizationHeader) {
        String uuidUser = Common.getUserInfoLogin(authorizationHeader).getUserId();
        String uuidCart = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("C-GET-404", HttpStatus.NOT_FOUND, "user not found")).getUuidCart();
        System.out.println("userId:    " + uuidUser);
        System.out.println("uuidCart:    " + uuidCart);
        return responseEntity(() -> cartService.listCartItem(uuidCart));
    }


    @PostMapping()
    public ResponseEntity<?> createCartItem(@RequestBody @Valid CreateCartItemDtoRequest createCartItemDtoRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String uuidUser = Common.getUserInfoLogin(authorizationHeader).getUserId();
        String uuidCart = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("C-GET-404", HttpStatus.NOT_FOUND, "user not found")).getUuidCart();
        System.out.println("userId:    " + uuidUser);
        System.out.println("uuidCart:    " + uuidCart);
        return responseEntity(() -> cartService.createCartItem(createCartItemDtoRequest, uuidCart));
    }

    @PutMapping()
    public ResponseEntity<?> updateCartItem(@RequestBody @Valid UpdateCartItemDtoRequest updateCartItemDtoRequest) {
        return responseEntity(() -> cartService.updateCartItem(updateCartItemDtoRequest));
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable(value = "id") String id) {
        return responseEntity(() -> {
            cartService.deleteCartItem(id);
            return new HashMap<>();
        });
    }


}