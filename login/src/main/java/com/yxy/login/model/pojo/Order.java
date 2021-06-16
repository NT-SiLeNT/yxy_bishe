package com.yxy.login.model.pojo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Order {
    private String id;

    private String productId;

    private String userId;

    private String num;
}