package com.rayton.gps.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TripController {
    @GetMapping("/trip")
    public String index() {
        return "/trip/index";
    }

}
