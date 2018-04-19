package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.driver.Driver;
import com.rayton.gps.dao.baseinfo.driver.DriverInfo;
import com.rayton.gps.dao.baseinfo.vehicle.VehicleInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.DriverService;
import com.rayton.gps.util.JsonMapper;
import com.rayton.gps.util.ResponseEntityWrapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@Controller
public class DriverController {
    @Autowired
    private DriverService driverService;


    @RequiresPermissions("baseinfo.driver")
    @Log(name = "打开驾驶员管理页面")
    @GetMapping(value = "/driver/driver.iframe")
    public String index() {
        return "/baseinfo/driver/driver.iframe";
    }

    @PostMapping(value = "/driver/query")
    @ResponseBody
    // TODO
    // page=1&limit=30
    //
    public Object query(@RequestParam(required = false) String filter, @RequestParam int page, @RequestParam int limit) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        filter="222";
        Page<DriverInfo> page1 = driverService.query(identity.getCompanyId(), filter, page, limit);
        page1.code = 0;
        page1.count = page1.total;
        page1.data = page1.rows;
        page1.msg = "mmp";
        return page1;
        // try {
        //     Page<DriverInfo> page = driverService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
        //     return page;
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @GetMapping("/driver/vehicles")
    @ResponseBody
    public Object vehicles(@RequestParam String driverId) throws Exception {
        Page<VehicleInfo> page = new Page<VehicleInfo>();
        page.rows = driverService.assignedVehicles(driverId);
        page.total = page.rows == null ? 0 : page.rows.size();
        return page;
    }

    @PostMapping(value = "/driver/addVehicles")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addSections(@RequestParam String driverId, @RequestParam String
            vehicles) throws Exception {
        List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        driverService.addVehicles(driverId, list);
        return ResponseEntityWrapper.OK();
        // try {
        //     List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        //     driverService.addVehicles(driverId, list);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/driver/removeVehicle")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> removeSection(@RequestParam String driverId, @RequestParam String
            vehicleId) throws Exception {
        driverService.removeVehicle(driverId, vehicleId);
        return ResponseEntityWrapper.OK();
        // try {
        //     driverService.removeVehicle(driverId, vehicleId);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/driver/create.form")
    public String create(Model model) {
        Driver driver = new Driver();
        model.addAttribute("driver", driver);

        return "/baseinfo/driver/create.form";
    }

    @PostMapping(value = "/driver/create.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> create(@ModelAttribute("driver") @Valid Driver driver, BindingResult
            binding) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        if (binding.hasErrors())
            // return "/baseinfo/driver/create.form";
            return ResponseEntityWrapper.Failed();
        driver.setCompanyId(identity.getCompanyId());
        driverService.create(driver);
        return ResponseEntityWrapper.OK();


        // try {
        //     driver.setCompanyId(identity.getCompanyId());
        //     driverService.create(driver);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/driver/edit.form")
    public String edit(@RequestParam String id, Model model) throws Exception {
        Driver driver = driverService.fetch(id);
        model.addAttribute("driver", driver);

        return "/baseinfo/driver/edit.form";
    }

    @PostMapping(value = "/driver/edit.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> edit(@ModelAttribute("driver") @Valid Driver driver, BindingResult
            binding) throws Exception {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/baseinfo/driver/edit.form";
        driverService.update(driver);
        return ResponseEntityWrapper.OK();
        // try {
        //     driverService.update(driver);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/driver/delete")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> delete(@RequestParam String id, RedirectAttributes r) throws Exception {
        driverService.delete(id);
        return ResponseEntityWrapper.OK();
        // try {
        //     driverService.delete(id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }
}
