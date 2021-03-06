package mmp.gps.common.enums;

public enum AreaKinds {
    // 0:无特定位置; 1:圆形区域; 2:矩形区域; 3:多边形区域; 4:路线/路线
    None("无特定位置", 0), CircleArea("圆形区域", 1), RectangleArea("矩形区域", 2), PolygonArea("多边形区域", 3), RouteArea("路线/路段", 4), Poi("兴趣点", 100);
    // 成员变量
    private String name;
    private int index;

    // 构造方法
    AreaKinds(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static String getName(int index) {
        for (AreaKinds c : AreaKinds.values()) {
            if (c.getIndex() == index) {
                return c.name;
            }
        }
        return "未知";
    }

    public static AreaKinds of(int index) {
        for (AreaKinds c : AreaKinds.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }

    // get set 方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
