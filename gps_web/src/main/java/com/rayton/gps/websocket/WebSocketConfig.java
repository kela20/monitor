package com.rayton.gps.websocket;


// 如果用了@EnableWebMvc,那sping boot默认关于webmvc的配置都会失效，你需要自己去配置每一项
// @Configuration
// @EnableWebMvc
// @EnableWebSocket
// public class WebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {
//     @Override
//     public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//         registry.addHandler(systemWebSocketHandler(), "/webSocketServer").addInterceptors(new
//                 WebSocketHandshakeInterceptor());
//
//         registry.addHandler(systemWebSocketHandler(), "/sockjs/webSocketServer").addInterceptors(new
//                 WebSocketHandshakeInterceptor()).withSockJS();
//     }
//
//     @Bean
//     public WebSocketHandler systemWebSocketHandler() {
//         return new SystemWebSocketHandler();
//     }
//
// }