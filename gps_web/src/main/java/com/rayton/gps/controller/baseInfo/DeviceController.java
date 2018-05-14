package com.rayton.gps.controller.baseInfo;

import com.rayton.gps.aop.Log;
import com.rayton.gps.common.Tuple;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.device.Device;
import com.rayton.gps.dao.baseinfo.device.DeviceInfo;
import com.rayton.gps.dao.baseinfo.device.IDeviceDao;
import com.rayton.gps.dao.baseinfo.user.User;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.model.baseinfo.DeviceModel;
import com.rayton.gps.service.DeviceService;
import com.rayton.gps.util.ResponseEntityWrapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    //
    @Autowired
    private IDeviceDao deviceDao;

    @RequiresPermissions("baseinfo.device")
    @Log(name = "打开终端管理页面")
    @GetMapping("/device/device.iframe")
    public String index() {
        return "/baseinfo/device/device.iframe";
    }

    @GetMapping(value = "/device/query")
    @ResponseBody
    public Object query(@RequestParam(required = false) String filter, @RequestParam int page, @RequestParam int
            limit) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        Page<DeviceInfo> result = deviceService.query(identity.getCompanyId(), filter, page, limit);


        result.code = 0;
        result.count = result.total;
        result.data = result.rows;
        // result.msg = "mmp";
        return result;
    }

    @PostMapping(value = "/device/search")
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        return deviceService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // try {
        //     return deviceService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @PostMapping(value = "/device/free")
    @ResponseBody
    public Object free(@RequestParam(required = false) String deviceNumber, @RequestParam int pageIndex,
                       @RequestParam int pageSize) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        deviceNumber = deviceNumber == null ? "" : deviceNumber;
        return deviceService.free(identity.getCompanyId(), deviceNumber, pageIndex, pageSize);
        // try {
        //     return deviceService.free(identity.getCompanyId(), deviceNumber, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @GetMapping(value = "/device/create.form")
    public String create(Model model) {
        DeviceModel m = new DeviceModel();
        m.setEnable(true);
        model.addAttribute("editor", m);
        return "/baseinfo/device/create.form";
    }

    @PostMapping(value = "/device/create.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> create(@ModelAttribute("editor") @Valid DeviceModel m, BindingResult
            binding) {
        if (binding.hasErrors()) {
            List<FieldError> errors = binding.getFieldErrors();
            Map<Object, Object> map = new HashMap<>();
            errors.forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
            return ResponseEntityWrapper.Failed(map);
        }
        // return "/baseinfo/device/create.form";

        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        m.setCompanyId(identity.getCompanyId());
        deviceService.create(m.getDevice(), m.getUser());
        return ResponseEntityWrapper.OK();

        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     m.setCompanyId(identity.getCompanyId());
        //     deviceService.create(m.getDevice(), m.getUser());
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping("/device/edit.form")
    @ResponseBody
    public Object edit(@RequestParam String id, Model model) throws Exception {
        Tuple<Device, User> tuple = deviceService.fetch(id);
        DeviceModel m = new DeviceModel();
        m.fill(tuple.e);
        m.fill(tuple.t);
        return m;
        // model.addAttribute("editor", m);
        // return "/baseinfo/device/edit.form";
    }

    @PostMapping(value = "/device/edit.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> edit(@ModelAttribute("editor") @Valid DeviceModel m, BindingResult
            binding) {
        if (binding.hasErrors()) {
            List<FieldError> errors = binding.getFieldErrors();
            Map<Object, Object> map = new HashMap<>();
            errors.forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
            return ResponseEntityWrapper.Failed(map);
        }
        // return "/baseinfo/device/edit.form";
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        m.setCompanyId(identity.getCompanyId());
        deviceService.update(m.getDevice(), m.getUser());
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //
        //     m.setCompanyId(identity.getCompanyId());
        //     deviceService.update(m.getDevice(), m.getUser());
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/device/delete")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> delete(@RequestParam String id, RedirectAttributes r) {
        deviceService.delete(id);
        return ResponseEntityWrapper.OK();
        // try {
        //     deviceService.delete(id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/device/exist")
    @ResponseBody
    public Object exists(@RequestParam String deviceNumber, @RequestParam(required = false) String id, @RequestParam
            boolean checkId) throws Exception {
        return checkId ? !deviceService.exist(deviceNumber, id) : !deviceService.exist(deviceNumber);
        // if (checkId) {
        //     response.getWriter().print(!deviceService.exist(deviceNumber, id));
        // } else {
        //     response.getWriter().print(!deviceService.exist(deviceNumber));
        // }
    }

    @GetMapping(value = "/device/get")
    @ResponseBody
    public Object g(@RequestParam String deviceNumber) throws Exception {
        return deviceDao.getByNum(deviceNumber);
        // if (checkId) {
        //     response.getWriter().print(!deviceService.exist(deviceNumber, id));
        // } else {
        //     response.getWriter().print(!deviceService.exist(deviceNumber));
        // }
    }


}