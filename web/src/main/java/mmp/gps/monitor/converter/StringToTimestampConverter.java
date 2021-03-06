package mmp.gps.monitor.converter;

import org.springframework.core.convert.converter.Converter;

import java.sql.Timestamp;

public class StringToTimestampConverter implements Converter<String, Timestamp> {

    @Override
    public Timestamp convert(String source) {

        return new Timestamp(Long.parseLong(source));
    }

}
