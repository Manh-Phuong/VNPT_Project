package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.dto.request.product.CreateProductDtoRequest;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.product.UpdateProductDtoRequest;
import com.manhphuong.nestecom.dto.response.product.CreateProductDtoResponse;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.product.ProductDetailDtoResponse;
import com.manhphuong.nestecom.dto.response.product.ProductListDtoResponse;

public interface ProductService {
    // Xem chi tiết thông tin 1 sản phẩm
    // Xem danh sách sản phẩm theo người dùng
    // Tạo sản phẩm
    // Cập nhật sản phẩm
    // Xóa sản phẩm tạm thời
    // Khôi phục sản phẩm xóa tạm thời
    // Xóa thật sản phẩm
    // Đánh dấu yêu thích
    //
    PageDtoResponse<ProductListDtoResponse> listProduct(PageDtoRequest pageDtoRequest, String uuidUser);

    ProductDetailDtoResponse getDetailProductPrivate(String id);

    ProductDetailDtoResponse getDetailProduct(String id);

    CreateProductDtoResponse createProduct(CreateProductDtoRequest createProductDtoRequest, String uuidUser);

    void deleteTempProduct(String id, String uuidUser);

    void restoreProduct(String id, String uuidUser);

    //    void deleteReallyProduct(String id, String uuidUser);
    void deleteReallyProduct(String id);

    ProductDetailDtoResponse updateProduct(UpdateProductDtoRequest updateProductDtoRequest);
//    void markFavorite(String id, String email);
}
