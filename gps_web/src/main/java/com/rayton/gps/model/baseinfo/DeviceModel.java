package com.rayton.gps.model.baseinfo;

import com.rayton.gps.dao.baseinfo.device.Device;
import com.rayton.gps.dao.baseinfo.user.User;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import java.sql.Date;
import java.sql.Timestamp;

public class DeviceModel {

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
    private Timestamp deviceEditTime;
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
        return "DeviceModel{" + "id='" + id + '\'' + ", companyId='" + companyId + '\'' + ", deviceNumber='" +
                deviceNumber + '\'' + ", simcardId='" + simcardId + '\'' + ", phoneNumber='" + phoneNumber + '\'' +
                "," + " model='" + model + '\'' + ", factoryName='" + factoryName + '\'' + ", factoryNumber='" +
                factoryNumber + '\'' + ", cameras=" + cameras + ", hasMicrophone=" + hasMicrophone + ", " +
                "hasNavigation=" + hasNavigation + ", sensors='" + sensors + '\'' + ", warranty=" + warranty + ", " +
                "purchaseDate=" + purchaseDate + ", installDate=" + installDate + ", deviceEditTime=" +
                deviceEditTime + ", pid='" + pid + '\'' + ", enums=" + kind + ", account='" + account + '\'' + ", " +
                "name='" + name + '\'' + ", email='" + email + '\'' + ", phone='" + phone + '\'' + ", contact='" +
                contact + '\'' + ", " + "enable=" + enable + ", serviceStartDate=" + serviceStartDate + ", " +
                "serviceEndDate=" + serviceEndDate + ", createTime=" + createTime + ", remark='" + remark + '\'' + "," +
                "" + "" + "" + " userEditTime=" + userEditTime + '}';
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

    public Timestamp getDeviceEditTime() {
        return deviceEditTime;
    }

    public void setDeviceEditTime(Timestamp deviceEditTime) {
        this.deviceEditTime = deviceEditTime;
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

    public Timestamp getUserEditTime() {
        return userEditTime;
    }

    public void setUserEditTime(Timestamp userEditTime) {
        this.userEditTime = userEditTime;
    }

    public void fill(User user) {
        id = user.getId();
        pid = user.getPid();
        companyId = user.getCompanyId();
        kind = user.getKind();
        account = user.getAccount();
        name = user.getName();
        email = user.getEmail();
        phone = user.getPhone();
        contact = user.getContact();
        createTime = user.getCreateTime();
        enable = user.isEnable();
        userEditTime = user.getEditTime();
        serviceStartDate = user.getServiceStartDate();
        serviceEndDate = user.getServiceEndDate();
        remark = user.getRemark();
    }

    public void fill(Device device) {
        id = device.getId();
        companyId = device.getCompanyId();
        deviceNumber = device.getDeviceNumber();
        simcardId = device.getSimcardId();
        phoneNumber = device.getPhoneNumber();
        model = device.getModel();
        factoryName = device.getFactoryName();
        factoryNumber = device.getFactoryNumber();
        cameras = device.getCameras();
        hasMicrophone = device.isHasMicrophone();
        hasNavigation = device.isHasNavigation();
        sensors = device.getSensors();
        warranty = device.getWarranty();
        purchaseDate = device.getPurchaseDate();
        installDate = device.getInstallDate();
        deviceEditTime = device.getEditTime();
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

    public Device getDevice() {
        Device device = new Device();

        device.setId(id);
        device.setCompanyId(companyId);
        device.setDeviceNumber(deviceNumber);
        device.setSimcardId(simcardId);
        device.setPhoneNumber(phoneNumber);
        device.setModel(model);
        device.setFactoryName(factoryName);
        device.setFactoryNumber(factoryNumber);
        device.setCameras(cameras);
        device.setHasMicrophone(hasMicrophone);
        device.setHasNavigation(hasNavigation);
        device.setSensors(sensors);
        device.setWarranty(warranty);
        device.setPurchaseDate(purchaseDate);
        device.setInstallDate(installDate);
        device.setEditTime(deviceEditTime);

        return device;
    }
}