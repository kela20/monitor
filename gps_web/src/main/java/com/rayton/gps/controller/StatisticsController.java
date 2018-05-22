package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.common.DateFormats;
import com.rayton.gps.common.ObjectId;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.dao.security.OperateLog;
import com.rayton.gps.dao.statistics.AreaIoCount;
import com.rayton.gps.dao.statistics.AreaIoDetail;
import com.rayton.gps.dao.statistics.AreaOverspeedCount;
import com.rayton.gps.dao.statistics.AreaOverspeedDetail;
import com.rayton.gps.dao.statistics.CurrentOnlineOfflineCount;
import com.rayton.gps.dao.statistics.CurrentOnlineOfflineDetail;
import com.rayton.gps.dao.statistics.HistoryOnlineOfflineCount;
import com.rayton.gps.dao.statistics.HistoryOnlineOfflineDetail;
import com.rayton.gps.dao.statistics.HistoryOnlineTimeCount;
import com.rayton.gps.dao.statistics.HistoryOnlineTimeDetail;
import com.rayton.gps.dao.statistics.MileageOilCount;
import com.rayton.gps.dao.statistics.MileageOilDetail;
import com.rayton.gps.dao.statistics.RouteDeviationCount;
import com.rayton.gps.dao.statistics.RouteDeviationDetail;
import com.rayton.gps.dao.statistics.SectionOverspeedCount;
import com.rayton.gps.dao.statistics.SectionOverspeedDetail;
import com.rayton.gps.dao.statistics.TimeoutParkingCount;
import com.rayton.gps.dao.statistics.TimeoutParkingDetail;
import com.rayton.gps.dao.statistics.VehicleAlarmCount;
import com.rayton.gps.dao.statistics.VehicleAlarmDetail;
import com.rayton.gps.dao.statistics.VehicleFatigueDrivingCount;
import com.rayton.gps.dao.statistics.VehicleFatigueDrivingDetail;
import com.rayton.gps.dao.statistics.VehicleOverspeedCount;
import com.rayton.gps.dao.statistics.VehicleOverspeedDetail;
import com.rayton.gps.export.ExcelView;
import com.rayton.gps.export.PdfView;
import com.rayton.gps.model.baseinfo.AdminMenu;
import com.rayton.gps.service.SecurityService;
import com.rayton.gps.service.StatisticsService;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

@Controller
public class StatisticsController {

  @Autowired
  private StatisticsService statisticsService;

  @Autowired
  private SecurityService securityService;

  @GetMapping("statistics")
  @Log(name = "打开统计分析页面")
  @RequestMapping("/statistics")
  public ModelAndView index() {

    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("statistics");
    modelAndView.addObject("name", identity.getName());
    return modelAndView;
    // return "/statistics/index";
  }

  @GetMapping(value = "/statistics/menus")
  @ResponseBody
  public Object menus() throws Exception {

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
      menuHistoryOnlineOffline.setUrl("/statistics/historyOnlineOfflineCount");
      menuHistoryOnlineOffline.setLeaf(true);
      menus.add(menuHistoryOnlineOffline);
      count++;
    }

    if (securityService.hasAuthorized("statistics.historyOnlineTime")) {
      AdminMenu menuHistoryOnlineTime = new AdminMenu();
      menuHistoryOnlineTime.setId(ObjectId.next());
      menuHistoryOnlineTime.setPid(menuTeamOperationDataAnalysis.getId());
      menuHistoryOnlineTime.setText("历史在线率统计");
      menuHistoryOnlineTime.setUrl("/statistics/historyOnlineTimeCount");
      menuHistoryOnlineTime.setLeaf(true);
      menus.add(menuHistoryOnlineTime);
      count++;
    }

