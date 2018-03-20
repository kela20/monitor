package com.edata.godp.domain.push;

/**
 * 信息点播消息
 *
 * @author yangzs
 */
public class InformationOnDemandMessage {
    /**
     * 设备号
     */
    public String number;
    /**
     * 信息类别
     */
    public int type;
    /**
     * 动作：0:取消;1:点播
     */
    public int action;

}
