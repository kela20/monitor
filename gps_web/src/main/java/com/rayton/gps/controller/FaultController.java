package com.rayton.gps.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FaultController {
    @GetMapping("/fault")
    public String index() {
        return "/fault/index";

    }
}
