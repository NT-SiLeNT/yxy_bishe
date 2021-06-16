package com.yxy.login.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.yxy.login.dao.UserDao;
import com.yxy.login.dao.UsersPojoMapper;
import com.yxy.login.model.dto.RequestContentDto;
import com.yxy.login.model.pojo.User;
import com.yxy.login.model.pojo.UsersPojo;
import com.yxy.login.service.LoginService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    private static final Logger logger = LogManager.getLogger(LoginServiceImpl.class);

    @Resource
    private UsersPojoMapper usersPojoMapper;

    @Override
    public UsersPojo userLogin(String id, String password) {
       logger.info("判断登录信息！");
       UsersPojo user = usersPojoMapper.selectByAccountNo(id);

       if(null!=password){
           if (password.equals(user.getPassword())){
               return user;
           }else{
               return null;
           }
       }
        return null;
    }


    @Override
    public String saveUser(User user) {
        return null;
    }

    @Override
    public String saveUser1(UsersPojo usersPojo) {
        int i = usersPojoMapper.insertSelective(usersPojo);
        return String.valueOf(i);
    }

    @Override
    public boolean saveUser2(String certCode) {
        logger.info("判断查询信息！");
        UsersPojo user = usersPojoMapper.selectByPrimaryKey(certCode);
        if(null!=certCode){
            if (certCode.equals(user.getCertCode())){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    @Override
    public UsersPojo queryUser(String id) {
        UsersPojo user = usersPojoMapper.selectByPrimaryKey(id);
        return user;
    }

    @Override
    public List<UsersPojo> queryAllUser(RequestContentDto requestContentDto) {
        JSONObject json = new JSONObject(requestContentDto.getContent());
        String certCode = (String) json.get("cert_code");
        String cusName = (String) json.get("cus_name");
        String keyWords = (String) json.get("keyWords");
        List<UsersPojo> usersPojoList = null;
        if(null!=keyWords && !"".equals(keyWords)){
            usersPojoList = usersPojoMapper.selectAllUsrByKeyWord(keyWords);

        }else {
            UsersPojo usersPojo = UsersPojo.builder()
                    .certCode(certCode)
                    .cusName(cusName)
                    .build();
            usersPojoList = usersPojoMapper.selectAllUsr(usersPojo);
        }

        return usersPojoList;
    }

    @Override
    public String deleteTemporaryUser() {
        List<UsersPojo> usersPojoList = usersPojoMapper.selectTimeUser();
        for (UsersPojo usersPojo : usersPojoList){
            usersPojoMapper.deleteByPrimaryKey(usersPojo.getCertCode());
        }
        return null;
    }

    @Override
    public String deleteUserByCert_code(String id) {
            usersPojoMapper.deleteUserByCert_code(id);
        return null;
    }

//    更新密码
    @Override
    public String updatePassword(String id,String passWord) {
        UsersPojo usersPojo = new UsersPojo();
        usersPojo.setCertCode(id);
        usersPojo.setPassword(passWord);
        usersPojoMapper.updateByPrimaryKeySelective(usersPojo);
        return "更新完毕";
    }

//    查询余额
    @Override
    public String queryIntegral(String id) {
        UsersPojo usersPojo = usersPojoMapper.selectByPrimaryKey(id);
        return usersPojo.getIntegral();
    }

    @Override
    public String updateUser(UsersPojo users) {
        return String.valueOf(usersPojoMapper.updateByPrimaryKeySelective(users));
    }

    @Override
    public List<UsersPojo> selectTempUser(RequestContentDto requestContentDto) {
        return usersPojoMapper.selectTempUser();
    }
}