    if (securityService.hasAuthorized("statistics.currentOnlineOffline")) {
      AdminMenu menuCurrentVehileOnline = new AdminMenu();
      menuCurrentVehileOnline.setId(ObjectId.next());
      menuCurrentVehileOnline.setPid(menuTeamOperationDataAnalysis.getId());
      menuCurrentVehileOnline.setText("当前在线率统计");
      menuCurrentVehileOnline.setUrl("/statistics/currentOnlineOfflineCount");
      menuCurrentVehileOnline.setLeaf(true);
      menus.add(menuCurrentVehileOnline);
      count++;
    }

    if (securityService.hasAuthorized("statistics.mileageOil")) {
      AdminMenu menuMileageOil = new AdminMenu();
      menuMileageOil.setId(ObjectId.next());
      menuMileageOil.setPid(menuTeamOperationDataAnalysis.getId());
      menuMileageOil.setText("行驶里程及油耗");
      menuMileageOil.setUrl("/statistics/mileageOilCount");
      menuMileageOil.setLeaf(true);
      menus.add(menuMileageOil);
      count++;
    }

    if (securityService.hasAuthorized("statistics.vehicleAlarm")) {
      AdminMenu menuVehicleAlarm = new AdminMenu();
      menuVehicleAlarm.setId(ObjectId.next());
      menuVehicleAlarm.setPid(menuTeamOperationDataAnalysis.getId());
      menuVehicleAlarm.setText("车辆警情统计");
      menuVehicleAlarm.setUrl("/statistics/vehicleAlarmCount");
      menuVehicleAlarm.setLeaf(true);
      menus.add(menuVehicleAlarm);
      count++;
    }

    if (count > 0) {
      menus.add(menuTeamOperationDataAnalysis);
    }
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
      menuVehicleFatigueDriving.setUrl("/statistics/vehicleFatigueDrivingCount");
      menuVehicleFatigueDriving.setLeaf(true);
      menus.add(menuVehicleFatigueDriving);
      count++;
    }

