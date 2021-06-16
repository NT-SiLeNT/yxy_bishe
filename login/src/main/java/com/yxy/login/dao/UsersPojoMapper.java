package com.yxy.login.dao;

import com.yxy.login.model.pojo.UsersPojo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UsersPojoMapper {

//删除
    int deleteByPrimaryKey(String certCode);

    int deleteUserByCert_code(String certCode);

//插入
    int insert(UsersPojo record);

    int insertSelective(UsersPojo record);

//查询
    UsersPojo selectByPrimaryKey(String certCode);

//修改
    int updateByPrimaryKeySelective(UsersPojo record);

    int updateByPrimaryKey(UsersPojo record);

//登录
    UsersPojo selectByAccountNo(String account);

    List<UsersPojo> selectAllUsr(UsersPojo usersPojo);

    List<UsersPojo> selectAllTemporaryUsr(UsersPojo usersPojo);

    List<UsersPojo> selectTimeUser();

    List<UsersPojo> selectAllUsrByKeyWord(String keyWord);

    List<UsersPojo> selectTempUser();
}