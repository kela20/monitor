package com.rayton.gps.service;

import com.rayton.gps.aop.ServiceMethod;
import com.rayton.gps.cache.AssociationCache;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.alarm.*;
import com.rayton.gps.dao.cache.UserMonitorTarget;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AlarmService {
    @Autowired
    private IAlarmDao alarmDao;

    public List<Alarm> untreated(String deviceNumber) {
        List<Alarm> alarms = alarmDao.untreatedByDeviceNumber(deviceNumber);


        return alarms;
    }

    public Object processed(String deviceNumber, Date start, Date end, int pageIndex, int pageSize) {
        int total = alarmDao.processPageCount(deviceNumber, start, end);
        Page<Alarm> query = new Page<Alarm>();
        query.total = total;

        if (total > 0) {
            List<Alarm> rows = alarmDao.processedPageDetail(deviceNumber, start, end, (pageIndex - 1) * pageSize,
                    pageSize);
            query.rows.addAll(rows);
            // rows.forEach(alarm -> query.rows.add(alarm));

        }

        return query;
    }

    public ProcessAlarmOnce getProcessAlarm(String alarmId) {
        Date date = alarmDao.getAlarmTimestamp(alarmId);
        ProcessAlarmOnce alarm = new ProcessAlarmOnce();
        alarm.setAlarmId(alarmId);
        alarm.setAlarmTimestamp(new Timestamp(date.getTime()));
        return alarm;
    }


    @RequiresPermissions("center.alarm.processOnce")
    @ServiceMethod(id = "center.alarm.processOnce", pid = "center.alarm", name = "单次处理报警")
    @Transactional
    public void processOnce(String alarmId, Timestamp alarmTimestamp, String userMethod, String userRemark, String
            userId, String userName) {
        ProcessOnceDto dto = new ProcessOnceDto();
        dto.alarmId = alarmId;
        dto.alarmTimestamp = alarmTimestamp;
        dto.userMethod = userMethod;
        dto.userRemark = userRemark;
        dto.userId = userId;
        dto.userName = userName;

        alarmDao.processOnce(dto);
    }

    @RequiresPermissions("center.alarm.processAll")
    @ServiceMethod(id = "center.alarm.processAll", pid = "center.alarm", name = "处理全部报警")
    @Transactional
    public void processAll(String[] deviceNumbers, String userMethod, String userRemark, String userId, String
            userName) {
        for (String deviceNumber : deviceNumbers) {
            ProcessAllDto dto = new ProcessAllDto();

            dto.deviceNumber = deviceNumber;
            dto.userMethod = userMethod;
            dto.userRemark = userRemark;
            dto.userId = userId;
            dto.userName = userName;
            alarmDao.processAll(dto);
        }
    }

    public List<Alarm> unhandled(String userId) {
        UserMonitorTarget target = AssociationCache.getUserMonitorTarget(userId);
        if (target == null)
            return null;

        List<String> deviceNumbers = new ArrayList<String>(target.getDevices().keySet());
        List<Alarm> alarms = null;
        if (deviceNumbers.size() != 0 && deviceNumbers != null) {
            alarms = alarmDao.untreatedByDeviceNumbers(deviceNumbers);
        }


        return alarms;

    }
}