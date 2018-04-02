package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.dictionary.DictionaryItem;
import com.rayton.gps.dao.baseinfo.dictionary.DictionaryItemInfo;
import com.rayton.gps.service.DictionaryService;
import com.rayton.gps.util.WebUtil;
import com.rayton.gps.util.enums.DictionaryKinds;
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
public class DictionaryController {
    @Autowired
    private DictionaryService dictionaryService;


    @RequiresPermissions("baseinfo.dictionary")
    @ServiceMethod(id = "baseinfo.dictionary", pid = "baseinfo", prefix = "打开", name = "数据字典", suffix = "页面")
    @RequestMapping(value = "/dictionary/dictionary.iframe", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("dictionaryKinds", DictionaryKinds.values());
        model.addAttribute("txtDictionaryKind", 1);
        return "/baseinfo/dictionary/dictionary.iframe";
    }

    @RequestMapping(value = "/dictionary/list", method = RequestMethod.POST)
    @ResponseBody
    public Object list(@RequestParam int kind, @RequestParam boolean grid) {
        try {
            if (grid) {
                Page<DictionaryItemInfo> page = new Page<DictionaryItemInfo>();
                page.rows = dictionaryService.list(kind);
                page.total = page.rows.size();
                return page;
            }

            return dictionaryService.list(kind);
        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/dictionary/create.form", method = RequestMethod.GET)
    public String create(@RequestParam int kind, @RequestParam(required = false) Long pid, Model model) {
        DictionaryItem dictionaryItem = new DictionaryItem();
        dictionaryItem.setKind(kind);
        dictionaryItem.setPid(pid);
        model.addAttribute("dictionaryItem", dictionaryItem);

        return "/baseinfo/dictionary/create.form";
    }

    @RequestMapping(value = "/dictionary/create.form", method = RequestMethod.POST)
    public String create(@ModelAttribute("dictionaryItem") @Valid DictionaryItem dictionaryItem, BindingResult
            binding, Model model, RedirectAttributes r, HttpServletRequest request) {

        if (binding.hasErrors())
            return "/baseinfo/dictionary/create.form";

        try {
            dictionaryService.create(dictionaryItem);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/dictionary/edit.form", method = RequestMethod.GET)
    public String edit(@RequestParam long id, Model model) throws Exception {
        DictionaryItem dictionaryItem = dictionaryService.fetch(id);
        model.addAttribute("dictionaryItem", dictionaryItem);

        return "/baseinfo/dictionary/edit.form";
    }

    @RequestMapping(value = "/dictionary/edit.form", method = RequestMethod.POST)
    public String edit(@ModelAttribute("dictionary") @Valid DictionaryItem dictionaryItem, BindingResult binding,
                       Model model, RedirectAttributes r) {
        if (binding.hasErrors())
            return "/baseinfo/dictionary/edit.form";

        try {
            dictionaryService.update(dictionaryItem);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/dictionary/delete", method = RequestMethod.POST)
    public String delete(@RequestParam long id, RedirectAttributes r) {
        try {
            dictionaryService.delete(id);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/dictionary/move", method = RequestMethod.POST)
    public String move(@RequestParam long id, @RequestParam Long pid, RedirectAttributes r) {
        try {
            dictionaryService.move(id, pid);
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @RequestMapping(value = "/dictionary/exist", method = RequestMethod.POST)
    public void exists(@RequestParam String name, @RequestParam int kind, @RequestParam(required = false) Long id,
                       @RequestParam boolean checkId, HttpServletResponse response) throws Exception {
        if (checkId) {
            response.getWriter().print(!dictionaryService.exist(name, kind, id));
        } else {
            response.getWriter().print(!dictionaryService.exist(name, kind));
        }
    }
}