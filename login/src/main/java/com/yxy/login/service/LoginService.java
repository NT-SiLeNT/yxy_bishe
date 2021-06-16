package com.yxy.login.service;

import com.alibaba.fastjson.JSONObject;
import com.yxy.login.model.dto.RequestContentDto;
import com.yxy.login.model.pojo.User;
import com.yxy.login.model.pojo.UsersPojo;

import java.util.List;

public interface LoginService {
    UsersPojo userLogin(String id,String password);
    String saveUser(User user);
    String saveUser1(UsersPojo usersPojo);

//    String saveUser2(UsersPojo usersPojo);
    boolean saveUser2(String certCode);
    UsersPojo queryUser(String id);
    List<UsersPojo> queryAllUser(RequestContentDto requestContentDto);

    String deleteTemporaryUser();

    String deleteUserByCert_code(String id);

    String updatePassword(String id,String passWord);

    String queryIntegral(String id);

    String updateUser(UsersPojo users);

    List<UsersPojo> selectTempUser(RequestContentDto requestContentDto);
}
