package com.yxy.login.model.dto;

import lombok.Data;

import java.util.Map;

@Data
public class RequestContentDto {
    private Map<String,Object> header;
    private Map<String,Object> content;
}
