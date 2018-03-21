package com.edata.monitor.dao.baseinfo.device;

import org.hibernate.validator.constraints.NotEmpty;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * 设备类
 *
 * @author 生
 */
public class Device {

    private String id;
    private String companyId;
    @NotEmpty
    private String deviceNumber;
    private String simcardId;
    private String phoneNumber;
    private String model;
    private String factoryName;
    private String factoryNumber;
    private byte cameras;
    private boolean hasMicrophone;
    private boolean hasNavigation;
    private String sensors;
    private Date warranty;
    private Date purchaseDate;
    private Date installDate;
    private Timestamp editTime;
    //
    private String SN;
    private Date INSTOCKDATE;
    private Date OUTSTOCKDATE;
    private Date ACTIVATIONDATE;
    private String IMEI;
    private String LIFECYCLE;
    private Date LIFEEXPIRATIONDATE;
    //

    @Override
    public String toString() {
        return "Device{" + "id='" + id + '\'' + ", companyId='" + companyId + '\'' + ", deviceNumber='" +
                deviceNumber + '\'' + ", simcardId='" + simcardId + '\'' + ", phoneNumber='" + phoneNumber + '\'' +
                ", model='" + model + '\'' + ", factoryName='" + factoryName + '\'' + ", factoryNumber='" +
                factoryNumber + '\'' + ", cameras=" + cameras + ", hasMicrophone=" + hasMicrophone + ", " +
                "hasNavigation=" + hasNavigation + ", sensors='" + sensors + '\'' + ", warranty=" + warranty + ", " +
                "purchaseDate=" + purchaseDate + ", installDate=" + installDate + ", editTime=" + editTime + ", SN='"
                + SN + '\'' + ", INSTOCKDATE=" + INSTOCKDATE + ", OUTSTOCKDATE=" + OUTSTOCKDATE + ", ACTIVATIONDATE="
                + ACTIVATIONDATE + ", IMEI='" + IMEI + '\'' + ", LIFECYCLE='" + LIFECYCLE + '\'' + ", " +
                "LIFEEXPIRATIONDATE=" + LIFEEXPIRATIONDATE + '}';
    }

    public String getSN() {
        return SN;
    }

    public void setSN(String SN) {
        this.SN = SN;
    }

    public Date getINSTOCKDATE() {
        return INSTOCKDATE;
    }

    public void setINSTOCKDATE(Date INSTOCKDATE) {
        this.INSTOCKDATE = INSTOCKDATE;
    }

    public Date getOUTSTOCKDATE() {
        return OUTSTOCKDATE;
    }

    public void setOUTSTOCKDATE(Date OUTSTOCKDATE) {
        this.OUTSTOCKDATE = OUTSTOCKDATE;
    }

    public Date getACTIVATIONDATE() {
        return ACTIVATIONDATE;
    }

    public void setACTIVATIONDATE(Date ACTIVATIONDATE) {
        this.ACTIVATIONDATE = ACTIVATIONDATE;
    }

    public String getIMEI() {
        return IMEI;
    }

    public void setIMEI(String IMEI) {
        this.IMEI = IMEI;
    }

    public String getLIFECYCLE() {
        return LIFECYCLE;
    }

    public void setLIFECYCLE(String LIFECYCLE) {
        this.LIFECYCLE = LIFECYCLE;
    }

    public Date getLIFEEXPIRATIONDATE() {
        return LIFEEXPIRATIONDATE;
    }

    public void setLIFEEXPIRATIONDATE(Date LIFEEXPIRATIONDATE) {
        this.LIFEEXPIRATIONDATE = LIFEEXPIRATIONDATE;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
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
     * 获取sim卡号
     */
    public String getSimcardId() {
        return simcardId;
    }

    /**
     * 设置sim卡号
     */
    public void setSimcardId(String simcardId) {
        this.simcardId = simcardId;
    }

    /**
     * 获取电话号码
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * 设置电话号码
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * 获取型号
     */
    public String getModel() {
        return model;
    }

    /**
     * 设置型号
     */
    public void setModel(String model) {
        this.model = model;
    }

    /**
     * 获取厂家
     */
    public String getFactoryName() {
        return factoryName;
    }

    /**
     * 设置厂家
     */
    public void setFactoryName(String factoryName) {
        this.factoryName = factoryName;
    }

    /**
     * 获取出厂号
     */
    public String getFactoryNumber() {
        return factoryNumber;
    }

    /**
     * 设置出厂号
     */
    public void setFactoryNumber(String factoryNumber) {
        this.factoryNumber = factoryNumber;
    }

    /**
     * 获取摄像头路数
     */
    public byte getCameras() {
        return cameras;
    }

    /**
     * 设置摄像头路数
     */
    public void setCameras(byte cameras) {
        this.cameras = cameras;
    }

    /**
     * 获取有无麦克风
     */
    public boolean isHasMicrophone() {
        return hasMicrophone;
    }

    /**
     * 设置有无麦克风
     */
    public void setHasMicrophone(boolean hasMicrophone) {
        this.hasMicrophone = hasMicrophone;
    }

    /**
     * 获取有无导航屏
     */
    public boolean isHasNavigation() {
        return hasNavigation;
    }

    /**
     * 设置有无导航屏
     */
    public void setHasNavigation(boolean hasNavigation) {
        this.hasNavigation = hasNavigation;
    }

    /**
     * 获取传感器列表
     */
    public String getSensors() {
        return sensors;
    }

    /**
     * 设置传感器列表
     */
    public void setSensors(String sensors) {
        this.sensors = sensors;
    }

    /**
     * 获取保修期
     */
    public Date getWarranty() {
        return warranty;
    }

    /**
     * 设置保修期
     */
    public void setWarranty(Date warranty) {
        this.warranty = warranty;
    }

    /**
     * 获取购买日期
     */
    public Date getPurchaseDate() {
        return purchaseDate;
    }

    /**
     * 设置购买日期
     */
    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
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
     * 获取设备时间戳
     */
    public Timestamp getEditTime() {
        return editTime;
    }

    /**
     * 设置设备时间戳
     */
    public void setEditTime(Timestamp editTime) {
        this.editTime = editTime;
    }
}
