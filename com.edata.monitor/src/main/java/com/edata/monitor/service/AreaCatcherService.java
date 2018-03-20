package com.edata.monitor.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edata.monitor.dao.cache.AreaInfoDto;
import com.edata.monitor.dao.cache.IAreaCatcherDao;
import com.edata.monitor.domain.baseinfo.CircleArea;
import com.edata.monitor.domain.baseinfo.PolygonArea;
import com.edata.monitor.domain.baseinfo.RectangleArea;
import com.edata.monitor.domain.baseinfo.RouteArea;
import com.edata.monitor.domain.baseinfo.SectionArea;
import com.edata.monitor.domain.cache.AreaInfo;

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
		List<AreaInfo> result = new ArrayList<AreaInfo>();
		List<AreaInfoDto> list = areaCatcherDao.getCircles();
		for (AreaInfoDto dto : list) {
			AreaInfo info = new AreaInfo();
			info.setDeviceNumber(dto.deviceNumber);
			info.setAreaId(dto.areaId);
			info.setAreaType(dto.areaType);

			result.add(info);
		}

		return result;
	}

	public List<AreaInfo> getRectangles() {
		List<AreaInfo> result = new ArrayList<AreaInfo>();
		List<AreaInfoDto> list = areaCatcherDao.getRectangles();
		for (AreaInfoDto dto : list) {
			AreaInfo info = new AreaInfo();
			info.setDeviceNumber(dto.deviceNumber);
			info.setAreaId(dto.areaId);
			info.setAreaType(dto.areaType);

			result.add(info);
		}

		return result;
	}

	public List<AreaInfo> getPolygons() {
		List<AreaInfo> result = new ArrayList<AreaInfo>();
		List<AreaInfoDto> list = areaCatcherDao.getPolygons();
		for (AreaInfoDto dto : list) {
			AreaInfo info = new AreaInfo();
			info.setDeviceNumber(dto.deviceNumber);
			info.setAreaId(dto.areaId);
			info.setAreaType(dto.areaType);

			result.add(info);
		}

		return result;
	}

	public List<AreaInfo> getRoutes() {
		List<AreaInfo> result = new ArrayList<AreaInfo>();
		List<AreaInfoDto> list = areaCatcherDao.getRoutes();
		for (AreaInfoDto dto : list) {
			AreaInfo info = new AreaInfo();
			info.setDeviceNumber(dto.deviceNumber);
			info.setAreaId(dto.areaId);
			info.setAreaType(dto.areaType);

			result.add(info);
		}

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
