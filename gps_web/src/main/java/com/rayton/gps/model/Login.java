package com.rayton.gps.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@ApiModel(value = "用户信息")
public class Login {

    @ApiModelProperty(required = true, value = "登陆账号")
    @Size(min = 3, max = 50, message = "用户名错误！")
    private String account;

    private String pwd;
    @NotNull
    private String verify;
    private String error;

    @Override
    public String toString() {
        return "Login{" + "account='" + account + '\'' + ", pwd='" + pwd + '\'' + ", verify='" + verify + '\'' + ", " + "error='" + error + '\'' + '}';
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getVerify() {
        return verify;
    }

    public void setVerify(String verify) {
        this.verify = verify;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
