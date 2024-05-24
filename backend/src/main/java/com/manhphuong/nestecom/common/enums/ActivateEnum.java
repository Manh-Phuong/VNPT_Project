package com.manhphuong.nestecom.common.enums;

import lombok.Getter;

@Getter
public enum ActivateEnum {

    NOT_ACTIVATED(0, "account is not activated"),
    ACTIVATED(1, "account has been activated"),
    BANNED(-1, "account has been banned");

    private final int activateCode;
    private final String description;

    ActivateEnum(int activateCode, String description) {
        this.activateCode = activateCode;
        this.description = description;
    }
}
