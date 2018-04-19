package com.rayton.gps.controller;

import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.CommonService;
import com.rayton.gps.service.SecurityService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class CommonContorller {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CommonService commonService;


    @GetMapping(value = "/common/device/status")
    @ResponseBody
    public Object deviceStatus(@RequestParam String number) throws Exception {
        return commonService.getDeviceStatus(number);
    }

    @GetMapping(value = "/common/device/vehicle")
    @ResponseBody
    public Object deviceVehicle(@RequestParam String number) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return commonService.getDeviceVehicle(identity.getId(), number);
    }

    @PostMapping(value = "/common/device/log/load")
    @ResponseBody
    public Object deviceLoadDataLog(@RequestParam String number, @RequestParam Date start, @RequestParam Date end,
                                    @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {

        return commonService.loadDataLog(number, start, end, pageIndex, pageSize);
    }

    @GetMapping(value = "/common/device/log/enable")
    @ResponseBody
    public Object deviceEnableDataLog(@RequestParam String number, @RequestParam boolean enable) throws Exception {

        return commonService.setDataLog(number, enable);
    }

    @GetMapping("/common/authorizes")
    @ResponseBody
    public Object authorizes() throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return securityService.authorizes(identity.getCompanyId());
    }

}
