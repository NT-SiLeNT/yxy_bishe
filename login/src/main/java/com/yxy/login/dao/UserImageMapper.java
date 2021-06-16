package com.yxy.login.dao;

import com.yxy.login.model.pojo.UserImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserImageMapper {
    int deleteByPrimaryKey(String id);

    int insert(UserImage record);

    int insertSelective(UserImage record);

    UserImage selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(UserImage record);

    int updateByPrimaryKey(UserImage record);

    List<UserImage>selectAll();
}