package com.yxy.login.dao;

import com.yxy.login.model.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface UserDao {
    User selectUserById(@Param("account")String id);
    User insertUser(User user);
    User deleteUserByCert_code(@Param("cert_code")String id);
    User updateUserByCert_code(@Param("cert_code")String id);
    User selectUserByCert_code(@Param("cert_code")String id);
    User updateUserHead(@Param("account")String id);
}
