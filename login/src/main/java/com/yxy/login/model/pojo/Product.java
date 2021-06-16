package com.yxy.login.model.pojo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Product {

    private String id;

    private String productName;

    private String integral;

    private String descript;

}