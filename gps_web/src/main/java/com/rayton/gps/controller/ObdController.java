package com.rayton.gps.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ObdController {
    @GetMapping("/obd")
    public String index() {
        return "/obd/index";
    }

}
