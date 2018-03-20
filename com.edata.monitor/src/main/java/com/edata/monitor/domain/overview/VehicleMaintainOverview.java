package com.edata.monitor.domain.overview;
/**
 * 车辆保养过期统计
 * @author yangzs
 *
 */
public class VehicleMaintainOverview {
	private int total;

	/**
	 * 获取车辆总数
	 */
	public int getTotal() {
		return total;
	}

	/**
	 * 设置车辆总数
	 */
	public void setTotal(int total) {
		this.total = total;
	}

	private int expired;

	/**
	 * 获取已过期数
	 */
	public int getExpired() {
		return expired;
	}

	/**
	 * 设置已过期数
	 */
	public void setExpired(int expired) {
		this.expired = expired;
	}

	private int expired30;

	/**
	 * 获取30天后过期数
	 */
	public int getExpired30() {
		return expired30;
	}

	/**
	 * 设置30天后过期数
	 */
	public void setExpired30(int expired30) {
		this.expired30 = expired30;
	}

	private int expired15;

	/**
	 * 获取15天后过期数
	 */
	public int getExpired15() {
		return expired15;
	}

	/**
	 * 设置15天后过期数
	 */
	public void setExpired15(int expired15) {
		this.expired15 = expired15;
	}

	private int expired7;

	/**
	 * 获取7天后过期数
	 */
	public int getExpired7() {
		return expired7;
	}

	/**
	 * 设置7天后过期数
	 */
	public void setExpired7(int expired7) {
		this.expired7 = expired7;
	}
}
