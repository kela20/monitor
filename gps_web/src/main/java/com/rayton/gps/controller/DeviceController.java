package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.common.Tuple;
import com.rayton.gps.dao.baseinfo.device.Device;
import com.rayton.gps.dao.baseinfo.user.User;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.model.baseinfo.DeviceModel;
import com.rayton.gps.service.DeviceService;
import com.rayton.gps.util.WebUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Controller
public class DeviceController {
    @Autowired
    private DeviceService deviceService;


    @RequiresPermissions("baseinfo.device")
    @ServiceMethod(id = "baseinfo.device", pid = "baseinfo", prefix = "打开", name = "终端管理", suffix = "页面")
    @RequestMapping("/device/device.iframe")
    public String index() {
        return "/baseinfo/device/device.iframe";
    }

    @RequestMapping(value = "/device/query", method = RequestMethod.POST)
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return deviceService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
    }

    @RequestMapping(value = "/device/search", method = RequestMethod.POST)
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        try {
            return deviceService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/device/free", method = RequestMethod.POST)
    @ResponseBody
    public Object free(@RequestParam(required = false) String deviceNumber, @RequestParam int pageIndex,
                       @RequestParam int pageSize, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        deviceNumber = deviceNumber == null ? "" : deviceNumber;
        try {
            return deviceService.free(identity.getCompanyId(), deviceNumber, pageIndex, pageSize);
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/device/create.form", method = RequestMethod.GET)
    public String create(Model model) {
        DeviceModel m = new DeviceModel();
        m.setEnable(true);
        model.addAttribute("editor", m);
        return "/baseinfo/device/create.form";
    }

    @RequestMapping(value = "/device/create.form", method = RequestMethod.POST)
    public String create(@ModelAttribute("editor") @Valid DeviceModel m, BindingResult binding, Model model,
                         HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors())
            return "/baseinfo/device/create.form";

        try {
            IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
            m.setCompanyId(identity.getCompanyId());
            deviceService.create(m.getDevice(), m.getUser());
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping("/device/edit.form")
    public String edit(@RequestParam String id, Model model) throws Exception {
        Tuple<Device, User> tuple = deviceService.fetch(id);
        DeviceModel m = new DeviceModel();
        m.fill(tuple.e);
        m.fill(tuple.t);
        model.addAttribute("editor", m);
        return "/baseinfo/device/edit.form";
    }

    @RequestMapping(value = "/device/edit.form", method = RequestMethod.POST)
    public String edit(@ModelAttribute("editor") @Valid DeviceModel m, BindingResult binding, Model model,
                       HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors())
            return "/baseinfo/device/edit.form";

        try {
            IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

            m.setCompanyId(identity.getCompanyId());
            deviceService.update(m.getDevice(), m.getUser());
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/device/delete", method = RequestMethod.POST)
    public String delete(@RequestParam String id, RedirectAttributes r) {
        try {
            deviceService.delete(id);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/device/exist", method = RequestMethod.POST)
    public void exists(@RequestParam String deviceNumber, @RequestParam(required = false) String id, @RequestParam
            boolean checkId, HttpServletResponse response) throws Exception {
        if (checkId) {
            response.getWriter().print(!deviceService.exist(deviceNumber, id));
        } else {
            response.getWriter().print(!deviceService.exist(deviceNumber));
        }
    }
}