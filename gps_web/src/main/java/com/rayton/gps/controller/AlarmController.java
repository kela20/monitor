package com.rayton.gps.controller;

import com.rayton.gps.aop.Log;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.alarm.Alarm;
import com.rayton.gps.dao.alarm.ProcessAlarmAll;
import com.rayton.gps.dao.alarm.ProcessAlarmOnce;
import com.rayton.gps.dao.baseinfo.dictionary.DictionaryItemInfo;
import com.rayton.gps.dao.security.IdentityDto;
import com.rayton.gps.service.AlarmService;
import com.rayton.gps.service.DictionaryService;
import com.rayton.gps.util.ResponseEntityWrapper;
import com.rayton.gps.util.enums.DictionaryKinds;
import io.swagger.annotations.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Api(tags = "报警管理")
@Controller
public class AlarmController {

    @Autowired
    private AlarmService alarmService;
    @Autowired
    private DictionaryService dictionaryService;


    @RequiresPermissions("center.alarm")
    @Log(name = "打开报警查询页面")
    @GetMapping("/alarm/alarm.iframe")
    public String index() {
        return "/center/alarm/alarm.iframe";
    }

    @GetMapping("/alarm/maptools.panel")
    public String maptools() {
        return "/center/alarm/maptools.panel";
    }

    /**
     * 获取当前用户所有未处理报警
     */
    @ApiOperation(httpMethod = "GET", value = "通过id查询管理信息")
    @ApiResponses(value = {@ApiResponse(code = 500, message = "系统错误"), @ApiResponse(code = 200, message = "0 成功," +
            "其它为错误,返回格式：{code:0,data[{}]},data中的属性参照下方Model", response = Object.class)})
    @PostMapping(value = "/alarm/unhandled")
    @ResponseBody
    public Object untreated(@ApiParam(required = true, name = "id", value = "查询id") HttpServletRequest request)
            throws Exception {
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();

        return alarmService.unhandled(identity.getId());
    }

    /**
     * 获取指定设备号所有未处理报警
     */
    @PostMapping(value = "/alarm/untreated")
    @ResponseBody
    public Object untreated(@RequestParam String deviceNumber) throws Exception {
        Page<Alarm> alarms = new Page<Alarm>();
        alarms.rows = alarmService.untreated(deviceNumber);
        alarms.total = alarms.rows == null ? 0 : alarms.rows.size();

        return alarms;
    }

    /**
     * 获取指定设备号所有已处理报警
     */
    @PostMapping(value = "/alarm/processed")
    @ResponseBody
    public Object processed(@RequestParam String deviceNumber, @RequestParam Date start, @RequestParam Date end,
                            @RequestParam int pageIndex, @RequestParam int pageSize) throws Exception {
        return alarmService.processed(deviceNumber, start, end, pageIndex, pageSize);
    }

    /**
     * 处理一条报警数据
     *
     * @throws Exception
     */
    @GetMapping(value = "/alarm/processonce.form")
    public String processOnceA(@RequestParam String alarmId, Model model) throws Exception {

        ProcessAlarmOnce alarm = alarmService.getProcessAlarm(alarmId);
        // try {
        //     alarm = alarmService.getProcessAlarm(alarmId);
        // } catch (Exception ex) {
        //     model.addAttribute("error", ex.getMessage());
        //     return "/error.form";
        // }
        model.addAttribute("alarm", alarm);

        List<DictionaryItemInfo> types = dictionaryService.list(DictionaryKinds.AlarmProcessType.getIndex());
        model.addAttribute("types", types);

        return "/center/alarm/processalarmonce.form";
    }

    /**
     * 处理一条报警数据
     */
    @PostMapping(value = "/alarm/processonce.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> processOnce(@ModelAttribute("alarm") @Valid ProcessAlarmOnce alarm,
                                                           BindingResult binding) throws Exception {
        if (binding.hasErrors())
            // return "/center/alarm/processalarmonce.form";
            return ResponseEntityWrapper.Failed();
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        alarmService.processOnce(alarm.getAlarmId(), alarm.getAlarmTimestamp(), alarm.getUserMethod(), alarm
                .getUserRemark(), identity.getId(), identity.getName());

        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     alarmService.processOnce(alarm.getAlarmId(), alarm.getAlarmTimestamp(), alarm.getUserMethod(), alarm
        //             .getUserRemark(), identity.getId(), identity.getName());
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }

    /**
     * 处理指定设备号所有未处理报警数据
     */
    @GetMapping(value = "/alarm/processall.form")
    public String processAll(Model model) throws Exception {
        ProcessAlarmAll alarm = new ProcessAlarmAll();
        model.addAttribute("alarm", alarm);

        List<DictionaryItemInfo> types = dictionaryService.list(DictionaryKinds.AlarmProcessType.getIndex());
        model.addAttribute("types", types);

        return "/center/alarm/processalarmall.form";
    }

    /**
     * 处理指定设备号所有未处理报警数据
     */
    @PostMapping(value = "/alarm/processall.form")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> processAllPost(@ModelAttribute("alarm") @Valid ProcessAlarmAll alarm,
                                                              BindingResult binding) throws Exception {
        if (binding.hasErrors())
            // return "/center/alarm/processalarmall.form";
            return ResponseEntityWrapper.Failed();
        IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        alarmService.processAll(alarm.getDeviceNumbers().split(","), alarm.getUserMethod(), alarm.getUserRemark(),
                identity.getId(), identity.getName());
        return ResponseEntityWrapper.OK();
        // try {
        //     IdentityDto identity = (IdentityDto) SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        //     alarmService.processAll(alarm.getDeviceNumbers().split(","), alarm.getUserMethod(), alarm.getUserRemark()
        //             , identity.getId(), identity.getName());
        //     WebUtil.success(r);
        // } catch (Exception ex) {
        //     WebUtil.error(r, ex.getMessage());
        // }
        //
        // return "redirect:/result";
    }
}
