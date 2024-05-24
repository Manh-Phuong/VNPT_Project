package com.manhphuong.nestecom.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class Constant {
    public static class StatusCode {
        public static final Integer SUCCESS = 0;
        public static final Integer BAD_REQUEST = 400;
        public static final Integer UNAUTHORIZED = 401;
        public static final Integer FORBIDDEN = 403;
        public static final Integer NOT_FOUND = 404;
        public static final Integer METHOD_NOT_ALLOWED = 405;
        public static final Integer NOT_ACCEPTABLE = 406;
        public static final Integer UNSUPPORTED_MEDIA_TYPE = 415;
        public static final Integer INTERNAL_ERR = 500;
        public static final Integer SERVICE_UNAVAILABLE = 503;
    }

//    @Getter
//    public enum ErrorCode {
//        USER_EXISTED(1002, HttpStatus.BAD_REQUEST, "User existed"),
//        USER_NOT_EXISTED(1005, HttpStatus.NOT_FOUND, "User not existed");
//
//        ErrorCode(int code, HttpStatus statusCode, String message) {
//            this.code = code;
//            this.message = message;
//            this.statusCode = statusCode;
//        }
//
//        private int code;
//        private String message;
//        private HttpStatus statusCode;
//    }


}
