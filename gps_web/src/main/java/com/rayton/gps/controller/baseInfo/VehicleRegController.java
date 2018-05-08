package com.rayton.gps.controller.baseInfo;


import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.lisence.Drivervr;
import com.rayton.gps.dao.lisence.VehicleRegister;
import com.rayton.gps.service.lisence.DrivervrService;
import com.rayton.gps.service.lisence.VehicleRegisterService;
import com.rayton.gps.util.Assist;
import com.rayton.gps.util.ResponseEntityWrapper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
public class VehicleRegController {


    @Autowired
    private DrivervrService drivervrService;

    @Autowired
    private VehicleRegisterService vehicleRegisterService;


    @RequiresPermissions("baseinfo.driver")
    @GetMapping("/driver/drivervr")
    @ResponseBody
    public Object vehicles(@RequestParam String driverId) throws Exception {


        Assist row = new Assist();
        row.setRequires(Assist.andEq("driver_id", driverId));
        List<Drivervr> driverdl = drivervrService.selectDrivervr(row);
        // Assist a = new Assist();
        List<VehicleRegister> drivingLisenceList = new ArrayList<>();
        driverdl.forEach(driverdl1 -> drivingLisenceList.add(vehicleRegisterService.selectVehicleRegisterById
                (driverdl1.getVrId())));

        Page<VehicleRegister> page = new Page<>();
        page.rows = drivingLisenceList;
        page.total = drivingLisenceList.size();
        return page;
    }

    @RequiresPermissions("baseinfo.driver.addVehicleReg")
    @PostMapping(value = "/driver/addDrivervr")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> addSections(@RequestParam String driverId, @RequestParam String vr)
            throws Exception {
        List<String> list = Arrays.asList(vr.split(","));
        // List<String> list = JsonMapper.toObject(vehicles, List.class, String.class);

        list.forEach(str -> {
            Drivervr driverdl = new Drivervr();
            driverdl.setDriverId(driverId);
            driverdl.setVrId(Integer.valueOf(str));
            drivervrService.insertDrivervr(driverdl);
        });

        return ResponseEntityWrapper.OK();

    }

    @RequiresPermissions("baseinfo.driver.removeVehicleReg")
    @PostMapping(value = "/driver/removeDrivervr")
    @ResponseBody
    public ResponseEntity<Map<Object, Object>> removeSection(@RequestParam String driverId, @RequestParam String vr)
            throws Exception {
        Assist a = new Assist();
        a.setRequires(Assist.andEq("driver_id", driverId));
        a.setRequires(Assist.andEq("v_r_id", vr));
        drivervrService.deleteDrivervr(a);
        return ResponseEntityWrapper.OK();

    }


}
