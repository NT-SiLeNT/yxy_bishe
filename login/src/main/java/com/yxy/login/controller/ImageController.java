package com.yxy.login.controller;

import com.yxy.login.common.WrapMapper;
import com.yxy.login.common.Wrapper;
import com.yxy.login.model.dto.ImageDto;
import com.yxy.login.model.pojo.UserImage;
import com.yxy.login.service.ImageServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ImageController {

    @Autowired
    private ImageServcie imageServcie;

    @PostMapping("/importImg")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public UserImage importImg(@RequestBody ImageDto imageDto) throws Exception {
        UserImage userImage = imageServcie.insetImage(imageDto);
        return userImage;
    }

    @PostMapping("/selectAllImg")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public List<UserImage> selectAllImg(MultipartFile file) throws Exception {
        List<UserImage> userImageList = imageServcie.selectAll();
        return userImageList;
    }

    @PostMapping("/deleteImg")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public Wrapper<String> selectAllImg(@RequestBody ImageDto imageDto) throws Exception {
        Wrapper<String> wrapper = null;
        String res = imageServcie.deleteImage(imageDto.getId());
        if(!"0".equals(res)){
            wrapper = WrapMapper.wrap(200,"处理成功！");
        }else{
            wrapper = WrapMapper.wrap(500,"处理失败！");
        }
        return wrapper;
    }
}