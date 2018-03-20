package com.edata.monitor.dao.baseinfo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.edata.common.LatLng;

public class PolygonAreaDto {
	public long id;
	public String companyId;
	public String name;
	public boolean deviceCatch;
	public int flag;
	public int maxSpeed;
	public short overspeedSeconds;
	public Date startTime;
	public Date endTime;
	public String remark;
	public Timestamp editTime;
	public List<LatLng> points = new ArrayList<LatLng>();
}
