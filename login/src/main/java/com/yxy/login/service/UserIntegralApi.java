package com.yxy.login.service;

import com.yxy.login.model.dto.UserIntegralApiDto;
import com.yxy.login.model.pojo.ApiLog;

public interface UserIntegralApi {

    /**
     * 保存日志
     * @param apiLog
     * @return
     */
    String saveLog(ApiLog apiLog);

    /**
     * 计算积分
     * @param userIntegralApiDto
     * @return
     */
    String saveIntegral(UserIntegralApiDto userIntegralApiDto);

    /**
     * 更新积分
     * @param userIntegralApiDto
     * @return
     */
    String updateUserIntegral(UserIntegralApiDto userIntegralApiDto);
}
