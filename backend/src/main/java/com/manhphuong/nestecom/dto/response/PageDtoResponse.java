package com.manhphuong.nestecom.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageDtoResponse<T> {
    @Builder.Default
    private Integer page = 1;
    @Builder.Default
    private Integer pageSize = 10;
    @Builder.Default
    private Long totalElements = 0L;
    @Builder.Default
    private Long totalPages = 0L;
    @Builder.Default
    private List<T> data = new ArrayList<>();

    public static <T> PageDtoResponse<T> from(Integer page, Integer pageSize, Long totalElements, List<T> data) {
        Long totalPages = totalElements / pageSize;
        if (totalElements % pageSize != 0) {
            totalPages++;
        }
        return PageDtoResponse.<T>builder()
                .page(page)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .data(data)
                .build();
    }
}
