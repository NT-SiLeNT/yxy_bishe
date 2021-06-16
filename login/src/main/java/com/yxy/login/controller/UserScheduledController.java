package com.yxy.login.controller;

import com.yxy.login.service.LoginService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class UserScheduledController {

    private static final Logger logger = LogManager.getLogger(LoginController.class);

    @Resource
    private LoginService loginService;

    //@Scheduled(cron = "0/5 * * * * ?")
//    @Scheduled(cron = "0 0 0 1/3 * ?")
    public void cleanUser(){
        logger.info("清空临时用户");
        loginService.deleteTemporaryUser();
}
}