//        if (securityService.hasAuthorized("statistics.vehicleOverspeed")) {
//            AdminMenu menuVehicleOverspeed = new AdminMenu();
//            menuVehicleOverspeed.setId(ObjectId.next());
//            menuVehicleOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
//            menuVehicleOverspeed.setText("非区域超速统计");
//            menuVehicleOverspeed.setUrl("/statistics/vehicleOverspeedCount");
//            menuVehicleOverspeed.setLeaf(true);
//            menus.add(menuVehicleOverspeed);
//            count++;
//        }
//
//        if (securityService.hasAuthorized("statistics.sectionOverspeed")) {
//            AdminMenu menuSectionOverspeed = new AdminMenu();
//            menuSectionOverspeed.setId(ObjectId.next());
//            menuSectionOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
//            menuSectionOverspeed.setText("车辆路段超速");
//            menuSectionOverspeed.setUrl("/statistics/sectionOverspeedCount");
//            menuSectionOverspeed.setLeaf(true);
//            menus.add(menuSectionOverspeed);
//            count++;
//        }
//
//        if (securityService.hasAuthorized("statistics.areaOverspeed")) {
//            AdminMenu menuAreaOverspeed = new AdminMenu();
//            menuAreaOverspeed.setId(ObjectId.next());
//            menuAreaOverspeed.setPid(menuDrivingBehaviorAnalysis.getId());
//            menuAreaOverspeed.setText("车辆区域超速");
//            menuAreaOverspeed.setUrl("/statistics/areaOverspeedCount");
//            menuAreaOverspeed.setLeaf(true);
//            menus.add(menuAreaOverspeed);
//            count++;
//        }
//
//        if (securityService.hasAuthorized("statistics.timeoutParking")) {
//            AdminMenu menuTimeoutParking = new AdminMenu();
//            menuTimeoutParking.setId(ObjectId.next());
//            menuTimeoutParking.setPid(menuDrivingBehaviorAnalysis.getId());
//            menuTimeoutParking.setText("车辆停车超时");
//            menuTimeoutParking.setUrl("/statistics/timeoutParkingCount");
//            menuTimeoutParking.setLeaf(true);
//            menus.add(menuTimeoutParking);
//            count++;
//        }

    if (securityService.hasAuthorized("statistics.routeDeviation")) {
      AdminMenu menuRouteDeviation = new AdminMenu();
      menuRouteDeviation.setId(ObjectId.next());
      menuRouteDeviation.setPid(menuDrivingBehaviorAnalysis.getId());
      menuRouteDeviation.setText("路线偏离统计");
      menuRouteDeviation.setUrl("/statistics/routeDeviationCount");
      menuRouteDeviation.setLeaf(true);
      menus.add(menuRouteDeviation);
      count++;
    }

    if (securityService.hasAuthorized("statistics.areaIo")) {
      AdminMenu menuAreaIO = new AdminMenu();
      menuAreaIO.setId(ObjectId.next());
      menuAreaIO.setPid(menuDrivingBehaviorAnalysis.getId());
      menuAreaIO.setText("进出区域统计");
      menuAreaIO.setUrl("/statistics/areaIoCount");
      menuAreaIO.setLeaf(true);
      menus.add(menuAreaIO);
      count++;
    }

    if (count > 0) {
      menus.add(menuDrivingBehaviorAnalysis);
    }
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
      menuOperationLog.setUrl("/statistics/operateLog");
      menuOperationLog.setLeaf(true);
      menus.add(menuOperationLog);
      count++;
    }

    if (count > 0) {
      menus.add(menuLogs);
    }

    return menus;
  }


  @RequiresPermissions("statistics.historyOnlineOffline")
  @Log(name = "打开历史上线率统计页面")
  @GetMapping(value = "/statistics/historyOnlineOffline.iframe")
  public String historyVehicleOnlineIframe() {
    return "/statistics/team/historyOnlineOffline.iframe";
  }

  @PostMapping(value = "/statistics/historyOnlineOfflineCount")
  @ResponseBody
  public Object historyOnlineOfflineCount(@RequestParam String motorcade, @RequestParam Date start,
      @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();

    Page<HistoryOnlineOfflineCount> page = statisticsService
        .historyOnlineOfflineCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);

    return page;

  }

  @PostMapping(value = "/statistics/historyOnlineOfflineCountExport")
  public ModelAndView historyOnlineOfflineCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request, HttpServletResponse response) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<HistoryOnlineOfflineCount> list = statisticsService
        .historyOnlineOfflineCount(identity.getId(), motorcade, start, end);

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
    View view = type.equals("pdf") ? new PdfView() : new ExcelView();
    ModelAndView modelAndView = new ModelAndView(view, map);
    return modelAndView;
