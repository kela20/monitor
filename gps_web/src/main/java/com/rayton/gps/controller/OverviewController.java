package com.rayton.gps.controller;

import com.rayton.gps.common.DateFormats;
import com.rayton.gps.dao.baseinfo.company.CompanyInfo;
import com.rayton.gps.dao.baseinfo.vehicle.VehicleInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.export.ExcelView;
import com.rayton.gps.export.PdfView;
import com.rayton.gps.service.OverviewService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

@Controller
public class OverviewController {
    @Autowired
    private OverviewService overviewService;

    @GetMapping(value = "/overview/companyServiceExpired.form")
    public String companyServiceExpired(@RequestParam int days, Model model) {
        model.addAttribute("days", days);
        return "/overview/companyServiceExpired.form";
    }

    @PostMapping(value = "/overview/companyServiceExpired")
    @ResponseBody
    public Object companyServiceExpired(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return overviewService.companyServiceExpired(identity.getId(), days);
    }

    @GetMapping(value = "/overview/companyServiceExpiredExcel")
    public ModelAndView companyServiceExpiredExcel(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<CompanyInfo> list = overviewService.companyServiceExpired(identity.getId(), days);
        ExcelView viewExcel = new ExcelView();

        Map<String, Object> map = makeCompanyServiceExpiredRows(list, days);
        return new ModelAndView(viewExcel, map);
    }

    @GetMapping(value = "/overview/companyServiceExpiredPdf")
    public ModelAndView companyServiceExpiredPdf(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<CompanyInfo> list = overviewService.companyServiceExpired(identity.getId(), days);

        PdfView pdfView = new PdfView();

        Map<String, Object> map = makeCompanyServiceExpiredRows(list, days);
        return new ModelAndView(pdfView, map);
    }

    private Map<String, Object> makeCompanyServiceExpiredRows(List<CompanyInfo> list, int days) {
        Map<String, Object> map = new Hashtable<>();
        map.put("fileName", "CompanyService");
        map.put("title", "企业服务到期" + (days > 0 ? "(" + days + "天内)" : ""));
        map.put("headers", new String[]{"简称", "全称", "办公地址", "服务开始时间", "服务结束时间", "值班电话", "入网时间", "备注"});
        map.put("widths", new float[]{10f, 20f, 18f, 10f, 10f, 12f, 10f, 10f});

        List<List<String>> rows = new ArrayList<>();

        list.forEach(companyInfo -> {
            List<String> row = new ArrayList<>();
            row.add(companyInfo.getShortName());
            row.add(companyInfo.getFullName());
            row.add(companyInfo.getOfficeAddress());
            row.add(DateFormats.toDateString(companyInfo.getServiceStartDate()));
            row.add(DateFormats.toDateString(companyInfo.getServiceEndDate()));
            row.add(companyInfo.getOndutyPhone());
            row.add(DateFormats.toDateString(companyInfo.getCreateTime()));
            row.add(companyInfo.getRemark());

            rows.add(row);
        });


        // for (CompanyInfo info : list) {
        //     List<String> row = new ArrayList<String>();
        //     row.add(info.getShortName());
        //     row.add(info.getFullName());
        //     row.add(info.getOfficeAddress());
        //     row.add(DateFormats.toDateString(info.getServiceStartDate()));
        //     row.add(DateFormats.toDateString(info.getServiceEndDate()));
        //     row.add(info.getOndutyPhone());
        //     row.add(DateFormats.toDateString(info.getCreateTime()));
        //     row.add(info.getRemark());
        //
        //     rows.add(row);
        // }
        map.put("list", rows);
        return map;
    }

    @GetMapping(value = "/overview/vehicleServiceExpired.form")
    public String vehicleServiceExpired(@RequestParam int days, Model model) {
        model.addAttribute("days", days);
        return "/overview/vehicleServiceExpired.form";
    }

    @PostMapping(value = "/overview/vehicleServiceExpired")
    @ResponseBody
    public Object VehicleServiceExpired(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return overviewService.vehicleServiceExpired(identity.getId(), days);
    }

    @GetMapping(value = "/overview/vehicleServiceExpiredExcel")
    public ModelAndView VehicleServiceExpiredExcel(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleServiceExpired(identity.getId(), days);
        ExcelView viewExcel = new ExcelView();

        Map<String, Object> map = makeVehicleServiceExpiredRows(list, days);
        return new ModelAndView(viewExcel, map);
    }

    @GetMapping(value = "/overview/vehicleServiceExpiredPdf")
    public ModelAndView VehicleServiceExpiredPdf(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleServiceExpired(identity.getId(), days);

        PdfView pdfView = new PdfView();

        Map<String, Object> map = makeVehicleServiceExpiredRows(list, days);
        return new ModelAndView(pdfView, map);
    }

