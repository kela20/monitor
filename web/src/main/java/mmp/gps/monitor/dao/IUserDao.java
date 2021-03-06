package mmp.gps.monitor.dao;

import mmp.gps.common.util.KeyValue;
import mmp.gps.domain.monitor.MonitorInfo;
import mmp.gps.domain.role.Role;
import mmp.gps.domain.user.User;
import mmp.gps.domain.user.UserInfo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户服务类
 */

@Repository
public interface IUserDao {
    /**
     * 查询用户总行数
     */
    int queryPageCount(String pid, String filter);

    /**
     * 查询用户总页内容
     */
    List<UserInfo> queryPageDetail(String pid, String filter, int page, int size);

    /**
     * 创建新的用户
     */
    int create(User dto);

    /**
     * 修改用户
     */
    int update(User dto);

    /**
     * 删除用户
     */
    void deleteUser(String userId);

    /**
     * 删除信息
     */
    void deleteInfo(String userId);

    /**
     * 删除地图图层
     */
    void deleteMaplayer(String userId);

    /**
     * 删除文本信息
     */
    void deleteTextmessage(String userId);

    /**
     * 读取用户
     */
    User fetch(String id);

    /**
     * 是否已存在用户
     */
    boolean exist(String account);

    /**
     * 是否已存在用户
     */
    boolean existOutId(String account, String id);

    /**
     * 获取所有可分配的监控对象总行数
     */
    int targetsPageCount(String companyId, String filter);

    /**
     * 获取所有可分配的监控对象
     */
    List<MonitorInfo> targetsPageDetail(String companyId, String filter, int pageIndex, int pageSize);

    /**
     * 获取当前已分配的监控对象
     */
    List<MonitorInfo> assignedMonitors(String userId, String companyId);

    /**
     * 添加监控对象
     */
    void addMonitors(List<KeyValue> monitors);

    /**
     * 删除监控对象
     */
    void removeMonitor(String userId, String targetId);

    /**
     * 获取角色列表
     */
    List<Role> assignedRoles(String userId);

    /**
     * 添加角色
     */
    void addRoles(List<KeyValue> roles);

    /**
     * 删除角色
     */
    void removeRole(String userId, String roleId);

    /**
     * 获取用户选项设置
     */
    String getUserOptions(String userId, int optionType);

    /**
     * 保存用户选项设置
     */
    void saveUserOptions(String userId, int optionType, String json);
}
