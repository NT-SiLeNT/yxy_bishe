package com.yxy.login.service;

import com.yxy.login.model.dto.ProductDto;
import com.yxy.login.model.pojo.Product;

import java.util.List;

public interface ProductService {

    /**
     * 查询产品集合
     * @return
     */
    List<Product> queryProductList();

    /**
     * 查询产品详情
     * @return
     */
    Product queryProductDetail(ProductDto productDto);

}
