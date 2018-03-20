package com.edata.monitor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.edata.monitor.aop.ServiceMethod;
import com.edata.monitor.dao.Page;
import com.edata.monitor.domain.baseinfo.Motorcade;
import com.edata.monitor.domain.baseinfo.MotorcadeInfo;
import com.edata.monitor.domain.security.Identify;
import com.edata.monitor.service.MotorcadeService;
import com.edata.monitor.util.WebUtil;

@Controller
public class MotorcadeController {
	@Autowired
	private MotorcadeService motorcadeService;

	@ServiceMethod(id = "baseinfo.motorcade", pid = "baseinfo", prefix = "打开", name = "车队管理", suffix = "页面")
	@RequestMapping(value = "/motorcade/motorcade.iframe", method = RequestMethod.GET)
	public String index() {
		return "/baseinfo/motorcade/motorcade.iframe";
	}

	@RequestMapping(value = "/motorcade/list", method = RequestMethod.POST)
	@ResponseBody
	public Object list(@RequestParam boolean grid, HttpServletRequest request) {
		Identify identify = (Identify) request.getAttribute("user");
		try {
			if (grid) {
				Page<MotorcadeInfo> page = new Page<MotorcadeInfo>();
				page.rows = motorcadeService.list(identify.getCompanyId());
				page.total = page.rows.size();
				return page;
			}
			return motorcadeService.list(identify.getCompanyId());
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
	public String create(@ModelAttribute("motorcade") @Valid Motorcade motorcade, BindingResult binding, Model model, RedirectAttributes r,
			HttpServletRequest request) {
		Identify identify = (Identify) request.getAttribute("user");

		if (binding.hasErrors())
			return "/baseinfo/motorcade/create.form";

		try {
			motorcade.setCompanyId(identify.getCompanyId());
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
	public String edit(@ModelAttribute("motorcade") @Valid Motorcade motorcade, BindingResult binding, Model model, RedirectAttributes r) {
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
	public void exists(@RequestParam String name, @RequestParam(required = false) String id, @RequestParam boolean checkId,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		Identify user = (Identify) request.getAttribute("user");
		if (checkId) {
			response.getWriter().print(!motorcadeService.exist(name, user.getCompanyId(), id));
		} else {
			response.getWriter().print(!motorcadeService.exist(name, user.getCompanyId()));
		}
	}
}
