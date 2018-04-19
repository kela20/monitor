package com.rayton.gps.controller.area;

import com.rayton.gps.aop.Log;
import com.rayton.gps.common.LatLng;
import com.rayton.gps.dao.baseinfo.polygonArea.PolygonArea;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.model.baseinfo.PolygonAreaModel;
import com.rayton.gps.service.area.PolygonAreaService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class PolygonAreaController {
    @Autowired
    private PolygonAreaService polygonAreaService;

    @RequiresPermissions("baseinfo.polygonArea")
    @Log(name = "打开多边形区域管理页面")
    @RequestMapping("/polygonArea/polygonArea.iframe")
    public String index() {
        return "/baseinfo/polygonArea/polygonArea.iframe";
    }

    @PostMapping(value = "/polygonArea/query")
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return polygonAreaService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
    }


    @PostMapping(value = "/polygonArea/search")
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize, HttpServletRequest request) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        return polygonAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // try {
        //     return polygonAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @GetMapping(value = "/polygonArea/create.form")
    public String create(Model model) {
        PolygonAreaModel polygonArea = new PolygonAreaModel();
        polygonArea.setDeviceCatch(true);
        model.addAttribute("polygonArea", polygonArea);
        return "/baseinfo/polygonArea/create.form";
    }

    @PostMapping(value = "/polygonArea/create.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> create(@ModelAttribute("polygonArea") @Valid PolygonAreaModel
                                                                  polygonArea, BindingResult binding, Model model,
                                                      HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/baseinfo/polygonArea/create.form";

        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        polygonArea.setCompanyId(identity.getCompanyId());
        String path = polygonArea.getPath();
        List<LatLng> points = JsonMapper.toObject(path, ArrayList.class, LatLng.class);
        polygonArea.setPoints(points);
        polygonAreaService.create(polygonArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     polygonArea.setCompanyId(identity.getCompanyId());
        //     String path = polygonArea.getPath();
        //     List<LatLng> points = JsonMapper.toObject(path, ArrayList.class, LatLng.class);
        //     polygonArea.setPoints(points);
        //     polygonAreaService.create(polygonArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @RequestMapping("/polygonArea/edit.form")
    public String edit(@RequestParam long id, Model model) throws Exception {
        PolygonArea polygon = polygonAreaService.fetch(id);
        PolygonAreaModel polygonArea = JsonMapper.convertValue(polygon, PolygonAreaModel.class);
        model.addAttribute("polygonArea", polygonArea);
        return "/baseinfo/polygonArea/edit.form";
    }

    @PostMapping(value = "/polygonArea/edit.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> edit(@ModelAttribute("polygonArea") @Valid PolygonAreaModel
                                                                polygonArea, BindingResult binding, Model model,
                                                    HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/baseinfo/polygonArea/edit.form";
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        String path = polygonArea.getPath();
        List<LatLng> points = JsonMapper.toObject(path, ArrayList.class, LatLng.class);
        polygonArea.setPoints(points);
        polygonAreaService.update(identity.getUnid(), identity.getName(), polygonArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     String path = polygonArea.getPath();
        //     List<LatLng> points = JsonMapper.toObject(path, ArrayList.class, LatLng.class);
        //     polygonArea.setPoints(points);
        //     polygonAreaService.update(identity.getUnid(), identity.getName(), polygonArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/polygonArea/delete")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> delete(@RequestParam long id, HttpServletRequest request,
                                                      RedirectAttributes r) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        polygonAreaService.delete(identity.getUnid(), identity.getName(), id);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     polygonAreaService.delete(identity.getUnid(), identity.getName(), id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/polygonArea/exist")
    @ResponseBody
    public Object exists(@RequestParam String name, @RequestParam(required = false) Long id, @RequestParam boolean
            checkId, HttpServletRequest request, HttpServletResponse response) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        return checkId ? !polygonAreaService.exist(name, identity.getCompanyId(), id) : !polygonAreaService.exist
                (name, identity.getCompanyId());

        //
        // if (checkId) {
        //     response.getWriter().print(!polygonAreaService.exist(name, identity.getCompanyId(), id));
        // } else {
        //     response.getWriter().print(!polygonAreaService.exist(name, identity.getCompanyId()));
        // }
    }

    @GetMapping("/polygonArea/vehicles")
    @ResponseBody
    public Object vehicles(@RequestParam long polygonAreaId, @RequestParam int pageIndex, @RequestParam int pageSize)
            throws Exception {
        return polygonAreaService.assignedVehicles(polygonAreaId, pageIndex, pageSize);
    }

    @PostMapping(value = "/polygonArea/addVehicles")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addVehicles(@RequestParam long polygonAreaId, @RequestParam String
            vehicles, HttpServletRequest request, RedirectAttributes r) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        polygonAreaService.addVehicles(identity.getUnid(), identity.getName(), polygonAreaId, list);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        //     polygonAreaService.addVehicles(identity.getUnid(), identity.getName(), polygonAreaId, list);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/polygonArea/removeVehicle")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> removeSection(@RequestParam long polygonAreaId, @RequestParam String
            number, HttpServletRequest request, RedirectAttributes r) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        polygonAreaService.removeVehicle(identity.getUnid(), identity.getName(), polygonAreaId, number);

        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     polygonAreaService.removeVehicle(identity.getUnid(), identity.getName(), polygonAreaId, number);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }
}