package com.yxy.login.dao;


import com.yxy.login.model.pojo.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    int deleteByPrimaryKey(String id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> selectProductList();
}