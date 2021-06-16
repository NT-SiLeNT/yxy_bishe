package com.yxy.login.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDto {
    private String userId;
    private String productId;
    private String num;
}
