package com.rayton.gps.service;

import com.rayton.gps.dao.baseinfo.circleArea.CircleArea;
import com.rayton.gps.dao.baseinfo.polygonArea.PolygonArea;
import com.rayton.gps.dao.baseinfo.rectangleArea.RectangleArea;
import com.rayton.gps.dao.baseinfo.routeArea.RouteArea;
import com.rayton.gps.dao.baseinfo.sectionArea.SectionArea;
import com.rayton.gps.dao.cache.area.AreaInfo;
import com.rayton.gps.dao.cache.area.IAreaCatcherDao;
import com.rayton.gps.service.area.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreaCatcherService {
    @Autowired
    private IAreaCatcherDao areaCatcherDao;
    @Autowired
    private CircleAreaService circleAreaService;
    @Autowired
    private RectangleAreaService rectangleAreaService;
    @Autowired
    private PolygonAreaService polygonAreaService;
    @Autowired
    private RouteAreaService routeAreaService;
    @Autowired
    private SectionAreaService sectionAreaService;

    public List<AreaInfo> getCircles() {
        // List<AreaInfo> result = new ArrayList<AreaInfo>();
        List<AreaInfo> result = areaCatcherDao.getCircles();
        // for (AreaInfoDto dto : list) {
        //     AreaInfo info = new AreaInfo();
        //     info.setDeviceNumber(dto.deviceNumber);
        //     info.setAreaId(dto.areaId);
        //     info.setAreaType(dto.areaType);
        //
        //     result.add(info);
        // }

        return result;
    }

    public List<AreaInfo> getRectangles() {
        // List<AreaInfo> result = new ArrayList<AreaInfo>();
        List<AreaInfo> result = areaCatcherDao.getRectangles();
        // for (AreaInfoDto dto : list) {
        //     AreaInfo info = new AreaInfo();
        //     info.setDeviceNumber(dto.deviceNumber);
        //     info.setAreaId(dto.areaId);
        //     info.setAreaType(dto.areaType);
        //
        //     result.add(info);
        // }

        return result;
    }

    public List<AreaInfo> getPolygons() {
        // List<AreaInfo> result = new ArrayList<AreaInfo>();
        List<AreaInfo> result = areaCatcherDao.getPolygons();
        // for (AreaInfoDto dto : list) {
        //     AreaInfo info = new AreaInfo();
        //     info.setDeviceNumber(dto.deviceNumber);
        //     info.setAreaId(dto.areaId);
        //     info.setAreaType(dto.areaType);
        //
        //     result.add(info);
        // }

        return result;
    }

    public List<AreaInfo> getRoutes() {
        // List<AreaInfo> result = new ArrayList<AreaInfo>();
        List<AreaInfo> result = areaCatcherDao.getRoutes();
        // for (AreaInfoDto dto : list) {
        //     AreaInfo info = new AreaInfo();
        //     info.setDeviceNumber(dto.deviceNumber);
        //     info.setAreaId(dto.areaId);
        //     info.setAreaType(dto.areaType);
        //
        //     result.add(info);
        // }

        return result;
    }

    public CircleArea getCircle(Long areaId) {
        try {
            return circleAreaService.fetch(areaId);
        } catch (Exception e) {
            return null;
        }
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

    public List<SectionArea> getSectionArea(long areaId) {
        List<SectionArea> sections = new ArrayList<SectionArea>();
        List<Long> sectionIds = areaCatcherDao.getSectionIds(areaId);
        for (long id : sectionIds) {
            try {
                SectionArea section = sectionAreaService.fetch(id);
                if (section != null)
                    sections.add(section);
            } catch (Exception e) {
            }
        }

        return sections;
    }
}
