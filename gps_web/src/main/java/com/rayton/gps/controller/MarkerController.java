package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.MarkerService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MarkerController {
    @Autowired
    private MarkerService markerService;


    @RequiresPermissions("baseinfo.marker")
    @Log(name = "打开车辆图标页面")
    @GetMapping("/marker/marker.iframe")
    public String index() {
        return "/baseinfo/marker/marker.iframe";
    }

    @PostMapping(value = "/marker/query")
    @ResponseBody
    public Object query(HttpServletRequest request) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        String path = request.getServletContext().getRealPath("/static/icons");

        Page<MarkerFileInfo> page = new Page<>();
        page.rows = markerService.getMarkerFiles(identity.getCompanyId());
        page.total = page.rows.size();
        return page;
    }

    @GetMapping("/marker/upload.form")
    public String upload() {
        return "/baseinfo/marker/upload.form";
    }

    @PostMapping(value = "/marker/upload.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> upload(@RequestParam("file") MultipartFile file, HttpServletRequest
            request) throws Exception {

        Assert.isTrue(file.isEmpty(), "文件不能为空！");
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        String path = request.getServletContext().getRealPath("/static/icons");
        markerService.saveMarkerFile(file, path, identity.getCompanyId());
        Map<Object, Object> map = new HashMap<>();
        map.put("error", "ok...");
        return new ResponseEntity<>(map, HttpStatus.OK);
        // try {
        //     if (file.isEmpty()) {
        //         WebUtil.error(r, "文件不能为空！");
        //     } else {
        //         String path = request.getServletContext().getRealPath("/static/icons");
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
    public ResponseEntity<Map<Object, Object>> delete(@RequestParam String name, HttpServletRequest request) throws
            Exception {
        Assert.isTrue(name.equalsIgnoreCase("00.png"), "不能删除系统默认图标！");
        String path = request.getServletContext().getRealPath("/static/icons");
        Assert.isTrue(!markerService.deleteMarkerFile(path, name), "删除文件失败！");

        Map<Object, Object> map = new HashMap<>();
        map.put("error", "ok...");
        return new ResponseEntity<>(map, HttpStatus.OK);
        // try {
        //     if (name.equalsIgnoreCase("00.png")) {
        //         WebUtil.error(r, "不能删除系统默认图标！");
        //     } else {
        //         String path = request.getServletContext().getRealPath("/static/icons");
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
