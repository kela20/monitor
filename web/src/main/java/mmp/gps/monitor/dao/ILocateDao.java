package mmp.gps.monitor.dao;

import mmp.gps.domain.alarm.AlarmDto;
import mmp.gps.domain.locate.*;
import mmp.gps.domain.vehicle.VehicleBaseInfoDto;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 定位数据访问接口
 */

@Repository
public interface ILocateDao {
    /**
     * 保存报警
     */
    void saveAlarms(List<AlarmDto> alarms);

    /**
     * 查看车辆资料
     */
    VehicleBaseInfoDto vehicleBaseInfo(String vehicleId);

    /**
     * 查看车主资料
     */
    List<OwnerBaseInfoDto> ownerBaseInfo(String vehicleId);

    /**
     * 查看驾驶员资料
     */
    List<DriverBaseInfoDto> driverBaseInfo(String vehicleId);

    /**
     * 保存多媒体事件报告
     */
    void saveMultimediaEventReport(MultimediaEventReportDto dto);

    /**
     * 读取所有未读多媒体事件报告
     */
    List<MultimediaEventReportDto> loadUnreadMultimediaEvent(List<String> numbers);

    /**
     * 读取多媒体事件报告
     */
    void readMultmediaEventReport(String id, String userId, String userName);

    /**
     * 保存多媒体检索数据
     */
    void saveMultimediaRetrieval(List<MultimediaRetrievalDto> list);

    /**
     * 事件报告描述
     */
    String getEventReportDescription(String number, int eventId);

    /**
     * 保存事件报告
     */
    void saveDeviceEventReport(DeviceEventReportDto report);

    /**
     * 读取设备事件报告
     */
    void readDeviceEventReport(String id, String userId, String userName);

    /**
     * 读取所有未读设备事件报告
     */
    List<DeviceEventReportDto> loadUnreadDeviceEvent(List<String> numbers);

    /**
     * 升级结果报告
     */
    void saveUpgradeResultReport(UpgradeResultReportDto report);

    /**
     * 读取所有未读设备升级结果报告
     */
    List<UpgradeResultReportDto> loadUnreadDeviceUpgradeResultReport(List<String> numbers);

    /**
     * 读取设备升级结果报告
     */
    void readDeviceUpgradeResultReport(String id, String userId, String userName);

}
