package mmp.gps.monitor.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseEntityWrapper {


    public static ResponseEntity<Map<Object, Object>> OK() {
        Map<Object, Object> map = new HashMap<>();
        map.put("error", false);
        map.put("msg", "ok");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    public static ResponseEntity<Map<Object, Object>> Failed() {
        Map<Object, Object> map = new HashMap<>();
        map.put("error", true);
        map.put("msg", "请重填");
        // 418
        return new ResponseEntity<>(map, HttpStatus.I_AM_A_TEAPOT);
    }

    public static ResponseEntity<Map<Object, Object>> Failed(Map error) {
        Map<Object, Object> map = new HashMap<>();
        map.put("error", true);
        map.put("msg", "请重填");
        error.forEach(map::put);

        // 418
        return new ResponseEntity<>(map, HttpStatus.I_AM_A_TEAPOT);
    }
}
