package com.edata.monitor.domain.baseinfo;

/**
 * 兴趣点信息类
 * 
 * @author yangzs
 *
 */
public class PoiInfo {
	private long id;

	/**
	 * 获取记录唯一编号
	 */
	public long getId() {
		return id;
	}

	/**
	 * 设置记录唯一编号
	 */
	public void setId(long id) {
		this.id = id;
	}

	private String type;

	/**
	 * 获取类别
	 */
	public String getType() {
		return type;
	}

	/**
	 * 设置类别
	 */
	public void setType(String type) {
		this.type = type;
	}

	private String name;

	/**
	 * 获取名称
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	private double lat;

	/**
	 * 获取纬度
	 */
	public double getLat() {
		return lat;
	}

	/**
	 * 设置纬度
	 */
	public void setLat(double lat) {
		this.lat = lat;
	}

	private double lng;

	/**
	 * 获取经度
	 */
	public double getLng() {
		return lng;
	}

	/**
	 * 设置经度
	 */
	public void setLng(double lng) {
		this.lng = lng;
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
