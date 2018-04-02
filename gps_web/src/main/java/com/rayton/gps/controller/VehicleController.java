package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import com.rayton.gps.dao.baseinfo.driver.DriverInfo;
import com.rayton.gps.dao.baseinfo.owner.OwnerInfo;
import com.rayton.gps.dao.baseinfo.vehicle.Vehicle;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.service.MarkerService;
import com.rayton.gps.service.VehicleService;
import com.rayton.gps.util.JsonMapper;
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
import java.util.List;

@Controller
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private MarkerService markerService;


    @RequiresPermissions("baseinfo.vehicle")
    @ServiceMethod(id = "baseinfo.vehicle", pid = "baseinfo", prefix = "打开", name = "车辆管理", suffix = "页面")
    @RequestMapping("/vehicle/vehicle.iframe")
    public String index() {
        return "/baseinfo/vehicle/vehicle.iframe";
    }

    @RequestMapping(value = "/vehicle/query", method = RequestMethod.POST)
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return vehicleService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
    }

    @RequestMapping(value = "/vehicle/search", method = RequestMethod.POST)
    @ResponseBody
    public Object search(@RequestParam(required = false) String plateNumber, @RequestParam int pageIndex,
                         @RequestParam int pageSize, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        plateNumber = plateNumber == null ? "" : plateNumber;
        try {
            return vehicleService.search(identity.getCompanyId(), plateNumber, pageIndex, pageSize);
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping("/vehicle/owners")
    @ResponseBody
    public Object owners(@RequestParam String vehicleId) throws Exception {
        Page<OwnerInfo> page = new Page<OwnerInfo>();
        page.rows = vehicleService.assignedOwners(vehicleId);
        page.total = page.rows == null ? 0 : page.rows.size();
        return page;
    }

    @RequestMapping(value = "/vehicle/addOwners", method = RequestMethod.POST)
    public String addOwners(@RequestParam String vehicleId, @RequestParam String owners, RedirectAttributes r) {
        try {
            List<String> list = JsonMapper.toObject(owners, List.class, String.class);
            vehicleService.addOwners(vehicleId, list);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/vehicle/removeOwner", method = RequestMethod.POST)
    public String removeOwner(@RequestParam String vehicleId, @RequestParam String ownerId, RedirectAttributes r) {
        try {
            vehicleService.removeOwner(vehicleId, ownerId);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping("/vehicle/drivers")
    @ResponseBody
    public Object drivers(@RequestParam String vehicleId) throws Exception {
        Page<DriverInfo> page = new Page<DriverInfo>();
        page.rows = vehicleService.assignedDrivers(vehicleId);
        page.total = page.rows == null ? 0 : page.rows.size();
        return page;
    }

    @RequestMapping(value = "/vehicle/addDrivers", method = RequestMethod.POST)
    public String addDrivers(@RequestParam String vehicleId, @RequestParam String drivers, RedirectAttributes r) {
        try {
            List<String> list = JsonMapper.toObject(drivers, List.class, String.class);
            vehicleService.addDrivers(vehicleId, list);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/vehicle/removeDriver", method = RequestMethod.POST)
    public String removeDriver(@RequestParam String vehicleId, @RequestParam String driverId, RedirectAttributes r) {
        try {
            vehicleService.removeDriver(vehicleId, driverId);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/vehicle/create.form", method = RequestMethod.GET)
    public String create(Model model, HttpServletRequest request) {
        Vehicle vehicle = new Vehicle();
        vehicle.setRotate(true);
        model.addAttribute("vehicle", vehicle);
        loadMarkers(request, model);

        return "/baseinfo/vehicle/create.form";
    }

    @RequestMapping(value = "/vehicle/create.form", method = RequestMethod.POST)
    public String create(@ModelAttribute("vehicle") @Valid Vehicle vehicle, BindingResult binding, Model model,
                         HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors()) {
            loadMarkers(request, model);
            return "/baseinfo/vehicle/create.form";
        }
        try {
            IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
            vehicle.setCompanyId(identity.getCompanyId());
            vehicleService.create(vehicle);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping("/vehicle/edit.form")
    public String edit(@RequestParam String id, Model model, HttpServletRequest request) throws Exception {
        Vehicle vehicle = vehicleService.fetch(id);
        model.addAttribute("vehicle", vehicle);
        loadMarkers(request, model);
        return "/baseinfo/vehicle/edit.form";
    }

    @RequestMapping(value = "/vehicle/edit.form", method = RequestMethod.POST)
    public String edit(@ModelAttribute("vehicle") @Valid Vehicle vehicle, BindingResult binding, Model model,
                       RedirectAttributes r, HttpServletRequest request) {
        if (binding.hasErrors()) {
            loadMarkers(request, model);
            return "/baseinfo/vehicle/edit.form";
        }
        try {
            vehicleService.update(vehicle);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/vehicle/delete", method = RequestMethod.POST)
    public String delete(@RequestParam String id, RedirectAttributes r) {
        try {
            vehicleService.delete(id);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/vehicle/exist", method = RequestMethod.POST)
    public void vehicleExists(@RequestParam String plateNumber, @RequestParam(required = false) String id,
                              @RequestParam boolean checkId, HttpServletResponse response) throws Exception {
        if (checkId) {
            response.getWriter().print(!vehicleService.exist(plateNumber, id));
        } else {
            response.getWriter().print(!vehicleService.exist(plateNumber));
        }
    }

    private void loadMarkers(HttpServletRequest request, Model model) {
        String path = request.getServletContext().getRealPath("/resources/icons");
        List<MarkerFileInfo> icons = markerService.getMarkerFiles(path);
        model.addAttribute("icons", icons);
    }
}