package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.motorcade.Motorcade;
import com.rayton.gps.dao.baseinfo.motorcade.MotorcadeInfo;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.dao.security.Identity;
import com.rayton.gps.service.MotorcadeService;
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
public class MotorcadeController {
    @Autowired
    private MotorcadeService motorcadeService;


    @RequiresPermissions("baseinfo.motorcade")
    @ServiceMethod(id = "baseinfo.motorcade", pid = "baseinfo", prefix = "打开", name = "车队管理", suffix = "页面")
    @RequestMapping(value = "/motorcade/motorcade.iframe", method = RequestMethod.GET)
    public String index() {
        return "/baseinfo/motorcade/motorcade.iframe";
    }

    @RequestMapping(value = "/motorcade/list", method = RequestMethod.POST)
    @ResponseBody
    public Object list(@RequestParam boolean grid, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        try {
            if (grid) {
                Page<MotorcadeInfo> page = new Page<MotorcadeInfo>();
                page.rows = motorcadeService.list(identity.getCompanyId());
                page.total = page.rows.size();
                return page;
            }
            return motorcadeService.list(identity.getCompanyId());
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/motorcade/create.form", method = RequestMethod.GET)
    public String create(Model model) {
        Motorcade motorcade = new Motorcade();
        model.addAttribute("motorcade", motorcade);

        return "/baseinfo/motorcade/create.form";
    }

    @RequestMapping(value = "/motorcade/create.form", method = RequestMethod.POST)
    public String create(@ModelAttribute("motorcade") @Valid Motorcade motorcade, BindingResult binding, Model model,
                         RedirectAttributes r, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        if (binding.hasErrors())
            return "/baseinfo/motorcade/create.form";

        try {
            motorcade.setCompanyId(identity.getCompanyId());
            motorcadeService.create(motorcade);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/motorcade/edit.form", method = RequestMethod.GET)
    public String edit(@RequestParam String id, Model model) throws Exception {
        Motorcade motorcade = motorcadeService.fetch(id);
        model.addAttribute("motorcade", motorcade);

        return "/baseinfo/motorcade/edit.form";
    }

    @RequestMapping(value = "/motorcade/edit.form", method = RequestMethod.POST)
    public String edit(@ModelAttribute("motorcade") @Valid Motorcade motorcade, BindingResult binding, Model model,
                       RedirectAttributes r) {
        if (binding.hasErrors())
            return "/baseinfo/motorcade/edit.form";

        try {
            motorcadeService.update(motorcade);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/motorcade/delete", method = RequestMethod.POST)
    public String delete(@RequestParam String id, RedirectAttributes r) {
        try {
            motorcadeService.delete(id);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/motorcade/exist", method = RequestMethod.POST)
    public void exists(@RequestParam String name, @RequestParam(required = false) String id, @RequestParam boolean
            checkId, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Identity user = (Identity) request.getAttribute("user");
        if (checkId) {
            response.getWriter().print(!motorcadeService.exist(name, user.getCompanyId(), id));
        } else {
            response.getWriter().print(!motorcadeService.exist(name, user.getCompanyId()));
        }
    }
}