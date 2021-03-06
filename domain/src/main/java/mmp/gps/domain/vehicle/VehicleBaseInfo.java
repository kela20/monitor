package mmp.gps.domain.vehicle;

import java.sql.Date;

public class VehicleBaseInfo {

    private String company;
    private String motorcade;
    private String deviceNumber;
    private String plateNumber;
    private String plateColor;
    private String vehicleColor;
    private String vehicleType;
    private String vehicleVoltage;
    private String carryType;
    private int initialMileage;
    private double oilWear;
    private int usefulLife;
    private Date installDate;
    private Date annualSurveyDate;
    private String adminArea;
    private String remark;

    @Override
    public String toString() {
        return "VehicleBaseInfo{" + "company='" + company + '\'' + ", motorcade='" + motorcade + '\'' + ", " + "deviceNumber='" + deviceNumber + '\'' + ", plateNumber='" + plateNumber + '\'' + ", plateColor='" + plateColor + '\'' + ", vehicleColor='" + vehicleColor + '\'' + ", vehicleType='" + vehicleType + '\'' + ", vehicleVoltage='" + vehicleVoltage + '\'' + ", carryType='" + carryType + '\'' + ", " + "initialMileage=" + initialMileage + ", oilWear=" + oilWear + ", usefulLife=" + usefulLife + ", " + "installDate=" + installDate + ", annualSurveyDate=" + annualSurveyDate + ", adminArea='" + adminArea + '\'' + ", remark='" + remark + '\'' + '}';
    }

    /**
     * 获取所属企业
     */
    public String getCompany() {
        return company;
    }

    /**
     * 设置所属公司企业
     */
    public void setCompany(String company) {
        this.company = company;
    }

    /**
     * 获取所属车队
     */
    public String getMotorcade() {
        return motorcade;
    }

    /**
     * 设置所属车队
     */
    public void setMotorcade(String motorcade) {
        this.motorcade = motorcade;
    }

    /**
     * 获取设备号
     */
    public String getDeviceNumber() {
        return deviceNumber;
    }

    /**
     * 设置设备号
     */
    public void setDeviceNumber(String deviceNumber) {
        this.deviceNumber = deviceNumber;
    }

    /**
     * 获取车牌号码
     */
    public String getPlateNumber() {
        return plateNumber;
    }

    /**
     * 设置车牌号码
     */
    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    /**
     * 获取车牌颜色
     */
    public String getPlateColor() {
        return plateColor;
    }

    /**
     * 设置车牌颜色
     */
    public void setPlateColor(String plateColor) {
        this.plateColor = plateColor;
    }

    /**
     * 获取车辆颜色
     */
    public String getVehicleColor() {
        return vehicleColor;
    }

    /**
     * 设置车辆颜色
     */
    public void setVehicleColor(String vehicleColor) {
        this.vehicleColor = vehicleColor;
    }

    /**
     * 获取车辆类型
     */
    public String getVehicleType() {
        return vehicleType;
    }

    /**
     * 设置车辆类型
     */
    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    /**
     * 获取车辆电压
     */
    public String getVehicleVoltage() {
        return vehicleVoltage;
    }

    /**
     * 设置车辆电压
     */
    public void setVehicleVoltage(String vehicleVoltage) {
        this.vehicleVoltage = vehicleVoltage;
    }

    /**
     * 获取载运类型
     */
    public String getCarryType() {
        return carryType;
    }

    /**
     * 设置载运类型
     */
    public void setCarryType(String carryType) {
        this.carryType = carryType;
    }

    /**
     * 获取初始里程
     */
    public int getInitialMileage() {
        return initialMileage;
    }

    /**
     * 设置初始里程
     */
    public void setInitialMileage(int initialMileage) {
        this.initialMileage = initialMileage;
    }

    /**
     * 获取百公里油耗
     */
    public double getOilWear() {
        return oilWear;
    }

    /**
     * 设置百公里油耗
     */
    public void setOilWear(double oilWear) {
        this.oilWear = oilWear;
    }

    /**
     * 获取使用年限
     */
    public int getusefulLife() {
        return usefulLife;
    }

    /**
     * 设置使用年限
     */
    public void setusefulLife(int usefulLife) {
        this.usefulLife = usefulLife;
    }

    /**
     * 获取安装日期
     */
    public Date getInstallDate() {
        return installDate;
    }

    /**
     * 设置安装日期
     */
    public void setInstallDate(Date installDate) {
        this.installDate = installDate;
    }

    /**
     * 获取年检日期
     */
    public Date getAnnualSurveyDate() {
        return annualSurveyDate;
    }

    /**
     * 设置年检日期
     */
    public void setAnnualSurveyDate(Date annualSurveyDate) {
        this.annualSurveyDate = annualSurveyDate;
    }

    /**
     * 获取所属行政区域
     */
    public String getAdminArea() {
        return adminArea;
    }

    /**
     * 设置所属行政区域
     */
    public void setAdminArea(String adminArea) {
        this.adminArea = adminArea;
    }

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
