package mmp.gps.domain.dictionary;

import java.sql.Timestamp;

public class DictionaryItemDto {
    public long id;
    public Long pid;
    public int kind;
    public String name;
    public String code;
    public String index;
    public Timestamp editTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public int getKind() {
        return kind;
    }

    public void setKind(int kind) {
        this.kind = kind;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public Timestamp getEditTime() {
        return editTime;
    }

    public void setEditTime(Timestamp editTime) {
        this.editTime = editTime;
    }

    @Override
    public String toString() {
        return "DictionaryItemDto{" + "id=" + id + ", pid=" + pid + ", enums=" + kind + ", name='" + name + '\'' + "," + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + " " + "code='" + code + '\'' + ", index='" + index + '\'' + ", " + "editTime=" + editTime + '}';
    }
}
