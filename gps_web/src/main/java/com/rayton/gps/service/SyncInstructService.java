package com.rayton.gps.service;

import com.rayton.gps.dao.baseinfo.circleArea.CircleArea;
import com.rayton.gps.dao.baseinfo.polygonArea.PolygonArea;
import com.rayton.gps.dao.baseinfo.rectangleArea.RectangleArea;
import com.rayton.gps.dao.baseinfo.routeArea.RouteArea;
import com.rayton.gps.dao.baseinfo.sectionArea.SectionArea;
import com.rayton.gps.dao.instruct.DeviceInAreaInfo;
import com.rayton.gps.dao.instruct.DeviceInAreaInfoDto;
import com.rayton.gps.dao.instruct.ISyncInstructDao;
import com.rayton.gps.service.area.CircleAreaService;
import com.rayton.gps.service.area.PolygonAreaService;
import com.rayton.gps.service.area.RectangleAreaService;
import com.rayton.gps.service.area.RouteAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SyncInstructService {
    @Autowired
    private ISyncInstructDao syncInstructDao;
    @Autowired
    private CircleAreaService circleAreaService;
    @Autowired
    private RectangleAreaService rectangleAreaService;
    @Autowired
    private PolygonAreaService polygonAreaService;
    @Autowired
    private RouteAreaService routeAreaService;
    @Autowired
    private AreaCatcherService areaCatcherService;

    public List<DeviceInAreaInfo> loadUnfinishedAreaInDevice() {
        List<DeviceInAreaInfo> unfinished = new ArrayList<DeviceInAreaInfo>();
        List<DeviceInAreaInfoDto> rows = syncInstructDao.loadUnfinishedAreaInDevice();
        for (DeviceInAreaInfoDto dto : rows) {
            DeviceInAreaInfo info = new DeviceInAreaInfo();
            info.setId(dto.id);
            info.setDeviceNumber(dto.deviceNumber);
            info.setAreaId(dto.areaId);
            info.setAreaType(dto.areaType);
            info.setAction(dto.action);
            info.setUnid(dto.unid);
            info.setUser(dto.user);
            info.setSendTime(dto.sendTime);
            info.setAckTime(dto.ackTime);

            unfinished.add(info);
        }

        return unfinished;
    }

    public CircleArea getCircleArea(long areaId) {
        try {
            return circleAreaService.fetch(areaId);
        } catch (Exception e) {
            return null;
        }
    }

    public void updateLog(String serialNumber) {
        syncInstructDao.updateLog(serialNumber);
    }

    public RectangleArea getRectangleArea(long areaId) {
        try {
            return rectangleAreaService.fetch(areaId);
        } catch (Exception e) {
            return null;
        }
    }

    public PolygonArea getPolygonArea(long areaId) {
        try {
            return polygonAreaService.fetch(areaId);
        } catch (Exception e) {
            return null;
        }
    }

    public RouteArea getRouteArea(long areaId) {
        try {
            return routeAreaService.fetch(areaId);
        } catch (Exception e) {
            return null;
        }
    }

    public List<SectionArea> getSectionIds(long areaId) {
        return areaCatcherService.getSectionArea(areaId);
    }

}
