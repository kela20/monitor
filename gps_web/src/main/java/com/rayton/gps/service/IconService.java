package com.rayton.gps.service;


import com.rayton.gps.dao.baseinfo.MarkerFileInfo;
import com.rayton.gps.dao.icon.IconDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IconService {
    @Autowired
    private IconDao iconDao;

    public List<MarkerFileInfo> listByType(String type) {
        return iconDao.listByType(type);
    }

    public MarkerFileInfo get(String name) {
        return iconDao.get(name);
    }

    public void insert(MarkerFileInfo icon) {
        iconDao.insert(icon);
    }

    public void update(MarkerFileInfo icon) {
        iconDao.update(icon);
    }

    public void delete(String name) {
        iconDao.delete(name);
    }

}