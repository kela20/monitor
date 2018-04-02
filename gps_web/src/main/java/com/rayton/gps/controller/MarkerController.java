package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import com.rayton.gps.service.MarkerService;
import com.rayton.gps.util.WebUtil;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MarkerController {
    @Autowired
    private MarkerService markerService;


    @RequiresPermissions("baseinfo.marker")
    @ServiceMethod(id = "baseinfo.marker", pid = "baseinfo", prefix = "打开", name = "车辆图标", suffix = "页面")
    @RequestMapping("/marker/marker.iframe")
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

    @RequestMapping("/marker/upload.form")
    public String upload() {
        return "/baseinfo/marker/upload.form";
    }

    @RequestMapping(value = "/marker/upload.form", method = RequestMethod.POST)
    public String upload(@RequestParam("file") MultipartFile file, RedirectAttributes r, HttpServletRequest request) {
        try {
            if (file.isEmpty()) {
                WebUtil.error(r, "文件不能为空！");
            } else {
                String path = request.getServletContext().getRealPath("/resources/icons");
                markerService.saveMarkerFile(file, path);
                WebUtil.success(r);
            }
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/marker/delete", method = RequestMethod.POST)
    public String delete(@RequestParam String name, RedirectAttributes r, HttpServletRequest request) {
        try {
            if (name.equalsIgnoreCase("00.png")) {
                WebUtil.error(r, "不能删除系统默认图标！");
            } else {
                String path = request.getServletContext().getRealPath("/resources/icons");
                if (markerService.deleteMarkerFile(path, name))
                    WebUtil.success(r);
                else
                    WebUtil.error(r, "删除文件失败！");
            }
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }
}