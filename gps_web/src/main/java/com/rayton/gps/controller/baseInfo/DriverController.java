package com.rayton.gps.controller.baseInfo;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.driver.Driver;
import com.rayton.gps.dao.baseinfo.driver.DriverInfo;
import com.rayton.gps.dao.baseinfo.vehicle.VehicleInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.DriverService;
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

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
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


    @GetMapping(value = "/driver/query")
    @ResponseBody
    public Object query(@RequestParam(required = false) String filter, @RequestParam int page, @RequestParam int
            limit) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        Page<DriverInfo> result = driverService.query(identity.getCompanyId(), filter, page, limit);
        result.code = 0;
        result.count = result.total;
        result.data = result.rows;
        // result.msg = "mmp";
        return result;

    }

    @GetMapping("/driver/vehicles")
    @ResponseBody
    public Object vehicles(@RequestParam String driverId) throws Exception {
        Page<VehicleInfo> page = new Page<>();
        page.rows = driverService.assignedVehicles(driverId);
        page.total = page.rows == null ? 0 : page.rows.size();
        return page;
    }

    @PostMapping(value = "/driver/addVehicles")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> addSections(@RequestParam String driverId, @RequestParam String
            vehicles) throws Exception {
        List<String> list = Arrays.asList(vehicles.split(","));
        // List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        driverService.addVehicles(driverId, list);
        return ResponseEntityWrapper.OK();

    }

    @PostMapping(value = "/driver/removeVehicle")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> removeSection(@RequestParam String driverId, @RequestParam String
            vehicleId) throws Exception {
        driverService.removeVehicle(driverId, vehicleId);
        return ResponseEntityWrapper.OK();

    }

    @GetMapping(value = "/driver/create.form")
    public String create(Model model) {
        Driver driver = new Driver();
        model.addAttribute("driver", driver);

        return "/baseinfo/driver/create.form";
    }

    @PostMapping(value = "/driver/create.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> create(@ModelAttribute("driver") @Valid Driver driver, BindingResult
            binding) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        if (binding.hasErrors())
            // return "/baseinfo/driver/create.form";
            return ResponseEntityWrapper.Failed();
        driver.setCompanyId(identity.getCompanyId());
        driverService.create(driver);
        return ResponseEntityWrapper.OK();


    }

    @GetMapping(value = "/driver/edit.form")
    @ResponseBody
    public Object edit(@RequestParam String id, Model model) throws Exception {
        Driver driver = driverService.fetch(id);

        return driver;

    }

    @PostMapping(value = "/driver/edit.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> edit(@ModelAttribute("driver") @Valid Driver driver, BindingResult
            binding) throws Exception {
        if (binding.hasErrors()) {
            List<FieldError> errors = binding.getFieldErrors();
            Map<Object, Object> map = new HashMap<>();
            errors.forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
            return ResponseEntityWrapper.Failed(map);
        }
        // return "/baseinfo/driver/edit.form";
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        driver.setCompanyId(identity.getCompanyId());
        driverService.update(driver);
        return ResponseEntityWrapper.OK();

    }

    @PostMapping(value = "/driver/delete")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> delete(@RequestParam String id) throws Exception {
        driverService.delete(id);
        return ResponseEntityWrapper.OK();

    }
}