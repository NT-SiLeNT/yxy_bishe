package com.yxy.login.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxy.login.common.WrapMapper;
import com.yxy.login.common.Wrapper;
import com.yxy.login.model.dto.OrderDto;
import com.yxy.login.model.dto.RequestContentDto;
import com.yxy.login.model.pojo.Order;
import com.yxy.login.service.OrderService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private static final Logger logger = LogManager.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping("/buyProduct")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<String> buyProduct(@RequestBody RequestContentDto requestContentDto){
        logger.info("开始购买");
        Wrapper<String> wrapper = null;
        try{

            JSONObject json = new JSONObject(requestContentDto.getContent());
            OrderDto orderDto  = OrderDto.builder()
                    .productId((String) json.get("productId"))
                    .userId((String) json.get("userId"))
                    .num((String) json.get("num"))
                    .build();

            String res = orderService.buyProduct(orderDto);

            if("兑换成功！".equals(res)){
                wrapper = WrapMapper.wrap(200,"兑换成功！",res);
            }else {
                wrapper = WrapMapper.wrap(500,"兑换失败！",res);
            }

        }catch (Exception e){
            wrapper = WrapMapper.wrap(500,"兑换失败！");

        }
        return wrapper;
    }

    @PostMapping("/queryMyOerder")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<List<Order>> queryMyOerder(@RequestBody RequestContentDto requestContentDto){
        logger.info("开始购买");
        Wrapper<List<Order>> wrapper = null;
        try{

            JSONObject json = new JSONObject(requestContentDto.getContent());
            OrderDto orderDto  = OrderDto.builder()
                    .userId((String) json.get("userId"))
                    .build();

            List<Order> res = orderService.queryMyOerder(orderDto);

            if(0 != res.size()){
                wrapper = WrapMapper.wrap(200,"查询成功！",res);
            }else {
                wrapper = WrapMapper.wrap(200,"暂无数据！",res);
            }

        }catch (Exception e){
            wrapper = WrapMapper.wrap(500,"查询失败！");

        }
        return wrapper;
    }
}
