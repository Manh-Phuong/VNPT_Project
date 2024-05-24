package com.manhphuong.nestecom.common.enums;

import lombok.Getter;

@Getter
public enum PaymentMethodEnum {

    CREDIT_CARD(0, "CREDIT_CARD", "Payment by credit card"),
    DEBIT_CARD(1, "DEBIT_CARD","Payment by debit card"),
    PAYPAL(2, "PAYPAL","Payment by PayPal"),
    VNPAY(3, "VNPAY","Payment by VNPay"),
    BANK_TRANSFER(4, "BANK_TRANSFER","Payment by bank transfer"),
    CASH_ON_DELIVERY(5, "CASH_ON_DELIVERY","Payment by cash on delivery");

    private final int methodCode;
    private final String name;
    private final String description;

    PaymentMethodEnum(int methodCode, String name,String description) {
        this.methodCode = methodCode;
        this.name = name;
        this.description = description;
    }
}

