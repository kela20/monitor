package com.edata.monitor.dao.baseinfo.owner;

import org.hibernate.validator.constraints.NotEmpty;

import java.sql.Date;
import java.sql.Timestamp;

public class Owner {

    private String id;
    private String companyId;
    @NotEmpty
    private String ownerName;
    private String idType;
    private String idNumber;
    private Timestamp editTime;

    //
    private String CONTACT;
    private Date REGISTRATIONDATE;
    private String PHONE;
    private String FAX;
    private String BUSSINESSAGENT;
    //

    @Override
    public String toString() {
        return "Owner{" + "id='" + id + '\'' + ", companyId='" + companyId + '\'' + ", ownerName='" + ownerName +
                '\'' + ", idType='" + idType + '\'' + ", idNumber='" + idNumber + '\'' + ", editTime=" + editTime +
                ", CONTACT='" + CONTACT + '\'' + ", REGISTRATIONDATE=" + REGISTRATIONDATE + ", PHONE='" + PHONE +
                '\'' + ", FAX='" + FAX + '\'' + ", BUSSINESSAGENT='" + BUSSINESSAGENT + '\'' + '}';
    }

    public String getCONTACT() {
        return CONTACT;
    }

    public void setCONTACT(String CONTACT) {
        this.CONTACT = CONTACT;
    }

    public Date getREGISTRATIONDATE() {
        return REGISTRATIONDATE;
    }

    public void setREGISTRATIONDATE(Date REGISTRATIONDATE) {
        this.REGISTRATIONDATE = REGISTRATIONDATE;
    }

    public String getPHONE() {
        return PHONE;
    }

    public void setPHONE(String PHONE) {
        this.PHONE = PHONE;
    }

    public String getFAX() {
        return FAX;
    }

    public void setFAX(String FAX) {
        this.FAX = FAX;
    }

    public String getBUSSINESSAGENT() {
        return BUSSINESSAGENT;
    }

    public void setBUSSINESSAGENT(String BUSSINESSAGENT) {
        this.BUSSINESSAGENT = BUSSINESSAGENT;
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

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    /**
     * 获取姓名
     */


    /**
     * 设置姓名
     */

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
     * 获取证件编号
     */
    public String getIdNumber() {
        return idNumber;
    }

    /**
     * 设置证件编号
     */
    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    /**
     * 获取时间戳
     */
    public Timestamp getEditTime() {
        return editTime;
    }

    /**
     * 设置时间戳
     */
    public void setEditTime(Timestamp editTime) {
        this.editTime = editTime;
    }
}
