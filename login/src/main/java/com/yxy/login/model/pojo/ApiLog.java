package com.yxy.login.model.pojo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiLog {
    private String id;

    private String channel;

    private String time;

    private String requestBody;

    private String responseBody;

    private String apiCode;

    private String serialNum;
}