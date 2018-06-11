package com.rayton.gps.dao.baseinfo.sysvid;

import com.alibaba.fastjson.annotation.JSONField;

public class Sysvid implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
    private Integer iD;//id
    private String cARID;//车辆id
    private String sIMID;
    @JSONField(format = "yyyy-MM-dd")
    private java.util.Date eXPIRENOTIFYDATE;//系统VID到期提醒时间

    private String cARGROUPID;
    private java.util.Date cREATEDATE;//创建日期
    private String cOMID;
    private String sYSVID;//系统VID

    private String cARREGID;
    private String dEVICEID;//终端id
    @JSONField(format = "yyyy-MM-dd")
    private java.util.Date sYSVIDACTIVATIONDATE;//系统VID激活日期
    private String uSERID;
    private String cOMPANYID;
    private String cARLICECEID;
    private String dRIVERLICENCEID;
    @JSONField(format = "yyyy-MM-dd")
    private java.util.Date eXPIREDATE;//系统VID到期时间
    private String rEMARK;//备注
    private String bUSSINESSAGENT;//业务代表
    private String dRIVERID;//司机

    public Sysvid() {
        super();
    }

    public Sysvid(Integer iD, String cARID, String sIMID, java.util.Date eXPIRENOTIFYDATE, String cARGROUPID, java.util.Date cREATEDATE, String cOMID, String sYSVID, String cARREGID, String dEVICEID, java.util.Date sYSVIDACTIVATIONDATE, String uSERID, String cOMPANYID, String cARLICECEID, String dRIVERLICENCEID, java.util.Date eXPIREDATE, String rEMARK, String bUSSINESSAGENT, String dRIVERID) {
        super();
        this.iD = iD;
        this.cARID = cARID;
        this.sIMID = sIMID;
        this.eXPIRENOTIFYDATE = eXPIRENOTIFYDATE;
        this.cARGROUPID = cARGROUPID;
        this.cREATEDATE = cREATEDATE;
        this.cOMID = cOMID;
        this.sYSVID = sYSVID;
        this.cARREGID = cARREGID;
        this.dEVICEID = dEVICEID;
        this.sYSVIDACTIVATIONDATE = sYSVIDACTIVATIONDATE;
        this.uSERID = uSERID;
        this.cOMPANYID = cOMPANYID;
        this.cARLICECEID = cARLICECEID;
        this.dRIVERLICENCEID = dRIVERLICENCEID;
        this.eXPIREDATE = eXPIREDATE;
        this.rEMARK = rEMARK;
        this.bUSSINESSAGENT = bUSSINESSAGENT;
        this.dRIVERID = dRIVERID;
    }

    public Integer getID() {
        return this.iD;
    }

    public void setID(Integer iD) {
        this.iD = iD;
    }

    public String getCARID() {
        return this.cARID;
    }

    public void setCARID(String cARID) {
        this.cARID = cARID;
    }

    public String getSIMID() {
        return this.sIMID;
    }

    public void setSIMID(String sIMID) {
        this.sIMID = sIMID;
    }

    public java.util.Date getEXPIRENOTIFYDATE() {
        return this.eXPIRENOTIFYDATE;
    }

    public void setEXPIRENOTIFYDATE(java.util.Date eXPIRENOTIFYDATE) {
        this.eXPIRENOTIFYDATE = eXPIRENOTIFYDATE;
    }

    public String getCARGROUPID() {
        return this.cARGROUPID;
    }

    public void setCARGROUPID(String cARGROUPID) {
        this.cARGROUPID = cARGROUPID;
    }

    public java.util.Date getCREATEDATE() {
        return this.cREATEDATE;
    }

    public void setCREATEDATE(java.util.Date cREATEDATE) {
        this.cREATEDATE = cREATEDATE;
    }

    public String getCOMID() {
        return this.cOMID;
    }

    public void setCOMID(String cOMID) {
        this.cOMID = cOMID;
    }

    public String getSYSVID() {
        return this.sYSVID;
    }

    public void setSYSVID(String sYSVID) {
        this.sYSVID = sYSVID;
    }

    public String getCARREGID() {
        return this.cARREGID;
    }

    public void setCARREGID(String cARREGID) {
        this.cARREGID = cARREGID;
    }

    public String getDEVICEID() {
        return this.dEVICEID;
    }

    public void setDEVICEID(String dEVICEID) {
        this.dEVICEID = dEVICEID;
    }

    public java.util.Date getSYSVIDACTIVATIONDATE() {
        return this.sYSVIDACTIVATIONDATE;
    }

    public void setSYSVIDACTIVATIONDATE(java.util.Date sYSVIDACTIVATIONDATE) {
        this.sYSVIDACTIVATIONDATE = sYSVIDACTIVATIONDATE;
    }

    public String getUSERID() {
        return this.uSERID;
    }

    public void setUSERID(String uSERID) {
        this.uSERID = uSERID;
    }

    public String getCOMPANYID() {
        return this.cOMPANYID;
    }

    public void setCOMPANYID(String cOMPANYID) {
        this.cOMPANYID = cOMPANYID;
    }

    public String getCARLICECEID() {
        return this.cARLICECEID;
    }

    public void setCARLICECEID(String cARLICECEID) {
        this.cARLICECEID = cARLICECEID;
    }

    public String getDRIVERLICENCEID() {
        return this.dRIVERLICENCEID;
    }

    public void setDRIVERLICENCEID(String dRIVERLICENCEID) {
        this.dRIVERLICENCEID = dRIVERLICENCEID;
    }

    public java.util.Date getEXPIREDATE() {
        return this.eXPIREDATE;
    }

    public void setEXPIREDATE(java.util.Date eXPIREDATE) {
        this.eXPIREDATE = eXPIREDATE;
    }

    public String getREMARK() {
        return this.rEMARK;
    }

    public void setREMARK(String rEMARK) {
        this.rEMARK = rEMARK;
    }

    public String getBUSSINESSAGENT() {
        return this.bUSSINESSAGENT;
    }

    public void setBUSSINESSAGENT(String bUSSINESSAGENT) {
        this.bUSSINESSAGENT = bUSSINESSAGENT;
    }

    public String getDRIVERID() {
        return this.dRIVERID;
    }

    public void setDRIVERID(String dRIVERID) {
        this.dRIVERID = dRIVERID;
    }

}
