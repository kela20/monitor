package com.edata.monitor.domain.baseinfo;

/**
 * 矩形区域信息
 * 
 * @author yangzs
 *
 */
public class RectangleAreaInfo {
	private long id;

	/**
	 * 获取唯一编号
	 */
	public long getId() {
		return id;
	}

	/**
	 * 设置唯一编号
	 */
	public void setId(long id) {
		this.id = id;
	}

	private String name;

	/**
	 * 获取区域名称
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置区域名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	private boolean deviceCatch;

	/**
	 * 获取终端计算否
	 */
	public boolean isDeviceCatch() {
		return deviceCatch;
	}

	/**
	 * 设置终端计算否
	 */
	public void setDeviceCatch(boolean deviceCatch) {
		this.deviceCatch = deviceCatch;
	}

	private double ullat;

	/**
	 * 获取左上点纬度
	 */
	public double getUllat() {
		return ullat;
	}

	/**
	 * 设置左上点纬度
	 */
	public void setUllat(double ullat) {
		this.ullat = ullat;
	}

	private double ullng;

	/**
	 * 获取左上点经度
	 */
	public double getUllng() {
		return ullng;
	}

	/**
	 * 设置左上点经度
	 */
	public void setUllng(double ullng) {
		this.ullng = ullng;
	}

	private double brlat;

	/**
	 * 获取右下点纬度
	 */
	public double getBrlat() {
		return brlat;
	}

	/**
	 * 设置右下点纬度
	 */
	public void setBrlat(double brlat) {
		this.brlat = brlat;
	}

	private double brlng;

	/**
	 * 获取右下点经度
	 */
	public double getBrlng() {
		return brlng;
	}

	/**
	 * 设置右下点经度
	 */
	public void setBrlng(double brlng) {
		this.brlng = brlng;
	}

	private String remark;

	/**
	 * 获取备注
	 */
	public String getRemark() {
		return remark;
	}

	/**
	 * 设置备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
