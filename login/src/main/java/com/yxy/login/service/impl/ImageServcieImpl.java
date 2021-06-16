package com.yxy.login.service.impl;

import com.yxy.login.dao.UserImageMapper;
import com.yxy.login.model.dto.ImageDto;
import com.yxy.login.model.pojo.UserImage;
import com.yxy.login.service.ImageServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class ImageServcieImpl implements ImageServcie {

    @Autowired
    private UserImageMapper userImageMapper;

    @Override
    public UserImage insetImage(ImageDto imageDto) {
        UserImage userImage = UserImage.builder()
                .id(UUID.randomUUID().toString())
                .imagePath(imageDto.getPath()).build();
        userImageMapper.insertSelective(userImage);
        return userImage;
    }

    @Override
    public List<UserImage> selectAll() {
        return userImageMapper.selectAll();
    }

    @Override
    public String deleteImage(String id) {
        return String.valueOf(userImageMapper.deleteByPrimaryKey(id));
    }

    private String savePic(InputStream inputStream, String fileName) {

        OutputStream os = null;
        String filepath;
        try {
            String path = "D:\\temp01\\";
            // 2、保存到临时文件
            // 1K的数据缓冲
            byte[] bs = new byte[1024];
            // 读取到的数据长度
            int len;
            // 输出的文件流保存到本地文件

            File tempFile = new File(path);
            if (!tempFile.exists()) {
                tempFile.mkdirs();
            }
            filepath = tempFile.getPath() + File.separator + fileName;
            os = new FileOutputStream(filepath);
            // 开始读取
            while ((len = inputStream.read(bs)) != -1) {
                os.write(bs, 0, len);
            }

        } catch (IOException e) {
            e.printStackTrace();
            filepath = "";
        } catch (Exception e) {
            e.printStackTrace();
            filepath = "";
        } finally {
            // 完毕，关闭所有链接
            try {
                os.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return filepath;
    }
}
