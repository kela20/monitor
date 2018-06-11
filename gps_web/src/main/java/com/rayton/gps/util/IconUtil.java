package com.rayton.gps.util;

import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Random;

public class IconUtil {
    private static String[] allowFiles = {".gif", ".png", ".jpg", ".jpeg"};
    private static Logger log = Logger.getLogger(IconUtil.class);

    public static String uploadPic(String path, MultipartFile pic) throws Exception {
        // 未选择上传文件就提交，MultipateFile形参接的实参值并非null，而是empty文件
        // 上传多个文件，即使没有选择要上传的文件，MultipartFile数组也不为null，length值也大于0
        // 呵呵，上面的话是某教程说的，经检测，就是null（假如用AJAX提交并且没用FormData）
        if (pic == null)
            return null;
        // String path = session.getServletContext().getRealPath("img/upload");
        log.warn(path);

        // MultipartFile接口方法：判断文件是否为空
        if (!pic.isEmpty()) {
            // 获取文件的原始名
            String originalFilename = pic.getOriginalFilename();
            log.warn("not emp");
            // 文件名后辍判断文件类型

            if (checkFileType(originalFilename)) {
                log.warn(path);
                String newFileName = String.valueOf(new Random().nextInt()) + originalFilename.substring(originalFilename
                        .lastIndexOf("" + "."));

                File file = new File(path + newFileName);
                if (!file.getParentFile().exists()) {
                    file.getParentFile().mkdirs();
                }
                // 文件上传
                pic.transferTo(file);
                log.warn(newFileName);
                return newFileName;
            } else {
                throw new Exception("文件必须为jpg、png类型图像！");
            }

        }
        return null;

    }

    private static boolean checkFileType(String fileName) {
        Iterator<String> type = Arrays.asList(allowFiles).iterator();
        while (type.hasNext()) {
            String ext = type.next();
            if (fileName.toLowerCase().endsWith(ext)) {
                return true;
            }
        }

        return false;
    }

}
