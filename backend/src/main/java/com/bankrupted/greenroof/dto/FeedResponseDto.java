package com.bankrupted.greenroof.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class FeedResponseDto<E> {
    private List<E> contentList;
    private Integer pageNo;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean last;
}
