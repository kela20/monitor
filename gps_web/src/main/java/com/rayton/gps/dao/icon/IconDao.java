package com.rayton.gps.dao.icon;


import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IconDao {

    List<MarkerFileInfo> listByType(String type);

    MarkerFileInfo get(String name);

    void insert(MarkerFileInfo icon);

    void update(MarkerFileInfo icon);

    void delete(String name);


}
