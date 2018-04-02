package com.rayton.gps.util;

import org.springframework.core.convert.converter.Converter;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateToStringConverter implements Converter<Date, String> {

    @Override
    public String convert(Date source) {
        if (source == null)
            return "";
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(source);
    }

}