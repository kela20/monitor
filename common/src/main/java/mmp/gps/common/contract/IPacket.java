package mmp.gps.common.contract;

/**
 * Cmate数据包接口
 */
public interface IPacket {
    /**
     * 获取网络字节数
     *
     * @return
     */
    int size();

    /**
     * 从网络字节序加载数据
     *
     * @return
     */
    void from(byte[] src);

    /**
     * 生成网络字节序
     *
     * @return
     */
    byte[] array();
}
