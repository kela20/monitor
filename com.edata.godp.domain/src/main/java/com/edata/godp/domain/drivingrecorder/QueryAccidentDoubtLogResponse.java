package com.edata.godp.domain.drivingrecorder;

import java.util.ArrayList;
import java.util.List;

public class QueryAccidentDoubtLogResponse {
    private int total;
    private List<AccidentDoubt> rows = new ArrayList<AccidentDoubt>();

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<AccidentDoubt> getRows() {
        return rows;
    }

    public void setRows(List<AccidentDoubt> rows) {
        this.rows = rows;
    }

}
