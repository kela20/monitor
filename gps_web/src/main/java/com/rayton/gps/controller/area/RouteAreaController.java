package com.rayton.gps.controller.area;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.routeArea.RouteArea;
import com.rayton.gps.dao.baseinfo.routeArea.RouteAreaInfo;
import com.rayton.gps.dao.baseinfo.sectionArea.SectionAreaInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.area.RouteAreaService;
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

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@Controller
public class RouteAreaController {
    @Autowired
    private RouteAreaService routeAreaService;


    @RequiresPermissions("baseinfo.routeArea")
    @Log(name = "打开路线管理页面")
    @GetMapping("/routeArea/routeArea.iframe")
    public String index() {
        return "/baseinfo/routeArea/routeArea.iframe";
    }

    @GetMapping(value = "/routeArea/query")
    @ResponseBody
    public Object query(@RequestParam(required = false) String filter, @RequestParam int page, @RequestParam int
            limit) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        Page<RouteAreaInfo> result = routeAreaService.query(identity.getCompanyId(), filter, page, limit);


        result.code = 0;
        result.count = result.total;
        result.data = result.rows;
        // result.msg = "mmp";
        return result;
    }

    @PostMapping(value = "/routeArea/search")
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        return routeAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // try {
        //     return routeAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @PostMapping(value = "/routeArea/sections")
    @ResponseBody
    public Object sections(@RequestParam long routeId) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        Page<SectionAreaInfo> page = new Page<>();
        page.rows = routeAreaService.assignedSections(identity.getCompanyId(), routeId);
        page.total = page.rows == null ? 0 : page.rows.size();
        return page;
    }

    @PostMapping(value = "/routeArea/addSections")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> addSections(@RequestParam long routeId, @RequestParam String list) {

        List<Long> ids = JsonMapper.toObject(list, List.class, Long.class);
        routeAreaService.addSections(routeId, ids);
        return ResponseEntityWrapper.OK();

        // try {
        //     List<Long> ids = JsonMapper.toObject(list, List.class, Long.class);
        //     routeAreaService.addSections(routeId, ids);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/routeArea/removeSection")
    public ResponseEntity<Map<Object, Object>> removeSection(@RequestParam long routeId, @RequestParam long sectionId) {
        routeAreaService.removeSection(routeId, sectionId);

        return ResponseEntityWrapper.OK();
        // try {
        //     routeAreaService.removeSection(routeId, sectionId);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/routeArea/create.form")
    public String create(Model model) {
        RouteArea routeArea = new RouteArea();
        routeArea.setDeviceCatch(true);
        model.addAttribute("routeArea", routeArea);
        return "/baseinfo/routeArea/create.form";
    }

    @PostMapping(value = "/routeArea/create.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> create(@ModelAttribute("routeArea") @Valid RouteArea routeArea,
                                                      BindingResult binding) {
        if (binding.hasErrors())
            // return "/baseinfo/routeArea/create.form";
            return ResponseEntityWrapper.Failed();

        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        routeArea.setCompanyId(identity.getCompanyId());
        routeAreaService.create(routeArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     routeArea.setCompanyId(identity.getCompanyId());
        //     routeAreaService.create(routeArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping("/routeArea/edit.form")
    public String edit(@RequestParam long id, Model model) throws Exception {
        RouteArea routeArea = routeAreaService.fetch(id);
        model.addAttribute("routeArea", routeArea);
        return "/baseinfo/routeArea/edit.form";
    }

    @PostMapping(value = "/routeArea/edit.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> edit(@ModelAttribute("routeArea") @Valid RouteArea routeArea,
                                                    BindingResult binding) {
        if (binding.hasErrors()) return ResponseEntityWrapper.Failed();
        // return "/baseinfo/routeArea/edit.form";
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        routeAreaService.update(identity.getUnid(), identity.getName(), routeArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     routeAreaService.update(identity.getUnid(), identity.getName(), routeArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/routeArea/delete")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> delete(@RequestParam long id) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        routeAreaService.delete(identity.getUnid(), identity.getName(), id);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     routeAreaService.delete(identity.getUnid(), identity.getName(), id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/routeArea/exist")
    @ResponseBody
    public Object exists(@RequestParam String name, @RequestParam(required = false) Long id, @RequestParam boolean
            checkId) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        return checkId ? !routeAreaService.exist(name, identity.getCompanyId(), id) : !routeAreaService.exist(name,
                identity.getCompanyId());
        // if (checkId) {
        //     response.getWriter().print(!routeAreaService.exist(name, identity.getCompanyId(), id));
        // } else {
        //     response.getWriter().print(!routeAreaService.exist(name, identity.getCompanyId()));
        // }
    }

    @RequestMapping("/routeArea/vehicles")
    @ResponseBody
    public Object vehicles(@RequestParam long routeAreaId, @RequestParam int pageIndex, @RequestParam int pageSize)
            throws Exception {
        return routeAreaService.assignedVehicles(routeAreaId, pageIndex, pageSize);
    }

    @PostMapping(value = "/routeArea/addVehicles")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> addVehicles(@RequestParam long routeAreaId, @RequestParam String
            vehicles) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        routeAreaService.addVehicles(identity.getUnid(), identity.getName(), routeAreaId, list);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);
        //     routeAreaService.addVehicles(identity.getUnid(), identity.getName(), routeAreaId, list);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/routeArea/removeVehicle")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> removeSection(@RequestParam long routeAreaId, @RequestParam String
            number) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        routeAreaService.removeVehicle(identity.getUnid(), identity.getName(), routeAreaId, number);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     routeAreaService.removeVehicle(identity.getUnid(), identity.getName(), routeAreaId, number);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }
}
