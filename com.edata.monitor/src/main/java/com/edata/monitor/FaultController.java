package com.edata.monitor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FaultController {
	@RequestMapping("/fault")
	public String index() {
		return "/fault/index";

	}
}