    private Map<String, Object> makeVehicleServiceExpiredRows(List<VehicleInfo> list, int days) {
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleService");
        map.put("title", "车辆服务到期" + (days > 0 ? "(" + days + "天内)" : ""));
        map.put("headers", new String[]{"车牌号", "设备号", "电话号码", "车队", "服务开始时间", "服务结束时间", "安装时间", "备注"});
        map.put("widths", new float[]{15f, 15f, 10f, 20f, 10f, 10f, 10f, 10f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleInfo info : list) {
            List<String> row = new ArrayList<String>();
            row.add(info.getPlateNumber());
            row.add(info.getDeviceNumber());
            row.add(info.getPhoneNumber());
            row.add(info.getMotorcade());
            row.add(DateFormats.toDateString(info.getServiceStartDate()));
            row.add(DateFormats.toDateString(info.getServiceEndDate()));
            row.add(DateFormats.toDateString(info.getInstallDate()));
            row.add(info.getRemark());

            rows.add(row);
        }
        map.put("list", rows);
        return map;
    }

    @GetMapping(value = "/overview/vehicleMaintainExpired.form")
    public String vehicleMaintainExpired(@RequestParam int days, Model model) {
        model.addAttribute("days", days);
        return "/overview/vehicleMaintainExpired.form";
    }

    @PostMapping(value = "/overview/vehicleMaintainExpired")
    @ResponseBody
    public Object vehicleMaintainExpired(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return overviewService.vehicleMaintainExpired(identity.getId(), days);
    }

    @GetMapping(value = "/overview/vehicleMaintainExpiredExcel")
    public ModelAndView vehicleMaintainExpiredExcel(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleMaintainExpired(identity.getId(), days);
        ExcelView viewExcel = new ExcelView();

        Map<String, Object> map = makeVehicleMaintainExpiredRows(list, days);
        return new ModelAndView(viewExcel, map);
    }

    @GetMapping(value = "/overview/vehicleMaintainExpiredPdf")
    public ModelAndView vehicleMaintainExpiredPdf(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleMaintainExpired(identity.getId(), days);

        PdfView pdfView = new PdfView();

        Map<String, Object> map = makeVehicleMaintainExpiredRows(list, days);
        return new ModelAndView(pdfView, map);
    }

    private Map<String, Object> makeVehicleMaintainExpiredRows(List<VehicleInfo> list, int days) {
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleMaintain");
        map.put("title", "车辆保养到期" + (days > 0 ? "(" + days + "天内)" : ""));
        map.put("headers", new String[]{"车牌号", "设备号", "电话号码", "车队", "安装时间", "保养时间", "备注"});
        map.put("widths", new float[]{15f, 15f, 10f, 20f, 10f, 10f, 10f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleInfo info : list) {
            List<String> row = new ArrayList<String>();
            row.add(info.getPlateNumber());
            row.add(info.getDeviceNumber());
            row.add(info.getPhoneNumber());
            row.add(info.getMotorcade());
            row.add(DateFormats.toDateString(info.getInstallDate()));
            row.add(DateFormats.toDateString(info.getNextMaintainDate()));
            row.add(info.getRemark());

            rows.add(row);
        }
        map.put("list", rows);
        return map;
    }

    @GetMapping(value = "/overview/vehicleAnnualSurveyExpired.form")
    public String vehicleAnnualSurveyExpired(@RequestParam int days, Model model) {
        model.addAttribute("days", days);
        return "/overview/vehicleAnnualSurveyExpired.form";
    }

    @PostMapping(value = "/overview/vehicleAnnualSurveyExpired")
    @ResponseBody
    public Object vehicleAnnualSurveyExpired(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return overviewService.vehicleAnnualSurveyExpired(identity.getId(), days);
    }

    @GetMapping(value = "/overview/vehicleAnnualSurveyExpiredExcel")
    public ModelAndView vehicleAnnualSurveyExpiredExcel(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleAnnualSurveyExpired(identity.getId(), days);
        ExcelView viewExcel = new ExcelView();

        Map<String, Object> map = makeVehicleAnnualSurveyExpiredRows(list, days);
        return new ModelAndView(viewExcel, map);
    }

    @GetMapping(value = "/overview/vehicleAnnualSurveyExpiredPdf")
    public ModelAndView vehicleAnnualSurveyExpiredPdf(@RequestParam int days) throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleInfo> list = overviewService.vehicleAnnualSurveyExpired(identity.getId(), days);

        PdfView pdfView = new PdfView();

        Map<String, Object> map = makeVehicleAnnualSurveyExpiredRows(list, days);
        return new ModelAndView(pdfView, map);
    }

    private Map<String, Object> makeVehicleAnnualSurveyExpiredRows(List<VehicleInfo> list, int days) {
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleAnnualSurvey");
        map.put("title", "车辆年检到期" + (days > 0 ? "(" + days + "天内)" : ""));
        map.put("headers", new String[]{"车牌号", "设备号", "电话号码", "车队", "安装时间", "年检时间", "备注"});
        map.put("widths", new float[]{15f, 15f, 10f, 20f, 10f, 10f, 10f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleInfo info : list) {
            List<String> row = new ArrayList<String>();
            row.add(info.getPlateNumber());
            row.add(info.getDeviceNumber());
            row.add(info.getPhoneNumber());
            row.add(info.getMotorcade());
            row.add(DateFormats.toDateString(info.getInstallDate()));
            row.add(DateFormats.toDateString(info.getAnnualSurveyDate()));
            row.add(info.getRemark());

            rows.add(row);
        }
        map.put("list", rows);
        return map;
    }
}
