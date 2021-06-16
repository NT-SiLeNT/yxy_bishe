package com.yxy.login.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxy.login.common.WrapMapper;
import com.yxy.login.common.Wrapper;
import com.yxy.login.model.dto.OrderDto;
import com.yxy.login.model.dto.ProductDto;
import com.yxy.login.model.dto.RequestContentDto;
import com.yxy.login.model.pojo.Product;
import com.yxy.login.service.OrderService;
import com.yxy.login.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pruduct")
public class ProductController {

    private static final Logger logger = LogManager.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @PostMapping("/queryList")
    public Wrapper<List<Product>> queryList(){
        logger.info("开始购买");
        Wrapper<List<Product>> wrapper = null;
        try{

            List<Product> products = productService.queryProductList();

            if(null!=products && 0!=products.size()){
                wrapper = WrapMapper.wrap(200,"查询成功！",products);
            }else {
                wrapper = WrapMapper.wrap(200,"暂无数据！");
            }

        }catch (Exception e){
            wrapper = WrapMapper.wrap(500,"查询失败！");

        }
        return wrapper;
    }

    @PostMapping("/queryDetail")
    public Wrapper<Product> queryDetail(@RequestBody RequestContentDto requestContentDto){
        logger.info("开始购买");

        Wrapper<Product> wrapper = null;

        try{

            JSONObject json = new JSONObject(requestContentDto.getContent());

            ProductDto productDto = ProductDto.builder().productId((String)json.get("productId")).build();

            Product product = productService.queryProductDetail(productDto);

            if(null != product){
                wrapper = WrapMapper.wrap(200,"查询成功！",product);
            }else {
                wrapper = WrapMapper.wrap(500,"查询失败！");
            }

        }catch (Exception e){

            wrapper = WrapMapper.wrap(500,"查询失败！");

        }
        return wrapper;
    }
}
