package com.yxy.login.model.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersPojo {

    private String certCode;

    private String cusName;

    private String certType;

    private String indivSex;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date indivDtOfBirth;

    private String indivCountry;

    private String postAddr;

    private String postCode;

    private String mobile;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date lastUpdDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date inputDate;

    private String account;

    private String password;

    private String indivNtn;

    private String regAdd;

    private String nowAdd;

 /*   private Date certExpDt;

    private String longFlag;

    private String newCus;*/

    private String sameNowAdd;

    private String areaName;

    private String areaCode;

    private String mobileSec;

    private String phone;

    private String email;

    private String cusStatus;

    private String integral;

    private String imgurl;
}