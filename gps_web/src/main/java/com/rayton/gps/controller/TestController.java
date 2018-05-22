package com.rayton.gps.controller;


import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.StatisticsService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {

    @Autowired
    private StatisticsService statisticsService;

    //
    @GetMapping(value = "/admin")
    public ModelAndView test() {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");
        modelAndView.addObject("name", identity.getName());
        return modelAndView;
    }

    @GetMapping(value = "/multi")
    public ModelAndView multi() {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("multi");
        modelAndView.addObject("name", identity.getName());
        return modelAndView;
    }

    @GetMapping(value = "/ins")
    public ModelAndView download() throws Exception {

        ModelAndView modelAndView = new ModelAndView("ins");
        return modelAndView;

    }

    @GetMapping(value = "/monitor")
    public ModelAndView monitor() throws Exception {

        ModelAndView modelAndView = new ModelAndView("monitor");
        return modelAndView;

    }
    @GetMapping(value = "/report")
    public ModelAndView report() throws Exception {

        ModelAndView modelAndView = new ModelAndView("report");
        return modelAndView;

    }
    @GetMapping(value = "/replay")
    public ModelAndView replay() throws Exception {

        ModelAndView modelAndView = new ModelAndView("replay");
        return modelAndView;

    }
}
