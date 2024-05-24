package com.manhphuong.nestecom.common.controller;

import com.manhphuong.nestecom.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public abstract class AbstractResponseController {
    public <T> ResponseEntity<ApiResponse<T>> responseEntity(CallbackFunction<T> callback) {
        T result = callback.execute();
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}