package com.yxy.login.model.pojo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
//    login表
    private Integer account;
    private String actorname;
    private String password;
    private String orgname;
    private Integer actorno;
    private Integer orgid;
//    user表
    private String cert_code;
    private String cus_name;
    private String cus_type;
    private String cus_status;

}
