package com.rayton.gps.dao.lisence;

import com.rayton.gps.dao.lisence.DrivingLisence;

import java.util.List;

import com.rayton.gps.util.Assist;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DrivingLisenceDao {
    /**
     * 获得DrivingLisence数据的总行数,可以通过辅助工具Assist进行条件查询,如果没有条件则传入null
     *
     * @param assist
     * @return
     */
    long getDrivingLisenceRowCount(Assist assist);

    /**
     * 获得DrivingLisence数据集合,可以通过辅助工具Assist进行条件查询,如果没有条件则传入null
     *
     * @param assist
     * @return
     */
    List<DrivingLisence> selectDrivingLisence(Assist assist);

    /**
     * 获得一个DrivingLisence对象,以参数DrivingLisence对象中不为空的属性作为条件进行查询
     *
     * @param obj
     * @return
     */
    DrivingLisence selectDrivingLisenceByObj(DrivingLisence obj);

    /**
     * 通过DrivingLisence的id获得DrivingLisence对象
     *
     * @param id
     * @return
     */
    DrivingLisence selectDrivingLisenceById(String id);

    /**
     * 插入DrivingLisence到数据库,包括null值
     *
     * @param value
     * @return
     */
    int insertDrivingLisence(DrivingLisence value);

    /**
     * 插入DrivingLisence中属性值不为null的数据到数据库
     *
     * @param value
     * @return
     */
    int insertNonEmptyDrivingLisence(DrivingLisence value);

    /**
     * 批量插入DrivingLisence到数据库,包括null值
     *
     * @param value
     * @return
     */
    int insertDrivingLisenceByBatch(List<DrivingLisence> value);

    /**
     * 通过DrivingLisence的id删除DrivingLisence
     *
     * @param id
     * @return
     */
    int deleteDrivingLisenceById(String id);

    /**
     * 通过辅助工具Assist的条件删除DrivingLisence
     *
     * @param assist
     * @return
     */
    int deleteDrivingLisence(Assist assist);

    /**
     * 通过DrivingLisence的id更新DrivingLisence中的数据,包括null值
     *
     * @param enti
     * @return
     */
    int updateDrivingLisenceById(DrivingLisence enti);

    /**
     * 通过辅助工具Assist的条件更新DrivingLisence中的数据,包括null值
     *
     * @param value
     * @param assist
     * @return
     */
    int updateDrivingLisence(@Param("enti") DrivingLisence value, @Param("assist") Assist assist);

    /**
     * 通过DrivingLisence的id更新DrivingLisence中属性不为null的数据
     *
     * @param enti
     * @return
     */
    int updateNonEmptyDrivingLisenceById(DrivingLisence enti);

    /**
     * 通过辅助工具Assist的条件更新DrivingLisence中属性不为null的数据
     *
     * @param value
     * @param assist
     * @return
     */
    int updateNonEmptyDrivingLisence(@Param("enti") DrivingLisence value, @Param("assist") Assist assist);
}