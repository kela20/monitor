package mmp.gps.domain.company;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

/**
 * 公司信息
 */
public class CompanyInfo {

    private String id;
    private String fullName;
    private String shortName;
    private String officeAddress;
    @JSONField(format = "yyyy-MM-dd")
    private Date serviceStartDate;
    @JSONField(format = "yyyy-MM-dd")
    private Date serviceEndDate;
    private boolean enable;
    @JSONField(format = "yyyy-MM-dd")
    private Date createTime;
    private String ondutyPhone;
    private String remark;

    private String PID;
    private String ZIPCODE;

    public String getPID() {
        return PID;
    }

    public void setPID(String PID) {
        this.PID = PID;
    }

    public String getZIPCODE() {
        return ZIPCODE;
    }

    public void setZIPCODE(String ZIPCODE) {
        this.ZIPCODE = ZIPCODE;
    }

    @Override
    public String toString() {
        return "CompanyInfo{" + "id='" + id + '\'' + ", fullName='" + fullName + '\'' + ", shortName='" + shortName + '\'' + ", officeAddress='" + officeAddress + '\'' + ", serviceStartDate=" + serviceStartDate + ", " + "serviceEndDate=" + serviceEndDate + ", enable=" + enable + ", createTime=" + createTime + ", " + "ondutyPhone='" + ondutyPhone + '\'' + ", remark='" + remark + '\'' + ", PID='" + PID + '\'' + ", " + "ZIPCODE='" + ZIPCODE + '\'' + '}';
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    /**
     * 获取记录唯一编号
     */
    public String getId() {
        return id;
    }

    /**
     * 设置记录唯一编号
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取全称
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * 设置全称
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     * 获取简称
     */
    public String getShortName() {
        return shortName;
    }

    /**
     * 设置简称
     */
    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    /**
     * 获取办公地址
     */
    public String getOfficeAddress() {
        return officeAddress;
    }

    /**
     * 设置办公地址
     */
    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    /**
     * 获取服务开始时间
     */
    public Date getServiceStartDate() {
        return serviceStartDate;
    }

    /**
     * 设置服务开始时间
     */
    public void setServiceStartDate(Date serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
    }

    /**
     * 获取服务结束时间
     */
    public Date getServiceEndDate() {
        return serviceEndDate;
    }

    /**
     * 设置服务结束时间
     */
    public void setServiceEndDate(Date serviceEndDate) {
        this.serviceEndDate = serviceEndDate;
    }

    /**
     * 获取启用否
     */

    /**
     * 设置启用否
     */


    /**
     * 获取入网时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置入网时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getOndutyPhone() {
        return ondutyPhone;
    }

    public void setOndutyPhone(String ondutyPhone) {
        this.ondutyPhone = ondutyPhone;
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
