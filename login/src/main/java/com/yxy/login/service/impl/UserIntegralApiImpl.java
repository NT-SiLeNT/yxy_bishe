package com.yxy.login.service.impl;

import com.yxy.login.dao.ApiLogMapper;
import com.yxy.login.dao.UsersPojoMapper;
import com.yxy.login.model.dto.UserIntegralApiDto;
import com.yxy.login.model.pojo.ApiLog;
import com.yxy.login.model.pojo.User;
import com.yxy.login.model.pojo.UsersPojo;
import com.yxy.login.service.UserIntegralApi;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserIntegralApiImpl implements UserIntegralApi {

    private static final Logger logger = LogManager.getLogger(LoginServiceImpl.class);

    @Autowired
    private ApiLogMapper apiLogMapper;

    @Autowired
    private UsersPojoMapper usersPojoMapper;

    @Override
    public String saveLog(ApiLog apiLog) {
        int insert = apiLogMapper.insertSelective(apiLog);
        return String.valueOf(insert);
    }

    @Override
    public String saveIntegral(UserIntegralApiDto userIntegralApiDto) {
        logger.info("开始处理积分");
        String res = "成功！";
        String id = (String) userIntegralApiDto.getContent().get("userId");
        String custmerNum = (String) userIntegralApiDto.getContent().get("custmerNum");
        Integer integral = Integer.valueOf(custmerNum) * 10;
        UsersPojo usersPojo = usersPojoMapper.selectByPrimaryKey(id);
        if(null != usersPojo.getIntegral() && !"".equals(usersPojo.getIntegral())){
            Integer inte = Integer.valueOf(usersPojo.getIntegral());
            integral = integral + inte;
        }
        usersPojo.setIntegral(String.valueOf(integral));
        int i = usersPojoMapper.updateByPrimaryKeySelective(usersPojo);
        if(0==i){
            res = "失败！";
        }
        return res;
    }

    @Override
    public String updateUserIntegral(UserIntegralApiDto userIntegralApiDto) {
        logger.info("开始更新积分");
        String res = "成功！";
        String id = (String) userIntegralApiDto.getContent().get("userId");
        String integral = (String) userIntegralApiDto.getContent().get("integral");
        //更新标记 0+ 1-
        String flag = (String) userIntegralApiDto.getContent().get("flag");
        UsersPojo usersPojo = usersPojoMapper.selectByPrimaryKey(id);
        Integer integ = Integer.valueOf(usersPojo.getIntegral());
        if ("0".equals(flag)){
            integ = integ + Integer.valueOf(integral);
        }else {
            integ = integ - Integer.valueOf(integral);
        }
        usersPojo.setIntegral(String.valueOf(integ));
        int i = usersPojoMapper.updateByPrimaryKeySelective(usersPojo);
        if(0==i){
            res = "失败！";
        }
        return res;
    }
}
