package mmp.gps.common.util;


public class GisUtil {
    /**
     * 两点间距离
     */
    public static double distance(LatLng p1, LatLng p2) {
        return distance(p1.lng, p1.lat, p2.lng, p2.lat);
    }

    /**
     * 两点间距离
     */
    public static double distance(double lng1, double lat1, double lng2, double lat2) {
        double R = 6378137; // 地球半径
        lat1 = lat1 * Math.PI / 180.0;
        lat2 = lat2 * Math.PI / 180.0;
        double sa2 = Math.sin((lat1 - lat2) / 2.0);
        double sb2 = Math.sin(((lng1 - lng2) * Math.PI / 180.0) / 2.0);
        return 2 * R * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1) * Math.cos(lat2) * sb2 * sb2));
    }

    /**
     * 点是否在多边形内
     */
    public static boolean isInsidePolygon(LatLng pt, LatLng[] poly) {
        boolean c = false;
        int l = poly.length;
        int j = l - 1;
        for (int i = -1; ++i < l; j = i)
            if ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) {
                if (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) +
                        poly[i].lng) {
                    c = !c;
                }
            }
        return c;
    }

    /**
     * 点到直线的最短距离的判断点（lng0,lat0） 到由两点组成的线段（lng1,lat1） ,( lng2,lat2 )
     */
    public static double pointToLine(double lng1, double lat1, double lng2, double lat2, double lng0, double lat0) {
        double space = 0;
        double a, b, c;
        a = distance(lng1, lat1, lng2, lat2);// 线段的长度
        b = distance(lng1, lat1, lng0, lat0);// (x1,y1)到点的距离
        c = distance(lng2, lat2, lng0, lat0);// (x2,y2)到点的距离
        if (c <= 0.000001 || b <= 0.000001) {
            space = 0;
            return space;
        }
        if (a <= 0.000001) {
            space = b;
            return space;
        }
        if (c * c >= a * a + b * b) {
            space = b;
            return space;
        }
        if (b * b >= a * a + c * c) {
            space = c;
            return space;
        }
        double p = (a + b + c) / 2;// 半周长
        double s = Math.sqrt(p * (p - a) * (p - b) * (p - c));// 海伦公式求面积
        space = 2 * s / a;// 返回点到线的距离（利用三角形面积公式求高）
        return space;
    }
}
