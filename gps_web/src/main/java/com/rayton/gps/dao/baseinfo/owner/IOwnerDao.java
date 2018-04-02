package com.rayton.gps.dao.baseinfo.owner;

import com.rayton.gps.dao.baseinfo.vehicle.VehicleInfoDto;
import com.rayton.gps.util.KeyValue;

import java.util.List;

/**
 * 车主数据访问接口
 *
 * @author 生
 */
public interface IOwnerDao {
    /**
     * 查询总行数
     */
    int queryPageCount(String ownerId, String filter);

    /**
     * 查询页内容
     */
    List<OwnerInfo> queryPageDetail(String ownerId, String filter, int pageIndex, int pageSize);

    /**
     * 创建新的车主
     */
    void create(Owner dto);

    /**
     * 修改车主
     */
    int update(Owner dto);

    /**
     * 删除车主
     */
    void delete(String id);

    /**
     * 删除车主与车辆关系
     */
    void deleteVehicleInOwner(String ownerId);

    /**
     * 读取车主
     */
    Owner fetch(String id);

    /**
     * 是否有车辆
     */
    boolean hasVehicle(String id);

    /**
     * 查询车主车辆
     */
    List<VehicleInfoDto> assignedVehicles(String owerId);

    /**
     * 添加车主与车辆关联
     *
     * @param ownerId  车主唯一编号
     * @param vehicles 车辆id列表 @
     */
    void addVehicles(List<KeyValue> vehicles);

    /**
     * 删除车主与车辆关联
     *
     * @param ownerId   车主唯一编号
     * @param vehicleId 车辆唯一编号 @
     */
    void removeVehicle(String ownerId, String vehicleId);
}