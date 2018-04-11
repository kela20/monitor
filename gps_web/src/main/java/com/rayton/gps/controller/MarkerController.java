package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import com.rayton.gps.service.MarkerService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MarkerController {
    @Autowired
    private MarkerService markerService;


    @RequiresPermissions("baseinfo.marker")
    @Log(id = "baseinfo.marker", pid = "baseinfo", prefix = "打开", name = "车辆图标", suffix = "页面")
    @GetMapping("/marker/marker.iframe")
    public String index() {
        return "/baseinfo/marker/marker.iframe";
    }

    @RequestMapping(value = "/marker/query", method = RequestMethod.POST)
    @ResponseBody
    public Object query(HttpServletRequest request) {
        String path = request.getServletContext().getRealPath("/resources/icons");

        Page<MarkerFileInfo> page = new Page<MarkerFileInfo>();
        page.rows = markerService.getMarkerFiles(path);
        page.total = page.rows.size();
        return page;
    }

    @GetMapping("/marker/upload.form")
    public String upload() {
        return "/baseinfo/marker/upload.form";
    }

    @PostMapping(value = "/marker/upload.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file, HttpServletRequest
            request) throws Exception {

        Assert.isTrue(file.isEmpty(), "文件不能为空！");
        String path = request.getServletContext().getRealPath("/resources/icons");
        markerService.saveMarkerFile(file, path);
        Map<String, Object> map = new HashMap<>();
        map.put("error", "ok...");
        return new ResponseEntity<>(map, HttpStatus.OK);
        // try {
        //     if (file.isEmpty()) {
        //         WebUtil.error(r, "文件不能为空！");
        //     } else {
        //         String path = request.getServletContext().getRealPath("/resources/icons");
        //         markerService.saveMarkerFile(file, path);
        //         WebUtil.success(r);
        //     }
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/marker/delete")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> delete(@RequestParam String name, HttpServletRequest request) throws
            Exception {
        Assert.isTrue(name.equalsIgnoreCase("00.png"), "不能删除系统默认图标！");
        String path = request.getServletContext().getRealPath("/resources/icons");
        Assert.isTrue(!markerService.deleteMarkerFile(path, name), "删除文件失败！");

        Map<String, Object> map = new HashMap<>();
        map.put("error", "ok...");
        return new ResponseEntity<>(map, HttpStatus.OK);
        // try {
        //     if (name.equalsIgnoreCase("00.png")) {
        //         WebUtil.error(r, "不能删除系统默认图标！");
        //     } else {
        //         String path = request.getServletContext().getRealPath("/resources/icons");
        //         if (markerService.deleteMarkerFile(path, name))
        //             WebUtil.success(r);
        //         else
        //             WebUtil.error(r, "删除文件失败！");
        //     }
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }
}
