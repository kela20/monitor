package mmp.gps.domain.alarm;

public class ProcessAllDto {
    public String deviceNumber;
    public String userMethod;
    public String userRemark;
    public String userId;
    public String userName;

    public String getDeviceNumber() {
        return deviceNumber;
    }

    public void setDeviceNumber(String deviceNumber) {
        this.deviceNumber = deviceNumber;
    }

    public String getUserMethod() {
        return userMethod;
    }

    public void setUserMethod(String userMethod) {
        this.userMethod = userMethod;
    }

    public String getUserRemark() {
        return userRemark;
    }

    public void setUserRemark(String userRemark) {
        this.userRemark = userRemark;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "ProcessAllDto{" + "deviceNumber='" + deviceNumber + '\'' + ", userMethod='" + userMethod + '\'' + ", " + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "userRemark='" + userRemark + '\'' + ", " + "userId='" + userId + '\'' + ", " + "" + "userName='" + userName + '\'' + '}';
    }
}
