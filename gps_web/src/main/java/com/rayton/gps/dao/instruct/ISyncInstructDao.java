package com.rayton.gps.dao.instruct;

import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ISyncInstructDao {

    List<DeviceInAreaInfoDto> loadUnfinishedAreaInDevice();

    void updateLog(String serialNumber);

}
