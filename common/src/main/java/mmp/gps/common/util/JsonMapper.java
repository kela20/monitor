package mmp.gps.common.util;


import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
// import org.codehaus.jackson.map.ObjectMapper;
// import org.codehaus.jackson.type.JavaType;


public class JsonMapper {
    private static ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.setDateFormat(DateFormats.DateTimeFormat);
    }

    public static String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception e) {
            return null;
        }
    }

    public static <T> T toObject(String json, Class<T> type) {
        try {
            return objectMapper.readValue(json, type);
        } catch (Exception e) {
            return null;
        }
    }

    public static <T> T toObject(String json, Class<?> collectionClass, Class<?>... elementClasses) {
        try {
            JavaType type = objectMapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
            return objectMapper.readValue(json, type);
        } catch (Exception e) {
            return null;
        }
    }

    public static String writeValueAsString(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception e) {
        }

        return null;
    }


    public static <T> T toObject(String json, JavaType type) {
        try {
            return objectMapper.readValue(json, type);
        } catch (Exception e) {
            return null;
        }
    }

    public static <T> T convertValue(Object fromValue, Class<T> toValueType) {
        return objectMapper.convertValue(fromValue, toValueType);
    }

    public static <T> T convertValue(Object fromValue, Class<?> collectionClass, Class<?>... elementClasses) {
        JavaType type = objectMapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
        return objectMapper.convertValue(fromValue, type);
    }

    public static JavaType getCollectionType(Class<?> collectionClass,
                                             Class<?>... elementClasses) {
        return objectMapper.getTypeFactory().constructParametricType(
                collectionClass, elementClasses);
    }
}
