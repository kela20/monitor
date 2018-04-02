package com.rayton.gps.service;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MarkerService {
    @Autowired
    private VehicleService vehicleService;

    public List<MarkerFileInfo> getMarkerFiles(String path) {
        File file = new File(path);
        File[] list = file.listFiles();
        List<MarkerFileInfo> icons = new ArrayList<MarkerFileInfo>();
        for (int i = 0; i < list.length; i++) {
            File icon = list[i];
            if (icon.isFile()) {
                MarkerFileInfo info = new MarkerFileInfo();
                info.setName(icon.getName());
                Long time = icon.lastModified();
                info.setTime(new Date(time));
                icons.add(info);
            }
        }

        return icons;
    }


    @RequiresPermissions("baseinfo.marker.remove")
    @ServiceMethod(id = "baseinfo.marker.remove", pid = "baseinfo.marker", name = "删除车辆图标")
    public boolean deleteMarkerFile(String path, String name) throws Exception {
        File dest = new File(path, name);
        if (dest.delete()) {
            vehicleService.resetMarker(name, "00.png");
            return true;
        } else
            return false;
    }

    @RequiresPermissions("baseinfo.marker.save")
    @ServiceMethod(id = "baseinfo.marker.save", pid = "baseinfo.marker", name = "上传车辆图标")
    public void saveMarkerFile(MultipartFile file, String path) throws Exception {
        String fileName = file.getOriginalFilename().toLowerCase();
        // 检查是否为jpg、png、gif文件
        if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".gif")) {
            throw new Exception("文件必须为jpg、png、gif类型图像！");
        }

        File dest = new File(path, fileName);
        file.transferTo(dest);
    }
}