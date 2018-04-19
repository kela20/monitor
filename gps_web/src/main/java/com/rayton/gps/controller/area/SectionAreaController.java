package com.rayton.gps.controller.area;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.baseinfo.sectionArea.SectionArea;
import com.rayton.gps.dao.baseinfo.sectionArea.SectionPoint;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.model.baseinfo.SectionAreaModel;
import com.rayton.gps.service.area.SectionAreaService;
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
public class SectionAreaController {
    @Autowired
    private SectionAreaService sectionAreaService;


    @RequiresPermissions("baseinfo.sectionArea")
    @Log(name = "打开路段管理页面")
    @GetMapping("/sectionArea/sectionArea.iframe")
    public String index() {
        return "/baseinfo/sectionArea/sectionArea.iframe";
    }

    @PostMapping(value = "/sectionArea/query")
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return sectionAreaService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
    }

    @PostMapping(value = "/sectionArea/search")
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize, HttpServletRequest request) {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        return sectionAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // try {
        //     return sectionAreaService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @GetMapping(value = "/sectionArea/create.form")
    public String create(Model model) {
        SectionAreaModel sectionArea = new SectionAreaModel();
        model.addAttribute("sectionArea", sectionArea);
        return "/baseinfo/sectionArea/create.form";
    }

    @PostMapping(value = "/sectionArea/create.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> create(@ModelAttribute("sectionArea") @Valid SectionAreaModel
                                                                  sectionArea, BindingResult binding, Model model,
                                                      HttpServletRequest request, RedirectAttributes r) {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/baseinfo/sectionArea/create.form";

        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        sectionArea.setCompanyId(identity.getCompanyId());
        String path = sectionArea.getPath();
        List<SectionPoint> points = JsonMapper.toObject(path, ArrayList.class, SectionPoint.class);
        sectionArea.setPoints(points);
        sectionAreaService.create(sectionArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     sectionArea.setCompanyId(identity.getCompanyId());
        //     String path = sectionArea.getPath();
        //     List<SectionPoint> points = JsonMapper.toObject(path, ArrayList.class, SectionPoint.class);
        //     sectionArea.setPoints(points);
        //     sectionAreaService.create(sectionArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     ex.printStackTrace();
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping("/sectionArea/edit.form")
    public String edit(@RequestParam long id, Model model) throws Exception {
        SectionArea route = sectionAreaService.fetch(id);
        SectionAreaModel sectionArea = JsonMapper.convertValue(route, SectionAreaModel.class);
        model.addAttribute("sectionArea", sectionArea);
        return "/baseinfo/sectionArea/edit.form";
    }

    @PostMapping(value = "/sectionArea/edit.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> edit(@ModelAttribute("sectionArea") @Valid SectionAreaModel
                                                                sectionArea, BindingResult binding, Model model,
                                                    RedirectAttributes r) {
        if (binding.hasErrors())
            // return "/baseinfo/sectionArea/edit.form";
            return ResponseEntityWrapper.Failed();

        String path = sectionArea.getPath();
        List<SectionPoint> points = JsonMapper.toObject(path, ArrayList.class, SectionPoint.class);
        sectionArea.setPoints(points);
        sectionAreaService.update(sectionArea);
        return ResponseEntityWrapper.OK();
        // try {
        //     String path = sectionArea.getPath();
        //     List<SectionPoint> points = JsonMapper.toObject(path, ArrayList.class, SectionPoint.class);
        //     sectionArea.setPoints(points);
        //     sectionAreaService.update(sectionArea);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/sectionArea/delete")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> delete(@RequestParam long id, RedirectAttributes r) {
        sectionAreaService.delete(id);
        return ResponseEntityWrapper.OK();
        // try {
        //     sectionAreaService.delete(id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/sectionArea/exist")
    @ResponseBody
    public Object exists(@RequestParam String name, @RequestParam(required = false) Long id, @RequestParam boolean
            checkId, HttpServletRequest request, HttpServletResponse response) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        return checkId ? !sectionAreaService.exist(name, identity.getCompanyId(), id) : !sectionAreaService.exist
                (name, identity.getCompanyId());
        // if (checkId) {
        //     response.getWriter().print(!sectionAreaService.exist(name, identity.getCompanyId(), id));
        // } else {
        //     response.getWriter().print(!sectionAreaService.exist(name, identity.getCompanyId()));
        // }
    }
}