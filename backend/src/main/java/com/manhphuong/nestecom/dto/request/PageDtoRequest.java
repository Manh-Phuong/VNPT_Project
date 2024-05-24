package com.manhphuong.nestecom.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PageDtoRequest {
    @NotNull
    @Min(value = 1)
    private Integer page = 1;

    @NotNull
    @Min(value = 1)
    @Max(value = 500)
    private Integer pageSize = 10;
}
