package com.yxy.login.service.impl;

import com.yxy.login.dao.OrderMapper;
import com.yxy.login.dao.UsersPojoMapper;
import com.yxy.login.model.dto.OrderDto;
import com.yxy.login.model.pojo.Order;
import com.yxy.login.model.pojo.UsersPojo;
import com.yxy.login.service.OrderService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LogManager.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private UsersPojoMapper usersPojoMapper;

    @Override
    public String buyProduct(OrderDto orderDto) {
        String res = "兑换成功！";
        logger.info("开始插入Order");
        try {
            UsersPojo usersPojo = usersPojoMapper.selectByPrimaryKey(orderDto.getUserId());
            if(null != usersPojo.getIntegral() && !"".equals(usersPojo.getIntegral())){
                Integer integral = Integer.valueOf(usersPojo.getIntegral());
                if(integral > Integer.valueOf(orderDto.getNum())){
                    Order order = Order.builder()
                            .id(UUID.randomUUID().toString())
                            .productId(orderDto.getProductId())
                            .userId(orderDto.getUserId())
                            .num(orderDto.getNum())
                            .build();
                    orderMapper.insertSelective(order);
                    //计算积分
                    integral = integral - Integer.valueOf(orderDto.getNum());
                    usersPojo.setIntegral(String.valueOf(integral));
                    usersPojoMapper.updateByPrimaryKeySelective(usersPojo);
                }else {
                    res = "兑换失败！积分不足！";
                }
            }
        }catch (Exception e){
            logger.info("兑换失败！");
            res = "兑换失败！";
        }

        return res;
    }

    @Override
    public List<Order> queryMyOerder(OrderDto orderDto) {
        return orderMapper.queryMyOerder(orderDto.getUserId());
    }
}
