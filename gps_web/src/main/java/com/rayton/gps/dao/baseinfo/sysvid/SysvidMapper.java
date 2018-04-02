package com.rayton.gps.dao.baseinfo.sysvid;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysvidMapper {
    long countByExample(SysvidExample example);

    int deleteByExample(SysvidExample example);

    int deleteByPrimaryKey(String sysvid);

    int insert(Sysvid record);

    int insertSelective(Sysvid record);

    List<Sysvid> selectByExample(SysvidExample example);

    Sysvid selectByPrimaryKey(String sysvid);

    int updateByExampleSelective(@Param("record") Sysvid record, @Param("example") SysvidExample example);

    int updateByExample(@Param("record") Sysvid record, @Param("example") SysvidExample example);

    int updateByPrimaryKeySelective(Sysvid record);

    int updateByPrimaryKey(Sysvid record);
}