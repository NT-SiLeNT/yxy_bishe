package com.yxy.login.service;

import com.yxy.login.model.dto.OrderDto;
import com.yxy.login.model.pojo.Order;

import java.util.List;

public interface OrderService {

    /**
     * 产品兑换
     * @param orderDto
     * @return
     */
    String buyProduct(OrderDto orderDto);


    List<Order> queryMyOerder(OrderDto orderDto);
}
