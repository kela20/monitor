//多车跟踪
// $(function () {
//     //（1屏）
//     // 创建地图实例
//
//     var splitmapa = new BMap.Map("ft_map");
//     splitmapa.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
//     //开启鼠标滚轮缩放
//     splitmapa.enableScrollWheelZoom(true);
//
//
//     // 1屏 左图
//     function ZoomControl0(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//         this.defaultOffset = new BMap.Size(10, 10);
//     }
//     // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl0.prototype = new BMap.Control();
//     // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl0.prototype.initialize = function(splitmapa){
//         var img0 = $("<img/>").attr("src","../static/dc_file/image/s_one.png").css("width","45px");
//         // 添加DOM元素到地图中
//         splitmapa.getContainer().appendChild(img0[0]);
//         // 将DOM元素返回
//         return img0[0];
//     }
//     // 创建控件
//     var myZoomCtrl0 = new ZoomControl0();
//     // 添加到地图当中
//     splitmapa.addControl(myZoomCtrl0);
//
//     // 1屏 右图
//     function ZoomControl1(){
//     // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
//         this.defaultOffset = new BMap.Size(20, 20);
//     }
//     // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl1.prototype = new BMap.Control();
//     // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl1.prototype.initialize = function(splitmapa){
//         var div0 = $("<div></div>").addClass("cut_sn");
//         //.css({ 'width': '25px','height': '25px','backgroundColor': '#028ad6','textAlign': 'center','paddingTop': '3px'})
//         var img1 = $("<img/>").attr("src","../static/dc_file/image/fangda-suoxiao-icon.png").css("width","20px");
//         div0.append(img1);
//         // 添加DOM元素到地图中
//         splitmapa.getContainer().appendChild(div0[0]);
//         // 将DOM元素返回
//         return div0[0];
//     }
//     // 创建控件
//     var myZoomCtrl1 = new ZoomControl1();
//     // 添加到地图当中
//     splitmapa.addControl(myZoomCtrl1);
//     window.splitmapa=splitmapa;
//
// })
//
// $(function () {
//     //(2屏）
//     // 创建地图实例
//     var splitmapb = new BMap.Map("sd_map");
//     splitmapb.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
//     //开启鼠标滚轮缩放
//     splitmapb.enableScrollWheelZoom(true);
//     // 2屏 左图
//     function ZoomControl3(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//         this.defaultOffset = new BMap.Size(10, 10);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl3.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl3.prototype.initialize = function(splitmapb){
//         var img3 = $("<img/>").attr("src","../static/dc_file/image/s_two.png");
//         img3.css("width","45px");
//         // 添加DOM元素到地图中
//         splitmapb.getContainer().appendChild(img3[0]);
//         // 将DOM元素返回
//         return img3[0];
//     }
// // 创建控件
//     var myZoomCtrl3 = new ZoomControl3();
// // 添加到地图当中
//     splitmapb.addControl(myZoomCtrl3);
//
// // 2屏 右图
//     function ZoomControl4(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
//         this.defaultOffset = new BMap.Size(20, 20);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl4.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl4.prototype.initialize = function(splitmapb){
//         var div1 = $("<div></div>").addClass("cut_sn");
//         //.css({ 'width': '25px','height': '25px','backgroundColor': '#028ad6','textAlign': 'center','paddingTop': '3px'})
//         var img4 = $("<img/>").attr("src","../static/dc_file/image/fangda-suoxiao-icon.png").css("width","20px");
//         div1.append(img4);
//         // 添加DOM元素到地图中
//         splitmapb.getContainer().appendChild(div1[0]);
//         // 将DOM元素返回
//         return div1[0];
//     }
// // 创建控件
//     var myZoomCtrl4 = new ZoomControl4();
// // 添加到地图当中
//     splitmapb.addControl(myZoomCtrl4);
//
//     window.splitmapb=splitmapb;
//
// })
//
// $(function () {
//     //(3屏）
//     // 创建地图实例
//     var splitmapc = new BMap.Map("td_map");
//     splitmapc.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
//     //开启鼠标滚轮缩放
//     splitmapc.enableScrollWheelZoom(true);
//     // 2屏 左图
//     function ZoomControl5(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//         this.defaultOffset = new BMap.Size(10, 10);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl5.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl5.prototype.initialize = function(splitmapc){
//         var img5 = $("<img/>").attr("src","../static/dc_file/image/s_three.png");
//         img5.css("width","45px");
//         // 添加DOM元素到地图中
//         splitmapc.getContainer().appendChild(img5[0]);
//         // 将DOM元素返回
//         return img5[0];
//     }
// // 创建控件
//     var myZoomCtrl5 = new ZoomControl5();
// // 添加到地图当中
//     splitmapc.addControl(myZoomCtrl5);
//
// // 3屏 右图
//     function ZoomControl6(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
//         this.defaultOffset = new BMap.Size(20, 20);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl6.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl6.prototype.initialize = function(splitmapc){
//         var div2 = $("<div></div>").addClass("cut_sn");
//         //.css({ 'width': '25px','height': '25px','backgroundColor': '#028ad6','textAlign': 'center','paddingTop': '3px'})
//         var img6 = $("<img/>").attr("src","../static/dc_file/image/fangda-suoxiao-icon.png").css("width","20px");
//         div2.append(img6);
//         // 添加DOM元素到地图中
//         splitmapc.getContainer().appendChild(div2[0]);
//         // 将DOM元素返回
//         return div2[0];
//     }
// // 创建控件
//     var myZoomCtrl6 = new ZoomControl6();
// // 添加到地图当中
//     splitmapc.addControl(myZoomCtrl6);
//     window.splitmapc=splitmapc;
//
// })

