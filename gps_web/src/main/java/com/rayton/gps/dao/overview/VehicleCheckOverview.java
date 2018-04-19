package com.rayton.gps.dao.overview;

/**
 * 车辆年检过期统计
 *
 * @author yangzs
 */
public class VehicleCheckOverview {

    private int total;
    private int expired;
    private int expired30;
    private int expired15;
    private int expired7;

    @Override
    public String toString() {
        return "VehicleCheckOverview{" + "total=" + total + ", expired=" + expired + ", expired30=" + expired30 + ", " +
                "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "expired15=" + expired15 + ", expired7=" +
                expired7 + '}';
    }

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
