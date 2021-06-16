package com.yxy.login.controller;

import com.alibaba.fastjson.JSON;
import com.yxy.login.common.WrapMapper;
import com.yxy.login.common.Wrapper;
import com.yxy.login.model.dto.UserIntegralApiDto;
import com.yxy.login.model.pojo.ApiLog;
import com.yxy.login.service.UserIntegralApi;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user/integral/api")
public class UserIntegralApiController {

    private static final Logger logger = LogManager.getLogger(LoginController.class);

    @Autowired
    private UserIntegralApi userIntegralApi;

    @PostMapping("/saveIntegral")
    public Wrapper<String> saveIntegral(@RequestBody UserIntegralApiDto userIntegralApiDto){
        logger.info("开始计算积分");

        Wrapper<String> wrapper = null;
        //日志记录
        ApiLog apiLog = getApiLog(userIntegralApiDto);

        try{
            //交易处理
            String res = userIntegralApi.saveIntegral(userIntegralApiDto);
            if("成功！".equals(res)){
                wrapper = WrapMapper.wrap(200,"处理成功！");
            }else {
                wrapper = WrapMapper.wrap(500,"处理失败！");
            }
            apiLog.setResponseBody(JSON.toJSONString(wrapper));
        }catch (Exception e){
            wrapper = WrapMapper.wrap(500,"处理失败！");
            apiLog.setResponseBody(JSON.toJSONString(wrapper));
        }

        try {
            userIntegralApi.saveLog(apiLog);
        }catch (Exception e){
            logger.info("日志记录失败！");
        }

        return wrapper;
    }

    @PostMapping("/updateUserIntegral")
    public Wrapper<String> updateUserIntegral(@RequestBody UserIntegralApiDto userIntegralApiDto){
        logger.info("开始计算积分");

        Wrapper<String> wrapper = null;
        //日志记录
        ApiLog apiLog = getApiLog(userIntegralApiDto);
        try{
            //交易处理
            String res = userIntegralApi.updateUserIntegral(userIntegralApiDto);
            if("成功！".equals(res)){
                wrapper = WrapMapper.wrap(200,"处理成功！");
            }else {
                wrapper = WrapMapper.wrap(500,"处理失败！");
            }
            apiLog.setResponseBody(JSON.toJSONString(wrapper));
        }catch (Exception e){
            wrapper = WrapMapper.wrap(500,"处理失败！");
            apiLog.setResponseBody(JSON.toJSONString(wrapper));
        }

        try {
            userIntegralApi.saveLog(apiLog);
        }catch (Exception e){
            logger.info("日志记录失败！");
        }

        return wrapper;
    }


    private ApiLog getApiLog(UserIntegralApiDto userIntegralApiDto){

        Map<String,Object> header = userIntegralApiDto.getHeader();

        ApiLog apiLog = ApiLog.builder()
                .id(UUID.randomUUID().toString())
                .channel((String) header.get("channel"))
                .apiCode((String) header.get("apiCode"))
                .time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()))
                .serialNum((String) header.get("serialNum"))
                .requestBody(JSON.toJSONString(userIntegralApiDto))
                .build();

        return apiLog;
    }
}
