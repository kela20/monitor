package com.rayton.gps.dao.icon;

public class Icon {

    private String id;
    private String type;
    private String path;

    public Icon() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Icon{" + "id='" + id + '\'' + ", type='" + type + '\'' + ", path='" + path + '\'' + '}';
    }
}
