package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CenterController {

    @RequiresPermissions("center")
    @ServiceMethod(id = "center", prefix = "打开", name = "监控中心", suffix = "页面")
    @RequestMapping("/center")
    public String index() throws Exception {

        // throw new Exception("fuck");
        // return "/center/index";
        // TODO
        return "/center/new/index";
    }
}