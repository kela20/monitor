// package com.rayton.gps.util;// package com.rayton.gps.util;
// //
// //
// import com.fasterxml.jackson.core.JsonGenerator;
// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.JsonSerializer;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.SerializerProvider;
// import org.codehaus.jackson.map.ser.CustomSerializerFactory;
//
//
// import java.io.IOException;
// import java.text.SimpleDateFormat;
// import java.util.Date;
//
// public class WebObjectMapper extends ObjectMapper {
//
//     public WebObjectMapper() {
//         CustomSerializerFactory factory = new CustomSerializerFactory();
//         factory.addGenericMapping(java.util.Date.class, new JsonSerializer<Date>() {
//             @Override
//             public void serialize(java.util.Date value, JsonGenerator jsonGenerator, SerializerProvider provider)
//                     throws IOException, JsonProcessingException {
//                 if (value == null) {
//                     jsonGenerator.writeString("");
//                     return;
//                 }
//                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                 jsonGenerator.writeString(sdf.format(value));
//             }
//         });
//         factory.addGenericMapping(java.sql.Date.class, new JsonSerializer<java.sql.Date>() {
//
//             @Override
//             public void serialize(java.sql.Date value, JsonGenerator jsonGenerator, SerializerProvider provider)
//                     throws IOException, JsonProcessingException {
//                 if (value == null) {
//                     jsonGenerator.writeString("");
//                     return;
//                 }
//                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//                 jsonGenerator.writeString(sdf.format(value));
//             }
//
//         });
//         factory.addGenericMapping(java.sql.Timestamp.class, new JsonSerializer<java.sql.Timestamp>() {
//
//             @Override
//             public void serialize(java.sql.Timestamp value, JsonGenerator jsonGenerator, SerializerProvider provider)
//                     throws IOException, JsonProcessingException {
//                 if (value == null) {
//                     jsonGenerator.writeString("");
//                     return;
//                 }
//                 jsonGenerator.writeString(value.getTime() + "");
//             }
//         });
//         this.setSerializerFactory(factory);
//     }
// }
