package com.rayton.gps.service;

import com.rayton.gps.aop.Log;
import com.rayton.gps.common.ObjectId;
import com.rayton.gps.common.Tuple;
import com.rayton.gps.dao.Page;
import com.rayton.gps.dao.baseinfo.device.Device;
import com.rayton.gps.dao.baseinfo.device.DeviceInfo;
import com.rayton.gps.dao.baseinfo.device.DeviceSearchInfo;
import com.rayton.gps.dao.baseinfo.device.IDeviceDao;
import com.rayton.gps.dao.baseinfo.user.IUserDao;
import com.rayton.gps.dao.baseinfo.user.User;
import com.rayton.gps.godp.IGodpDao;
import com.rayton.gps.util.Errors;
import com.rayton.gps.util.enums.UserKinds;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 设备服务类
 *
 * @author 生
 */
@Service
public class DeviceService {
    @Autowired
    private IDeviceDao deviceDao;
    @Autowired
    private IUserDao userDao;
    @Autowired
    private IGodpDao godpDao;


    @Autowired
    private UserService userService;

    public Page<DeviceInfo> query(String companyId, String filter, int pageIndex, int pageSize) {
        int total = deviceDao.queryPageCount(companyId, filter);
        Page<DeviceInfo> query = new Page<>();
        query.total = total;
        if (total > 0) {
            List<DeviceInfo> rows = deviceDao.queryPageDetail(companyId, filter, (pageIndex - 1) * pageSize, pageSize);
            query.rows.addAll(rows);


        }
        return query;
    }


    @RequiresPermissions("baseinfo.device.create")
    @Log(name = "创建新的终端资料")
    @Transactional
    public void create(Device device, User user) {
        String id = ObjectId.next();
        device.setId(id);
        user.setId(id);


        // user.setPassword("888888");
        user.setKind(UserKinds.Device.getIndex());


        // UserDto u = new UserDto();
        // u.id = user.getId();
        // u.pid = user.getPid();
        // u.companyId = user.getCompanyId();
        // u.kind = UserKinds.Device.getIndex();
        // u.account = user.getAccount();
        // u.name = user.getName();
        // u.contact = user.getContact();
        // u.createTime = user.getCreateTime();
        // u.email = user.getEmail();
        // u.enable = user.isEnable();
        // u.password = "888888";
        // u.phone = user.getPhone();
        // u.remark = user.getRemark();
        // u.serviceEndDate = user.getServiceEndDate();
        // u.serviceStartDate = user.getServiceStartDate();

        deviceDao.create(device);

        userService.doCreate(user);
        userDao.create(user);


        godpDao.syncDeviceInUser(device.getDeviceNumber(), true);
    }

    @RequiresPermissions("baseinfo.device.update")
    @Log(name = "修改终端资料")
    @Transactional
    public void update(Device device, User user) {
        String oldNumber = deviceDao.getDeviceNumber(device.getId());


        user.setKind(UserKinds.Device.getIndex());

        // UserDto u = new UserDto();
        // u.id = user.getId();
        // u.pid = user.getPid();
        // u.companyId = user.getCompanyId();
        // u.kind = UserKinds.Device.getIndex();
        // u.account = user.getAccount();
        // u.name = user.getName();
        // u.contact = user.getContact();
        // u.createTime = user.getCreateTime();
        // u.email = user.getEmail();
        // u.enable = user.isEnable();
        // u.phone = user.getPhone();
        // u.remark = user.getRemark();
        // u.serviceEndDate = user.getServiceEndDate();
        // u.serviceStartDate = user.getServiceStartDate();
        // u.editTime = user.getEditTime();

        int rows = deviceDao.update(device);
        if (rows != 1)
            throw new RuntimeException(Errors.anotherEdited);
        rows = userDao.update(user);
        if (rows != 1)
            throw new RuntimeException(Errors.anotherEdited);

        if (!oldNumber.equals(device.getDeviceNumber())) {
            godpDao.syncDeviceInUser(oldNumber, false);
            godpDao.syncDeviceInUser(device.getDeviceNumber(), true);
        }
    }

    public Tuple<Device, User> fetch(String id) {
        Device device = deviceDao.fetch(id);

        User user = userDao.fetch(id);
        // User user = new User();
        // user.setId(u.id);
        // user.setPid(u.pid);
        // user.setCompanyId(u.companyId);
        // user.setKind(u.kind);
        // user.setAccount(u.account);
        // user.setName(u.name);
        // user.setEmail(u.email);
        // user.setPhone(u.phone);
        // user.setContact(u.contact);
        // user.setCreateTime(u.createTime);
        // user.setEnable(u.enable);
        // user.setEditTime(u.editTime);
        // user.setServiceStartDate(u.serviceStartDate);
        // user.setServiceEndDate(u.serviceEndDate);
        // user.setRemark(u.remark);

        return Tuple.of(device, user);
    }

    @RequiresPermissions("baseinfo.device.delete")
    @Log(name = "删除终端资料")
    @Transactional
    public void delete(String id) {
        String plateNumber = deviceDao.assignedVehicle(id);
        if (plateNumber != null && !plateNumber.isEmpty())
            throw new RuntimeException("此终端已绑定车辆：" + plateNumber + ",不能被删除！");
        String deviceNumber = deviceDao.getDeviceNumber(id);
        deviceDao.delete(id);
        userDao.deleteUser(id);

        if (deviceNumber != null)
            godpDao.syncDeviceInUser(deviceNumber, false);
    }

    public boolean exist(String deviceNumber) {
        return deviceDao.exist(deviceNumber);
    }

    public boolean exist(String number, String id) {
        return deviceDao.existOutId(number, id);
    }

    public Page<DeviceSearchInfo> search(String companyId, String filter, int pageIndex, int pageSize) {
        int total = deviceDao.searchPageCount(companyId, filter);
        Page<DeviceSearchInfo> page = new Page<DeviceSearchInfo>();
        page.total = total;
        if (total > 0) {
            List<DeviceSearchInfo> rows = deviceDao.searchPageDetail(companyId, filter, (pageIndex - 1) * pageSize, pageSize);
            page.rows.addAll(rows);

        }
        return page;
    }

    public Object free(String companyId, String deviceNumber, int pageIndex, int pageSize) {
        int total = deviceDao.freePageCount(companyId, deviceNumber);
        Page<DeviceSearchInfo> page = new Page<>();
        page.total = total;
        if (total > 0) {
            List<DeviceSearchInfo> rows = deviceDao.freePageDetail(companyId, deviceNumber, (pageIndex - 1) * pageSize, pageSize);
            page.rows.addAll(rows);


        }
        return page;
    }
}
