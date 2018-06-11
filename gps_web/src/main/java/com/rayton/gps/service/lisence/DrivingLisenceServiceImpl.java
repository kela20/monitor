package com.rayton.gps.service.lisence;

import com.rayton.gps.dao.lisence.DrivingLisence;
import com.rayton.gps.dao.lisence.DrivingLisenceDao;
import com.rayton.gps.util.Assist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrivingLisenceServiceImpl implements DrivingLisenceService {
    @Autowired
    private DrivingLisenceDao drivingLisenceDao;

    @Override
    public long getDrivingLisenceRowCount(Assist assist) {
        return drivingLisenceDao.getDrivingLisenceRowCount(assist);
    }

    @Override
    public List<DrivingLisence> selectDrivingLisence(Assist assist) {
        return drivingLisenceDao.selectDrivingLisence(assist);
    }

    @Override
    public DrivingLisence selectDrivingLisenceByObj(DrivingLisence obj) {
        return drivingLisenceDao.selectDrivingLisenceByObj(obj);
    }

    @Override
    public DrivingLisence selectDrivingLisenceById(Integer id) {
        return drivingLisenceDao.selectDrivingLisenceById(id);
    }

    @Override
    public int insertDrivingLisence(DrivingLisence value) {
        return drivingLisenceDao.insertDrivingLisence(value);
    }

    @Override
    public int insertNonEmptyDrivingLisence(DrivingLisence value) {
        return drivingLisenceDao.insertNonEmptyDrivingLisence(value);
    }

    @Override
    public int insertDrivingLisenceByBatch(List<DrivingLisence> value) {
        return drivingLisenceDao.insertDrivingLisenceByBatch(value);
    }

    @Override
    public int deleteDrivingLisenceById(Integer id) {
        return drivingLisenceDao.deleteDrivingLisenceById(id);
    }

    @Override
    public int deleteDrivingLisence(Assist assist) {
        return drivingLisenceDao.deleteDrivingLisence(assist);
    }

    @Override
    public int updateDrivingLisenceById(DrivingLisence enti) {
        return drivingLisenceDao.updateDrivingLisenceById(enti);
    }

    @Override
    public int updateDrivingLisence(DrivingLisence value, Assist assist) {
        return drivingLisenceDao.updateDrivingLisence(value, assist);
    }

    @Override
    public int updateNonEmptyDrivingLisenceById(DrivingLisence enti) {
        return drivingLisenceDao.updateNonEmptyDrivingLisenceById(enti);
    }

    @Override
    public int updateNonEmptyDrivingLisence(DrivingLisence value, Assist assist) {
        return drivingLisenceDao.updateNonEmptyDrivingLisence(value, assist);
    }

    public DrivingLisenceDao getDrivingLisenceDao() {
        return this.drivingLisenceDao;
    }

    public void setDrivingLisenceDao(DrivingLisenceDao drivingLisenceDao) {
        this.drivingLisenceDao = drivingLisenceDao;
    }

}