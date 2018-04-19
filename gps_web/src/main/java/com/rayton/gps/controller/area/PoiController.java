package com.rayton.gps.controller.area;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.baseinfo.poi.Poi;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.area.PoiService;
import com.rayton.gps.util.ResponseEntityWrapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
import javax.validation.Valid;
import java.util.Map;


@Api(tags = "兴趣点")
@Controller
public class PoiController {
    @Autowired
    private PoiService poiService;

    @ApiOperation(httpMethod = "GET", value = "打开兴趣点管理页面")
    @RequiresPermissions("baseinfo.poi")
    @Log(name = "打开兴趣点管理页面")
    @GetMapping("/poi/poi.iframe")
    public String index() {
        return "/baseinfo/poi/poi.iframe";
    }

    @ApiOperation(httpMethod = "POST", value = "查询")
    @PostMapping(value = "/poi/query")
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return poiService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
    }

    @ApiOperation(httpMethod = "POST", value = "搜索")
    @PostMapping(value = "/poi/search")
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize, HttpServletRequest request) throws RuntimeException {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        return poiService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // try {
        //     return poiService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @ApiOperation(httpMethod = "GET", value = "打开创建兴趣点页面")
    @GetMapping(value = "/poi/create.form")
    public String create(Model model) {
        Poi poi = new Poi();
        model.addAttribute("poi", poi);
        return "/baseinfo/poi/create.form";
    }

    @ApiOperation(httpMethod = "POST", value = "创建兴趣点")
    @PostMapping(value = "/poi/create.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> create(@ModelAttribute("poi") @Valid Poi poi, BindingResult binding)
            throws RuntimeException {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        poi.setCompanyId(identity.getCompanyId());
        poiService.create(poi);

        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     poi.setCompanyId(identity.getCompanyId());
        //     poiService.create(poi);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }

        // return "redirect:/result";
    }


    @ApiOperation(httpMethod = "GET", value = "打开编辑兴趣点页面")
    @GetMapping("/poi/edit.form")
    public String edit(@RequestParam long id, Model model) throws Exception {
        Poi poi = poiService.fetch(id);
        model.addAttribute("poi", poi);
        return "/baseinfo/poi/edit.form";
    }

    @ApiOperation(httpMethod = "POST", value = "编辑兴趣点")
    @PostMapping(value = "/poi/edit.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> edit(@ModelAttribute("poi") @Valid Poi poi, BindingResult binding,
                                                    Model model, RedirectAttributes r) {
        if (binding.hasErrors())
            return ResponseEntityWrapper.Failed();
        // return "/baseinfo/poi/edit.form";
        poiService.update(poi);
        return ResponseEntityWrapper.OK();
        // try {
        //     poiService.update(poi);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @ApiOperation(httpMethod = "POST", value = "删除兴趣点")
    @PostMapping(value = "/poi/delete")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> delete(@RequestParam long id, RedirectAttributes r) {
        poiService.delete(id);
        return ResponseEntityWrapper.OK();
        // try {
        //     poiService.delete(id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @ApiOperation(httpMethod = "POST", value = "查询兴趣点存在")
    @PostMapping(value = "/poi/exist")
    @ResponseBody
    public Object exists(@RequestParam String name, @RequestParam(required = false) Long id, @RequestParam boolean
            checkId) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        Object re = checkId ? !poiService.exist(name, identity.getCompanyId(), id) : !poiService.exist(name, identity
                .getCompanyId());

        return re;
        // if (checkId) {
        //     response.getWriter().print(!poiService.exist(name, identity.getCompanyId(), id));
        // } else {
        //     response.getWriter().print(!poiService.exist(name, identity.getCompanyId()));
        // }
    }


}