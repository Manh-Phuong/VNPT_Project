package com.manhphuong.nestecom.service.impl;

import com.manhphuong.nestecom.common.Common;
import com.manhphuong.nestecom.dto.request.product.CreateProductDtoRequest;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.product.UpdateProductDtoRequest;
import com.manhphuong.nestecom.dto.response.product.CreateProductDtoResponse;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.product.ProductDetailDtoResponse;
import com.manhphuong.nestecom.dto.response.product.ProductListDtoResponse;
import com.manhphuong.nestecom.entity.Product;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.repository.ProductRepository;
import com.manhphuong.nestecom.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Override
    public PageDtoResponse<ProductListDtoResponse> listProduct(PageDtoRequest pageDtoRequest, String uuidUser) {
//        // Lấy thông tin người dùng hiện tại
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUser = authentication.getName();
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//
//        System.out.println("currentUser: " + currentUser);
//        System.out.println("grant: " + authorities);
//
//
//        authorities.stream().map(grantedAuthority -> {
//            System.out.println("grantedAuthority: " + grantedAuthority);
//            return null;
//        });
//
//

        Page<Product> products = this.productRepository.findAllByUserId(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
                Sort.by("createdDate").ascending()), uuidUser);
        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), products.getTotalElements(),
                products.stream().map(ProductListDtoResponse::from).toList());
    }

    @Override
    @PostAuthorize("returnObject.uuidUser == authentication.name or hasAuthority('ROLE_admin')")
    public ProductDetailDtoResponse getDetailProductPrivate(String id) {
        Product product = this.productRepository.findById(id).orElseThrow(() -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));

        return ProductDetailDtoResponse.from(product);
    }

    @Override
    public ProductDetailDtoResponse getDetailProduct(String id) {
//        Product product = this.productRepository.findProductPublic(id, Common.currentTime()).orElseThrow(() -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));
        Product product = this.productRepository.findById(id).orElseThrow(() -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Kiểm tra xem người dùng hiện tại có phải là người tạo sản phẩm hoặc có quyền admin
        if (!currentUser.equals(product.getUuidUser()) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            Product product2 = this.productRepository.findProductPublic(id, Common.currentTime()).orElseThrow(() -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found"));
            return ProductDetailDtoResponse.from(product2);
        }
        System.out.println("authentication " + authentication);
        System.out.println("authorities " + authorities);

        return ProductDetailDtoResponse.from(product);
    }

    @Override
    @Transactional
    public CreateProductDtoResponse createProduct(CreateProductDtoRequest createProductDtoRequest, String uuidUser) {
        Product product = this.productRepository.save(Product.builder()
                .title(createProductDtoRequest.getTitle())
                .metaTitle(createProductDtoRequest.getMetaTitle())
                .summary(createProductDtoRequest.getSummary())
                .type(createProductDtoRequest.getType())
                .price(createProductDtoRequest.getPrice())
                .quantity(createProductDtoRequest.getQuantity())
                .publishedDate(createProductDtoRequest.getPublishedDate())
                .description(createProductDtoRequest.getDescription())
//                .uuidBranch(createProductDtoRequest.getUuidBranch())
                .uuidUser(uuidUser)
                .build());
        return CreateProductDtoResponse.from(product);
    }

    @Override
    @Transactional
    public void deleteTempProduct(String id, String uuidUser) {

    }

    @Override
    @Transactional
    public void restoreProduct(String id, String uuidUser) {

    }

    @Override
    @Transactional
    public void deleteReallyProduct(String id) {
        Product product = this.productRepository.findById(id).orElseThrow(
                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "delete really product not found")
        );

        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Kiểm tra xem người dùng hiện tại có phải là người tạo sản phẩm hoặc có quyền admin
        if (!currentUser.equals(product.getUuidUser()) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "delete really folder failed");
        }
        System.out.println("authentication " + authentication);
        System.out.println("authorities " + authorities);

        this.productRepository.deleteById(id);

    }

    @Override
    @Transactional
    public ProductDetailDtoResponse updateProduct(UpdateProductDtoRequest updateProductDtoRequest) {
        // Tìm sản phẩm dựa trên id
        Product product = this.productRepository.findById(updateProductDtoRequest.getUuidProduct()).orElseThrow(
                () -> new ApiException("P-404", HttpStatus.NOT_FOUND, "Product not found")
        );
        System.out.println("tim thay: " + product.toString());

        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Kiểm tra xem người dùng hiện tại có phải là người tạo sản phẩm hoặc có quyền admin
        if (!currentUser.equals(product.getUuidUser()) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("P-UP-401", HttpStatus.UNAUTHORIZED, "Update product failed");
        }

        // Cập nhật thông tin sản phẩm
        product.setTitle(updateProductDtoRequest.getTitle());
        product.setMetaTitle(updateProductDtoRequest.getMetaTitle());
        product.setSummary(updateProductDtoRequest.getSummary());
        product.setType(updateProductDtoRequest.getType());
        product.setPrice(updateProductDtoRequest.getPrice());
        product.setQuantity(updateProductDtoRequest.getQuantity());
        product.setPublishedDate(updateProductDtoRequest.getPublishedDate());
        product.setDescription(updateProductDtoRequest.getDescription());

        System.out.println("authentication " + authentication);
        System.out.println("authorities " + authorities);

        // Lưu sản phẩm đã được cập nhật
        this.productRepository.save(product);

        return ProductDetailDtoResponse.from(product);
    }

}
