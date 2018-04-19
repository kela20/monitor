package com.rayton.gps.controller;

import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.instruct.FeatureInfo;
import com.rayton.gps.dao.instruct.InstructInfo;
import com.rayton.gps.dao.instruct.ParameterInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.InstructService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class InstructController {
    @Autowired
    private InstructService instructService;

    @PostMapping(value = "/instruct/features")
    @ResponseBody
    public Object features(@RequestParam String number) throws Exception {
        List<FeatureInfo> features = instructService.features(number);

        return features;
    }

    @PostMapping(value = "/instruct/params")
    @ResponseBody
    public Object params(@RequestParam String pid, @RequestParam String featureId) throws Exception {
        List<ParameterInfo> features = instructService.parameters(pid, featureId);
        return features;
    }

    @PostMapping(value = "/instruct/send")
    @ResponseBody
    public Object send(@RequestParam String deviceNumber, @RequestParam String command, @RequestParam String name,
                       @RequestParam String params, @RequestParam String confirm) throws Exception {
        String serialNumber = UUID.randomUUID().toString();
        IdentityDto user = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        // Identity user = (Identity) request.getAttribute("user");
        InstructInfo info = instructService.send(user.getId(), serialNumber, deviceNumber, user.getUnid(), user
                .getName(), command, name, params, confirm);
        return info;
    }

    @PostMapping(value = "/instruct/query")
    @ResponseBody
    public Object query(@RequestParam String deviceNumber, @RequestParam Date start, @RequestParam Date end,
                        @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        Page<InstructInfo> page = instructService.query(deviceNumber, identity.getUnid(), start, end, pageIndex,
                pageSize);

        return page;
    }

    @GetMapping(value = "/instruct/details.form")
    public String details(@RequestParam String id, Model model) throws Exception {
        InstructInfo info = instructService.fetch(id);
        String result = info.getResult().replace("\r\n", "<br />");
        info.setResult(result);
        model.addAttribute("instruct", info);

        return "/instruct/details.form";
    }
}
