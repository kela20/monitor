package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.sim.Simcard;
import com.rayton.gps.dao.baseinfo.sim.SimcardInfo;
import com.rayton.gps.dao.baseinfo.sim.SimcardSearchInfo;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.service.SimcardService;
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
public class SimcardController {
    @Autowired
    private SimcardService simcardService;


    @RequiresPermissions("baseinfo.simcard")
    @ServiceMethod(id = "baseinfo.simcard", pid = "baseinfo", prefix = "打开", name = "SIM卡管理", suffix = "页面")
    @RequestMapping(value = "/simcard/simcard.iframe", method = RequestMethod.GET)
    public String index() {
        return "/baseinfo/simcard/simcard.iframe";
    }

    @RequestMapping(value = "/simcard/query", method = RequestMethod.POST)
    @ResponseBody
    public Object query(@RequestParam String filter, @RequestParam int pageIndex, @RequestParam int pageSize,
                        HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        try {
            Page<SimcardInfo> page = simcardService.query(identity.getCompanyId(), filter, pageIndex, pageSize);
            return page;
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/simcard/search", method = RequestMethod.POST)
    @ResponseBody
    public Object search(@RequestParam(required = false) String filter, @RequestParam int pageIndex, @RequestParam
            int pageSize, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        filter = filter == null ? "" : filter;
        try {
            Page<SimcardSearchInfo> page = simcardService.search(identity.getCompanyId(), filter, pageIndex, pageSize);
            return page;
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/simcard/free", method = RequestMethod.POST)
    @ResponseBody
    public Object findfree(@RequestParam(required = false) String phoneNumber, @RequestParam int pageIndex,
                           @RequestParam int pageSize, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        phoneNumber = phoneNumber == null ? "" : phoneNumber;
        try {
            Page<SimcardSearchInfo> page = simcardService.free(identity.getCompanyId(), phoneNumber, pageIndex,
                    pageSize);
            return page;
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/simcard/create.form", method = RequestMethod.GET)
    public String create(Model model) {
        Simcard simcard = new Simcard();
        model.addAttribute("simcard", simcard);

        return "/baseinfo/simcard/create.form";
    }

    @RequestMapping(value = "/simcard/create.form", method = RequestMethod.POST)
    public String create(@ModelAttribute("simcard") @Valid Simcard simcard, BindingResult binding, Model model,
                         RedirectAttributes r, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        if (binding.hasErrors())
            return "/baseinfo/simcard/create.form";

        try {
            simcard.setCompanyId(identity.getCompanyId());
            simcardService.create(simcard);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/simcard/edit.form", method = RequestMethod.GET)
    public String edit(@RequestParam String id, Model model) throws Exception {
        Simcard simcard = simcardService.fetch(id);
        model.addAttribute("simcard", simcard);

        return "/baseinfo/simcard/edit.form";
    }

    @RequestMapping(value = "/simcard/edit.form", method = RequestMethod.POST)
    public String edit(@ModelAttribute("simcard") @Valid Simcard simcard, BindingResult binding, Model model,
                       RedirectAttributes r) {
        if (binding.hasErrors())
            return "/baseinfo/simcard/edit.form";

        try {
            simcardService.update(simcard);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/simcard/delete", method = RequestMethod.POST)
    public String delete(@RequestParam String id, RedirectAttributes r) {
        try {
            simcardService.delete(id);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/simcard/exist", method = RequestMethod.POST)
    public void exists(@RequestParam String phoneNumber, @RequestParam(required = false) String id, @RequestParam
            boolean checkId, HttpServletResponse response) throws Exception {
        if (checkId) {
            response.getWriter().print(!simcardService.exist(phoneNumber, id));
        } else {
            response.getWriter().print(!simcardService.exist(phoneNumber));
        }
    }
}