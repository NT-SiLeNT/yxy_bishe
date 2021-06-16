package com.yxy.login.service.impl;

import com.yxy.login.dao.ProductMapper;
import com.yxy.login.model.dto.ProductDto;
import com.yxy.login.model.pojo.Product;
import com.yxy.login.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> queryProductList() {
        logger.info("查询产品列表");
        return productMapper.selectProductList();
    }

    @Override
    public Product queryProductDetail(ProductDto productDto) {
        logger.info("查询产品详情");
        return productMapper.selectByPrimaryKey(productDto.getProductId());
    }
}
