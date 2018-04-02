package com.rayton.gps.dao;

import java.util.ArrayList;
import java.util.List;

public class Page<T> {
    /**
     * 数据列表
     */
    public List<T> rows = new ArrayList<T>();
    /**
     * 总记录数
     */
    public int total;

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Page{" + "rows=" + rows + ", total=" + total + '}';
    }
}