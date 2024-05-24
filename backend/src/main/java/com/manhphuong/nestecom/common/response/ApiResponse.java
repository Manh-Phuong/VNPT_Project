package com.manhphuong.nestecom.common.response;

import com.manhphuong.nestecom.common.Constant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {

    private String errorCode; // ma loi quy dinh

    private Integer statusCode; // http status code

    private String message; // message mo ta loi

    private T data;

    public static <T> ApiResponse<T> success(T object) {
        return ApiResponse.<T>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Success")
                .data(object)
                .build();
    }

    public static <T> ApiResponse<T> error(String errorCode, HttpStatus httpStatus, String message) {
        return ApiResponse.<T>builder()
                .errorCode(errorCode)
                .statusCode(httpStatus.value())
                .message(message)
                .build();
    }
}

