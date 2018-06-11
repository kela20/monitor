package com.rayton.gps.controller.baseInfo;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.role.Role;
import com.rayton.gps.dao.baseinfo.role.RoleInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.RoleService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RoleController {
    @Autowired
    private RoleService roleService;


    @RequiresPermissions("baseinfo.role")
    @Log(name = "打开角色管理页面")
    @GetMapping(value = "/role/role.iframe")
    public String index() {
        return "/baseinfo/role/role.iframe";
    }

    @GetMapping(value = "/role/query")
    @ResponseBody
    public Object list() throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        Page<RoleInfo> page = new Page<>();
        page.rows = roleService.list(identity.getCompanyId());
        page.total = page.rows.size();
        return page;
        // try {
        //     Page<RoleInfo> page = new Page<RoleInfo>();
        //     page.rows = roleService.list(identity.getCompanyId());
        //     page.total = page.rows.size();
        //     return page;
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @GetMapping(value = "/role/create.form")
    public String create(Model model) {
        Role role = new Role();
        model.addAttribute("role", role);

        return "/baseinfo/role/create.form";
    }

    @PostMapping(value = "/role/create.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> create(@ModelAttribute("role") @Valid Role role, BindingResult binding) throws Exception {

        if (binding.hasErrors()) {
            List<FieldError> errors = binding.getFieldErrors();
            Map<Object, Object> map = new HashMap<>();
            errors.forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
            return ResponseEntityWrapper.Failed(map);
        }
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        role.setCompanyId(identity.getCompanyId());
        roleService.create(role);
        return ResponseEntityWrapper.OK();

        // try {
        //     role.setCompanyId(identity.getCompanyId());
        //     roleService.create(role);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/role/edit.form")
    @ResponseBody
    public Object edit(@RequestParam String id, Model model) throws Exception {
        Role role = roleService.fetch(id);
        return role;
        // model.addAttribute("role", role);
        //
        // return "/baseinfo/role/edit.form";
    }

    @PostMapping(value = "/role/edit.form")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> edit(@ModelAttribute("role") @Valid Role role, BindingResult binding) throws Exception {
        if (binding.hasErrors()) {
            List<FieldError> errors = binding.getFieldErrors();
            Map<Object, Object> map = new HashMap<>();
            errors.forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
            return ResponseEntityWrapper.Failed(map);
        }
        // return "/baseinfo/role/edit.form";

        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        // role.setCompanyId(identity.getCompanyId());
        roleService.update(role);
        return ResponseEntityWrapper.OK();
        // try {
        //     roleService.update(role);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/role/delete")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> delete(@RequestParam String id) throws Exception {
        roleService.delete(id);
        return ResponseEntityWrapper.OK();
        // try {
        //     roleService.delete(id);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @GetMapping(value = "/role/authorize.form")
    public String authorize() throws Exception {
        return "/baseinfo/role/authorize.form";
    }

    @GetMapping(value = "/role/authorizes")
    @ResponseBody
    public Object authorizes(@RequestParam String roleId) throws Exception {
        return roleService.authorizes(roleId);
        // try {
        //     return roleService.authorizes(roleId);
        // } catch (Exception ex) {
        //     return null;
        // }
    }

    @PostMapping(value = "/role/authorize")
    @ResponseBody
    public Object authorize(@RequestParam String roleId, @RequestParam(required = false) List<String> list) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        roleService.authorize(identity.getCompanyId(), roleId, list);
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     roleService.authorize(identity.getCompanyId(), roleId, list);
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    @PostMapping(value = "/role/exist")
    @ResponseBody
    public Object exists(@RequestParam String name, @RequestParam(required = false) String id, @RequestParam boolean checkId) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        // Identity user = (Identity) request.getAttribute("user");

        return checkId ? !roleService.exist(name, identity.getCompanyId(), id) : !roleService.exist(name, identity.getCompanyId());

        // if (checkId) {
        //     response.getWriter().print(!roleService.exist(name, user.getCompanyId(), id));
        // } else {
        //     response.getWriter().print(!roleService.exist(name, user.getCompanyId()));
        // }
    }
}
