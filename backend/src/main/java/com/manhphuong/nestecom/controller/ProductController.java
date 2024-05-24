package com.manhphuong.nestecom.controller;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.common.controller.AbstractResponseController;
import com.manhphuong.nestecom.dto.request.product.CreateProductDtoRequest;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.product.UpdateProductDtoRequest;
import com.manhphuong.nestecom.service.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/product")
@Slf4j
@AllArgsConstructor
@Tag(name = "Product", description = "Quản lý Product")
@SecurityRequirement(name = "Authorization")
public class ProductController extends AbstractResponseController {
    public final ProductService productService;

//
    @GetMapping()
    public ResponseEntity<?> listProduct(@Valid @ModelAttribute PageDtoRequest pageDtoRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String userId = Common.getUserInfoLogin(authorizationHeader).getUserId();
        System.out.println("userId:    " + userId);
        return responseEntity(() -> productService.listProduct(pageDtoRequest, userId));
    }

//    @GetMapping(value = "/private/{id}")
//    public ResponseEntity<?> getDetailProductPrivate(@PathVariable(value = "id") String id) {
//        return responseEntity(() -> productService.getDetailProductPrivate(id));
//    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getDetailProduct(@PathVariable(value = "id") String id) {
        return responseEntity(() -> productService.getDetailProduct(id));
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@RequestBody @Valid CreateProductDtoRequest createProductDtoRequest, @RequestHeader("Authorization") String authorizationHeader) {
        String uuidUser = Common.getUserInfoLogin(authorizationHeader).getUserId();
        System.out.println("uuidUser: " + uuidUser);
        return responseEntity(() -> productService.createProduct(createProductDtoRequest, uuidUser));
    }

//
//    @PatchMapping(value = "/del/{id}")
//    public ResponseEntity<?> deleteTempFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
//        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
//        return responseEntity(() -> {
//            folderService.deleteTempFolder(id, email);
//            return new HashMap<>();
//        });
//    }
//
//    @PatchMapping(value = "/restore/{id}")
//    public ResponseEntity<?> restoreFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
//        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
//        return responseEntity(() -> {
//            folderService.restoreFolder(id, email);
//            return new HashMap<>();
//        });
//    }
//
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteReallyProduct(@PathVariable(value = "id") String id) {
        return responseEntity(() -> {
            productService.deleteReallyProduct(id);
            return new HashMap<>();
        });
    }

    @PutMapping()
    public ResponseEntity<?> updateProduct(@RequestBody @Valid UpdateProductDtoRequest updateProductDtoRequest) {
        return responseEntity(() -> productService.updateProduct(updateProductDtoRequest));
    }
}