// $(function () {
//     //(4屏）
//     // 创建地图实例
//     var splitmapd = new BMap.Map("fh_map");
//     splitmapd.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
//     //开启鼠标滚轮缩放
//     splitmapd.enableScrollWheelZoom(true);
//     // 2屏 左图
//     function ZoomControl7(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//         this.defaultOffset = new BMap.Size(10, 10);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl7.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl7.prototype.initialize = function(splitmapd){
//         var img7 = $("<img/>").attr("src","../static/dc_file/image/s_four.png");
//         img7.css("width","45px");
//         // 添加DOM元素到地图中
//         splitmapd.getContainer().appendChild(img7[0]);
//         // 将DOM元素返回
//         return img7[0];
//     }
// // 创建控件
//     var myZoomCtrl7 = new ZoomControl7();
// // 添加到地图当中
//     splitmapd.addControl(myZoomCtrl7);
//
// // 3屏 右图
//     function ZoomControl8(){
//         // 默认停靠位置和偏移量
//         this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
//         this.defaultOffset = new BMap.Size(20, 20);
//     }
// // 通过JavaScript的prototype属性继承于BMap.Control
//     ZoomControl8.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//     ZoomControl8.prototype.initialize = function(splitmapd){
//         var div3 = $("<div></div>").addClass("cut_sn");
//         //.css({ 'width': '25px','height': '25px','backgroundColor': '#028ad6','textAlign': 'center','paddingTop': '3px'})
//         var img8 = $("<img/>").attr("src","../static/dc_file/image/fangda-suoxiao-icon.png").css("width","20px");
//         div3.append(img8);
//         // 添加DOM元素到地图中
//         splitmapd.getContainer().appendChild(div3[0]);
//         // 将DOM元素返回
//         return div3[0];
//     }
// // 创建控件
//     var myZoomCtrl8 = new ZoomControl8();
// // 添加到地图当中
//     splitmapd.addControl(myZoomCtrl8);
//     window.splitmapd=splitmapd;
//
//
// })

$(function () {
    $(".map-contents3>.s_map>.cut_sn").click(function () {
        var flag_0 = $(this).parent().siblings(".s_map").css("display") == "block";
        var flag_ = $(this).parent().siblings(".s_map").css("display") == "none";
        if (flag_0) {
            $(this).parent().css("width", "100%").css("height", "100%").siblings(".s_map").css("display", "none");
        } else if (flag_) {
            $(this).parent().css("width", "49.9%").css("height", "49.9%").siblings(".s_map").css("display", "block");
        }
    })
})


/**
 *
 */
