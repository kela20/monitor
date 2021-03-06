package mmp.gps.protocol.jtt808.body;

import mmp.gps.common.util.ByteIO;
import mmp.gps.common.util.Charsets;
import mmp.gps.common.contract.IPacket;

public class InformationServiceBody implements IPacket {

    private short type;
    private int contentSize;
    private String content;


    public short getType() {
        return this.type;
    }

    public void setType(short type) {
        this.type = type;
    }

    public int getContentSize() {
        return this.contentSize;
    }

    public void setContentSize(int contentSize) {
        this.contentSize = contentSize;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.contentSize = content == null ? 0 : content.getBytes(Charsets.GBK).length;
        this.content = content;
    }

    public int size() {
        return 3 + (this.content == null ? 0 : this.content.getBytes(Charsets.GBK).length);
    }

    public void from(byte[] src) {
        ByteIO io = new ByteIO(src);
        this.type = io.getUbyte();
        this.contentSize = io.getUshort();
        if (this.contentSize > 0) {
            this.content = new String(io.getBytes(this.contentSize), Charsets.GBK);
        }

    }

    public byte[] array() {
        ByteIO io = new ByteIO(this.size());
        io.putUbyte(this.type);
        io.putUshort(this.contentSize);
        io.put(this.content.getBytes(Charsets.GBK));
        return io.array();
    }
}
