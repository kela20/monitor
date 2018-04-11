package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.locate.GodpDataBlock;
import com.rayton.gps.dao.locate.GroupVehicle;
import com.rayton.gps.dao.locate.VehicleInfo;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.domain.AppResponse;
import com.rayton.gps.service.LocateService;
import com.rayton.gps.service.UserService;
import com.rayton.gps.util.WebUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class LocateController {
    @Autowired
    private LocateService locateService;
    @Autowired
    private UserService userService;


    @RequiresPermissions("center.locate")
    @Log(id = "center.locate", pid = "center", prefix = "打开", name = "实时监控", suffix = "页面")
    @GetMapping("/locate/locate.iframe")
    public String index() {
        return "/center/locate/locate.iframe";
    }


    @GetMapping("/locate/locate.panel")
    public String locate() {
        return "/center/new/locate/map.panel";
    }

    @GetMapping("/locate/maptools.panel")
    public String maptools() {
        return "/center/locate/maptools.panel";
    }

    @PostMapping(value = "/locate/groupVehicles")
    @ResponseBody
    public Object groupVehicles(@RequestParam boolean force, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<GroupVehicle> list = locateService.loadGroupVehicles(identity.getId(), force);
        //        GroupVehicle top = new GroupVehicle();
        //        top.setId(identity.getId());
        //        top.setType(2);
        //        top.setNa("全部");
        //        list.add(top);

        list.forEach(groupVehicle -> {
            int type = groupVehicle.getType();
            if (type == 1) {
                groupVehicle.setIcon("../resources/css/x16/flag.png");
            } else if (type == 2) {
                groupVehicle.setIcon("../resources/css/x16/company.png");
            } else {
                groupVehicle.setIcon(groupVehicle.getO() == 1 ? "../resources/css/x16/online.png" :
                        "../resources/css/x16/offline.png");
            }
        });

        // for (GroupVehicle groupVehicle : list) {
        //     // System.out.println(groupVehicle);
        //     switch (groupVehicle.getType()) {
        //         case 1:
        //             groupVehicle.setIcon("../resources/css/x16/flag.png");
        //             break;
        //         case 2:
        //             groupVehicle.setIcon("../resources/css/x16/company.png");
        //             break;
        //         default:
        //             groupVehicle.setIcon(groupVehicle.getO() == 1 ? "../resources/css/x16/online.png" :
        //                     "../resources/css/x16/offline.png");
        //             break;
        //     }
        // }
        // System.out.println(list);
        // Map<String, Object> map = new HashMap<>();
        // map.put("Rows", list);
        // map.put("Total", list.size());
        // return map;
        // // TODO fuck me
        return list;

    }

    /**
     * 处理godp发送过来的数据
     */
    @RequestMapping(value = "/locate/realtime", method = RequestMethod.POST)
    @ResponseBody
    public Object devices(@RequestBody GodpDataBlock block) {
        locateService.handleGodpData(block);
        return new AppResponse();
    }

    @RequestMapping(value = "/locate/latests", method = RequestMethod.POST)
    @ResponseBody
    public Object latests(@RequestParam List<String> list) throws Exception {
        return locateService.loadLatests(list);
    }


    @RequiresPermissions("center.locate.vehileinfo")
    @Log(id = "center.locate.vehileinfo", pid = "center.locate", prefix = "查询", name = "车辆资料")
    @GetMapping(value = "/locate/vehicleinfo.iframe")
    public String vehicleInfo(@RequestParam String vehicleId, Model model) throws Exception {
        VehicleInfo vehicle = locateService.vehicleInfo(vehicleId);
        model.addAttribute("vehicle", vehicle);

        return "/center/locate/vehicleinfo.iframe";
    }

    @PostMapping(value = "/locate/unreadMultimediaEvent")
    @ResponseBody
    public Object loadUnreadMultimediaEvent(HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return locateService.loadUnreadMultimediaEvent(identity.getId());
    }

    @PostMapping(value = "/locate/readMultmediaEventReport")
    public String readMultmediaEventReport(@RequestParam String id, RedirectAttributes r, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        try {
            locateService.readMultmediaEventReport(id, identity.getId(), identity.getName());
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @PostMapping(value = "/locate/unreadDeviceEvent")
    @ResponseBody
    public Object loadUnreadDeviceEvent(HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return locateService.loadUnreadDeviceEvent(identity.getId());
    }

    @PostMapping(value = "/locate/readDeviceEventReport")
    public String readDeviceEventReport(@RequestParam String id, RedirectAttributes r, HttpServletRequest request) {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        try {
            locateService.readDeviceEventReport(id, identity.getId(), identity.getName());
            WebUtil.success(r);
        } catch (Exception ex) {
            WebUtil.error(r, ex.getMessage());
        }

        return "redirect:/result";
    }

    @PostMapping(value = "/locate/unreadDeviceUpgradeResultReport")
    @ResponseBody
    public Object loadUnreadDeviceUpgradeResultReport(HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return locateService.loadUnreadDeviceUpgradeResultReport(identity.getId());
    }

    @PostMapping(value = "/locate/readDeviceUpgradeResultReport")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> readDeviceUpgradeResultReport(@RequestParam String id,
                                                                             HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        locateService.readDeviceUpgradeResultReport(id, identity.getId(), identity.getName());
        Map<String, Object> map = new HashMap<String, Object>() {
            {
                put("error", "ok...");
            }
        };
        return new ResponseEntity<>(map, HttpStatus.OK);

        // return "redirect:/result";
    }
}
