package com.rayton.gps.dao.instruct;

import java.util.Date;

/**
 * 指令信息类
 *
 * @author yangzs
 */
public class InstructInfo {

    private String id;
    private String deviceNumber;
    private String plateNumber;
    private String command;
    private String name;
    private String parameter;
    private int status;
    private Date sendTime;
    private Date replyTime;
    private String result;

    @Override
    public String toString() {
        return "InstructInfo{" + "id='" + id + '\'' + ", deviceNumber='" + deviceNumber + '\'' + ", plateNumber='" +
                plateNumber + '\'' + ", command='" + command + '\'' + ", name='" + name + '\'' + ", parameter='" +
                parameter + '\'' + ", status=" + status + ", sendTime=" + sendTime + ", replyTime=" + replyTime + ", " +
                "" + "" + "" + "" + "result='" + result + '\'' + '}';
    }

    /**
     * 获取记录id;
     */
    public String getId() {
        return id;
    }

    /**
     * 设置记录id
     */
    public void setId(String id) {
        this.id = id;
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
     * 获取车牌号
     */
    public String getPlateNumber() {
        return plateNumber;
    }

    /**
     * 设置车牌号
     */
    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    /**
     * 获取命令
     */
    public String getCommand() {
        return command;
    }

    /**
     * 设置命令
     */
    public void setCommand(String command) {
        this.command = command;
    }

    /**
     * 获取指令名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置指令名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取参数
     */
    public String getParameter() {
        return parameter;
    }

    /**
     * 设置参数
     */
    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    /**
     * 获取状态
     */
    public int getStatus() {
        return status;
    }

    /**
     * 设置状态
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * 获取发送时间
     */
    public Date getSendTime() {
        return sendTime;
    }

    /**
     * 设置发送时间
     */
    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    /**
     * 获取应答时间
     */
    public Date getReplyTime() {
        return replyTime;
    }

    /**
     * 设置应答时间
     */
    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
    }

    /**
     * 获取结果
     */
    public String getResult() {
        return result;
    }

    /**
     * 设置结果
     */
    public void setResult(String result) {
        this.result = result;
    }
}