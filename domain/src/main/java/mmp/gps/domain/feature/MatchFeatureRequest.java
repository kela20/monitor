package mmp.gps.domain.feature;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 匹配设备信息请求
 */
public class MatchFeatureRequest {
    @NotEmpty
    private String number;

    private int protocol;


    /**
     * 获取设备号
     */
    public String getNumber() {
        return number;
    }

    /**
     * 设置设备号
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * 获取协议类型
     */
    public int getProtocol() {
        return protocol;
    }

    /**
     * 设置协议类型
     */
    public void setProtocol(int protocol) {
        this.protocol = protocol;
    }


    @Override
    public String toString() {
        return "MatchFeatureRequest{" +
                "number='" + number + '\'' +
                ", protocol=" + protocol +
                '}';
    }

}
