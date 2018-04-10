package com.rayton.gps.util.converter;

import org.springframework.core.convert.converter.Converter;

import java.sql.Timestamp;

public class TimestampToStringConverter implements Converter<Timestamp, String> {

    @Override
    public String convert(Timestamp source) {
        return String.valueOf(source.getTime());
    }

}
