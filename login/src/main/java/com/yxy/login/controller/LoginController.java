package com.yxy.login.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxy.login.common.WrapMapper;
import com.yxy.login.common.Wrapper;
import com.yxy.login.dao.UsersPojoMapper;
import com.yxy.login.model.dto.RequestContentDto;
import com.yxy.login.model.pojo.User;
import com.yxy.login.model.pojo.UsersPojo;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class LoginController {

    private static final Logger logger = LogManager.getLogger(LoginController.class);

    @Resource
    private com.yxy.login.service.LoginService loginService;

//    登录
    @PostMapping("/login")
    public Wrapper<UsersPojo> selectAll(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 selectAll");
        Wrapper<UsersPojo> wrapper = null;
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String id = (String) json.get("account");
            String password = (String) json.get("password");
            UsersPojo res  = loginService.userLogin(id,password);
            if (null != res){
                wrapper = WrapMapper.wrap(200,"登录成功！",res);
                logger.info("登录成功！");
            }else {
                wrapper = WrapMapper.wrap(500,"登录失败！");
                logger.info("登录失败！");
            }
        }catch (Exception e){
            logger.error(e.getMessage());
            wrapper = WrapMapper.wrap(400,"登录失败！");
        }

        return wrapper;
    }

//    添加客户
    @PostMapping("/user/insert")
    public Wrapper<String> insertUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 insertUser");
        Wrapper<String> wrapper = null;
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            UsersPojo user = UsersPojo.builder()
                    .certCode((String)json.get("cert_code"))
                    .cusName((String)json.get("cus_name"))
                    .certType((String)json.get("cert_type"))
                    .indivSex((String)json.get("indiv_sex"))
                    .indivDtOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse((String) json.get("indiv_dt_of_birth")))
                    .indivCountry((String)json.get("indiv_country"))
                    .postAddr((String)json.get("post_addr"))
                    .postCode((String)json.get("post_code"))
                    .mobile((String)json.get("mobile"))
                    .lastUpdDate(new SimpleDateFormat("yyyy-MM-dd").parse((String) json.get("last_upd_date")))
                    .inputDate(new SimpleDateFormat("yyyy-MM-dd").parse((String) json.get("input_date")))
                    .indivNtn((String)json.get("indiv_ntn"))
                    .regAdd((String)json.get("reg_add"))
                    .nowAdd((String)json.get("now_add"))
//                    .certExpDt(new SimpleDateFormat("yyyy-MM-dd").parse((String) json.get("cert_exp_dt")))
//                    .longFlag((String)json.get("long_flag"))
//                    .newCus((String)json.get("new_cus"))
                    .sameNowAdd((String)json.get("same_now_add"))
                    .areaName((String)json.get("area_name"))
                    .areaCode((String)json.get("area_code"))
                    .mobileSec((String)json.get("mobile_sec"))
                    .phone((String)json.get("phone"))
                    .email((String)json.get("email"))
                    .cusStatus((String)json.get("cus_status"))
                    .build();
            String res = loginService.saveUser1(user);
            if ("1".equals(res)){
                wrapper = WrapMapper.wrap(200,"插入成功！");
            }else {
                wrapper = WrapMapper.wrap(500,"插入失败！");
            }
        }catch (Exception e){
            logger.error(e.getMessage());
            wrapper = WrapMapper.wrap(100001,"发生异常，请检查日志！");
        }
        return wrapper;
    }

//    查找客户
    @PostMapping("/user/select")
    public UsersPojo selectUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 selectUser");
        //Wrapper<UsersPojo> wrapper = null;
        UsersPojo res;
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String id = (String) json.get("id");
            res  = loginService.queryUser(id);
            if (res == null){
                res = new UsersPojo();
            }
        }catch (Exception e) {
            res = new UsersPojo();
        }
            return res;
        }

    @PostMapping("/user/selectAllUser")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public List<UsersPojo> selectAllUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 selectAllUser");
        List<UsersPojo> res;
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String flag = (String) json.get("flag");
            if("0".equals(flag)){
                res = loginService.selectTempUser(requestContentDto);
            }else {
                res = loginService.queryAllUser(requestContentDto);
            }
            if (res == null){
                res = new ArrayList<>();
            }
        }catch (Exception e) {
            res = new ArrayList<>();
        }
        return res;
    }

    @PostMapping("/user/selectTempUser")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public List<UsersPojo> selectTempUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 selectAllUser");
        List<UsersPojo> res;
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String flag = (String) json.get("flag");
            if("0".equals(flag)){
                res = loginService.selectTempUser(requestContentDto);
            }else {
                res = loginService.selectTempUser(requestContentDto);
            }

            if (res == null){
                res = new ArrayList<>();
            }
        }catch (Exception e) {
            res = new ArrayList<>();
        }
        return res;
    }

    //    修改密码
    @PostMapping("/user/updatePassword")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<String> updatePassword(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 updatePassword");
        String res = "";
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String id = (String)json.get("cert_code");
            String passWord = (String)json.get("passWord");
            res = loginService.updatePassword(id,passWord);
        }catch (Exception e) {
        }
        return WrapMapper.wrap(200,"更新完毕",res);
    }

    //    删除临时用户
    @PostMapping("/user/deleteTemporaryUser")
    public String deleteTemporaryUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 deleteTemporaryUser");
        String res = "";
        try {
            res = loginService.deleteTemporaryUser();
        }catch (Exception e) {
        }
        return res;
    }

    //    删除用户
    @PostMapping("/user/delete")
    public Wrapper<String> deleteUserByCert_code(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 deleteUserByCert_code");
        Wrapper<String> wrapper = null;
        String res = "";
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String id = (String)json.get("cert_code");
            res = loginService.deleteUserByCert_code(id);
            wrapper=WrapMapper.wrap(200,"删除成功");
        }catch (Exception e) {
        }
        return wrapper;
    }

    //查询余额
    @PostMapping("/user/queryIntegral")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<String> queryIntegral(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 queryIntegral");
        Wrapper<String> wrapper = null;
        String res = "";
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            String id = (String)json.get("cert_code");
            res = loginService.queryIntegral(id);
            wrapper=WrapMapper.wrap(200,"查询成功",res);
        }catch (Exception e) {
        }
        return wrapper;
    }

    //修改用户信息
    @PostMapping("/user/updateUser")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<String> updateUser(@RequestBody RequestContentDto requestContentDto){
        logger.info("进入方法 queryIntegral");
        Wrapper<String> wrapper = null;
        String res = "";
        try {
            JSONObject json = new JSONObject(requestContentDto.getContent());
            UsersPojo user = UsersPojo.builder()
                    .certCode((String)json.get("certCode"))
                    .postAddr((String)json.get("postAddr"))
                    .postCode((String)json.get("postCode"))
                    .mobile((String)json.get("mobile"))
                    .email((String)json.get("email"))
                    .cusName((String)json.get("cusName"))
                    .build();
            res = loginService.updateUser(user);
            if("1".equals(res)){
                wrapper=WrapMapper.wrap(200,"修改成功");
            }else {
                wrapper=WrapMapper.wrap(500,"修改失败");
            }
        }catch (Exception e) {
            wrapper=WrapMapper.wrap(500,"系统错误");
        }
        return wrapper;
    }
}



