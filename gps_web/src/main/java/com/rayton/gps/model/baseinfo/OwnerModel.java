package com.rayton.gps.model.baseinfo;

import com.rayton.gps.dao.baseinfo.owner.Owner;
import com.rayton.gps.dao.baseinfo.user.User;
import com.rayton.gps.util.enums.UserKinds;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import java.sql.Date;
import java.sql.Timestamp;

public class OwnerModel {

    private String id;
    private String companyId;
    @NotEmpty
    private String ownerName;
    private String idType;
    private String idNumber;
    private Timestamp ownerEditTime;
    private String pid;
    private int kind;
    @NotBlank
    private String account;
    @NotBlank
    private String name;
    private String email;
    private String phone;
    private String contact;
    private boolean enable;
    private Date serviceStartDate;
    private Date serviceEndDate;
    private Date createTime;
    private String remark;
    private Timestamp userEditTime;

    @Override
    public String toString() {
        return "OwnerModel{" + "id='" + id + '\'' + ", companyId='" + companyId + '\'' + ", ownerName='" + ownerName
                + '\'' + ", idType='" + idType + '\'' + ", idNumber='" + idNumber + '\'' + ", ownerEditTime=" +
                ownerEditTime + ", pid='" + pid + '\'' + ", enums=" + kind + ", account='" + account + '\'' + ", " +
                "name='" + name + '\'' + ", email='" + email + '\'' + ", phone='" + phone + '\'' + ", contact='" +
                contact + '\'' + ", enable=" + enable + ", serviceStartDate=" + serviceStartDate + ", " +
                "serviceEndDate=" + serviceEndDate + ", createTime=" + createTime + ", remark='" + remark + '\'' + "," +
                "" + "" + "" + "" + "" + "" + "" + " userEditTime=" + userEditTime + '}';
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
     * 获取姓名
     */
    public String getOwnerName() {
        return ownerName;
    }

    /**
     * 设置姓名
     */
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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
    public Timestamp getOwnerEditTime() {
        return ownerEditTime;
    }

    /**
     * 设置时间戳
     */
    public void setOwnerEditTime(Timestamp ownerEditTime) {
        this.ownerEditTime = ownerEditTime;
    }

    /**
     * 获取父ID
     */
    public String getPid() {
        return pid;
    }

    /**
     * 设置父ID
     */
    public void setPid(String pid) {
        this.pid = pid;
    }

    /**
     * 获取用户类型：1公司，2公司用户，3车主，4设备
     */
    public int getKind() {
        return kind;
    }

    /**
     * 设置用户类型：1公司，2公司用户，3车主，4设备
     */
    public void setKind(int kind) {
        this.kind = kind;
    }

    /**
     * 获取帐号
     */
    public String getAccount() {
        return account;
    }

    /**
     * 设置帐号
     */
    public void setAccount(String account) {
        this.account = account;
    }

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

    /**
     * 获取邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置邮箱
     */
    public void setEmail(String email) {
        this.email = email;
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
     * 获取联系人
     */
    public String getContact() {
        return contact;
    }

    /**
     * 设置联系人
     */
    public void setContact(String contact) {
        this.contact = contact;
    }

    /**
     * 获取是否启用
     */
    public boolean isEnable() {
        return enable;
    }

    /**
     * 设置是否启用
     */
    public void setEnable(boolean enable) {
        this.enable = enable;
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
     * 获取创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

    /**
     * 获取时间戳
     */
    public Timestamp getUserEditTime() {
        return userEditTime;
    }

    /**
     * 设置时间戳
     */
    public void setUserEditTime(Timestamp userEditTime) {
        this.userEditTime = userEditTime;
    }

    public void fill(Owner owner) {
        id = owner.getId();
        companyId = owner.getCompanyId();
        ownerName = owner.getOwnerName();
        idType = owner.getIdType();
        idNumber = owner.getIdNumber();
        ownerEditTime = owner.getEditTime();
    }

    public void fill(User user) {
        id = user.getId();
        pid = user.getPid();
        companyId = user.getCompanyId();
        kind = UserKinds.Owner.getIndex();
        account = user.getAccount();
        name = user.getName();
        contact = user.getContact();
        createTime = user.getCreateTime();
        email = user.getEmail();
        enable = user.isEnable();
        phone = user.getPhone();
        remark = user.getRemark();
        serviceEndDate = user.getServiceEndDate();
        serviceStartDate = user.getServiceStartDate();
        userEditTime = user.getEditTime();
    }

    public Owner getOwner() {
        Owner owner = new Owner();

        owner.setId(id);
        owner.setCompanyId(companyId);
        owner.setOwnerName(ownerName);
        owner.setIdType(idType);
        owner.setIdNumber(idNumber);
        owner.setEditTime(ownerEditTime);

        return owner;
    }

    public User getUser() {
        User user = new User();
        user.setId(id);
        user.setPid(pid);
        user.setCompanyId(companyId);
        user.setKind(kind);
        user.setAccount(account);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setContact(contact);
        user.setCreateTime(createTime);
        user.setEnable(enable);
        user.setEditTime(userEditTime);
        user.setServiceStartDate(serviceStartDate);
        user.setServiceEndDate(serviceEndDate);
        user.setRemark(remark);

        return user;
    }
}
