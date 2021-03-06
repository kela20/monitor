package mmp.gps.domain.locate;

import java.sql.Date;

/**
 * 驾驶员基本信息
 */
public class DriverBaseInfo {

    private String name;
    private String sex = "男";
    private String phone;
    private String idType;
    private String idNumber;
    private String drivingLicenseNumber;
    private Date drivingLicenseExpiryDate;
    private String remark;

    @Override
    public String toString() {
        return "DriverBaseInfo{" + "name='" + name + '\'' + ", sex='" + sex + '\'' + ", phone='" + phone + '\'' + ", " + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "idType='" + idType + '\'' + ", idNumber='" + idNumber + '\'' + "," + " " + "drivingLicenseNumber='" + drivingLicenseNumber + '\'' + ", " + "drivingLicenseExpiryDate=" + drivingLicenseExpiryDate + ", " + "remark='" + remark + '\'' + '}';
    }

    /**
     * 获取姓名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置姓名
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取性别
     */
    public String getSex() {
        return sex;
    }

    /**
     * 设置性别
     */
    public void setSex(String sex) {
        this.sex = sex;
    }

    /**
     * 获取电话
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置电话
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 获取证件类型
     */
    public String getIdType() {
        return idType;
    }

    /**
     * 设置证件类型
     */
    public void setIdType(String idType) {
        this.idType = idType;
    }

    /**
     * 获取证件号
     */
    public String getIdNumber() {
        return idNumber;
    }

    /**
     * 设置证件号
     */
    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    /**
     * 获取驾驶证号
     */
    public String getDrivingLicenseNumber() {
        return drivingLicenseNumber;
    }

    /**
     * 设置驾驶证号
     */
    public void setDrivingLicenseNumber(String drivingLicenseNumber) {
        this.drivingLicenseNumber = drivingLicenseNumber;
    }

    /**
     * 获取驾驶证有效日期
     */
    public Date getDrivingLicenseExpiryDate() {
        return drivingLicenseExpiryDate;
    }

    /**
     * 设置驾驶证有效日期
     */
    public void setDrivingLicenseExpiryDate(Date drivingLicenseExpiryDate) {
        this.drivingLicenseExpiryDate = drivingLicenseExpiryDate;
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
