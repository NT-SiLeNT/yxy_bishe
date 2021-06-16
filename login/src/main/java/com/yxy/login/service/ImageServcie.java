package com.yxy.login.service;

import com.yxy.login.model.dto.ImageDto;
import com.yxy.login.model.pojo.UserImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageServcie {

    UserImage insetImage(ImageDto imageDto);

    List<UserImage> selectAll();

    String deleteImage(String id);

}