window.locatedddddd = {

    /**
     * 地图
     */

    opts: undefined,
    /**
     * 服务器时间戳
     */
    serverTimestamp: null,
    /**
     * 网络连接
     */
    websocket: null,
    /**
     * 心跳时间
     */
    HeartbeatTime: new Date(),
    /**
     * 地图
     */
    webMap: undefined,
    /**
     * 信息窗口
     */
    infoWindow: undefined,
    /**
     * 显示车牌号
     */
    allowShowLabel: true,
    /**
     * 标注
     */
    markers: {}, // 标注
    /**
     * 组别与车辆总表
     */
    vehicles: null,

    /**
     * 所有未处理的报警记录
     */
    alarms: [],
    /**
     * 地图图层
     */
    mapLayers: null,
    /**
     * 设备列表
     */
    devices: {},
    /**
     * 设备点
     */
    devicespoint: [],
    /**
     * 未读消息
     */
    unread: {
        /**
         * 多媒体事件报告
         */
        multimediaEventReprot: [],
        /**
         * 事件报告
         */
        deviceEventReport: [],
        /**
         * 终端升级结果报告
         */
        deviceUpgradeResultReport: [],
        /*  /!**
           * 刷新数量提示
           *!/
          refresh: function () {
              var total = this.multimediaEventReprot.length;
              total += this.deviceEventReport.length;
              total += this.deviceUpgradeResultReport.length;

              $('#txtMessageTotal').text(total);
              if (total > 0)
                  $('#txtMessageTotal').show();
              else
                  $('#txtMessageTotal').hide();
          },*/
        /**
         * 读取未读多媒体事件报告
         */
        /*   readMultmediaEventReport: function (id) {
               function removeMultmediaEventReport(id) {
                   var index = -1;
                   for (var x = 0; x < locate.unread.multimediaEventReprot.length; x++) {
                       var item = locate.unread.multimediaEventReprot[x];
                       if (item.id == id) {
                           index = x;
                           break;
                       }
                   }
                   locate.unread.multimediaEventReprot.splice(index, 1);
                   locate.gridMultimediaEventReprot.reload({
                       rows: locate.unread.multimediaEventReprot
                   });
                   locate.unread.refresh();
               }

               $.post('../locate/readMultmediaEventReport', {
                   id: id
               }, function (r) {
                   if (r.code == 0) {
                       removeMultmediaEventReport(id);
                   } else
                       common.tip('error', r.error, 3);
               });
           },*/
        /**
         * 读取终端事件报告
         */
        /* readDeviceEventReport: function (id) {
             function removeDeviceEventReport(id) {
                 var index = -1;
                 for (var x = 0; x < locate.unread.deviceEventReport.length; x++) {
                     var item = locate.unread.deviceEventReport[x];
                     if (item.id == id) {
                         index = x;
                         break;
                     }
                 }
                 locate.unread.deviceEventReport.splice(index, 1);
                 locate.gridDeviceEventReport.reload({
                     rows: locate.unread.deviceEventReport
                 });
                 locate.unread.refresh();
             }

             $.post('../locate/readDeviceEventReport', {
                 id: id
             }, function (r) {
                 if (r.code == 0) {
                     removeDeviceEventReport(id);
                 } else
                     common.tip('error', r.error, 3);
             });
         },*/
        /* readDeviceUpgradeResultReport: function (id) {
             function removeDeviceUpgradeResultReport(id) {
                 var index = -1;
                 for (var x = 0; x < locate.unread.deviceUpgradeResultReport.length; x++) {
                     var item = locate.unread.deviceUpgradeResultReport[x];
                     if (item.id == id) {
                         index = x;
                         break;
                     }
                 }
                 locate.unread.deviceUpgradeResultReport.splice(index, 1);
                 locate.gridDeviceUpgradeResultReport.reload({
                     rows: locate.unread.deviceUpgradeResultReport
                 });
                 locate.unread.refresh();
             }

             $.post('../locate/readDeviceUpgradeResultReport', {
                 id: id
             }, function (r) {
                 if (r.code == 0) {
                     removeDeviceUpgradeResultReport(id);
                 } else
                     common.tip('error', r.error, 3);
             });
         },*/
        /**
         * 提取多媒体
         */
        /* pickupMultmedia: function (eventId, deviceNumber, mediaId) {
             $.post('../deviceData/pickupMultmedia', {
                 deviceNumber: deviceNumber,
                 mediaId: mediaId
             }, function (r) {
                 if (r.code == 0) {
                     common.tip('success', '指令已发送！', 3);
                     locate.unread.readMultmediaEventReport(eventId);
                 } else
                     common.tip('error', r.error, 3);
             });
         }*/
    },
    /**
     * 最后位置表格
     */
    gridLatests: undefined,
    /**
     * 组别与车辆树
     */
    groupVehicles: undefined,
    //在地图中显示位置？

    isInsidePolygon: function (pt, poly) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat))
            && (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) && (c = !c);
        return c;
    },
    showLocate: function (data) {
        //对数据data处理标注, 传过来的data lng和lat 加工处理成olng和olat

        var ss = window.mapG[map.name]

        function show(data) {
            if (ss.markers[data.dn]) {
                var marker = ss.markers[data.dn];
                marker.data = data;
                marker.refresh();
                marker.openInfoWindow();
                return;
            }

            var marker = webMap.createMarker({
                map: ss.webMap,
                data: data,
                infoWindow: ss.infoWindow,
                allowShowLabel: ss.allowShowLabel,
                allowRotate: data.rotate === 1
            });
            ss.markers[data.dn] = marker;
            marker.openInfoWindow();
        }

        if (!data.olng || !data.olat) {
            ss.webMap.convertor(data.lng, data.lat, function (point, row) {
                row.olng = point.lng;
                row.olat = point.lat;
                show(row);
            }, data);
        } else
            show(data);
    },
    onMapLoaded: function (map) {
        
        var ss = window.mapG[map.name]
        // alert(JSON.stringify(ss))
        ss.webMap = map;
        //query(false);
        /*  $.get('../mapOption/query', function (r) {
              if (!r.lng)
                  return;
              locate.webMap.convertor(r.lng, r.lat, function (center) {
                  locate.webMap.setCenter(center);
                  locate.webMap.setZoom(r.zoom);
              });
          });*/
        //第一次为false

        query(false, true);
        textscresh();
        quertyicon();
        // var iconinfo = "<div class= 'iconinfo'><a><img  src='static/image/pointimage/weixian.png'/></a><a><img  src='static/image/pointimage/yuyin.png'/></a><a><img  src='static/image/pointimage/weixintubiao.png'/></a> </div>"
        // var iconinfo2 = "<div class= 'iconinfo mapright'><a><img  src='static/image/pointimage/mapreserved.png'/></a><a><img  src='static/image/pointimage/mapfence.png'/></a><a><img  src='static/image/pointimage/mapcar.png'/></a> </div>"
        // var countdown = "<div class='countdown'><div style='display: inline-block'>还剩<span id='countdowntime'>1</span>s刷新</div></div><div class='choosetime' ><select id='status' onchange='choosetime()'><option value='20'>20</option><option value='30'>30</option><option value='60'>60</option></select></div>"
        // $("#box_map").append(iconinfo);
        // $("#box_map").append(iconinfo2);
        // $("#box_map").append(countdown);
        ss.infoWindow = webMap.createInfoWindow({
            map: ss.webMap,
            data: undefined,
            width: 260,
            allowQueryAddress: true,
            makeTitle: function () {
                if (!this.data)
                    return '';

                var html = [];
                html.push('<div style="margin:0px;padding:0px">');
                // 第一行
                html.push('<div style="height:18px;margin:2px;">');

                html.push('<b>');
                html.push(this.data.na);
                html.push(this.data.sp > 0 ? '[行驶]' : '[静止]');
                html.push('</b>');

                html.push('<div style="margin-left:15px;display:inline-block;">');
                html.push('<div class="mon-icon-h-x16 i-16-satellite"></div>')
                html.push('<span>(' + this.data.sat + ')</span>');
                html.push('<div class="mon-icon-h-x16 i-16-signal' + gpsDataParser.parseNet(this.data) + '"></div>');
                html.push('</div>');

                html.push('</div>');

                return html.join('');
            },
            makeContent: function () {
                var alarm = gpsDataParser.parseAlarm(this.data);
                var html = [];
                html.push('<hr/><div style="margin:0px;padding:0px">');
                // 第一行
                html.push('<div class="display-label">');
                html.push('<b>时间:</b>');
                if (this.data.gt)
                    html.push(this.data.gt.toDate().toDateTimeString('MM-dd hh:mm:ss'));
                else
                    html.push("00-00 00:00:00");
                html.push('[定位],');
                if (this.data.st)
                    html.push(this.data.st.toDate().toDateTimeString('MM-dd hh:mm:ss'));
                else
                    html.push("00:00:00");
                html.push('[接收]');
                html.push("</div>");

                // 第二行
                html.push('<div class="display-label">');
                html.push('<b>定位:</b>');
                html.push(gpsDataParser.parseLocateType(this.data));
                html.push('[' + gpsDataParser.parseDirection(this.data) + ']');
                html.push('&nbsp;&nbsp;<b>状态:</b>');
                html.push(gpsDataParser.parseAcc(this.data));
                html.push('</div>');

                // 第三行
                html.push('<div class="display-label">');
                html.push('<b>里程:</b>');
                html.push(common.round(this.data.m, 3) + 'km');
                html.push('&nbsp;&nbsp;<b>速度:</b>');
                html.push(common.round(this.data.sp, 1) + 'km/h');
                html.push('</div>');

                // 第四行
                if (alarm.length > 0) {
                    html.push('<div class="display-label">');
                    html.push('<b>报警:</b>');
                    html.push('<span style="color:red;">');
                    html.push(alarm);
                    html.push('</span>');
                    html.push('</div>');
                }

                // 第五行
                html.push('<div style="margin:2px;">');
                html.push('<b>位置:</b>');
                html.push(this.data.addr);
                html.push('</div>');

                // 第六行
                var text = '跟踪';
                if (ss.track.deviceNumber === this.data.dn)
                    text = '停止';
                html.push('<div>');
                html.push('<a href="javascript:locate.track.start(\'' + this.data.dn
                    + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-track"></div><div id="btnTrack">' + text
                    + '</div></div></a>');

                if ($('#replay_auth').val() == 'true') {
                    html.push('<a href="javascript:locate.replay(\'' + this.data.dn
                        + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-replay"></div><div>回放</div></div></a>');
                }
                if ($('#alarm_auth').val() == 'true') {
                    html.push('<a href="javascript:locate.queryAlarm(\'' + this.data.dn
                        + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-alarm"></div><div>报警</div></div></a>');
                }
                if ($('#vehileinfo_auth').val() == 'true') {
                    html.push('<a href="javascript:locate.vehiceInfo(\'' + this.data.id
                        + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-info"></div><div>资料</div></div></a>');
                }
                if ($('#instruct_auth').val() == 'true') {
                    html.push('<a href="javascript:locate.sendInstruct(\'' + this.data.dn
                        + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-instruct"></div><div>指令</div></div></a>');
                }
                if ($('#deviceData_auth').val() == 'true') {
                    html.push('<a href="javascript:locate.queryData(\'' + this.data.dn
                        + '\');"><div class="mon-button"><div class="mon-icon-v-x24 i-24-querydata"></div><div>数据</div></div></a>');
                    html.push('</div>');
                }

                return html.join("");

            }
        });
        //Drag_the("panelqucar");
        //Drag_thes("Locationservice");
        // Drag_thes();
        // Drag_the();
        window.common = {
            debug: function (obj) {
                obj.toString();
            },
            guid: function () {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16);
                    guid += n;
                    if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                        guid += "-";
                }
                return guid;
            },
            bitsToNumber: function (bits) {
                /**
                 * 将;分隔的开关位合成32位整数
                 */
                if (!bits)
                    return 0;
                var flag = 0;
                var list = bits.split(';');
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var bit = parseInt(item);
                    flag = flag | (1 << bit);
                }

                return flag;
            },
            /**
             * 将32位整数按位以;分隔组成字符串
             */
            numberToBits: function (number) {

                var bits = [];
                for (var i = 0; i < 32; i++) {
                    if ((number >>> i & 0x01) == 0x01)
                        bits.push(i);
                }

                return bits.join(';');
            },
            /**
             * 取几位小数点
             */
            round: function (number, decimal) {
                return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
            },
            /**
             * 将毫秒数转成时段
             */
            timespan: function (milliseconds) {
                var days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);
                var hours = Math.floor((milliseconds - days * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
                var minutes = Math.floor((milliseconds - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / 1000 / 60);
                var seconds = Math.floor((milliseconds - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
                var timespans = [];
                if (days > 0)
                    timespans.push(days + "天");
                if (hours > 0)
                    timespans.push(hours + "小时");
                if (minutes > 0)
                    timespans.push(minutes + "分");
                if (seconds > 0)
                    timespans.push(seconds + "秒");

                return timespans.join(':');
            },
            /**
             * 显示提示窗口
             *
             * @param type
             *            类型：warn、success、error、question
             * @param content
             *            内容
             * @param seconds
             *            停留秒数
             */
            tip: function (type, content, seconds) {
                alert("此区域无车辆");
                /*tip = $.ligerDialog.tip({
                    type: type,
                    content: content
                });*/
                /*    setTimeout(function () {
                        tip.close();
                    }, seconds * 1000);*/
            },
            form: {
                check: function (op) {
                    if ($('#' + op.formName).length <= 0)
                        return false;
                    var v = $('#' + op.formName).validate(op.rules);
                    var result = v.checkForm();
                    v.showErrors();
                    return result;
                },
                update: function (op) {
                    $('#' + op.div).empty();
                    $('#' + op.div).html(op.html);
                    if (op.formName)
                        this.check(op);
                    if (op.onloaded) {
                        op.onloaded();
                    }
                },
                save: function (dialog, data, op) {
                    var tip = undefined;
                    var result = false;
                    var type = typeof (data);
                    if (type == 'string') {
                        if (typeof data == 'string') {
                            dialog.frame.document.write(data);
                            dialog.frame.document.close()
                        }
                    } else if (data.code > 0) {
                        tip = $.ligerDialog.tip({
                            type: 'error',
                            content: data.error
                        });
                    } else {
                        tip = $.ligerDialog.tip({
                            type: 'success',
                            content: '数据保存成功!'
                        });
                        dialog.close();
                        result = true;
                    }
                    if (tip)
                        setTimeout(function () {
                            tip.close();
                        }, 3000);

                    return result;
                },
                remove: function (data) {
                    var tip = undefined;
                    var result = false;
                    if (data.code > 0) {
                        tip = $.ligerDialog.tip({
                            type: 'error',
                            content: data.error
                        });
                    } else {
                        tip = $.ligerDialog.tip({
                            type: 'success',
                            content: '数据删除成功!'
                        });
                        result = true;
                    }
                    if (tip)
                        setTimeout(function () {
                            tip.close();
                        }, 3000);

                    return result;
                }
            },
            checkData: function (data, error, success) {
                var tip = undefined;
                var result = false;
                if (data.code > 0 && error) {
                    tip = $.ligerDialog.tip({
                        type: 'error',
                        content: data.error
                    });
                } else {
                    if (success)
                        tip = $.ligerDialog.tip({
                            type: 'success',
                            content: success
                        });
                    result = true;
                }
                if (tip)
                    setTimeout(function () {
                        tip.close();
                    }, 3000);

                return result;
            },
            showDialog: function (op) {
                // 添加html的Div
                var divId = common.guid();
                op.div = divId;
                var $divId = '#' + divId;
                var div = '<div id="' + divId + '"></div>';
                $('#dialogs').append($(div));
                // 更新div的内容
                // $($divId).html(o.html);
                op.target = $('#' + divId);

                var dialog = $.ligerDialog.open(op);
                this.form.update(op);

                return dialog;
            },
            setCookie: function (name, value) {
                document.cookie = name + "=" + escape(value);
            },
            // 读取cookie
            getCookie: function (name) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null)
                    return unescape(arr[2]);
                return null;

            },
            // 删除cookie
            delCookie: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = readCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        };
    },
//转换刚加载数据
    fromdevices: function (data) {
        var datastart = new Object();
        datastart.a = data.a;
        datastart.ad0 = data.ad0;
        datastart.ad1 = data.ad1;
        datastart.aid = data.aid;
        datastart.alt = data.alt;
        datastart.d = data.d;
        datastart.dn = data.dn;
        datastart.exs = data.exs;
        datastart.gt = data.gt;
        datastart.icon = data.icon;
        datastart.id = data.id;
        datastart.iid = data.iid;
        datastart.iof = data.iof;
        datastart.ios = data.ios;
        datastart.iot = data.iot;
        datastart.lat = data.lat;
        datastart.lng = data.lng;
        datastart.m = data.m;
        datastart.marker = data.marker;
        datastart.na = data.na;
        datastart.net = data.net;
        datastart.o = data.o;
        datastart.oid = data.oid;
        datastart.oil = data.oil;
        datastart.ovt = data.ovt;
        datastart.pId = data.pid;
        datastart.rf = data.rf;
        datastart.rid = data.rid;
        datastart.rotate = data.rotate;
        datastart.rt = data.rt;
        datastart.s = data.s;
        datastart.sat = data.sat;
        datastart.sp = data.sp;
        datastart.st = data.st;
        datastart.type = data.type;
        datastart.val = data.val;
        datastart.vss = data.vss;

        return datastart;

    },
    drawMapLayers: function () {

        var ss = window.mapG[map.name]
        // 清除地图图层
        if (ss.mapLayers) {
            for (var id in ss.mapLayers) {
                var layer = ss.mapLayers[id];
                for (var x = 0; x < layer.length; x++) {
                    var overlay = layer[x];
                    ss.webMap.removeOverlay(overlay);
                    overlay.label && ss.webMap.removeOverlay(overlay.label);
                }
            }
        }
        // 重新加载
        ss.mapLayers = {};
        $.get({
            filter: ''
        }, function (page) {
            for (var index = 0; index < page.rows.length; index++) {
                var mapLayerInfo = page.rows[index];
                if (mapLayerInfo.visible == false)
                    continue;
                ss.mapLayers[mapLayerInfo.id] = [];
                // 画圆
                var circles = mapLayerInfo.circleAreas;
                if (circles) {
                    for (var x = 0; x < circles.length; x++) {
                        var circle = circles[x];
                        ss.webMap.convertor(circle.lng, circle.lat, function (p, ctx) {
                            var overlay = ss.webMap.drawingCircle(p, ctx.area.radius, ctx.area.name);
                            ss.mapLayers[ctx.info.id].push(overlay);
                        }, {
                            area: circle,
                            info: mapLayerInfo
                        });
                    }
                }
                // 画矩形
                var rectangles = mapLayerInfo.rectangleAreas;
                if (rectangles) {
                    for (var x = 0; x < rectangles.length; x++) {
                        var rectangle = rectangles[x];
                        var points = [{
                            lng: rectangle.ullng,
                            lat: rectangle.ullat
                        }, {
                            lng: rectangle.brlng,
                            lat: rectangle.ullat
                        }, {
                            lng: rectangle.brlng,
                            lat: rectangle.brlat
                        }, {
                            lng: rectangle.ullng,
                            lat: rectangle.brlat
                        }];
                        ss.webMap.translate(points, 0, function (list, ctx) {
                            var wn = {
                                lng: list[0].olng,
                                lat: list[0].olat
                            };
                            var ne = {
                                lng: list[1].olng,
                                lat: list[1].olat
                            };
                            var ew = {
                                lng: list[2].olng,
                                lat: list[2].olat
                            };
                            var sw = {
                                lng: list[3].olng,
                                lat: list[3].olat
                            };
                            var path = [];
                            path.push(wn);
                            path.push(ne);
                            path.push(ew);
                            path.push(sw);

                            var overlay = ss.webMap.drawPolygon(path, ctx.area.name);
                            ss.mapLayers[ctx.info.id].push(overlay);
                        }, {
                            area: rectangle,
                            info: mapLayerInfo
                        });
                    }
                }
                // 画多边形
                var polygons = mapLayerInfo.polygonAreas;
                if (polygons) {
                    for (var x = 0; x < polygons.length; x++) {
                        var polygon = polygons[x];
                        ss.webMap.translate(polygon.points, 0, function (list, ctx) {
                            var path = [];
                            for (var y = 0; y < list.length; y++) {
                                var p = list[y];
                                path.push({
                                    lat: p.olat,
                                    lng: p.olng
                                });
                            }
                            var overlay = ss.webMap.drawPolygon(path, ctx.area.name);
                            ss.mapLayers[ctx.info.id].push(overlay);
                        }, {
                            area: polygon,
                            info: mapLayerInfo
                        });
                    }
                }
                // 画路线
                var routes = mapLayerInfo.routeAreas;
                if (routes) {
                    for (var x = 0; x < routes.length; x++) {
                        var route = routes[x];
                        for (var y = 0; y < route.sections.length; y++) {
                            var section = route.sections[y];
                            ss.webMap.translate(section.points, 0, function (list, ctx) {
                                var path = [];
                                for (var x = 0; x < list.length; x++) {
                                    var item = list[x];
                                    path.push({
                                        lng: item.olng,
                                        lat: item.olat
                                    });
                                }
                                var overlay = ss.webMap.drawPolyline(path);
                                ss.mapLayers[ctx.info.id].push(overlay);
                            }, {
                                info: mapLayerInfo
                            });
                        }
                    }
                }
                // 画兴趣点
                var pois = mapLayerInfo.pois;
                if (pois) {
                    for (var x = 0; x < pois.length; x++) {
                        var row = pois[x];
                        ss.webMap.convertor(row.lng, row.lat, function (point, ctx) {
                            var overlay = ss.webMap.drawPoi(point, ctx.area.name);
                            ss.mapLayers[ctx.info.id].push(overlay);
                        }, {
                            area: row,
                            info: mapLayerInfo
                        });
                    }
                }
            }
        });
    },
    //onSelectRow请求,但是事实上不是这个,他们连接的桥梁
    drawingOpen: function (callback) {
        if (!this.drawingManager) {
            var styleOptions = {
                strokeColor: "blue", // 边线颜色。
                // fillColor : "red", // 填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 2, // 边线的宽度，以像素为单位。
                strokeOpacity: 0.6, // 边线透明度，取值范围0 - 1。
                fillOpacity: 0.2, // 填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' // 边线的样式，solid或dashed。
            }
            // 实例化鼠标绘制工具
            this.drawingManager = new BMapLib.DrawingManager(this.mapObject, {
                isOpen: false, // 是否开启绘制模式
                enableDrawingTool: false, // 是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
                    offset: new BMap.Size(10, 40), // 偏离值
                    drawingModes: [BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE]
                },
                circleOptions: styleOptions, // 圆的样式
                polylineOptions: styleOptions, // 线的样式
                polygonOptions: styleOptions, // 多边形的样式
                rectangleOptions: styleOptions
                // 矩形的样式
            });
            // 添加鼠标绘制工具监听事件，用于获取绘制结果
            this.drawingManager.addEventListener('overlaycomplete', callback);
        }
        this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        this.drawingManager.open();
    },
    overlayComplete: function (e) {

        var ss = window.mapG[map.name]
        ss.webMap.removeOverlay(e.overlay);
        ss.webMap.drawingClose();
        insides = [];

        for (var attr in ss.devicespoint) {
            var device = ss.devicespoint[attr];
            var pt = {
                lng: device.lng,
                lat: device.lat
            };
            if (ss.isInsidePolygon(pt, e.overlay.getPath())) {
                insides.push(device);
                //  console.log(insides);

            }
        }
        if (insides.length > 0) {
            // $("#finishingTask").bootstrapTable('destroy');
            finishingTaskonlinedata = [];
            finishingTaskofflinedata = [];
            $("#finishingTask").bootstrapTable("load", insides);
            for (var i = 0; i < insides.length; i++) {
                if (insides[i].o == 1) {
                    finishingTaskonlinedata.push(insides[i]);

                } else {
                    finishingTaskofflinedata.push(insides[i]);
                }
            }


            finishingTaskofflinedata.length > 0 ? $("#finishingTaskoffline").bootstrapTable("load", finishingTaskofflinedata) : "";
            finishingTaskonlinedata.length > 0 ? $("#finishingTaskonline").bootstrapTable("load", finishingTaskonlinedata) : "";

            //  locate.devicespoint=[];
            /*   $("#datatbody tr").updatecolor(insides,function (index,o,target) {
              /!*     console.log(target);
                   console.log(index);
                   console.log(o);*!/
               });*/
            $("#panelqucar").show(500);
        }
        if (insides.length <= 0) {
            common.tip('info', '此区域无车辆！', 3);
            return;
        }
        /*  locate.loadLatests({
              rows : insides
          });*/
    },
    /**
     * 关闭手绘面板
     */
    drawingClose: function (callback) {
        if (!this.drawingManager) {
            return;
        }
        this.drawingManager.close();
    },
}



