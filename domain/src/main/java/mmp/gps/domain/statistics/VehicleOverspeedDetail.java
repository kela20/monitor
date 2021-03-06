package mmp.gps.domain.statistics;

import mmp.gps.domain.device.Device;
import mmp.gps.domain.vehicle.Vehicle;

import java.util.*;

public class VehicleOverspeedDetail {

    double LAT;
    double LNG;
    Device device;
    Obj obj;
    Map map = new HashMap();
    private String deviceNumber;
    private String motorcade;
    private String plateNumber;
    private String section;
    private int times;
    private long duration;
    private Date start;
    private Date end;


    public List<Object> OverP = new ArrayList<>();

    public List<Object> getOverP() {
        return OverP;
    }

    public void setOverP(List<Object> overP) {
        OverP = overP;
    }

    private Vehicle vehicle;
    private String LICENSEPLATESELFNUM;
    private String vehicleType;

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getLICENSEPLATESELFNUM() {
        return LICENSEPLATESELFNUM;
    }

    public void setLICENSEPLATESELFNUM(String LICENSEPLATESELFNUM) {
        this.LICENSEPLATESELFNUM = LICENSEPLATESELFNUM;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Obj getObj() {
        return obj;
    }

    public void setObj(Obj obj) {
        this.obj = obj;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public double getLAT() {
        return LAT;
    }

    public void setLAT(double LAT) {
        this.LAT = LAT;
    }

    public double getLNG() {
        return LNG;
    }

    public void setLNG(double LNG) {
        this.LNG = LNG;
    }

    @Override
    public String toString() {
        return "VehicleOverspeedDetail{" + "deviceNumber='" + deviceNumber + '\'' + ", motorcade='" + motorcade + '\'' + ", plateNumber='" + plateNumber + '\'' + ", section='" + section + '\'' + ", times=" + times + ", " + "duration=" + duration + ", start=" + start + ", end=" + end + '}';
    }

    public String getDeviceNumber() {
        return deviceNumber;
    }

    public void setDeviceNumber(String deviceNumber) {
        this.deviceNumber = deviceNumber;
    }

    public String getMotorcade() {
        return motorcade;
    }

    public void setMotorcade(String motorcade) {
        this.motorcade = motorcade;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public int getTimes() {
        return times;
    }

    public void setTimes(int times) {
        this.times = times;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    class Obj {

        double LAT;
        double LNG;

        Obj() {

        }

        public double getLAT() {
            return LAT;
        }

        public void setLAT(double LAT) {
            this.LAT = LAT;
        }

        public double getLNG() {
            return LNG;
        }

        public void setLNG(double LNG) {
            this.LNG = LNG;
        }
    }
}
