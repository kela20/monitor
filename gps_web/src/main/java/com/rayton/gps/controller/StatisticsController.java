package com.rayton.gps.controller;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.common.DateFormats;
import com.rayton.gps.common.ObjectId;
import com.rayton.gps.dao.security.IdentifyDto;
import com.rayton.gps.dao.security.OperateLog;
import com.rayton.gps.dao.statistics.*;
import com.rayton.gps.export.ExcelView;
import com.rayton.gps.export.PdfView;
import com.rayton.gps.model.baseinfo.AdminMenu;
import com.rayton.gps.service.SecurityService;
import com.rayton.gps.service.StatisticsService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DecimalFormat;
import java.util.*;

@Controller
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    private SecurityService securityService;

    @RequiresPermissions("statistics")
    @ServiceMethod(id = "statistics", prefix = "打开", name = "统计分析", suffix = "页面")
    @RequestMapping("/statistics")
    public String index() {
        return "/statistics/index";
    }

    @RequestMapping(value = "/statistics/menus", method = RequestMethod.POST)
    @ResponseBody
    public Object menus(HttpServletRequest request) throws Exception {

        ArrayList<AdminMenu> menus = new ArrayList<AdminMenu>();

        int count = 0;

        AdminMenu menuTeamOperationDataAnalysis = new AdminMenu();
        menuTeamOperationDataAnalysis.setId(ObjectId.next());
        menuTeamOperationDataAnalysis.setText("车队运营数据分析");
        menuTeamOperationDataAnalysis.setLeaf(false);

        if (securityService.hasAuthorized("statistics.historyOnlineOffline")) {
            AdminMenu menuHistoryOnlineOffline = new AdminMenu();
            menuHistoryOnlineOffline.setId(ObjectId.next());
            menuHistoryOnlineOffline.setPid(menuTeamOperationDataAnalysis.getId());
            menuHistoryOnlineOffline.setText("历史上线率统计");
            menuHistoryOnlineOffline.setUrl("statistics/historyOnlineOffline.iframe");
            menuHistoryOnlineOffline.setLeaf(true);
            menus.add(menuHistoryOnlineOffline);
            count++;
        }

        if (securityService.hasAuthorized("statistics.historyOnlineTime")) {
            AdminMenu menuHistoryOnlineTime = new AdminMenu();
            menuHistoryOnlineTime.setId(ObjectId.next());
            menuHistoryOnlineTime.setPid(menuTeamOperationDataAnalysis.getId());
            menuHistoryOnlineTime.setText("历史在线率统计");
            menuHistoryOnlineTime.setUrl("statistics/historyOnlineTime.iframe");
            menuHistoryOnlineTime.setLeaf(true);
            menus.add(menuHistoryOnlineTime);
            count++;
        }

        if (securityService.hasAuthorized("statistics.currentOnlineOffline")) {
            AdminMenu menuCurrentVehileOnline = new AdminMenu();
            menuCurrentVehileOnline.setId(ObjectId.next());
            menuCurrentVehileOnline.setPid(menuTeamOperationDataAnalysis.getId());
            menuCurrentVehileOnline.setText("当前在线率统计");
            menuCurrentVehileOnline.setUrl("statistics/currentOnlineOffline.iframe");
            menuCurrentVehileOnline.setLeaf(true);
            menus.add(menuCurrentVehileOnline);
            count++;
        }

        if (securityService.hasAuthorized("statistics.mileageOil")) {
            AdminMenu menuMileageOil = new AdminMenu();
            menuMileageOil.setId(ObjectId.next());
            menuMileageOil.setPid(menuTeamOperationDataAnalysis.getId());
            menuMileageOil.setText("行驶里程及油耗");
            menuMileageOil.setUrl("statistics/mileageOil.iframe");
            menuMileageOil.setLeaf(true);
            menus.add(menuMileageOil);
            count++;
        }

        if (securityService.hasAuthorized("statistics.vehicleAlarm")) {
            AdminMenu menuVehicleAlarm = new AdminMenu();
            menuVehicleAlarm.setId(ObjectId.next());
            menuVehicleAlarm.setPid(menuTeamOperationDataAnalysis.getId());
            menuVehicleAlarm.setText("车辆警情统计");
            menuVehicleAlarm.setUrl("statistics/vehicleAlarm.iframe");
            menuVehicleAlarm.setLeaf(true);
            menus.add(menuVehicleAlarm);
            count++;
        }

        if (count > 0)
            menus.add(menuTeamOperationDataAnalysis);
        count++;

        AdminMenu menuDrivingBehaviorAnalysis = new AdminMenu();
        menuDrivingBehaviorAnalysis.setId(ObjectId.next());
        menuDrivingBehaviorAnalysis.setText("驾驶行为分析");
        menuDrivingBehaviorAnalysis.setLeaf(false);

        if (securityService.hasAuthorized("statistics.vehicleFatigueDriving")) {
            AdminMenu menuVehicleFatigueDriving = new AdminMenu();
            menuVehicleFatigueDriving.setId(ObjectId.next());
            menuVehicleFatigueDriving.setPid(menuDrivingBehaviorAnalysis.getId());
            menuVehicleFatigueDriving.setText("车辆疲劳驾驶");
            menuVehicleFatigueDriving.setUrl("statistics/vehicleFatigueDriving.iframe");
            menuVehicleFatigueDriving.setLeaf(true);
            menus.add(menuVehicleFatigueDriving);
            count++;
        }

        if (securityService.hasAuthorized("statistics.vehicleOverspeed")) {
            AdminMenu menuVehicleOverspeed = new AdminMenu();
            menuVehicleOverspeed.setId(ObjectId.next());
            menuVehicleOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
            menuVehicleOverspeed.setText("非区域超速统计");
            menuVehicleOverspeed.setUrl("statistics/vehicleOverspeed.iframe");
            menuVehicleOverspeed.setLeaf(true);
            menus.add(menuVehicleOverspeed);
            count++;
        }

        if (securityService.hasAuthorized("statistics.sectionOverspeed")) {
            AdminMenu menuSectionOverspeed = new AdminMenu();
            menuSectionOverspeed.setId(ObjectId.next());
            menuSectionOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
            menuSectionOverspeed.setText("车辆路段超速");
            menuSectionOverspeed.setUrl("statistics/sectionOverspeed.iframe");
            menuSectionOverspeed.setLeaf(true);
            menus.add(menuSectionOverspeed);
            count++;
        }

        if (securityService.hasAuthorized("statistics.areaOverspeed")) {
            AdminMenu menuAreaOverspeed = new AdminMenu();
            menuAreaOverspeed.setId(ObjectId.next());
            menuAreaOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
            menuAreaOverspeed.setText("车辆区域超速");
            menuAreaOverspeed.setUrl("statistics/areaOverspeed.iframe");
            menuAreaOverspeed.setLeaf(true);
            menus.add(menuAreaOverspeed);
            count++;
        }

        if (securityService.hasAuthorized("statistics.timeoutParking")) {
            AdminMenu menuTimeoutParking = new AdminMenu();
            menuTimeoutParking.setId(ObjectId.next());
            menuTimeoutParking.setPid(menuDrivingBehaviorAnalysis.getId());
            menuTimeoutParking.setText("车辆停车超时");
            menuTimeoutParking.setUrl("statistics/timeoutParking.iframe");
            menuTimeoutParking.setLeaf(true);
            menus.add(menuTimeoutParking);
            count++;
        }

        if (securityService.hasAuthorized("statistics.routeDeviation")) {
            AdminMenu menuRouteDeviation = new AdminMenu();
            menuRouteDeviation.setId(ObjectId.next());
            menuRouteDeviation.setPid(menuDrivingBehaviorAnalysis.getId());
            menuRouteDeviation.setText("路线偏离统计");
            menuRouteDeviation.setUrl("statistics/routeDeviation.iframe");
            menuRouteDeviation.setLeaf(true);
            menus.add(menuRouteDeviation);
            count++;
        }

        if (securityService.hasAuthorized("statistics.areaIo")) {
            AdminMenu menuAreaIO = new AdminMenu();
            menuAreaIO.setId(ObjectId.next());
            menuAreaIO.setPid(menuDrivingBehaviorAnalysis.getId());
            menuAreaIO.setText("进出区域统计");
            menuAreaIO.setUrl("statistics/areaIo.iframe");
            menuAreaIO.setLeaf(true);
            menus.add(menuAreaIO);
            count++;
        }

        if (count > 0)
            menus.add(menuDrivingBehaviorAnalysis);
        count = 0;

        AdminMenu menuLogs = new AdminMenu();
        menuLogs.setId(ObjectId.next());
        menuLogs.setText("日志查询");
        menuLogs.setLeaf(false);

        if (securityService.hasAuthorized("statistics.operateLog")) {
            AdminMenu menuOperationLog = new AdminMenu();
            menuOperationLog.setId(ObjectId.next());
            menuOperationLog.setPid(menuLogs.getId());
            menuOperationLog.setText("操作日志");
            menuOperationLog.setUrl("statistics/operateLog.iframe");
            menuOperationLog.setLeaf(true);
            menus.add(menuOperationLog);
            count++;
        }

        if (count > 0)
            menus.add(menuLogs);

        return menus;
    }


    @RequiresPermissions("statistics.historyOnlineOffline")
    @ServiceMethod(id = "statistics.historyOnlineOffline", pid = "statistics", prefix = "打开", name = "历史上线率统计",
            suffix = "页面")
    @RequestMapping(value = "/statistics/historyOnlineOffline.iframe", method = RequestMethod.GET)
    public String historyVehicleOnlineIframe() {
        return "/statistics/team/historyOnlineOffline.iframe";
    }

    @RequestMapping(value = "/statistics/historyOnlineOfflineCount", method = RequestMethod.POST)
    @ResponseBody
    public Object historyOnlineOfflineCount(@RequestParam String motorcade, @RequestParam Date start, @RequestParam
            Date end, @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.historyOnlineOfflineCount(identity.getId(), motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/historyOnlineOfflineCountExport", method = RequestMethod.POST)
    public ModelAndView historyOnlineOfflineCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                        @RequestParam Date end, @RequestParam String type,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<HistoryOnlineOfflineCount> list = statisticsService.historyOnlineOfflineCount(identity.getId(),
                motorcade, start, end);

        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "HistoryOnlineOfflineCount");
        map.put("title", "车辆历史上线率统计");
        map.put("headers", new String[]{"车队", "开始时间", "结束时间", "车辆总数", "上线数量", "上线率", "下线数量", "下线率"});
        map.put("widths", new float[]{20f, 15f, 15f, 10f, 10f, 10f, 10f, 10f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (HistoryOnlineOfflineCount count : list) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));
            row.add(count.getTotal() + "");
            row.add(count.getOnline() + "");
            row.add(count.getOnlineRate() + "%");
            row.add(count.getOffline() + "");
            row.add(count.getOfflineRate() + "%");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/historyOnlineOfflineDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object historyOnlineOfflineDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                             @RequestParam Date start, @RequestParam Date end, @RequestParam int
                                                         pageIndex, @RequestParam int pageSize, HttpServletRequest
                                                         request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.historyOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/historyOnlineOfflineDetailExport", method = RequestMethod.POST)
    public ModelAndView historyOnlineOfflineDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
                                                         HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<HistoryOnlineOfflineDetail> detail = statisticsService.historyOnlineOfflineDetail(identity.getId(),
                motorcadeId, motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "HistoryOnlineOfflineDetail");
        map.put("title", "车辆历史上线率明细");
        map.put("headers", new String[]{"车队", "车牌号", "开始时间", "结束时间", "在线情况"});
        map.put("widths", new float[]{25f, 25f, 20f, 20f, 10f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (HistoryOnlineOfflineDetail count : detail) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getPlateNumber());
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));
            row.add(count.getOnline() ? "在线" : "下线");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.historyOnlineTime")
    @ServiceMethod(id = "statistics.historyOnlineTime", pid = "statistics", prefix = "打开", name = "历史在线率统计", suffix =
            "页面")
    @RequestMapping(value = "/statistics/historyOnlineTime.iframe", method = RequestMethod.GET)
    public String historyOnlineTime() {
        return "/statistics/team/historyOnlineTime.iframe";
    }

    @RequestMapping(value = "/statistics/historyOnlineTimeCount", method = RequestMethod.POST)
    @ResponseBody
    public Object historyOnlineTimeCount(@RequestParam String motorcade, @RequestParam Date start, @RequestParam Date
            end, @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.historyOnlineTimeCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/historyOnlineTimeCountExport", method = RequestMethod.POST)
    public ModelAndView historyOnlineTimeCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                     @RequestParam Date end, @RequestParam String type,
                                                     HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<HistoryOnlineTimeCount> counts = statisticsService.historyOnlineTimeCount(identity.getId(), motorcade,
                start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "HistoryOnlineOfflineCount");
        map.put("title", "车辆历史在线率统计");
        map.put("headers", new String[]{"车队", "开始时间", "结束时间", "应在线时长", "实在线时长", "在线率", "离线率"});
        map.put("widths", new float[]{30f, 15f, 15f, 10f, 10f, 10f, 10f});

        DecimalFormat df = new DecimalFormat("#0.##");
        List<List<String>> rows = new ArrayList<List<String>>();
        for (HistoryOnlineTimeCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));
            row.add(count.getMust() + "分钟");
            row.add(count.getReal() + "分钟");
            row.add(df.format(count.getOnlineRate()) + "%");
            row.add(df.format(count.getOfflineRate()) + "%");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/historyOnlineTimeDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object historyOnlineTimeDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                          @RequestParam Date start, @RequestParam Date end, @RequestParam int
                                                      pageIndex, @RequestParam int pageSize, HttpServletRequest
                                                      request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.historyOnlineTimeDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/historyOnlineTimeDetailExport", method = RequestMethod.POST)
    public ModelAndView historyOnlineTimeDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
                                                      HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<HistoryOnlineTimeDetail> counts = statisticsService.historyOnlineTimeDetail(identity.getId(),
                motorcadeId, motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "HistoryOnlineTimeDetail");
        map.put("title", "车辆历史在线率明细");
        map.put("headers", new String[]{"车队", "车牌号", "开始时间", "结束时间", "应在线时长", "实在线时长", "在线率", "离线率"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 10f, 10f, 10f, 10f});

        DecimalFormat df = new DecimalFormat("#0.##");
        List<List<String>> rows = new ArrayList<List<String>>();
        for (HistoryOnlineTimeDetail count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getPlateNumber());
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));
            row.add(count.getMust() + "分钟");
            row.add(count.getReal() + "分钟");
            row.add(df.format(count.getOnlineRate()) + "%");
            row.add(df.format(count.getOfflineRate()) + "%");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.currentOnlineOffline")
    @ServiceMethod(id = "statistics.currentOnlineOffline", pid = "statistics", prefix = "打开", name = "当前在线率统计",
            suffix = "页面")
    @RequestMapping(value = "/statistics/currentOnlineOffline.iframe", method = RequestMethod.GET)
    public String currentOnlineOfflineIframe() {
        return "/statistics/team/currentOnlineOffline.iframe";
    }

    @RequestMapping(value = "/statistics/currentOnlineOfflineCount", method = RequestMethod.POST)
    @ResponseBody
    public Object currentOnlineOfflineCount(@RequestParam String motorcade, @RequestParam int pageIndex,
                                            @RequestParam int pageSize, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.currentOnlineOfflineCount(identity.getId(), motorcade, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/currentOnlineOfflineCountExport", method = RequestMethod.POST)
    public ModelAndView currentOnlineOfflineCountExport(@RequestParam String motorcade, @RequestParam String type,
                                                        HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<CurrentOnlineOfflineCount> counts = statisticsService.currentOnlineOfflineCount(identity.getId(),
                motorcade);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "CurrentOnlineOfflineCount");
        map.put("title", "车辆当前在线率统计");
        map.put("headers", new String[]{"车队", "车辆总数", "上线数量", "上线率", "下线数量", "下线率"});
        map.put("widths", new float[]{20f, 10f, 10f, 10f, 10f, 10f});

        DecimalFormat df = new DecimalFormat("#0.##");
        List<List<String>> rows = new ArrayList<List<String>>();
        for (CurrentOnlineOfflineCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTotal() + "");
            row.add(count.getOnline() + "");
            row.add(df.format(count.getOnlineRate()) + "%");
            row.add(count.getOffline() + "");
            row.add(df.format(count.getOfflineRate()) + "%");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/currentOnlineOfflineDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object currentOnlineOfflineDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                             @RequestParam int pageIndex, @RequestParam int pageSize,
                                             HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.currentOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/currentOnlineOfflineDetailExport", method = RequestMethod.POST)
    public ModelAndView currentOnlineOfflineDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam String type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<CurrentOnlineOfflineDetail> counts = statisticsService.currentOnlineOfflineDetail(identity.getId(),
                motorcadeId, motorcade);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "CurrentOnlineOfflineDetail");
        map.put("title", "车辆当前在线率明细");
        map.put("headers", new String[]{"车队", "车牌号", "在线情况"});
        map.put("widths", new float[]{40f, 40f, 20f});

        List<List<String>> rows = new ArrayList<List<String>>();
        for (CurrentOnlineOfflineDetail count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getPlateNumber());
            row.add(count.getOnline() ? "在线" : "下线");

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.mileageOil")
    @ServiceMethod(id = "statistics.mileageOil", pid = "statistics", prefix = "打开", name = "行驶里程及油耗", suffix = "统计页面")
    @RequestMapping(value = "/statistics/mileageOil.iframe", method = RequestMethod.GET)
    public String mileageOilIframe() {
        return "/statistics/team/mileageOil.iframe";
    }

    @RequestMapping(value = "/statistics/mileageOilCount", method = RequestMethod.POST)
    @ResponseBody
    public Object mileageOilCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.mileageOilCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/mileageOilCountExport", method = RequestMethod.POST)
    public ModelAndView mileageOilCountExport(@RequestParam String motorcade, @RequestParam Date start, @RequestParam
            Date end, @RequestParam String type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<MileageOilCount> counts = statisticsService.mileageOilCount(identity.getId(), motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "MileageOilCount");
        map.put("title", "行驶里程及油耗统计");
        map.put("headers", new String[]{"车队", "开始时间", "结束时间", "车辆总数", "行驶里程(KM)", "车辆油耗(L)"});
        map.put("widths", new float[]{30f, 15f, 15f, 10f, 15f, 15f});
        DecimalFormat df1 = new DecimalFormat("#0.#");
        DecimalFormat df2 = new DecimalFormat("#0.##");
        List<List<String>> rows = new ArrayList<List<String>>();
        for (MileageOilCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));
            row.add(count.getVehicles() + "");
            row.add(df2.format(count.getMileages()));
            row.add(df1.format(count.getOils()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/mileageOilDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object mileageOilDetail(@RequestParam String motorcadeId, @RequestParam String motorcade, @RequestParam
            Date start, @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize,
                                   HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.mileageOilDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/mileageOilDetailExport", method = RequestMethod.POST)
    public ModelAndView mileageOilDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                               @RequestParam Date start, @RequestParam Date end, @RequestParam String
                                                           type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<MileageOilDetail> details = statisticsService.mileageOilDetail(identity.getId(), motorcadeId, motorcade,
                start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "MileageOilDetail");
        map.put("title", "行驶里程及油耗明细");
        map.put("headers", new String[]{"车队", "车牌号", "开始时间", "结束时间", "行驶里程(KM)", "车辆油耗(L)"});
        map.put("widths", new float[]{30f, 15f, 15f, 10f, 15f, 15f});
        DecimalFormat df1 = new DecimalFormat("#0.#");
        DecimalFormat df2 = new DecimalFormat("#0.##");
        List<List<String>> rows = new ArrayList<List<String>>();
        for (MileageOilDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));
            row.add(df2.format(detail.getMileages()));
            row.add(df1.format(detail.getOils()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.vehicleAlarm")
    @ServiceMethod(id = "statistics.vehicleAlarm", pid = "statistics", prefix = "打开", name = "车辆警情统计", suffix = "页面")
    @RequestMapping(value = "/statistics/vehicleAlarm.iframe", method = RequestMethod.GET)
    public String vehicleAlarmIframe() {
        return "/statistics/team/vehicleAlarm.iframe";
    }

    @RequestMapping(value = "/statistics/vehicleAlarmCount", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleAlarmCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleAlarmCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleAlarmCountExport", method = RequestMethod.POST)
    public ModelAndView vehicleAlarmCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                @RequestParam Date end, @RequestParam String type, HttpServletRequest
                                                            request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleAlarmCount> counts = statisticsService.vehicleAlarmCount(identity.getId(), motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleAlarmCount");
        map.put("title", "车辆警情统计");
        map.put("headers", new String[]{"车队", "非区域超速次数", "区域内超速次数", "路段超速次数", "疲劳驾驶次数", "超时停车次数", "路线偏离次数", "开始时间",
                "结束时间"});
        map.put("widths", new float[]{20f, 10f, 10f, 10f, 10f, 10f, 10f, 10f, 10f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleAlarmCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getOverspeedNoneArea() + "");
            row.add(count.getOverspeedInArea() + "");
            row.add(count.getOverspeedInSection() + "");
            row.add(count.getFatigueDriving() + "");
            row.add(count.getParkingTimeout() + "");
            row.add(count.getRouteDeparture() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/vehicleAlarmDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleAlarmDetail(@RequestParam String motorcadeId, @RequestParam String motorcade, @RequestParam
            Date start, @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize,
                                     HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleAlarmDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleAlarmDetailExport", method = RequestMethod.POST)
    public ModelAndView vehicleAlarmDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                                 @RequestParam Date start, @RequestParam Date end, @RequestParam
                                                             String type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleAlarmDetail> details = statisticsService.vehicleAlarmDetail(identity.getId(), motorcadeId,
                motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleAlarmDetail");
        map.put("title", "车辆警情明细");
        map.put("headers", new String[]{"车队", "车牌号", "非区域超速次数", "区域内超速次数", "路段超速次数", "疲劳驾驶次数", "超时停车次数", "路线偏离次数",
                "开始时间", "结束时间"});
        map.put("widths", new float[]{10f, 10f, 10f, 10f, 10f, 10f, 10f, 10f, 10f, 10f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleAlarmDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getOverspeedNoneArea() + "");
            row.add(detail.getOverspeedInArea() + "");
            row.add(detail.getOverspeedInSection() + "");
            row.add(detail.getFatigueDriving() + "");
            row.add(detail.getParkingTimeout() + "");
            row.add(detail.getRouteDeparture() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.vehicleFatigueDriving")
    @ServiceMethod(id = "statistics.vehicleFatigueDriving", pid = "statistics", prefix = "打开", name = "车辆疲劳驾驶",
            suffix = "统计页面")
    @RequestMapping(value = "/statistics/vehicleFatigueDriving.iframe", method = RequestMethod.GET)
    public String vehicleFatigueDrivingIframe() {
        return "/statistics/driving/vehicleFatigueDriving.iframe";
    }

    @RequestMapping(value = "/statistics/vehicleFatigueDrivingCount", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleFatigueDrivingCount(@RequestParam String motorcade, @RequestParam int pageIndex,
                                             @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date
                                                         end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleFatigueDrivingCount(identity.getId(), motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleFatigueDrivingCountExport", method = RequestMethod.POST)
    public ModelAndView vehicleFatigueDrivingCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                         @RequestParam Date end, @RequestParam String type,
                                                         HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleFatigueDrivingCount> counts = statisticsService.vehicleFatigueDrivingCount(identity.getId(),
                motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleFatigueDrivingCount");
        map.put("title", "车辆疲劳驾驶统计");
        map.put("headers", new String[]{"车队", "疲劳驾驶次数", "疲劳合计里程", "疲劳时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{25f, 15f, 15f, 15f, 15f, 15f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleFatigueDrivingCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getMileages() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/vehicleFatigueDrivingDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleFatigueDrivingDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                              @RequestParam Date start, @RequestParam Date end, @RequestParam int
                                                          pageIndex, @RequestParam int pageSize, HttpServletRequest
                                                          request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleFatigueDrivingDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleFatigueDrivingDetailExport", method = RequestMethod.POST)
    public ModelAndView vehicleFatigueDrivingDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
                                                          HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleFatigueDrivingDetail> details = statisticsService.vehicleFatigueDrivingDetail(identity.getId(),
                motorcadeId, motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleFatigueDrivingDetail");
        map.put("title", "车辆疲劳驾驶明细");
        map.put("headers", new String[]{"车队", "车牌号", "疲劳驾驶次数", "疲劳合计里程", "疲劳时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 15f, 15f, 10f, 10f, 10f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleFatigueDrivingDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getMileages() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.vehicleOverspeed")
    @ServiceMethod(id = "statistics.vehicleOverspeed", pid = "statistics", prefix = "打开", name = "非区域超速统计", suffix =
            "页面")
    @RequestMapping(value = "/statistics/vehicleOverspeed.iframe", method = RequestMethod.GET)
    public String vehicleOverspeedIframe() {
        return "/statistics/driving/vehicleOverspeed.iframe";
    }

    @RequestMapping(value = "/statistics/vehicleOverspeedCount", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam
            int pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleOverspeedCountExport", method = RequestMethod.POST)
    public ModelAndView vehicleOverspeedCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                    @RequestParam Date end, @RequestParam String type,
                                                    HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleOverspeedCount> counts = statisticsService.vehicleOverspeedCount(identity.getId(), motorcade,
                start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleOverspeedCount");
        map.put("title", "车辆非区域超速统计");
        map.put("headers", new String[]{"车队", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleOverspeedCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/vehicleOverspeedDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object vehicleOverspeedDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                         @RequestParam Date start, @RequestParam Date end, @RequestParam int
                                                     pageIndex, @RequestParam int pageSize, HttpServletRequest
                                                     request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.vehicleOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/vehicleOverspeedDetailExport", method = RequestMethod.POST)
    public ModelAndView vehicleOverspeedDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
                                                     HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<VehicleOverspeedDetail> details = statisticsService.vehicleOverspeedDetail(identity.getId(),
                motorcadeId, motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "VehicleOverspeedDetail");
        map.put("title", "车辆非区域超速明细");
        map.put("headers", new String[]{"车队", "车牌号", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (VehicleOverspeedDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.sectionOverspeed")
    @ServiceMethod(id = "statistics.sectionOverspeed", pid = "statistics", prefix = "打开", name = "车辆路段超速", suffix =
            "统计页面")
    @RequestMapping(value = "/statistics/sectionOverspeed.iframe", method = RequestMethod.GET)
    public String sectionOverspeedIframe() {
        return "/statistics/driving/sectionOverspeed.iframe";
    }

    @RequestMapping(value = "/statistics/sectionOverspeedCount", method = RequestMethod.POST)
    @ResponseBody
    public Object sectionOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam
            int pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.sectionOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/sectionOverspeedCountExport", method = RequestMethod.POST)
    public ModelAndView sectionOverspeedCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                    @RequestParam Date end, @RequestParam String type,
                                                    HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<SectionOverspeedCount> counts = statisticsService.sectionOverspeedCount(identity.getId(), motorcade,
                start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "SectionOverspeedCount");
        map.put("title", "车辆路段超速统计");
        map.put("headers", new String[]{"车队", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (SectionOverspeedCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/sectionOverspeedDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object sectionOverspeedDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                         @RequestParam Date start, @RequestParam Date end, @RequestParam int
                                                     pageIndex, @RequestParam int pageSize, HttpServletRequest
                                                     request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.sectionOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/sectionOverspeedDetailExport", method = RequestMethod.POST)
    public ModelAndView sectionOverspeedDetailExport(@RequestParam String motorcadeId, @RequestParam String
            motorcade, @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
                                                     HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<SectionOverspeedDetail> details = statisticsService.sectionOverspeedDetail(identity.getId(),
                motorcadeId, motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "SectionOverspeedDetail");
        map.put("title", "车辆路段超速明细");
        map.put("headers", new String[]{"车队", "车牌号", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (SectionOverspeedDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.areaOverspeed")
    @ServiceMethod(id = "statistics.areaOverspeed", pid = "statistics", prefix = "打开", name = "车辆区域超速", suffix = "统计页面")
    @RequestMapping(value = "/statistics/areaOverspeed.iframe", method = RequestMethod.GET)
    public String areaOverspeedIframe() {
        return "/statistics/driving/areaOverspeed.iframe";
    }

    @RequestMapping(value = "/statistics/areaOverspeedCount", method = RequestMethod.POST)
    @ResponseBody
    public Object areaOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.areaOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/areaOverspeedCountExport", method = RequestMethod.POST)
    public ModelAndView areaOverspeedCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                 @RequestParam Date end, @RequestParam String type,
                                                 HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<AreaOverspeedCount> counts = statisticsService.areaOverspeedCount(identity.getId(), motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "AreaOverspeedCount");
        map.put("title", "车辆区域超速统计");
        map.put("headers", new String[]{"车队", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (AreaOverspeedCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/areaOverspeedDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object areaOverspeedDetail(@RequestParam String motorcadeId, @RequestParam String motorcade, @RequestParam
            Date start, @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize,
                                      HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.areaOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/areaOverspeedDetailExport", method = RequestMethod.POST)
    public ModelAndView areaOverspeedDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                                  @RequestParam Date start, @RequestParam Date end, @RequestParam
                                                              String type, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<AreaOverspeedDetail> details = statisticsService.areaOverspeedDetail(identity.getId(), motorcadeId,
                motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "SectionOverspeedDetail");
        map.put("title", "车辆区域超速明细");
        map.put("headers", new String[]{"车队", "车牌号", "超速次数", "超速时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (AreaOverspeedDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.timeoutParking")
    @ServiceMethod(id = "statistics.timeoutParking", pid = "statistics", prefix = "打开", name = "车辆停车超时", suffix =
            "统计页面")
    @RequestMapping(value = "/statistics/timeoutParking.iframe", method = RequestMethod.GET)
    public String timeoutParkingIframe() {
        return "/statistics/driving/timeoutParking.iframe";
    }

    @RequestMapping(value = "/statistics/timeoutParkingCount", method = RequestMethod.POST)
    @ResponseBody
    public Object timeoutParkingCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.timeoutParkingCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/timeoutParkingCountExport", method = RequestMethod.POST)
    public ModelAndView timeoutParkingCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                  @RequestParam Date end, @RequestParam String type,
                                                  HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<TimeoutParkingCount> counts = statisticsService.timeoutParkingCount(identity.getId(), motorcade, start,
                end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "TimeoutParkingCount");
        map.put("title", "车辆停车超时统计");
        map.put("headers", new String[]{"车队", "停车次数", "停车时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (TimeoutParkingCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/timeoutParkingDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object timeoutParkingDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                       @RequestParam Date start, @RequestParam Date end, @RequestParam int pageIndex,
                                       @RequestParam int pageSize, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.timeoutParkingDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/timeoutParkingDetailExport", method = RequestMethod.POST)
    public ModelAndView timeoutParkingDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                                   @RequestParam Date start, @RequestParam Date end, @RequestParam
                                                               String type, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<TimeoutParkingDetail> details = statisticsService.timeoutParkingDetail(identity.getId(), motorcadeId,
                motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "TimeoutParkingDetail");
        map.put("title", "车辆停车超时明细");
        map.put("headers", new String[]{"车队", "车牌号", "停车次数", "停车时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (TimeoutParkingDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.routeDeviation")
    @ServiceMethod(id = "statistics.routeDeviation", pid = "statistics", prefix = "打开", name = "路线偏离统计", suffix = "页面")
    @RequestMapping(value = "/statistics/routeDeviation.iframe", method = RequestMethod.GET)
    public String routeDeviationIframe() {
        return "/statistics/driving/routeDeviation.iframe";
    }

    @RequestMapping(value = "/statistics/routeDeviationCount", method = RequestMethod.POST)
    @ResponseBody
    public Object routeDeviationCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.routeDeviationCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/routeDeviationCountExport", method = RequestMethod.POST)
    public ModelAndView routeDeviationCountExport(@RequestParam String motorcade, @RequestParam Date start,
                                                  @RequestParam Date end, @RequestParam String type,
                                                  HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<RouteDeviationCount> counts = statisticsService.routeDeviationCount(identity.getId(), motorcade, start,
                end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "RouteDeviationCount");
        map.put("title", "车辆路线偏离统计");
        map.put("headers", new String[]{"车队", "偏离次数", "偏离时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (RouteDeviationCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getTimes() + "");
            row.add(count.getDuration() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/routeDeviationDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object routeDeviationDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                       @RequestParam Date start, @RequestParam Date end, @RequestParam int pageIndex,
                                       @RequestParam int pageSize, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.routeDeviationDetail(identity.getId(), motorcadeId, motorcade, start, end,
                pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/routeDeviationDetailExport", method = RequestMethod.POST)
    public ModelAndView routeDeviationDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                                   @RequestParam Date start, @RequestParam Date end, @RequestParam
                                                               String type, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<RouteDeviationDetail> details = statisticsService.routeDeviationDetail(identity.getId(), motorcadeId,
                motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "RouteDeviationDetail");
        map.put("title", "车辆路线偏离明细");
        map.put("headers", new String[]{"车队", "车牌号", "偏离次数", "偏离时长", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (RouteDeviationDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getTimes() + "");
            row.add(detail.getDuration() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.areaIo")
    @ServiceMethod(id = "statistics.areaIo", pid = "statistics", prefix = "打开", name = "进出区域统计", suffix = "页面")
    @RequestMapping(value = "/statistics/areaIo.iframe", method = RequestMethod.GET)
    public String areaIoIframe() {
        return "/statistics/driving/areaIo.iframe";
    }

    @RequestMapping(value = "/statistics/areaIoCount", method = RequestMethod.POST)
    @ResponseBody
    public Object areaIoCount(@RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int
            pageSize, @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.areaIoCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/areaIoCountExport", method = RequestMethod.POST)
    public ModelAndView areaIoCountExport(@RequestParam String motorcade, @RequestParam Date start, @RequestParam
            Date end, @RequestParam String type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<AreaIoCount> counts = statisticsService.areaIoCount(identity.getId(), motorcade, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "AreaIoCount");
        map.put("title", "车辆进出区域统计");
        map.put("headers", new String[]{"车队", "进区域次数", "出区域次数", "开始时间", "结束时间"});
        map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (AreaIoCount count : counts) {
            List<String> row = new ArrayList<String>();
            row.add(count.getMotorcade());
            row.add(count.getIn() + "");
            row.add(count.getOut() + "");
            row.add(DateFormats.toDateString(count.getStart()));
            row.add(DateFormats.toDateString(count.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }

    @RequestMapping(value = "/statistics/areaIoDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object areaIoDetail(@RequestParam String motorcadeId, @RequestParam String motorcade, @RequestParam Date
            start, @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize,
                               HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.areaIoDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
                pageSize);
    }

    @RequestMapping(value = "/statistics/areaIoDetailExport", method = RequestMethod.POST)
    public ModelAndView areaIoDetailExport(@RequestParam String motorcadeId, @RequestParam String motorcade,
                                           @RequestParam Date start, @RequestParam Date end, @RequestParam String
                                                       type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<AreaIoDetail> details = statisticsService.areaIoDetail(identity.getId(), motorcadeId, motorcade, start,
                end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "AreaIoDetail");
        map.put("title", "车辆进出区域明细");
        map.put("headers", new String[]{"车队", "车牌号", "进区域次数", "出区域次数", "开始时间", "结束时间"});
        map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (AreaIoDetail detail : details) {
            List<String> row = new ArrayList<String>();
            row.add(detail.getMotorcade());
            row.add(detail.getPlateNumber());
            row.add(detail.getIn() + "");
            row.add(detail.getOut() + "");
            row.add(DateFormats.toDateString(detail.getStart()));
            row.add(DateFormats.toDateString(detail.getEnd()));

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }


    @RequiresPermissions("statistics.operateLog")
    @ServiceMethod(id = "statistics.operateLog", pid = "statistics", prefix = "打开", name = "操作日志", suffix = "页面")
    @RequestMapping(value = "/statistics/operateLog.iframe", method = RequestMethod.GET)
    public String operateLogIframe() {
        return "/statistics/log/operateLog.iframe";
    }

    @RequestMapping(value = "/statistics/operateLog", method = RequestMethod.POST)
    @ResponseBody
    public Object operateLog(@RequestParam String user, @RequestParam int pageIndex, @RequestParam int pageSize,
                             @RequestParam Date start, @RequestParam Date end, HttpServletRequest request) throws
            Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        return statisticsService.operateLog(identity.getCompanyId(), user, start, end, pageIndex, pageSize);
    }

    @RequestMapping(value = "/statistics/operateLogExport", method = RequestMethod.POST)
    public ModelAndView operateLogExport(@RequestParam String user, @RequestParam Date start, @RequestParam Date end,
                                         @RequestParam String type, HttpServletRequest request) throws Exception {
        IdentifyDto identity = (IdentifyDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<OperateLog> details = statisticsService.operateAllLog(identity.getCompanyId(), user, start, end);
        Map<String, Object> map = new Hashtable<String, Object>();
        map.put("fileName", "OperateLog");
        map.put("title", "操作日志");
        map.put("headers", new String[]{"时间", "用户", "操作"});
        map.put("widths", new float[]{20f, 10f, 70f});
        List<List<String>> rows = new ArrayList<List<String>>();
        for (OperateLog log : details) {
            List<String> row = new ArrayList<String>();
            row.add(DateFormats.toDateTimeString(log.getTime()));
            row.add(log.getUser());
            row.add(log.getAction());

            rows.add(row);
        }
        map.put("list", rows);
        if (type.equals("pdf")) {
            PdfView pdfView = new PdfView();
            return new ModelAndView(pdfView, map);
        } else {
            ExcelView viewExcel = new ExcelView();
            return new ModelAndView(viewExcel, map);
        }
    }
}