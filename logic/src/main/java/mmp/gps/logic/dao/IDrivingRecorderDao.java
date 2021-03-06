package mmp.gps.logic.dao;

import mmp.gps.domain.drivingRecorder.*;

import java.util.Date;
import java.util.List;

public interface IDrivingRecorderDao {
    boolean exit(String number);

    void create(String number);

    void updateVersion(String number, String version);

    void updateLicense(String number, String license);

    void updateMeleage(String number, double init, double total);

    void updatePulse(String number, int pulse);

    void updateVehicleInfo(String number, String vehicleIdcode, String plateNumber, String category);

    void updateStatusSetting(String number, String name0, String name1, String name2, String name3, String name4,
                             String name5, String name6, String name7);

    void updateID(String number, String ccc, String model, String time, long sn);

    void saveAccidentDoubt(List<AccidentDoubtDto> list);

    void saveTimeoutDriving(List<TimeoutDrivingDto> list);

    void saveSpeedLog(List<SpeedLogDto> list);

    void saveLocateLog(List<LocateLogDto> list);

    void saveLoginLogoutLog(List<LoginLogoutLogDto> list);

    void savePowerSupplyLog(List<PowerSupplyLogDto> list);

    void saveParameterChangeLog(List<ParameterChangeLogDto> list);

    void saveSpeedStatusLog(List<SpeedStatusLogDto> list);

    DrivingRecorderInfoDto fetch(String number) throws Exception;

    int queryAccidentDoubtLogPageCount(String deviceNumber, Date start, Date end);

    List<AccidentDoubtDto> queryAccidentDoubtLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex,
                                                           int pageSize) throws Exception;

    int queryPowerLogPageCount(String deviceNumber, Date start, Date end);

    List<PowerSupplyLogDto> queryPowerLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int
            pageSize) throws Exception;

    int queryTimeoutLogPageCount(String deviceNumber, Date start, Date end);

    List<TimeoutDrivingDto> queryTimeoutLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int
            pageSize) throws Exception;

    int queryParameterLogPageCount(String deviceNumber, Date start, Date end);

    List<ParameterChangeLogDto> queryParameterLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex,
                                                            int pageSize) throws Exception;

    int queryLoginLogPageCount(String deviceNumber, Date start, Date end);

    List<LoginLogoutLogDto> queryLoginLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int
            pageSize) throws Exception;

    int querySpeedStatusLogPageCount(String deviceNumber, Date start, Date end);

    List<SpeedStatusLogDto> querySpeedStatusLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex,
                                                          int pageSize) throws Exception;

    int queryLocateLogPageCount(String deviceNumber, Date start, Date end);

    List<LocateLogDto> queryLocateLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int
            pageSize) throws Exception;

    int querySpeedLogPageCount(String deviceNumber, Date start, Date end);

    List<SpeedLogDto> querySpeedLogPageDetail(String deviceNumber, Date start, Date end, int pageIndex, int pageSize)
            throws Exception;
}
