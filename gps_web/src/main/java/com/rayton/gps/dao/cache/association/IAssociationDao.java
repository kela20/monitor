package com.rayton.gps.dao.cache.association;

import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IAssociationDao {

    List<MonitorTarget> loadUserMonitors(String userId) throws Exception;

    List<MonitorTarget> loadSubUserMonitors(String companyId) throws Exception;

    List<MonitorTarget> loadUserVehicles(List<String> motorcades) throws Exception;

}
