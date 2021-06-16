package com.yxy.login.model.dto;

import lombok.Data;

import java.util.Map;

@Data
public class UserIntegralApiDto {
    /**
     * 请求头
     */
    private Map<String,Object> header;
    /**
     * 请求体
     */
    private Map<String,Object> content;
}
