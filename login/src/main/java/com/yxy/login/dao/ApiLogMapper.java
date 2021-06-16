package com.yxy.login.dao;


import com.yxy.login.model.pojo.ApiLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApiLogMapper {
    int deleteByPrimaryKey(String id);

    int insert(ApiLog record);

    int insertSelective(ApiLog record);

    ApiLog selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(ApiLog record);

    int updateByPrimaryKey(ApiLog record);
}