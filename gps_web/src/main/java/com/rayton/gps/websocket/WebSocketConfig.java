package com.rayton.gps.websocket;


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