//        return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/historyOnlineOfflineDetail")
  @ResponseBody
  public Object historyOnlineOfflineDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .historyOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/historyOnlineOfflineDetailExport")
  public ModelAndView historyOnlineOfflineDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<HistoryOnlineOfflineDetail> detail = statisticsService
        .historyOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.historyOnlineTime")
  @Log(name = "打开历史在线率统计页面")
  @RequestMapping(value = "/statistics/historyOnlineTime.iframe", method = RequestMethod.GET)
  public String historyOnlineTime() {
    return "/statistics/team/historyOnlineTime.iframe";
  }

  @RequestMapping(value = "/statistics/historyOnlineTimeCount", method = RequestMethod.POST)
  @ResponseBody
  public Object historyOnlineTimeCount(@RequestParam String motorcade, @RequestParam Date start,
      @RequestParam Date end, @RequestParam int pageIndex, @RequestParam int pageSize)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .historyOnlineTimeCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @RequestMapping(value = "/statistics/historyOnlineTimeCountExport", method = RequestMethod.POST)
  public ModelAndView historyOnlineTimeCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<HistoryOnlineTimeCount> counts = statisticsService
        .historyOnlineTimeCount(identity.getId(), motorcade, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "HistoryOnlineOfflineCount");
    map.put("title", "车辆历史在线率统计");
    map.put("headers", new String[]{"车队", "开始时间", "结束时间", "应在线时长", "实在线时长", "在线率", "离线率"});
    map.put("widths", new float[]{30f, 15f, 15f, 10f, 10f, 10f, 10f});

    DecimalFormat df = new DecimalFormat("#0.##");
    List<List<String>> rows = new ArrayList<List<String>>();
    for (HistoryOnlineTimeCount count : counts) {
      List<String> row = new ArrayList<>();
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @RequestMapping(value = "/statistics/historyOnlineTimeDetail", method = RequestMethod.POST)
  @ResponseBody
  public Object historyOnlineTimeDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .historyOnlineTimeDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @RequestMapping(value = "/statistics/historyOnlineTimeDetailExport", method = RequestMethod.POST)
  public ModelAndView historyOnlineTimeDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<HistoryOnlineTimeDetail> counts = statisticsService
        .historyOnlineTimeDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.currentOnlineOffline")
  @Log(name = "打开当前在线率统计页面")
  @GetMapping(value = "/statistics/currentOnlineOffline.iframe")
  public String currentOnlineOfflineIframe() {
    return "/statistics/team/currentOnlineOffline.iframe";
  }

  @PostMapping(value = "/statistics/currentOnlineOfflineCount")
  @ResponseBody
  public Object currentOnlineOfflineCount(@RequestParam String motorcade,
      @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .currentOnlineOfflineCount(identity.getId(), motorcade, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/currentOnlineOfflineCountExport")
  public ModelAndView currentOnlineOfflineCountExport(@RequestParam String motorcade,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<CurrentOnlineOfflineCount> counts = statisticsService
        .currentOnlineOfflineCount(identity.getId(), motorcade);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/currentOnlineOfflineDetail")
  @ResponseBody
  public Object currentOnlineOfflineDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam int pageIndex, @RequestParam int pageSize,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .currentOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/currentOnlineOfflineDetailExport")
  public ModelAndView currentOnlineOfflineDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<CurrentOnlineOfflineDetail> counts = statisticsService
        .currentOnlineOfflineDetail(identity.getId(), motorcadeId, motorcade);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.mileageOil")
  @Log(name = "打开行驶里程及油耗统计页面")
  @GetMapping(value = "/statistics/mileageOil.iframe")
  public String mileageOilIframe() {
    return "/statistics/team/mileageOil.iframe";
  }

  @PostMapping(value = "/statistics/mileageOilCount")
  @ResponseBody
  public Object mileageOilCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .mileageOilCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/mileageOilCountExport")
  public ModelAndView mileageOilCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<MileageOilCount> counts = statisticsService
        .mileageOilCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/mileageOilDetail")
  @ResponseBody
  public Object mileageOilDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam int pageIndex,
      @RequestParam int pageSize, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .mileageOilDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/mileageOilDetailExport")
  public ModelAndView mileageOilDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<MileageOilDetail> details = statisticsService
        .mileageOilDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.vehicleAlarm")
  @Log(name = "打开车辆警情统计页面")
  @GetMapping(value = "/statistics/vehicleAlarm.iframe")
  public String vehicleAlarmIframe() {
    return "/statistics/team/vehicleAlarm.iframe";
  }

  @PostMapping(value = "/statistics/vehicleAlarmCount")
  @ResponseBody
  public Object vehicleAlarmCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleAlarmCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/vehicleAlarmCountExport")
  public ModelAndView vehicleAlarmCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleAlarmCount> counts = statisticsService
        .vehicleAlarmCount(identity.getId(), motorcade, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "VehicleAlarmCount");
    map.put("title", "车辆警情统计");
    map.put("headers",
        new String[]{"车队", "非区域超速次数", "区域内超速次数", "路段超速次数", "疲劳驾驶次数", "超时停车次数", "路线偏离次数", "开始时间",
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/vehicleAlarmDetail")
  @ResponseBody
  public Object vehicleAlarmDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam int pageIndex,
      @RequestParam int pageSize, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleAlarmDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/vehicleAlarmDetailExport")
  public ModelAndView vehicleAlarmDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleAlarmDetail> details = statisticsService
        .vehicleAlarmDetail(identity.getId(), motorcadeId, motorcade, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "VehicleAlarmDetail");
    map.put("title", "车辆警情明细");
    map.put("headers",
        new String[]{"车队", "车牌号", "非区域超速次数", "区域内超速次数", "路段超速次数", "疲劳驾驶次数", "超时停车次数", "路线偏离次数",
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.vehicleFatigueDriving")
  @Log(name = "打开车辆疲劳驾驶统计页面")
  @GetMapping(value = "/statistics/vehicleFatigueDriving.iframe")
  public String vehicleFatigueDrivingIframe() {
    return "/statistics/driving/vehicleFatigueDriving.iframe";
  }

  @PostMapping(value = "/statistics/vehicleFatigueDrivingCount")
  @ResponseBody
  public Object vehicleFatigueDrivingCount(@RequestParam String motorcade,
      @RequestParam int pageIndex, @RequestParam int pageSize, @RequestParam Date start,
      @RequestParam Date end) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleFatigueDrivingCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/vehicleFatigueDrivingCountExport")
  public ModelAndView vehicleFatigueDrivingCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleFatigueDrivingCount> counts = statisticsService
        .vehicleFatigueDrivingCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/vehicleFatigueDrivingDetail")
  @ResponseBody
  public Object vehicleFatigueDrivingDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleFatigueDrivingDetail(identity.getId(), motorcadeId, motorcade, start, end,
            pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/vehicleFatigueDrivingDetailExport")
  public ModelAndView vehicleFatigueDrivingDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleFatigueDrivingDetail> details = statisticsService
        .vehicleFatigueDrivingDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.vehicleOverspeed")
  @Log(name = "打开非区域超速统计页面")
  @GetMapping(value = "/statistics/vehicleOverspeed.iframe")
  public String vehicleOverspeedIframe() {
    return "/statistics/driving/vehicleOverspeed.iframe";
  }

  @PostMapping(value = "/statistics/vehicleOverspeedCount")
  @ResponseBody
  public Object vehicleOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/vehicleOverspeedCountExport")
  public ModelAndView vehicleOverspeedCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleOverspeedCount> counts = statisticsService
        .vehicleOverspeedCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/vehicleOverspeedDetail")
  @ResponseBody
  public Object vehicleOverspeedDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .vehicleOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/vehicleOverspeedDetailExport")
  public ModelAndView vehicleOverspeedDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<VehicleOverspeedDetail> details = statisticsService
        .vehicleOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.sectionOverspeed")
  @Log(name = "打开车辆路段超速统计页面")
  @GetMapping(value = "/statistics/sectionOverspeed.iframe")
  public String sectionOverspeedIframe() {
    return "/statistics/driving/sectionOverspeed.iframe";
  }

  @PostMapping(value = "/statistics/sectionOverspeedCount")
  @ResponseBody
  public Object sectionOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .sectionOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/sectionOverspeedCountExport")
  public ModelAndView sectionOverspeedCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<SectionOverspeedCount> counts = statisticsService
        .sectionOverspeedCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/sectionOverspeedDetail")
  @ResponseBody
  public Object sectionOverspeedDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .sectionOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/sectionOverspeedDetailExport")
  public ModelAndView sectionOverspeedDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<SectionOverspeedDetail> details = statisticsService
        .sectionOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.areaOverspeed")
  @Log(name = "打开车辆区域超速统计页面")
  @GetMapping(value = "/statistics/areaOverspeed.iframe")
  public String areaOverspeedIframe() {
    return "/statistics/driving/areaOverspeed.iframe";
  }

  @PostMapping(value = "/statistics/areaOverspeedCount")
  @ResponseBody
  public Object areaOverspeedCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .areaOverspeedCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/areaOverspeedCountExport")
  public ModelAndView areaOverspeedCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<AreaOverspeedCount> counts = statisticsService
        .areaOverspeedCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/areaOverspeedDetail")
  @ResponseBody
  public Object areaOverspeedDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize, HttpServletRequest request)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .areaOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/areaOverspeedDetailExport")
  public ModelAndView areaOverspeedDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<AreaOverspeedDetail> details = statisticsService
        .areaOverspeedDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.timeoutParking")
  @Log(name = "打开车辆停车超时统计页面")
  @RequestMapping(value = "/statistics/timeoutParking.iframe", method = RequestMethod.GET)
  public String timeoutParkingIframe() {
    return "/statistics/driving/timeoutParking.iframe";
  }

  @RequestMapping(value = "/statistics/timeoutParkingCount", method = RequestMethod.POST)
  @ResponseBody
  public Object timeoutParkingCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .timeoutParkingCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/timeoutParkingCountExport")
  public ModelAndView timeoutParkingCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type,
      HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<TimeoutParkingCount> counts = statisticsService
        .timeoutParkingCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/timeoutParkingDetail")
  @ResponseBody
  public Object timeoutParkingDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .timeoutParkingDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/timeoutParkingDetailExport")
  public ModelAndView timeoutParkingDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<TimeoutParkingDetail> details = statisticsService
        .timeoutParkingDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.routeDeviation")
  @Log(name = "打开路线偏离统计页面")
  @GetMapping(value = "/statistics/routeDeviation.iframe")
  public String routeDeviationIframe() {
    return "/statistics/driving/routeDeviation.iframe";
  }

  @PostMapping(value = "/statistics/routeDeviationCount")
  @ResponseBody
  public Object routeDeviationCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .routeDeviationCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/routeDeviationCountExport")
  public ModelAndView routeDeviationCountExport(@RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam String type)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<RouteDeviationCount> counts = statisticsService
        .routeDeviationCount(identity.getId(), motorcade, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "RouteDeviationCount");
    map.put("title", "车辆路线偏离统计");
    map.put("headers", new String[]{"车队", "偏离次数", "偏离时长", "开始时间", "结束时间"});
    map.put("widths", new float[]{30f, 15f, 15f, 20f, 20f});
    List<List<String>> rows = new ArrayList<>();
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @PostMapping(value = "/statistics/routeDeviationDetail")
  @ResponseBody
  public Object routeDeviationDetail(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .routeDeviationDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex,
            pageSize);
  }

  @PostMapping(value = "/statistics/routeDeviationDetailExport")
  public ModelAndView routeDeviationDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<RouteDeviationDetail> details = statisticsService
        .routeDeviationDetail(identity.getId(), motorcadeId, motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.areaIo")
  @Log(name = "打开进出区域统计页面")
  @GetMapping(value = "/statistics/areaIo.iframe")
  public String areaIoIframe() {
    return "/statistics/driving/areaIo.iframe";
  }

  @PostMapping(value = "/statistics/areaIoCount")
  @ResponseBody
  public Object areaIoCount(@RequestParam String motorcade, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .areaIoCount(identity.getId(), motorcade, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/areaIoCountExport")
  public ModelAndView areaIoCountExport(@RequestParam String motorcade, @RequestParam Date start,
      @RequestParam Date end, @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<AreaIoCount> counts = statisticsService
        .areaIoCount(identity.getId(), motorcade, start, end);
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
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  @RequestMapping(value = "/statistics/areaIoDetail", method = RequestMethod.POST)
  @ResponseBody
  public Object areaIoDetail(@RequestParam String motorcadeId, @RequestParam String motorcade,
      @RequestParam Date start, @RequestParam Date end, @RequestParam int pageIndex,
      @RequestParam int pageSize, HttpServletRequest request) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .areaIoDetail(identity.getId(), motorcadeId, motorcade, start, end, pageIndex, pageSize);
  }

  @RequestMapping(value = "/statistics/areaIoDetailExport", method = RequestMethod.POST)
  public ModelAndView areaIoDetailExport(@RequestParam String motorcadeId,
      @RequestParam String motorcade, @RequestParam Date start, @RequestParam Date end,
      @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<AreaIoDetail> details = statisticsService
        .areaIoDetail(identity.getId(), motorcadeId, motorcade, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "AreaIoDetail");
    map.put("title", "车辆进出区域明细");
    map.put("headers", new String[]{"车队", "车牌号", "进区域次数", "出区域次数", "开始时间", "结束时间"});
    map.put("widths", new float[]{20f, 20f, 10f, 10f, 20f, 20f});
    // List<List<String>> rows = new ArrayList<List<String>>();
    // for (AreaIoDetail detail : details) {
    //     List<String> row = new ArrayList<String>();
    //     row.add(detail.getMotorcade());
    //     row.add(detail.getPlateNumber());
    //     row.add(detail.getIn() + "");
    //     row.add(detail.getOut() + "");
    //     row.add(DateFormats.toDateString(detail.getStart()));
    //     row.add(DateFormats.toDateString(detail.getEnd()));
    //
    //     rows.add(row);
    // }

    List<List<String>> rows = details.stream().map(areaIoDetail -> {
      List<String> row = new ArrayList<>();
      row.add(areaIoDetail.getMotorcade());
      row.add(areaIoDetail.getPlateNumber());
      row.add(areaIoDetail.getIn() + "");
      row.add(areaIoDetail.getOut() + "");
      row.add(DateFormats.toDateString(areaIoDetail.getStart()));
      row.add(DateFormats.toDateString(areaIoDetail.getEnd()));

      return row;
    }).collect(Collectors.toList());
    map.put("list", rows);
    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }


  @RequiresPermissions("statistics.operateLog")
  @Log(name = "打开操作日志页面")
  @GetMapping(value = "/statistics/operateLog.iframe")
  public String operateLogIframe() {
    return "/statistics/log/operateLog.iframe";
  }

  @PostMapping(value = "/statistics/operateLog")
  @ResponseBody
  public Object operateLog(@RequestParam String user, @RequestParam int pageIndex,
      @RequestParam int pageSize, @RequestParam Date start, @RequestParam Date end)
      throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    return statisticsService
        .operateLog(identity.getCompanyId(), user, start, end, pageIndex, pageSize);
  }

  @PostMapping(value = "/statistics/operateLogExport")
  public ModelAndView operateLogExport(@RequestParam String user, @RequestParam Date start,
      @RequestParam Date end, @RequestParam String type) throws Exception {
    IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals()
        .getPrimaryPrincipal();
    List<OperateLog> details = statisticsService
        .operateAllLog(identity.getCompanyId(), user, start, end);
    Map<String, Object> map = new Hashtable<String, Object>();
    map.put("fileName", "OperateLog");
    map.put("title", "操作日志");
    map.put("headers", new String[]{"时间", "用户", "操作"});
    map.put("widths", new float[]{20f, 10f, 70f});
    // List<List<String>> rows = new ArrayList<>();
    List<List<String>> rows = details.stream().map(operateLog -> {
      List<String> row = new ArrayList<>();
      row.add(DateFormats.toDateTimeString(operateLog.getTime()));
      row.add(operateLog.getUser());
      row.add(operateLog.getAction());

      return row;
    }).collect(Collectors.toList());

    // for (OperateLog log : details) {
    //     List<String> row = new ArrayList<>();
    //     row.add(DateFormats.toDateTimeString(log.getTime()));
    //     row.add(log.getUser());
    //     row.add(log.getAction());
    //
    //     rows.add(row);
    // }
    map.put("list", rows);

    return this.export(type, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }

  private ModelAndView export(String type, Map<String, Object> map) {

    View view = type.equals("pdf") ? new PdfView() : new ExcelView();
    return new ModelAndView(view, map);
    // if (type.equals("pdf")) {
    //     PdfView pdfView = new PdfView();
    //     return new ModelAndView(pdfView, map);
    // } else {
    //     ExcelView viewExcel = new ExcelView();
    //     return new ModelAndView(viewExcel, map);
    // }
  }
}
