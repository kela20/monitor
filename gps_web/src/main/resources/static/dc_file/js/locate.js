/**
 *
 */
window.locate = {

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
        function show(data) {
            if (locate.markers[data.dn]) {
                var marker = locate.markers[data.dn];
                marker.data = data;
                marker.refresh();
                marker.openInfoWindow();
                return;
            }

            var marker = webMap.createMarker({
                map: locate.webMap,
                data: data,
                infoWindow: locate.infoWindow,
                allowShowLabel: locate.allowShowLabel,
                allowRotate: data.rotate === 1
            });
            locate.markers[data.dn] = marker;
            marker.openInfoWindow();
        }

        if (!data.olng || !data.olat) {
            locate.webMap.convertor(data.lng, data.lat, function (point, row) {
                row.olng = point.lng;
                row.olat = point.lat;
                show(row);
            }, data);
        } else
            show(data);
    },
    onMapLoaded: function (map) {
        locate.webMap = map;
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        locate.webMap.addControl(navigationControl);
        query(false);
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
        var iconinfo = "<div class= 'iconinfo'><a><img  src='static/image/pointimage/weixian.png'/></a><a><img  src='static/image/pointimage/yuyin.png'/></a><a><img  src='static/image/pointimage/weixintubiao.png'/></a> </div>"
        var iconinfo2 = "<div class= 'iconinfo mapright'><a><img  src='static/image/pointimage/mapreserved.png'/></a><a><img  src='static/image/pointimage/mapfence.png'/></a><a><img  src='static/image/pointimage/mapcar.png'/></a> </div>"
        var countdown = "<div class='countdown'><div style='display: inline-block'><span id='countdowntime'>1</span>s刷新</div></div><div class='choosetime' ><select id='status' onchange='choosetime()'><option value='60'>60</option><option value='30'>30</option><option value='20'>20</option></select></div>"
        $("#box_map").append(iconinfo);
        $("#box_map").append(iconinfo2);
        $("#box_map").append(countdown);
        locate.infoWindow = webMap.createInfoWindow({
            map: locate.webMap,
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
                if (locate.track.deviceNumber === this.data.dn)
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

        Drag_thes();
        //Drag_the();

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
        datastart.m = Math.round(data.m);
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
        // 清除地图图层
        if (locate.mapLayers) {
            for (var id in locate.mapLayers) {
                var layer = locate.mapLayers[id];
                for (var x = 0; x < layer.length; x++) {
                    var overlay = layer[x];
                    locate.webMap.removeOverlay(overlay);
                    overlay.label && locate.webMap.removeOverlay(overlay.label);
                }
            }
        }
        // 重新加载
        locate.mapLayers = {};
        $.get({
            filter: ''
        }, function (page) {
            for (var index = 0; index < page.rows.length; index++) {
                var mapLayerInfo = page.rows[index];
                if (mapLayerInfo.visible == false)
                    continue;
                locate.mapLayers[mapLayerInfo.id] = [];
                // 画圆
                var circles = mapLayerInfo.circleAreas;
                if (circles) {
                    for (var x = 0; x < circles.length; x++) {
                        var circle = circles[x];
                        locate.webMap.convertor(circle.lng, circle.lat, function (p, ctx) {
                            var overlay = locate.webMap.drawingCircle(p, ctx.area.radius, ctx.area.name);
                            locate.mapLayers[ctx.info.id].push(overlay);
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
                        locate.webMap.translate(points, 0, function (list, ctx) {
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

                            var overlay = locate.webMap.drawPolygon(path, ctx.area.name);
                            locate.mapLayers[ctx.info.id].push(overlay);
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
                        locate.webMap.translate(polygon.points, 0, function (list, ctx) {
                            var path = [];
                            for (var y = 0; y < list.length; y++) {
                                var p = list[y];
                                path.push({
                                    lat: p.olat,
                                    lng: p.olng
                                });
                            }
                            var overlay = locate.webMap.drawPolygon(path, ctx.area.name);
                            locate.mapLayers[ctx.info.id].push(overlay);
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
                            locate.webMap.translate(section.points, 0, function (list, ctx) {
                                var path = [];
                                for (var x = 0; x < list.length; x++) {
                                    var item = list[x];
                                    path.push({
                                        lng: item.olng,
                                        lat: item.olat
                                    });
                                }
                                var overlay = locate.webMap.drawPolyline(path);
                                locate.mapLayers[ctx.info.id].push(overlay);
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
                        locate.webMap.convertor(row.lng, row.lat, function (point, ctx) {
                            var overlay = locate.webMap.drawPoi(point, ctx.area.name);
                            locate.mapLayers[ctx.info.id].push(overlay);
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

        locate.webMap.removeOverlay(e.overlay);
        locate.webMap.drawingClose();
        insides = [];

        for (var attr in locate.devicespoint) {
            var device = locate.devicespoint[attr];
            var pt = {
                lng: device.lng,
                lat: device.lat
            };
            if (locate.isInsidePolygon(pt, e.overlay.getPath())) {
                insides.push(fromdevices(device));
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
                    finishingTaskonlinedata.push(fromdevices(insides[i]));

                } else {
                    finishingTaskofflinedata.push(fromdevices(insides[i]));
                }
            }


            finishingTaskofflinedata.length > 0 ? $("#finishingTaskoffline").bootstrapTable("load", finishingTaskofflinedata) : "";
            finishingTaskonlinedata.length > 0 ? $("#finishingTaskonline").bootstrapTable("load", finishingTaskonlinedata) : "";

            //  locate.devicespoint=[];        //放入数据     返回什么
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

/*设置树的属性*/
var alldevices = {};//根据id查询数据类型是0
var alldevicespidandlocatName = [];//地址
var fleets = {};//pid的存储
var treeids = [];//定义关注的存储id
var Timerefreshid = [];//存储id定时刷新
var onlinedevices = [];//在线
var offlinedevices = [];//离线
var listdata = [];//匹配闪烁点
var listdataflashing = [];// 存储变动过的数据
var adddatalist = [];//添加数据列表
var addNamelist = [];//添加名称
var form, table, layer, laypage, upload, bitopen = true;//layer的属性
var count = 0;//数据的总数
var suncount = 0;//每次加载子id的总数
var treecount = 0;//节点总数
var datasour = [];//数据源
var overlays = [];//存储测距的数据
var clickFlag = null;//是否点击标识（定时器编号）
var Serialnumber = 0; //编号
var Clickidstorage = [];
var insides = []; //查到全部的
var finishingTaskonlinedata = []; //在线表格
var finishingTaskofflinedata = [];//离线表格
var timerresetTime = null;
var queryicondata = [];//初始化标注
var isopenbyid = [];//存储双击后的id
var refreshmapid = [];//w刷新后的id吧,暂时没有用
var directionid = [];//双击后存储上一次的id
var Accessbn;//保存上次点击的
var speed_limit = 100;
var setting = {
    view: {
        showLine: true,
        showIcon: true,
        // addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    check: {
        enable: true,
        chkStyle: "checkbox"
    },
    callback: {
        beforeClick: beforeClick,
        onCheck: zTreeOnCheck,
        beforeDblClick: beforeDblClick,
        onRightClick: zTreeOnRightClick,
    },


};
var setting2 = {
    view: {
        showLine: false,
        showIcon: true,
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: 0
        }
    },
};
var listpoint = [];
$(function () {
    layui.use(['form', 'table', 'layer', 'laypage', 'upload'], function () {
        form = layui.form;
        table = layui.table;
        layer = layui.layer;
        laypage = layui.laypage;
        upload = layui.upload;
    });
    // quertyicon();
    maplistdata();
    //启动计时器
    // timer();
    resetTime(61);
    // timedCount(20);
    // queryguiji();
});

/**
 * 自定义DOM节点
 */
function addDiyDom(treeId, treeNode) {
    var li_head;
    if (treeNode.pId == null) {
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var spanObj = $("#" + treeNode.tId + "_span");
        var editStr = '';
        li_head = '<span style="width: 100%;background: #59B9C7;position: absolute;height: 3px;margin-top: 16px;left:0px"></span>';
        li_head0 = '<span style="width: 100%;background: #59B9C7;position: absolute;height: 3px;margin-top: 16px;left:-29px;top:-3px"></span>';
        aObj.before(li_head);
        $("a[title='子公司']").append(li_head0);
    }
    treeNode.level == 0 ? Serialnumber = 0 : "";
    if (treeNode.level == 1) {
    }
    if (treeNode.pId != null && treeNode.type == 0) {
        Serialnumber = Serialnumber + 1;
        // i++;
        var imgage = "";
        var stylecolor = "";
        var runstaust = "";
        if (treeNode.o == 0) {
            //imgage ="<img src='/image/lixiandian.png'/>";
            stylecolor = "style= 'color:#a4a4a4'"
            runstaust = "离线";
        } else {
            //  imgage ="<img src='/image/zaixian.png'/>";
            stylecolor = "style= 'color:#2ac42a'";
            runstaust = "在线";
            if (treeNode.sp > 0) {
                stylecolor = "style= 'color:#4fa8f8'"
                runstaust = "行驶";
                if (treeNode.sp >= speed_limit) {
                    stylecolor = "style= 'color:fa6561'"
                    runstaust = "报警";
                }
            }
        }
        var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId);
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var spanObj = $("#" + treeNode.tId + "_span");
        aObj.attr('title', '');
        // aObj.append('<div class="diy"></div>');
        //  var div = $(liObj).find('div').eq(0);
        switchObj.remove();
        spanObj.remove();
        // icoObj.remove();
        // div.append(switchObj);
        // div.append(spanObj);
        //var spaceStr = "<span>";
        // switchObj.before(spaceStr);
        var editStr = '';
        editStr += '<div  style="display: none;" id="' + treeNode.id + '"></div>';
        editStr += '<div class="diy widthmin">' + intonumber(Serialnumber) + '</div>';
        editStr += '<div class="diy divnema"' + stylecolor + '>' + treeNode.na + '</div>';
        //js: Math.ceil(7/2)
        editStr += '<div class="diy">' + treeNode.sp + '</div>';
        editStr += '<div class="diy mileage">' + (treeNode.m == null ? '&nbsp;' : treeNode.m) + '</div>';
        editStr += '<div class="diy">' + runstaust + '</div>';
        aObj.append(editStr);
    }
}

//
// function addDiyDoms(treeId, treeNode) {
//
//     var spaceWidth = 15;
//     var liObj = $("#" + treeNode.tId);
//     var aObj = $("#" + treeNode.tId + "_a");
//     var switchObj = $("#" + treeNode.tId + "_switch");
//     var spanObj = $("#" + treeNode.tId + "_span");
//     aObj.attr('title', '');
//     //  aObj.append('<div class="diy"></div>');
//     var div = $(liObj).find('div').eq(0);
//     switchObj.remove();
//     spanObj.remove();
//     // icoObj.remove();
//     // div.append(switchObj);
//     // div.append(spanObj);
//     var spaceStr = "<span>";
//     // switchObj.before(spaceStr);
//     var editStr = '';
//     editStr += '<div class="diy">' + treeNode.name + '</div>';
//     aObj.append(editStr);
// }

//转成00编号
function intonumber(varlue) {
    var newnumberbyte = varlue / 100;
    var newnumber = newnumberbyte.toString().split(".");
    //  console.log(newnumber)
    var infonew = newnumber[0] + newnumber[1];
    return infonew;
}

/**
 * 查询数据
 */
function Treedata(str) {
    var json = [];
    var isfleet = {};
    for (devices in alldevices) {
        var property = devices;
        var item = alldevices[devices];
        // item =falsedata();
        if (item.na.indexOf(str) != -1) {
            json.push(fromdevices(item));
            if (isfleet[item.pid] === undefined) {
                var fleet = fleets[item.pid];
                isfleet[item.pid] = fleet;
                json.push(fromfleet(fleet));
            }
        }
    }
    $("#dataTree").empty();
    //初始化树
    $.fn.zTree.init($("#dataTree"), setting, json);
    //添加表头
    var li_head = '<span style="width: 100%;background: #c9c9c9"></span>';

    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
        //  rows.eq(0).before(li_head);
    } else {
        //  $("#dataTree").append(li_head);
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
}

/*加载树数据
*初始化
* */
function query(isforce, torefresh) {
    var alllist = [];
    var onlinelist = [];
    var offlinelist = [];
    var counlist = [];
    var list = [];
    $.ajax({
        url: "/locate/groupVehicles", //请求地址
        dataType: "json", //数据格式
        data: {
            force: isforce
        },
        type: "post", //请求方式
        async: false, //是否异步请求
        success: function (data) { //如何发送成功
            var atad = data;
            var com = [];
            var carg = [];
            var na = [];

            function fuckCom(atad, id, on, off) {
                jQuery.each(atad, function (index, shit) {
                    if (shit.pid === id) {

                        if (shit.type === 0 && shit.o === 1) {
                            on.push(shit)
                        }
                        else if (shit.type === 0 && shit.o !== 1) {
                            off.push(shit)
                        }
                        fuckCom(atad, shit.id, on, off);

                    }
                });
            }

            function fuckCarg(atad, id, on, off) {
                jQuery.each(atad, function (index, shit) {
                    if (shit.pid === id) {

                        if (shit.type === 0 && shit.o === 1) {
                            on.push(shit)
                        }
                        else if (shit.type === 0 && shit.o !== 1) {
                            off.push(shit)
                        }
                        fuckCarg(atad, shit.id, on, off);

                    }
                });
            }

            jQuery.each(atad, function (index, shit) {
                // console.log(shit);
                if (shit.type === 2) {
                    shit.onon = [];
                    shit.offoff = [];
                    // var a = {
                    //     com: shit,
                    //     onon: [],
                    //     offoff: [],
                    // };

                    fuckCom(atad, shit.id, shit.onon, shit.offoff)


                }
                else if (shit.type === 1) {
                    // var b = {
                    //     car: shit,
                    //     onon: [],
                    //     offoff: [],
                    // };
                    shit.onon = [];
                    shit.offoff = [];
                    fuckCarg(atad, shit.id, shit.onon, shit.offoff)
                }
                //
                // else {
                //     na.push(shit)
                // }

            });

            console.clear();
            console.warn(atad)

            // + "(" + item.on.length + "/" + item.on.length + item.off.length + ")"
            function removeCG(arr) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].type === 1) {
                        arr.splice(i, 1);
                    }
                }
                return arr;
            }

            function removeC(arr) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].type === 0) {
                        arr.splice(i, 1);
                    }
                }
                return arr;
            }

            function removeCom(arr) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].type === 2 && arr[i].pid !== null) {
                        arr.splice(i, 1);
                    }
                }
                return arr;
            }


            function removeWTF(arr) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].type === 2 && arr[i].pid == null) {
                        arr.splice(i, 1);
                    }
                }
                return arr;
            }


            if (window.showArr.indexOf("showCom") === -1) {

                function fff(atad, it) {
                    jQuery.each(atad, function (index, shit) {
                        if (shit.type === 2 && shit.pid !== null) {
                            if (it.pid === shit.id) {
                                it.pid = shit.pid;
                                fff(atad, it);
                            }
                        }
                    });
                }

                jQuery.each(atad, function (index, it) {
                    if (it.type === 1) {
                        fff(atad, it);
                    }
                });

                removeCom(atad);

            }
            if (window.showArr.indexOf("showCarG") === -1) {
                jQuery.each(atad, function (index, it) {
                    if (it.type === 0) {
                        jQuery.each(atad, function (index, shit) {
                            if (shit.type === 1) {
                                if (it.pid === shit.id

                                ) {
                                    it.pid = shit.pid;
                                }
                            }
                        });
                    }
                });

                removeCG(atad);

            }
            if (window.showArr.indexOf("showCar") === -1) {
                removeC(atad);
            }
            if (window.showArr.indexOf("showWTF") === -1) {
                removeWTF(atad);
            }
            console.clear();
            console.warn(atad);

            datasour = atad;

            // window.fucking = function () {
            //     return data;
            // }
            // cnmmmmm();
            window.fuckShitArr = atad;
            //  data = falsedata();
            // console.log(data);
            //总车辆
            bottomcardata(atad);
            //匹配闪烁点
            bit_Change_location(atad);
            var onlines = 0;
            var total = 0;
            for (var x = 0; x < atad.length; x++) {
                var item = atad[x];
                counlist.push(item.id);
                if (item.type === 0) {
                    item.s = gpsDataParser.parseStatus(item);
                    list.push(item);
                    //console.log(item.id);
                    alldevices[item.id] = item;
                    addNamelist.push(item.na);
                    total += 1
                    onlines += item.o
                    alllist.push(fromdevices(item));
                    if (item.o == 1) {
                        onlinelist.push(fromdevices(item));
                    } else {
                        offlinelist.push(fromdevices(item));
                    }
                } else {
                    //alldevicespid.push()
                    fleets[item.id] = item;
                    alllist.push(fromfleet(item));
                    onlinelist.push(fromfleet(item));
                    offlinelist.push(fromfleet(item));
                }
            }
            //初始化加载
            locate.webMap.mapObject.clearOverlays();
            quertyicon();
            locate.devicespoint = [];
            for (var tree in list) {
                chushudataadd(list[tree].id, true, false);
                Timerefreshid.push(list[tree].id);
            }
        },
    })
    if (torefresh == false) {
        alllist = Set_whether_open(alllist);
    }
    else {
        //初始化所属公司和所属车队
        datacompanyandcar(datasour, counlist);
    }
    bitopen = true;
    Serialnumber = 0;

    console.error(alllist)


    for (var e of alllist) {
        if (e.name == undefined) {
            e.name = e.na;
        }
    }

    var tSetting = {
        cols: []
    };


    for (var jjjo of window.treeC) {

        console.error(jjjo)

        let dn = {
            key: "dn",
            name: "车牌号",
            width: "230px"
        };
        let inum = {
            key: "inum",
            name: "自编号",
            width: "50px"
        };
        let sp = {
            key: "sp",
            name: "速度",
            width: "50px"
        };
        let m = {
            key: "m",
            name: "里程",
            width: "50px"
        };

        let driname = {
            key: "driname",
            name: "司机姓名",
            width: "100px"
        };


        let mission = {
            key: "mission",
            name: "任务状态",
            width: "100px"
        };
        let shop = {
            key: "shop",
            name: "服务网点",
            width: "100px"
        };

        if (jjjo == "dn") {
            tSetting.cols.push(dn);
        } else if (jjjo == "inum") {
            tSetting.cols.push(inum);
        } else if (jjjo == "sp") {
            tSetting.cols.push(sp);
        } else if (jjjo == "m") {
            tSetting.cols.push(m);
        } else if (jjjo == "driname") {
            tSetting.cols.push(driname);
        } else if (jjjo == "mission") {
            tSetting.cols.push(mission);
        } else if (jjjo == "shop") {
            tSetting.cols.push(shop);
        }

        console.error(tSetting)


    }


    // tabular ztree参数


    // $.fn.zTree.init($("#dataTree"), setting, alllist);


    // 初始化ztree
    var treeObj = init_tabular_ztree($("#dataTree"), setting, alllist, tSetting);

    // 展开全部节点
    treeObj.expandAll(true);


    function ffffg(ele) {
        var mm = [];

        var hhh = ".tabular_col." + ele;
        $(hhh).each(function (index, domEle) {
console.log($(domEle).outerWidth())
            mm.push($(domEle).outerWidth());


        });

        var mmp = Math.max.apply(null, mm);
        $(hhh).css("width",mmp + "px");
    }

    ffffg("dn")
    ffffg("inum")
    ffffg("sp")
    ffffg("m")
    ffffg("driname")
    ffffg("mission")
    ffffg("shop")


    treenodemove(true);
    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
    } else {
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
    //用户手动刷新
    if (isforce == true) {
        var point = new BMap.Point("104.863586", "34.866505");
        Setcenter(point, 5);
        //  setTimeout("mobileflashing("+3+")",700);
    } else {
        //整理思路,  手动刷新为true 否则为false
    }

    //treenodemovebackground();
    //表格里的数据
    if (treeids.length > 0) {
        //  console.log(alldevices);
        adddatalist = [];
        for (var i = 0; i < datasour.length; i++) {
            datasour[i].id == Accessbn ? addcolorli(datasour[i]) : "";
            for (var j = 0; j < treeids.length; j++) {
                if (datasour[i].id == treeids[j]) {
                    for (var z = 0; z < alldevicespidandlocatName.length; z++) {
                        if (datasour[i].id == alldevicespidandlocatName[z].id) {
                            datasour[i].locatName = alldevicespidandlocatName[z].locatName;
                        }
                    }
                    adddatalist.push(returnteamName(fromdevices(datasour[i])));
                    refreshmapid[datasour[i].id] = datasour[i].id;
                    //  console.log(refreshmapid);
                }
            }
        }
        var tabledata = {list: adddatalist};
        var html = template("tpl", tabledata);
        $('#content_data').html(html);
        tdmousever();
    }
}

/*
* 加载左侧底下的数据
* */
function bottomcardata(data) {
    var online = 0;
    var offline = 0;
    var sp = 0;
    var spsum = 0;
    for (var i in data) {
        data[i].type == 0 ? (data[i].o == 0 ? (offline++, offlinedevices.push(data[i])) : (online++, onlinedevices.push(data[i]), sp += data[i].sp))
            : ""
    }
    for (var i in data) {
        if (data[i].sp > 0) {
            spsum = spsum + 1
        }
    }
    count = offline + online;
    $(".cs_top span:nth-child(1)").html("总车辆:" + count);
    $(".cs_top span:nth-child(2)").html("在线率:" + Math.round((online / count).toFixed(2) * 100) + "%");
    $(".cs_middle span:nth-child(1)").html("在线:" + online);
    $(".cs_middle span:nth-child(2)").html("离线:" + offline);
    // $(".cs_bottom span:nth-child(1)").html("任务:"+data.);
    // console.log(sp+"sp");
    $(".cs_bottom span:nth-child(2)").html("行驶:" + spsum);

}

/*转换数据*/
/*function fromdevices(item) {
    var device = new Object();
    device.CONTACT_USER = item.sp; //速度
    device.SECTOR_NAME = item.na;//车辆号
    device.CONTACT_PHONE = "已停";//里程
    device.ORG_ID = item.pid;//父id
    device.id = item.id;
    device.pId = item.pid;
    device.name = item.na;
    device.CORP_CAT = item.m;
    device.iconClose = "/image/zaixian.png";
    device.iconOpen = "/image/zaixian.png";
    device.stust = item.o;
    device.type=item.type;
    return device;
}*/

/*转换格式数据*/
function fromfleet(item) {
    var fleet = new Object();


    fleet.a = '\u00A0';
    fleet.ad0 = "";
    fleet.ad1 = "";
    fleet.aid = "";
    fleet.alt = "";
    fleet.d = '\u00A0';
    fleet.dn = '\u00A0';
    fleet.exs = "";
    fleet.gt = "";
    fleet.icon = "";
    fleet.id = "";
    fleet.iid = "";
    fleet.iof = "";
    fleet.ios = "";
    fleet.iot = "";
    fleet.lat = "";
    fleet.lng = "";
    fleet.m = '\u00A0';
    fleet.marker = "";
    fleet.na = '\u00A0';
    fleet.net = "";
    fleet.o = '\u00A0';
    fleet.oid = '\u00A0';
    fleet.oil = "";
    fleet.ovt = "";
    fleet.pId = "";
    fleet.rf = "";
    fleet.rid = "";
    fleet.rotate = "";
    fleet.rt = "";
    fleet.s = '\u00A0';
    fleet.sat = "";
    fleet.sp = '\u00A0';
    fleet.st = "";
    fleet.type = "";
    fleet.val = "";
    fleet.vss = "";
    fleet.team = "";
    fleet.locatName = "";
    fleet.driname = '\u00A0';
    fleet.inum = '\u00A0';
    fleet.name = '\u00A0';
    fleet.mission = '\u00A0';
    fleet.shop = '\u00A0';


    fleet.ORG_ID = item.id;
    fleet.id = item.id;
    fleet.pId = item.pid;  //往上找的
    fleet.open = bitopen;
    fleet.name = item.na + "(" + item.onon.length + "/" + (parseInt(item.onon.length) + parseInt(item.offoff.length)) + ")";
    fleet.stust = item.o;
    fleet.type = item.type;
    // fleet.driname = item.driname;
    // fleet.inum = item.inum;


    fleet.icon = item.icon;
    fleet.iconOpen = item.icon;
    fleet.iconClose = item.iconClose;


    bitopen = true;
    return fleet;
}

$(function () {
    //初始化数据

    //创建地图
    webMap.createMap("locateMap");
    webMap.events.onMapLoadCompleted['locateMap'] = locate.onMapLoaded;
    // 添加带有定位的导航控件

})

//刷新
function refresh() {
    //第二个参数为true就是重新加载
    //  alert("改功能正在开发");
    // todo
    query(true, true);
}

function convertor(lng, lat, callback) {    // 纠偏
    $.ajax({
        async: false,
        url: "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&mode=1&x=" + lng + "&y=" + lat,
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: null,
        timeout: 5000,
        beforeSend: function () {

        },
        success: function (json) {// 客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
            var point = new BMap.Point(json[0].x, json[0].y);
            // Setcenter(point, 17);
            callback(point);
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (xhr) {
            // jsonp
            // 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
            // 请求出错处理
        }
    });
}

function queryAddress(point, callback) {   //获取位置
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function (rs) {
        if (!rs)
            return '';
        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        if (address.length < 2) {
            address = "经度:" + 0 + ",纬度：" + 0;
        } else {
            var surround = rs.surroundingPois;
            for (var i = 0; i < surround.length; i++) {
                address += ",离" + surround[i].title + "约" + Math.round(locate.webMap.getDistance(point, surround[i].point)) + "米";
            }
        }
        callback(address);
    }, {
        poiRadius: 1000,
        numPois: 2
    });
}

//清除
function tool() {
    var getmapoverlays = locate.webMap.mapObject.getOverlays();
    for (var i = 0; i < getmapoverlays.length; i++) {
        if (getmapoverlays[i].content != undefined) {
            //  console.log(getmapoverlays[i].content.indexOf("总长"));
            locate.webMap.mapObject.removeOverlay(getmapoverlays[i]);
        }
        if (getmapoverlays[i].V != undefined) {
            //  console.log(getmapoverlays[i].V.title);
            if (getmapoverlays[i].V.title == "清除本次测距") {
                locate.webMap.mapObject.removeOverlay(getmapoverlays[i]);
            }
        }
    }
    // console.log(getmapoverlays);
    for (var i = 0; i < overlays.length; i++) {
        locate.webMap.mapObject.removeOverlay(overlays[i]);
    }
    overlays = [];
    // locate.webMap.mapObject.clearOverlays();
    ;
}

//点击工具栏
function toolnav() {
    $("#toolnav_ul").toggle(500);
}

//测距
function ranging() {
    overlays = [];
    //console.log(BMapLib);
//添加测量面积工具
    //var measureAreaTool = createMeasureAreaTool(locate.map);
    //面积测量
    var tool = new BMapLib.DistanceTool(locate.webMap.mapObject);
    tool.addEventListener("addpoint", function (e) {
        rangingcaing(e)
    });
    tool.addEventListener("drawend", function (e) {
        rangingcallback(e)
    });
    tool.open(); // 开启鼠标测距
}

//测距的回调函数
function rangingcallback(e) {
    for (var i = 0; i < e.overlays.length; i++) {
        overlays.push(e.overlays[i]);
    }
    for (var i = 0; i < e.points.length; i++) {
        overlays.push(e.points[i]);
    }
    // console.log(e);
}

//测距中的数据
function rangingcaing(e) {
    overlays.push(e.point.disLabel);
    //  console.log(e);
}

//放大
function amplification() {
    window.locate.webMap.mapObject.zoomIn()
}

//缩小
function narrow() {
    window.locate.webMap.mapObject.zoomOut()
}

//打印地图
function Print_map() {
    var myDate = new Date(); //获取时间
    var imagelayout = "PNG"//获取导出的图片格式
    var targetDom = $("#bodyall_map");
    html2canvas(targetDom, { //要截图的区域ID
        background: "#fff",
        onrendered: function (canvas) {
            var Imgurl = canvas.toDataURL("image/png"); //画布转成图片
            //以下代码为下载此图片功能
            var triggerDownload =
                $("<a>").attr("href", Imgurl).attr("download", "" + myDate.getTime() + "." + imagelayout + "").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove(); //下载图片到本地
        }
    });
}

//默认视野
function default_view() {
    var lng = 116.404;
    var lat = 39.915;
    var cent = 15;
    $.ajax({
        url: "/viewport/get", //请求地址
        dataType: "json", //数据格式
        type: "Get", //请求方式
        success: function (data) {
            console.log(data);
            if (data.length < 0) return;
            lng = data[data.length - 1].lng;
            lat = data[data.length - 1].alt;
            cent = data[data.length - 1].level;
            var point = new BMap.Point(lng, lat);
            locate.webMap.mapObject.centerAndZoom(point, cent);
        }
    });
}

//  刷新地图
function Refreshmap() {
    var pointfull = new BMap.Point("113.429136", "23.169302");
    Setcenter(pointfull, 4);
    // 第二个参数 是只刷数据不刷结构的 保留false否则为true
    query(false, false);
    treenodemove(true);
    //   mobileflashing(2);
    /*  locate.webMap.mapObject.clearOverlays();*/
    // locate.webMap.mapObject.reset();
}

//全屏
function Full_screen() {
    var element = document.getElementById("locateMap");
    element.webkitRequestFullScreen();
}

//打印图片
function cutDiv() {
    var myDate = new Date(); //获取时间
    var imagelayout = "PNG"//获取导出的图片格式
    var divContent = document.getElementById("bodyall_map").innerHTML;
    var data = "data:image/svg+xml," +
        "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
        "<foreignObject width='100%' height='100%'>" +
        "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
        divContent +
        "</div>" +
        "</foreignObject>" +
        "</svg>";
    var img = new Image();
    img.src = data;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    img.crossOrigin = "anonymous";
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    ctx.drawImage(img, 0, 0);
    var canvasbase = canvas.toDataURL("image/png");
    var triggerDownload =
        $("<a>").attr("href", canvasbase).attr("download", "" + myDate.getTime() + "." + imagelayout + "").appendTo("body");
    triggerDownload[0].click();
    triggerDownload.remove(); //下载图片到本地
}

/**
 * 触发点名
 */
function dataTreedian(id) {

    $.ajax({
        url: "device/get?deviceNumber=" + id,
        type: "GET",
        success: function (res) {
            if (res.protocolName === "康凯斯") {
                $.post('../instruct/send', {
                    serialNumber: null,
                    deviceNumber: id,
                    featureId: "ad7098f7b03680cd84d9c50",
                    command: "STATUS#",
                    name: "查询状态",
                    params: null,
                    confirm: null
                }, function (r) {
                    if (r.error) {
                        layer.msg(r.msg)
                        // common.tip('error', r.error, 3);
                    } else {
                        // me.currnetPad.gridInstructs.addRow(r, me.currnetPad.gridInstructs.rows[0], true);
                        // me.currnetPad.gridInstructs.isDataChanged = false;
                        layer.msg("success");

                        // common.tip('success', '已发送', 3);
                    }
                });
            } else {
                layer.msg("808正在测试");
            }
        }
    });
    // instruct.sendInstruct(id,,"",null,null);
    /*  for(var tree in Timerefreshid){
          chushudataadd(Timerefreshid[tree],false,true);
      }*/
}

/*定时刷新*/
function timer() {
    // var t2 = window.setInterval("query(false,false)",20000);
}

//双击获取
function beforeDblClick(treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    if (clickFlag) {//取消上次延时未执行的方法
        clickFlag = clearTimeout(clickFlag);
    }
    // layer.msg("点名成");
    return false;
}

//点击树节点是为true的时候
function beforeClickistrue(treeNode) {
    //  console.log(locate.markers[treeNode.dn]);
    //BMap.Convertor.translate(BDPoint,0,translateCallback); //真实经纬度转成百度坐标

    if (treeNode.type == 0) {  // console.log(treeNode);

        $("#libuoonton").parent().removeClass("ztreeonClickbackground");
        $("#libuoonton").remove();

        var treeid = treeNode.tId;
        /*   var butong = `<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian(${treeNode.dn})' value='点名' ></input> ` +
               "<input type='button' value='资料'></input>   </li>";
           $("#" + treeid).append(butong);*/
        /*   $("#libuoonton").parent().addClass("ztreeonClickbackground");*/
        var id = treeNode.id;
        Accessbn = id;
        var iscunzai = Clickidstorage.indexOf(id);
        if (iscunzai == -1) {
            //不存在
            Clickidstorage.push(id);
        }
        if (!Arrayis(id)[1]) {
            adddatalist.push(returnteamName(fromdevices(alldevices[id])));
            treeids.push(id);
            var i = adddatalist.length - 1;
            var point = new BMap.Point(adddatalist[i].lng, adddatalist[i].lat);
            // locate.webMap.mapObject.centerAndZoom((adddatalist[i].lng, adddatalist[i].lat),17);
            // Setcenter(point, 17);
            queryAddress(point, function (address) {
                adddatalist[i].locatName = address;
                var tabledata = {list: adddatalist};
                var html = template("tpl", tabledata);
                $('#content_data').html(html);
                tdmousever();
            });
        }
        if (refreshmapid[id] != undefined) {
            //  console.log(refreshmapid[id]);
            //   Repeat_annotation(id);
        }
        // chushudataadd(id,true,true);
        qiehuan(id);
    }
    return false;
}

/*点击树节点获取对象*/
function beforeClick(treeId, treeNode, isCheck) {
    if (clickFlag) {//取消上次延时未执行的方法
        clickFlag = clearTimeout(clickFlag);
    }
    clickFlag = setTimeout(function () {

        if (treeNode.pId == null) {
            var childrendata = treeNode.children == undefined ? undefined : typecar(treeNode.children);
            if (childrendata != undefined) {
                // treeNode.checked==true?adddataztree(childrendata):removecarteam(childrendata);
            }
        } else {
            var treeObj1 = $.fn.zTree.getZTreeObj("dataTree");
            var istrueorfalse = treeNode.checked;
            if (typeof isCheck == "boolean") {
                //如果是boolean 证明点击传过来的, 要相反
                beforeClickistrue(treeNode);
            } else {
                if (istrueorfalse == true) {
                    istrueorfalse = false;
                    removercar(treeNode);
                } else {
                    istrueorfalse = true;
                    beforeClickistrue(treeNode);
                }
                treeObj1.checkNode(treeNode, false, istrueorfalse);//-------------
            }
        }
    }, 200);
    clearTimeout();
}

//点击表格定位切换
function tables(id, e) {
    qiehuan(id);
    $("#content_data tr").removeAttr("style");
    $(e).css("background", "#FFDECF");
}

/**
 * 切换图片定位
 */
function qiehuan(id) {
    var device = alldevices[id];
    var geoc = new BMap.Geocoder();
    convertor(device.lng, device.lat, function (point) {
        console.log(locate.webMap.mapObject.getZoom());
        Setcenter(point, 15);
    });
    var Normal_icon = new BMap.Icon('/static/image/pointimage/attentioniconred.png', new BMap.Size(70, 70), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /* anchor: new BMap.Size(30, 30)*/
    });
    var icon = new BMap.Icon('/static/image/pointimage/attentionicon.png', new BMap.Size(70, 70), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /* anchor: new BMap.Size(30, 30)*/
    });
    var icon3 = new BMap.Icon('/static/image/pointimage/defaultsmine.png', new BMap.Size(20, 26), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /*anchor: new BMap.Size(30, 30)*/
    });
    //标注设置属性
    var labe2 = new BMap.Label(" <div class='Labeldiv' style='width:58px;height:50px'><span  class='iconbigshow'>" + Math.round(device.sp * 10) +
        "</span> <span class='iconbigshowna'  >km/h</span></div>",
        {offset: new BMap.Size(10, 20)});
    labe2.setStyle({
        border: "none",
        height: "10px",
        width: "50px",
        lineHeight: "20px",
    });


    var labe5 = new BMap.Label("<div class='showlabelsp'> " +
        "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
        " <span class='labelunit'   >km/h</span>" +
        " <span class='labelna'  >" + device.na + " </span> </div> ",
        {offset: new BMap.Size(10, 20)});
    labe5.setStyle({
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 0px "
    });
    var labe5red = new BMap.Label("<div class='showlabelspred'> " +
        "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
        " <span class='labelunit'   >km/h</span>" +
        " <span class='labelna'  >" + device.na + " </span> </div> ",
        {offset: new BMap.Size(10, 20)});
    labe5red.setStyle({
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 0px "
    });

    var labeName = new BMap.Label("<span class='iconbigsp' >" + device.na + "</span> ", {offset: new BMap.Size(10, 20)});
    labeName.setStyle({
        border: "none",
        height: "10px",
        width: "50px",
        lineHeight: "20px",
        margin: "0px 0px  0px 0px "
    });
    var labe3 = new BMap.Label("<span style='color:#0489D6;position: relative; right: 25px;'>" + device.na + "</span>", {offset: new BMap.Size(10, 20)});
    labe3.setStyle({
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 0px "
    });
    var allOverlay = locate.webMap.mapObject.getOverlays();
    for (var i = 0; i < allOverlay.length; i++) {
        var ispoint = allOverlay[i].point;
        if (ispoint != undefined) {
            if (allOverlay[i].getTitle() == device.id) {
                //刚好点击的是这个
                if (directionid.length > 0) {
                    if (directionid[0].id == device.id) {
                        device.sp * 10 > speed_limit ? (directionid[0].icon = Normal_icon, labe5 = labe5red) : directionid[0].icon = icon;
                        ;
                        directionid[0].label = labe5;
                        directionid[0].focus = true;
                        directionid[0].direction = device.d;
                        return;
                    }
                }
                var label = allOverlay[i].getLabel();
                if (label != null) {
                    label.remove();//设置标签内容为空
                    //label.setStyle({borderWidth:"0px"});
                }

                device.sp * 10 > speed_limit ? (allOverlay[i].setIcon(Normal_icon) , allOverlay[i].setLabel(labe5red)) : (allOverlay[i].setIcon(icon), allOverlay[i].setLabel(labe5));
                ;
                allOverlay[i].setRotation(device.d);
                allOverlay[i].setTop(true);
                locate.webMap.mapObject.closeInfoWindow();
            } else {
                /*      if(allOverlay[i].getTitle()!="0"){
                          var label = allOverlay[i].getLabel();
                          allOverlay[i].setIcon(icon3);
                          if(label!=null){
                              label.setContent("");//设置标签内容为空
                              label.setStyle({borderWidth:"0px"});
                          }

                          /!* allOverlay[i].setIcon(icon3);
                           var label = allOverlay[i].getLabel();
                         // if(label.point.)
                           label.setContent("");//设置标签内容为空
                           label.setStyle({borderWidth:"0px"});
                           allOverlay[i].setLabel(labe3);*!/
                      }*/
            }
        }
    }
}

/*
* 计时器
* */
function timedCount(c) {
    var t;
    c = c <= 0 ? 20 : c;
    $('#txtOnlineVehicles').text(String(c));
    c--;
    t = setTimeout("timedCount(" + c + ")", 1000);
}

/*
 加载数据   传来的id ,判断是不是第一次穿来的数据 true是第一次 自己设置中心点
* */
function chushudataadd(id, change, Number) {
    var device = alldevices[id];
    var geoc = new BMap.Geocoder();
    convertor(device.lng, device.lat, function (point) {
        device.lng = point.lng;
        device.lat = point.lat;
        locate.devicespoint.push(device);
        //  console.log(locate.devicespoint);

        queryAddress(point, function (address) {
            if (device != null) {
                //  console.log(address);
                var sContent = "<div style='margin:0px;padding:0px;border-top: 1px solid #c9c9c9;'>" +
                    "<div class='display-label'> <b>时间:</b> " + device.st + "</div>" +
                    "<div class='display-label'> <b>定位:</b>" + gpsDataParser.parseLocateType(device) + "[" + gpsDataParser.parseDirection(device) + "]</div>" +
                    "<div class='display-label'><b>状态:</b>" + gpsDataParser.parseAcc(device) + "</div>" +
                    "<div class='display-label'><b>里程:</b> " + device.m + "km</div>" +
                    "<div class='display-label'><b>速度:</b>" + device.sp + "km</div>" +
                    "<div style='margin:2px;'><b>位置:</b>" + address + "</div>" +
                    "<div class='mon_button' id='The_alarm'>" +
                    "<span>街景</span> " +
                    "<span>追踪</span><span>轨迹</span><span>详情</span><span > 告警</span><b></b>" +
                    "<span>指令</span><span>轨迹</span><span>详情</span><span>告警</span>" +
                    "</div>" +
                    "</div>";
                var data = [{
                    lng: point.lng,
                    lat: point.lat,
                    na: sContent
                }
                ]
                var datalocatName = {locatName: address, id: id};
                alldevicespidandlocatName.push(datalocatName);
                alldevices[id].locatName = address;
                showGpsinfo(data, device, change);
            }
        });
    });
}

//根据点设置中心点
function Setcenter(point, Number) {
    // locate.webMap.mapObject.centerAndZoom(point, Number);
    locate.webMap.mapObject.setCenter(point);
}

//处理位置是否移动过   listdataflashing   存储变动过的数据
function bit_Change_location(data) {
    listdataflashing = [];
    //如果大于0,表示有数据
    if (listdata.length > 0) {
        //处理每条数据的id是否匹配
        for (var i = 0; i < listdata[0].length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (data[j].type == 0 && listdata[0][i].id == data[j].id) {
                    //匹配成功计算经纬度是否一致
                    if (listdata[0][i].lat == data[j].lat && listdata[0][i].lng == data[j].lng) {
                        //一致,没变,不用处理
                    } else {
                        listdataflashing.push(listdata[0][i]);
                    }
                }
            }
        }
    }
    listdata = [];
    listdata.push(data);
}

//计算位置是否移动过,来一闪一闪功能
function mobileflashing(c) {
    var allOverlay = locate.webMap.mapObject.getOverlays();
    //获取地图上的点
    if (listpoint.length > 0) {
        for (k in listpoint) {
            locate.webMap.mapObject.removeOverlay(allOverlay[k]);
        }
    } else {
        for (var i = 0; i < allOverlay.length; i++) {
            for (j in listdataflashing) {
                if (allOverlay[i].getTitle() == listdataflashing[j].id) {
                    listpoint.push(i);
                    locate.webMap.mapObject.removeOverlay(allOverlay[i]);
                } else {
                    //更换图片
                    /* var icon = new BMap.Icon('/gps_web/resources/new/image/car.png', new BMap.Size(69,65), {
                         imageOffset: new BMap.Size(0, 0),
                         infoWindowAnchor: new BMap.Size(0, 0),
                         anchor: new BMap.Size(30, 30)
                     });
                     allOverlay[i].setIcon(icon);*/
                }
            }
        }
    }
    c = c - 1;
    setTimeout("showpoint(" + c + ")", 700);
}

//显示
function showpoint(c) {
    if (c > 0) {
        for (var tree in listdataflashing) {
            chushudataadd(listdataflashing[tree].id, true, false);
        }
        setTimeout("mobileflashing(" + c + ")", 700);
    } else {
        for (var tree in listdataflashing) {
            chushudataadd(listdataflashing[tree].id, true, false);
        }
        clearTimeout();
    }
}

//区域查车
function areacar() {
    locate.webMap.drawingOpen(locate.overlayComplete);
}

//测试打印
function printmap() {


    //var headhtml = "<html><head><title></title></head><body>";
    //var foothtml = "</body>";
    // 获取div中的html内容
    var newhtml = document.all.item("locateMap").innerHTML;
    // 获取div中的html内容，jquery写法如下
    // var newhtml= $("#" + printpage).html();
    // 获取原来的窗口界面body的html内容，并保存起来
    //  var oldhtml = document.body.innerHTML;
    // 给窗口界面重新赋值，赋自己拼接起来的html内容
    $("#printmap").css("display", "block");
    $("#printmap").html(newhtml);

    // 调用window.print方法打印新窗口
    window.print();
    $("#printmap").css("display", "none");
    // 将原来窗口body的html值回填展示
    /// location.reload();
}

/*
 * 根据x和y,加地址显示弹窗
 * */
function showGpsinfo(data, device, change) {
    Repeat_annotation(device.id);
    var data_info = [];
    var title = "";
    title += '<div style="margin:0px;padding:0px">';
    title += '<div style="height:30px;margin:2px;">';
    title += '<b>';
    title += device.na;
    title += '</b>';
    title += '<div style="margin-left:15px;display:inline-block;">';
    title += '<div> </div>';
    /*<img  src="/image/xiaoxi.png" />*/
    title += '</div>';
    title += '</div>';
    title += '</div>';
    for (var i = 0; i < data.length; i++) {
        data_info.push(data[0].lng);
        data_info.push(data[0].lat);
        data_info.push(data[0].na);//内容
    }
    locate.opts = {
        width: 360,     // 信息窗口宽度
        height: 0,     // 信息窗口高度
        title: title, // 信息窗口标题
        enableMessage: true//设置允许信息窗发送短息
    };
    var icon;
    var label;
    var labe2;
    var iscunlie = treeids.indexOf(device.id);
    if (iscunlie == -1) {
        icon = new BMap.Icon('/static/image/pointimage/defaultsmine.png', new BMap.Size(20, 26), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
        });
        label = new BMap.Label("<span style='color:#0489D6;position: relative; right: 30px;'>" + device.na + "</span>", {offset: new BMap.Size(10, 20)});
        label.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 0px 10px "
        });
        locate.markers = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]), {
            icon: icon
        });
        // locate.markers.setLabel(label);
    } else {

        var Normal_icon = new BMap.Icon('/static/image/pointimage/attentioniconred.png', new BMap.Size(70, 70), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)*/
        });
        icon = new BMap.Icon('/static/image/pointimage/attentionicon.png', new BMap.Size(70, 70), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)  iconbigshow  iconbigspload*/
        });
        var iconENSBred = new BMap.Icon('/static/image/pointimage/ENSBattentioniconred.png', new BMap.Size(98, 98), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)*/
        });
        var iconENSB = new BMap.Icon('/static/image/pointimage/ENSBattentionicon.png', new BMap.Size(98, 98), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)  iconbigshow  iconbigspload*/
        });


        var labe2 = new BMap.Label("<div class='showlabelsp'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        labe2.setStyle({
            border: "none",
            height: "10px",
            width: "50px",
            lineHeight: "20px",
        });
        // labe2.setStyle({
        //     border: "none",
        //     height : "10px",
        //     lineHeight : "20px",
        //     margin:"0px 0px 50px 5px "
        // });
        var labe2red = new BMap.Label("<div class='showlabelspred'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        labe2red.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 50px 5px "
        });

        var labe2ENSB = new BMap.Label("<div class='showlabelspENSB'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        // labe2ENSB.setStyle({
        //     border: "none",
        //     height : "10px",
        //     lineHeight : "20px",
        //     margin:"0px 0px 0px 5px "
        // });
        labe2red.setStyle({
            border: "none",
            height: "10px",
            width: "50px",
            lineHeight: "20px",
        });
        var labe2ENSBred = new BMap.Label("<div class='showlabelspENSBred'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        labe2ENSBred.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 0px 5px "
        });

        device.sp * 10 > speed_limit ? (icon = Normal_icon, labe2 = labe2red) : "";
        if (directionid.length > 0) {
            if (directionid[0].id == device.id) {
                device.sp * 10 > speed_limit ? (icon = iconENSBred, labe2 = labe2ENSBred) : (icon = iconENSB, labe2 = labe2ENSB);
            }
        }


        locate.markers = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]), {
            icon: icon
        });

        locate.markers.setLabel(labe2);
    }

    //注入标注

    //标注设置属性"<span>12km</span> <span style='position: relative;top: 25px; background: #fff;padding: 5px;'>"+
    //给每个标注的标题加入id
    locate.markers.setTitle(device.id);
    // console.log("方向"+device.d);
    var content = data_info[2];
    locate.markers.setRotation(device.d);
    //添加标注
    locate.webMap.mapObject.addOverlay(locate.markers);
    addClickHandler(content, locate.markers, locate.opts);

    /*for(var i=0;i<data_info.length;i++){
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
        var content = data_info[i][2];
        locate.map.addOverlay(marker);               // 将标注添加到地图中
        addClickHandler(content,marker);
    }*/
}

/**
 * 监听点击事件
 * @param content
 * @param marker
 */
function addClickHandler(content, marker, title) {
    marker.addEventListener("click", function (e) {
            if (clickFlag) {//取消上次延时未执行的方法
                clickFlag = clearTimeout(clickFlag);
            }
            clickFlag = setTimeout(function () {
                openInfo(content, e, title);
                marker.removeEventListener("click", function (e) {
                });
                //  console.log(e);
            }, 200)
        }
    );
//双击
    marker.addEventListener("dblclick", function (e) {
        if (clickFlag) {//取消上次延时未执行的方法
            clickFlag = clearTimeout(clickFlag);
        }
        var Normal_icon = new BMap.Icon('/static/image/pointimage/ENSBattentioniconred.png', new BMap.Size(98, 98), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)*/
        });
        var icon = new BMap.Icon('/static/image/pointimage/ENSBattentionicon.png', new BMap.Size(98, 98), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)  iconbigshow  iconbigspload*/
        });
        // var icon_1 = new BMap.Icon('/static/image/pointimage/map.png', new BMap.Size(98, 98), {
        //     imageOffset: new BMap.Size(0, 0),
        //     infoWindowAnchor: new BMap.Size(0, 0),
        //     /* anchor: new BMap.Size(30, 30)  iconbigshow  iconbigspload*/
        // });

//当前的变东南西北,其他的变回原来的样子,
        var id = this.getTitle();
        var device = alldevices[id];
        var label = this.getLabel();
        var isfocus = true;
        var labe2 = new BMap.Label("<div class='showlabelspENSB'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        labe2.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 0px 5px "
        });
        var labe2red = new BMap.Label("<div class='showlabelspENSBred'> " +
            "<span  class='labelsp'  > " + Math.round(device.sp * 10) + "</span>" +
            " <span class='labelunit'   >km/h</span>" +
            " <span class='labelna'  >" + device.na + " </span> </div> ",
            {offset: new BMap.Size(10, 20)});
        labe2red.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 0px 5px "
        });
        //当前的标注是不是存在标注,存在标注代表是关注的
        if (directionid.length > 0) {
            if (directionid[0].id == id) {
                return;
            }
        }
        if (label != null) {
            this.getLabel().remove();
            isfocus = true;
        } else {
            isfocus = false;
        }
        if (directionid.length > 0) {
            //这个移除上一个
            removeiconbyid(directionid);
            directionid = [];
        }
        //存储现在这个


        device.sp * 10 > speed_limit ? (icon = Normal_icon, labe2 = labe2red) : "";
        //id    图标,  是否关注  ,标注,方向
        directionid.push({id: id, icon: this.getIcon(), focus: isfocus, label: label, direction: device.d});
        this.setIcon(icon);
        // this.setIcon(icon_1);
        this.setLabel(labe2);
        this.setZIndex(2);
        // this.setRotation(device.d);
    });

}

/**
 * 弹窗
 * @param content
 * @param e
 */
function openInfo(content, e, title) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    // locate.webMap.mapObject.centerAndZoom((p.getPosition().lng, p.getPosition().lat),17);
    // Setcenter(point, 17);
    //locate.map.centerAndZoom(point, 12);
    var infoWindow = new BMap.InfoWindow(content, title);  // 创建信息窗口对象
    locate.webMap.mapObject.openInfoWindow(infoWindow, point); //开启信息窗口
}

/**
 *  关闭面板的车辆信息
 * @type {Element}
 */
function penlarareacar() {
    $("#panelqucar").toggle(500);
}

//区域查车放大
function qucarbigger() {
    $(".panel").hasClass("panelbig") ? $(".panel").removeClass("panelbig") : $(".panel").addClass("panelbig");
}

//拖动
function Drag_the() {
    var div1 = document.getElementById("Locationservice");
    div1.onmousedown = function (ev) {
        // var oevent = ev || event;
        // var distanceX = oevent.clientX - div1.offsetLeft;
        // var distanceY = oevent.clientY - div1.offsetTop;
        // document.onmousemove = function (ev) {
        //     var oevent = ev || event;
        //     div1.style.left = oevent.clientX - distanceX + 'px';
        //     div1.style.top = oevent.clientY - distanceY + 'px';
        // };
        // document.onmouseup = function () {
        //     document.onmousemove = null;
        //     document.onmouseup = null;
        // };
        var oevent = ev || event;
        var distanceX = oevent.clientX - div1.offsetLeft;
        var distanceY = oevent.clientY - div1.offsetTop;
        div1.onmousemove = function (ev) {
            var oevent = ev || event;
            if (oevent.clientX)
                div1.style.left = oevent.clientX - distanceX + 'px';
            div1.style.top = oevent.clientY - distanceY + 'px';
        };
        div1.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    //获取元素
    /*  var dv = document.getElementById(id);
      var x = 0;
      var y = 0;
      var l = 0;
      var t = 0;
      var isDown = false;*/
//鼠标按下事件
    /* dv.onmousedown = function(e) {
         //获取x坐标和y坐标
         x = e.clientX;
         y = e.clientY;
         //获取左部和顶部的偏移量
         l = dv.offsetLeft;
         t = dv.offsetTop;
         //开关打开
         isDown = true;
         //设置样式
         dv.style.cursor = 'move';
     }*/
//鼠标移动
    /* window.onmousemove = function(e) {
         if (isDown == false) {
             return;
         }
         //获取x和y
         var nx = e.clientX;
         var ny = e.clientY;
         //计算移动后的左偏移量和顶部的偏移量
         var nl = nx - (x - l);
         var nt = ny - (y - t);
         dv.style.left = nl + 'px';
         dv.style.top = nt + 'px';
     }*/
//鼠标抬起事件
    /* dv.onmouseup = function() {
         //开关关闭
         isDown = false;
         dv.style.cursor = 'default';
     }*/

}

function Drag_thes() {


    var div1 = document.getElementById("panelqucar");
    var div2 = document.getElementById("box_map");
    div1.onmousedown = function (ev) {
        ev.stopPropagation();
        var oevent = ev || event;
        //  if(div2.)
        var distanceX = oevent.clientX - div1.offsetLeft;
        var distanceY = oevent.clientY - div1.offsetTop;
        document.onmousemove = function (ev) {
            var oevent = ev || event;
            div1.style.left = oevent.clientX - distanceX + 'px';
            div1.style.top = oevent.clientY - distanceY + 'px';
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}

//最小值最大值
function Median(target, min, max) {
    if (target > max) return max;
    else if (target < min) return min;
    else return target;
}

function zhangyuxin() {
    var oBox = document.getElementById("panelqucar");
    var oBar = document.getElementById("panelqucar");
    startDrag(oBar, oBox);
}

//位置服务
function Locationservice() {
    $("#Locationservice").toggle(500);
    locate.webMap.mapObject.setDefaultCursor("default");
}

//关闭位置服务
function Locatclose() {
    $("#Locationservice").toggle(500);
}

//监听 标注
function markserver() {
    locate.webMap.mapObject.setDefaultCursor("-webkit-zoom-in");
    locate.webMap.mapObject.addEventListener("click", showInfo);
}

//监听位置服务光标事件 上次图片等
function showInfo(e) {

    var html = '<br /><div class="layui-upload-list" style="width:40%; margin:0 auto;">'
        + ' <input type="text" id="inputname" name="title" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"> />'
        + '<img class="layui-upload-img ui-border-radius" id="Picture" name="file"  src="/static/image/pointimage/alarmpoint.png">'
        + '</div><br />'
        + '<div style="width:40%;height:20px;margin:0 auto;text-align:center;">'
        + '<button class="layui-btn layui-btn-primary" style="width:100%" id="SelectPicture">选择图标</button>'
        + '<button class="layui-btn" style="width:100%;margin-top:10px;margin-left:0px;"  id="UpdatePictures">保存图片</button>'
        + '<button class="ui-btn-lg ui-btn-primary" id="UploadPictures" style="display: none" >确定选择</button>'
        + '</div>';
    layer.open({
        type: 1, //此处以iframe举例
        title: ['选择上传图片'],//['标头'，'样式'];  title:false取消标题
        content: html,//text内容或html内容
        offset: 'auto',
        area: ['500px', '260px'],
        shade: 0.3,
        maxmin: false,
        //btn: ['确定选择', '取消'],
        //yes: function (index1) {
        //}
    });


//选择图片
    upload.render({
        elem: '#SelectPicture',
        url: '/icon/poi/upload'
        , data: {
            name: function () {
                return $('#inputname').val();
            },
            lng: function () {
                return e.point.lng;
            },
            lat: function () {
                return e.point.lat;
            }
        }
        , auto: false
        , multiple: false
        , accept: 'images'
        , size: 5120
        , bindAction: '#UploadPictures'
        , before: function () {
            //loadIndex = myloadAlertlayer1('上传中……');
        }
        , choose: function (obj) {
            obj.preview(function (index, file, result) {
                //对上传失败的单个文件重新上传，一般在某个事件中使用
                //  console.log(file);

                $('#Picture').attr('src', result); //图片链接（base64）
            });
        }
        , done: function (res, index, upload) {
            // layer.close(loadIndex);
            if (res.error == "ok...") {
                //询问框
                layer.open({
                    title: '提示',
                    content: '<span style="color:#38FB00">上传成功</span>',
                    shade: 0.3,//遮罩
                    area: ['270px', '180px'],

                    fixed: true, //固定
                    shadeClose: false//是否点击遮罩关闭
                    , btn: ['关闭']
                    , yes: function (index) {//确定
                        layer.close(index);//隐藏
                    }, end: function (index) {
                        layer.close(index);
                        layer.closeAll();

                    }
                });
            }
            quertyicon();
            //location.reload();
            // alert(res)
        }, error: function (index, upload) {//上传图片失败
            // myAlertlayer1('提示', '上传图片失败！');
        }
    });
    //保存图片
    $('#UpdatePictures').click(function () {
        var src = $('#Picture').attr('src');
        if (src != "" && src != null) {
            $('#UploadPictures').click();
        } else {
            myAlertlayer1('提示', '未检测到有图片');
        }
    });
    var point = new BMap.Point(e.point.lng, e.point.lat);
    var marker = new BMap.Marker(point);// 创建标注
    locate.webMap.mapObject.addOverlay(marker);             // 将标注添加到地图中
    locate.webMap.mapObject.setDefaultCursor("pointer");
    locate.webMap.mapObject.removeEventListener("click", showInfo);

}

//地图列表
function maplistdata() {
    var list = [];
    $.ajax({
        url: "/dictionary/list", //请求地址
        dataType: "json", //数据格式
        data: {
            kind: 5,
            grid: true,
        },
        type: "post", //请求方式
        async: false, //是否异步请求
        success: function (data) {

            for (i in data.rows) {
                list.push(mapTransformdata(data.rows[i]));
            }
            //  console.log(data);
            $.fn.zTree.init($("#dataTreedis"), setting2, list);
            /* var htmlmap = {list:data.rows}
            $("#maplist_tpl").html(htmlmap);*/
        }
    })
}

//转换数据地图列表的
function mapTransformdata(datas) {
    var pids = datas.pid;
    if (pids == undefined) {
        pids = 0;
    }
    var data = new Object();
    data.pid = pids;
    data.name = datas.name;
    data.id = datas.id;
    data.open = false;
    return data;
}

//信息框

//初始化标注
function quertyicon() {
    var imagepath = "/stat";
    // var datalist=[];
    $.ajax({
        url: "/icon/poi/query", //请求地址*/
        dataType: "json", //数据格式
        type: "GET", //请求方式
        async: false, //是否异步请求
        success: function (data) {
            var allimage = data.msg;
            if (data.rows.length > 0) {
                for (var datas in data.rows) {
                    markloadlocet(data.rows[datas].lng, data.rows[datas].alt, data.rows[datas].name, true, data.rows[datas].showName);
                    //datalist.push(data.rows[datas].showName);
                }
                queryicondata = data.rows;
                var tabledata = {list: data.rows};
                var html = template("tpllocat", tabledata);
                $('#locat_Data').html(html);
            }
        }
    })
}

/*
  标注
 参数:经纬度,图片,是否启用纠偏
 */
function markloadlocet(lnga, lata, image, isrectifying, showName) {
    var lng = lnga;
    var lat = lata;
    if (isrectifying == true) {
        var point = new BMap.Point(lng, lat);

        // Setcenter(point, 17);
        var myIcon = new BMap.Icon("/static/icons/" + image, new BMap.Size(20, 20));
        var marker2 = new BMap.Marker(point, {
            icon: myIcon
        });
        var labe3 = new BMap.Label("<span style='color:#0489D6;position: relative; right: 20px;'>" + showName + "</span>", {offset: new BMap.Size(10, 20)});
        labe3.setStyle({
            border: "none",
            height: "10px",
            lineHeight: "20px",
            margin: "0px 0px 0px 5px "
        });
        marker2.setLabel(labe3);
        marker2.setTitle("0");
        // 创建标注
        locate.webMap.mapObject.addOverlay(marker2);
    }
}

/*
* 树节点移入展示按钮
* */
function treenodemove(statsdemove) {
    // var butong = "<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian()' value='点名'></input> " +
    //     "<input type='button' value='资料'></input>  </li>";
    // $(".level0").
    $(".ztree li").on("mouseover", function (e) {
        e.stopPropagation();
        //  stopBubble(e);
        //$("#libuoonton").remove();
        // $(".libuoonton").remove();
        $(this).parent().removeAttr("style");
        // console.log(this);
        var isName = $(this).find("a");
        isName.length == count ? "" : e.stopPropagation();
        for (var i = 0; i < isName.length; i++) {
            //  console.log(isName[0].childNodes[1]);
            if (isName[i].childNodes.length > 3) {
                if (isName[i].childNodes[3].className == "diy divnema") {
                    $(isName[i]).parent().css("background", "#d5dfe4");
                    return;
                    // $(isName[i]).parent().append(butong);
                }
            }
        }
    });
    $(".ztree li").on("mouseleave", function (e) {
        e.stopPropagation();
        $(this).removeAttr("style");
        $(this).find("li").removeAttr("style");
        //    $("#libuoonton").remove();
        //  $(".libuoonton").remove();
    })
    /*  $(".ztree li").hover(function (e) {
          $("#libuoonton").remove();
          $(".libuoonton").remove();
          // console.log(this);
          var isName =$(this).find("a");
          //  console.log(isName);1
          if(statsdemove==true) {
              if(isName.length==count ){

              }else{

                  for(var i=0;i<isName.length;i++){
                      //  console.log(isName[0].childNodes[1]);
                      if(isName[i].childNodes[1].className=="diy divnema"){
                          $(isName[i]).parent().append(butong);
                          return;
                          //$(isName[i]).parent().css("height","50px")
                      }
                  }
              }}else {
              if(isName.length==count ||isName.length== suncount||isName.length==suncount+1){

              }else{

                  for(var i=0;i<isName.length;i++){
                      //  console.log(isName[0].childNodes[1]);
                      if(isName[i].childNodes[1].className=="diy divnema"){
                          $(isName[i]).parent().append(butong);
                          return;
                          //$(isName[i]).parent().css("height","50px")
                      }
                  }

              }
          }
      });*/
}

/**
 * 树节点移入换背景
 * @param id
 * @returns {Array}
 * @constructor
 */
function treenodemovebackground() {
    $(".ztree li ").on("mouseover", function (e) {
        $(this).css("background", "#FFDECF");
        isName.length == count ? "" : e.stopPropagation();
        var isName = $(this).find("a");
        e.stopPropagation();
        for (var i = 0; i < isName.length; i++) {
            //  console.log(isName[0].childNodes[1]);
            if (isName[i].childNodes[2].className == "diy divnema") {
                $(this).parent().css("background", "#FFDECF");
                return;
            }
        }
    })
    $(".ztree li").on("mouseleave", function (e) {
        e.stopPropagation();
        $(this).parent().removeAttr("style");
    })
}

//判断一个元素是否存在数组里
function Arrayis(id) {
    var i = treeids.indexOf(id);
    var list = [];
    if (i == -1) {
        list[0] = -1;
        list[1] = false;
        return list
    } else {
        list[0] = i;
        list[1] = true;
        return list
    }
}

//侧面,隐藏,显示。
function hidden_bottom() {
    $(".cs_bottom").toggle(1);
    $(".cs_middle").toggle(1);
    // var current= $(".car-info").get(0).offsetHeight;
    var current = $(".dis_list").height();
    console.log($(".cs_top span:nth-child(3)").text().trim());
    // $(".cs_top span:nth-child(3)").text().trim()=="隐藏"?
    //     ($(".cs_top span:nth-child(3)").addClass("hide_it").text("显示"),$(".car-info").css("height",(current+50)+"px")):
    //     ($(".cs_top span:nth-child(3)").text("隐藏").removeClass("hide_it"),$(".car-info").css("height",(current-50)+"px"));
    if ($(".cs_top span:nth-child(3)").text().trim() == "隐藏") {
        $(".cs_top span:nth-child(3)").addClass("hide_it").text("显示");
        $(".dis_list").css("height", current + 45 + "px");


    } else if ($(".cs_top span:nth-child(3)").text().trim() == "显示") {
        $(".cs_top span:nth-child(3)").text("隐藏").removeClass("hide_it");
        $(".dis_list").css("height", current - 45 + "px");


    }
}


//勾选父节点
function zTreeOnClick(event, treeId, treeNode) {
    //  alert(treeNode.tId + ", " + treeNode.name);
    /* var treeObj = $.fn.zTree.getZTreeObj("tree");
     var nodes = treeObj.getCheckedNodes(true);*/
    //console.log(treeObj)
}

//勾选树节点
function zTreeOnCheck(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("dataTree");
    var id = treeNode.id;
    var childrendata = treeNode.children == undefined ? undefined : typecar(treeNode.children);

    if (childrendata != undefined) {
        treeNode.checked == true ? adddataztree(childrendata) : removecarteam(childrendata);
    } else {
        //被勾选到
        treeNode.checked == true ? beforeClick(treeId, treeNode, true) : removercar(treeNode);
    }
    // alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
};

//勾选某车队一些车辆显示
function adddaticon(childrendata) {
    locate.webMap.mapObject.closeInfoWindow();
    var Normal_icon = new BMap.Icon('/static/image/pointimage/attentioniconred.png', new BMap.Size(70, 70), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /* anchor: new BMap.Size(30, 30)*/
    });
    var icon = new BMap.Icon('/static/image/pointimage/attentionicon.png', new BMap.Size(70, 70), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /* anchor: new BMap.Size(30, 30)*/
    });
    var allOverlay = locate.webMap.mapObject.getOverlays();
    if (childrendata.length > 0) {
        for (i in allOverlay) {
            var id = allOverlay[i].getTitle();
            if (id == "0") continue;
            for (k in childrendata) {
                var chiid = childrendata[k].id;
                if (chiid === id) {
                    var labe5 = new BMap.Label("<div class='showlabelsp'> " +
                        "<span  class='labelsp'  > " + Math.round(childrendata[k].sp * 10) + "</span>" +
                        " <span class='labelunit'   >km/h</span>" +
                        " <span class='labelna'  >" + childrendata[k].na + " </span> </div> ",
                        {offset: new BMap.Size(10, 20)});
                    labe5.setStyle({
                        border: "none",
                        height: "10px",
                        lineHeight: "20px",
                        margin: "0px 0px 0px 0px "
                    });
                    var label = allOverlay[i].getLabel();
                    if (label != null) {
                        label.remove();//设置标签内容为空
                    }
                    childrendata[k].sp * 10 > 60 ? allOverlay[i].setIcon(Normal_icon) : allOverlay[i].setIcon(icon);
                    ;
                    allOverlay[i].setRotation(childrendata[k].d);
                    allOverlay[i].setLabel(labe5);
                    allOverlay[i].setTop(true);
                }
            }
        }
    }
}

//勾选某车队
function adddataztree(childrendata) {
    adddaticon(childrendata);
    for (var i = 0; i < childrendata.length; i++) {
        var dataxhuanuhan = childrendata[i].id;
        if (!Arrayis(dataxhuanuhan)[1]) {
            adddatalist.push(returnteamName(childrendata[i]));
            treeids.push(dataxhuanuhan);
        }
    }
    var tabledata = {list: adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}

//移除关注的某车队
function removecarteam(childrendata) {
    if (Accessbn != 0 && Accessbn != undefined) {
        $("#libuoonton").remove();
        var a = $("#" + Accessbn).parent().parent();
        a.removeClass("ztreeonClickbackground"), Accessbn == 0;
    }
    removeriocn(childrendata);
    for (var i = 0; i < childrendata.length; i++) {
        var listis = Arrayis(childrendata[i].id);
        //存在
        if (listis[1]) {
            //把存在的移除掉
            //treeids.splice(listis[0]);
            //adddatalist.splice(jQuery.inArray(childrendata[i],adddatalist),1);
            /*    treeids.splice(jQuery.inArray(childrendata[i].id,treeids),listis[0]);*/
            removercarliang(childrendata[i].id);
            removerarr(treeids, childrendata[i].id);
        }
    }
    var tabledata = {list: adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}

//移除某个车辆
function removercar(treeNode) {
    //弹窗位置变化bug
    var setStyle = {
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 10px "
    };
    var icon3 = new BMap.Icon('/static/image/pointimage/defaultsmine.png', new BMap.Size(20, 26), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /*anchor: new BMap.Size(30, 30)*/
    });
    var allOverlay = locate.webMap.mapObject.getOverlays();
    if (treeids.length > 0) {
        for (i in allOverlay) {
            for (k  in treeids) {
                if (allOverlay[i].getTitle() == treeNode.id) {
                    if (Accessbn == allOverlay[i].getTitle()) {
                        Accessbn == 0, $("#libuoonton").remove();
                        var a = $("#" + treeNode.id).parent().parent();
                        a.removeClass("ztreeonClickbackground");
                    }
                    if (directionid.length > 0) {
                        if (directionid[0].id == treeNode.id) {
                            directionid = [];
                        }
                    }
                    var label = allOverlay[i].getLabel();
                    if (label != null) {
                        label.remove();//设置标签内容为空
                        label.setStyle = setStyle;
                    }
                    allOverlay[i].setIcon(icon3);
                    locate.webMap.mapObject.closeInfoWindow();
                    allOverlay[i].setRotation(treeNode.d);
                    allOverlay[i].setTop(false);
                }
            }
        }
    }
    var listis = Arrayis(treeNode.id);
    var iscunzai = Clickidstorage.indexOf(treeNode.id);
    if (iscunzai > -1) {
        //存在
        removerarr(Clickidstorage, treeNode.id);
    }
    if (listis[1]) {
        removercarliang(treeNode.id);
        removerarr(treeids, treeNode.id);
    }
    var tabledata = {list: adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}

//移除某车队的图标
function removeriocn(childrendata) {
    var setStyle = {
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 10px "
    };
    locate.webMap.mapObject.closeInfoWindow();
    directionid = [];
    var allOverlay = locate.webMap.mapObject.getOverlays();
    var icon3 = new BMap.Icon('/static/image/pointimage/defaultsmine.png', new BMap.Size(20, 26), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /*anchor: new BMap.Size(30, 30)*/
    });
    if (childrendata.length > 0) {
        for (i in allOverlay) {
            var id = allOverlay[i].getTitle();
            if (id == "0") continue;
            for (k in childrendata) {
                console.log(childrendata[k].id);
                var chiid = childrendata[k].id;
                if (chiid === id)
                    var label = allOverlay[i].getLabel();
                if (label != null) {
                    label.remove();//设置标签内容为空
                    label.setStyle = setStyle;
                }
                allOverlay[i].setIcon(icon3);
                allOverlay[i].setRotation(childrendata[k].d);
                allOverlay[i].setTop(false);
            }
        }
    }
}

//在线车辆
function Onlinecar() {
    bitopen = true;
    //目前假数据,真数据需要修改
    // var data =falsedata();
    var data = datasour;
    $("#dataTree").empty();
    var listdatacer = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id);
            if (item.o == 1) {
                listdatacer.push(fromdevices(item));
            }
        } else {
            listdatacer.push(fromfleet(item));
        }
    }
    Serialnumber = 0;
    $.fn.zTree.init($("#dataTree"), setting, listdatacer);
    treenodemove(true);
}

//离线车辆
function offlinecar() {
    bitopen = true;
    $("#dataTree").empty();
    //var data =falsedata();
    var data = datasour;
    var listdatacer = [];
    suncount = 0;
    treecount = 0;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id);
            if (item.o != 1) {
                suncount = suncount + 1;
                listdatacer.push(fromdevices(item));
            }
        } else {
            treecount = treecount + 1;
            listdatacer.push(fromfleet(item));
        }
    }
    count = listdatacer.length;
    Serialnumber = 0;
    $.fn.zTree.init($("#dataTree"), setting, listdatacer);
    treenodemove(false);
}

//总车辆
function countcar() {
    bitopen = true;
    $("#dataTree").empty();
    // var data =falsedata();
    var data = datasour;
    var listdatacer = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id)
            listdatacer.push(fromdevices(item));
        } else {
            listdatacer.push(fromfleet(item));
        }
    }
    Serialnumber = 0;
    $.fn.zTree.init($("#dataTree"), setting, listdatacer);
    treenodemove(true);
}

//转换刚加载数据
function fromdevices(data) {
    var datastart = new Object();

    datastart.a = '\u00A0';

    datastart.dn = '\u00A0';
    datastart.driname = '\u00A0';
    datastart.inum = '\u00A0';
    datastart.name = '\u00A0';
    datastart.sp = '\u00A0';
    datastart.mission = '\u00A0';
    datastart.shop = '\u00A0';


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
    datastart.sp = Math.round(data.sp * 10);
    datastart.st = data.st;
    datastart.type = data.type;
    datastart.val = data.val;
    datastart.vss = data.vss;
    datastart.team = 0;
    datastart.locatName = data.locatName;
    datastart.driname = data.driname;
    datastart.inum = data.inum;
    datastart.name = data.na;

    if (datastart.inum === undefined || datastart.inum === "" || datastart.inum == null) {
        datastart.inum = '\u00A0';
    }

    if (datastart.driname === undefined || datastart.driname === "" || datastart.driname == null) {
        datastart.driname = '\u00A0';
    }
    if (datastart.shop === undefined || datastart.shop === "" || datastart.shop == null) {
        datastart.shop = '\u00A0';
    }
    console.warn(datastart.inum)
    console.warn(datastart.inum === undefined)


    return datastart;
}

//移除存储id
function removerarr(arr, val) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

//移除车辆
function removercarliang(id) {
    for (var i = 0; i < adddatalist.length; i++) {
        if (adddatalist[i].id == id) {
            adddatalist.splice(i, 1);
        }
    }
    /*if(arr.indexOf&&typeof(arr.indexOf)=='function'){
        var index = arr.indexOf(val);
        if(index >= 0){

        }
    }  return false;*/
}

//递归是否类型是车
function typecar(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].type == 0) {
            return data;
        } else {
        }
        return typecar(data[i].children);
        if (data[i].type == 0) {
            return data;
        } else {
        }
    }
}

//绑定下拉框的所属公司与所属车队
function datacompanyandcar(data, counlist) {
    var form = layui.form;
    var car = []
    var company = [];
    $("#Company").empty();
    $("#team").empty();
    $("#Companypanelqucar").empty();
    $("#Companononline").empty();
    $("#Companonoffline").empty();
    $("#Companonlocat").empty();
    document.getElementById('Company').add(new Option("全部", 0));
    document.getElementById('team').add(new Option("全部", 0));
    document.getElementById('Companypanelqucar').add(new Option("全部", 0));
    document.getElementById('Companononline').add(new Option("全部", 0));
    document.getElementById('Companonoffline').add(new Option("全部", 0));
    document.getElementById('Companonlocat').add(new Option("全部", 0));
    for (var i = 0; i < data.length; i++) {
        // var ispid =  istopPid(data[i].pid,counlist);根据最高顶级

        if (data[i].type == 2) {
            //  car.push(data[i]);  //绑定顶级值
            document.getElementById('Company').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
        }

        if (data[i].type == 1) {
            //     company.push(data[i]);
            document.getElementById('team').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
            document.getElementById('Companypanelqucar').add(new Option(data[i].na, data[i].id));//区域查车
            document.getElementById('Companononline').add(new Option(data[i].na, data[i].id));//区域查车在线的
            document.getElementById('Companonoffline').add(new Option(data[i].na, data[i].id));//区域查车离线的
            document.getElementById('Companonlocat').add(new Option(data[i].na, data[i].id));//位置服务的
        }
    }
    form.render();
    form.on('select(test)', function (data) {
        bitopen = true;
        var id = data.value;
        var datasyuan = fleets[id];
        var listdatas = [];
        var datas = datasour;
        if (data.value != "0") {
            $("#team").empty();
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].pid == data.value && datas[i].type != 2) {
                    document.getElementById('team').add(new Option(datas[i].na, datas[i].id));
                    //获取属于这个公司的车队与车的数据
                    listdatas.push(datas[i]);
                }
                else if (datas[i].pid == data.value && datas[i].type == 0) {
                    $("#team").html("没有车队了。");
                    listdatas.push(datas[i]);
                }
            }
            // listdatas.push(datasyuan);
            listdatas = recursiveteam(listdatas, datas);
            $("#dataTree").empty();
            Serialnumber = 0;
            $.fn.zTree.init($("#dataTree"), setting, listdatas);
            treenodemove(true);
        } else {
            $("#team").empty();
            document.getElementById('team').add(new Option("全部", 0));
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].type == 1) {
                    document.getElementById('team').add(new Option(datas[i].na, datas[i].id));//绑定DropDownList的value值，text值
                }
            }
            countcar();
        }

        // ifuptype(listdatas);
        form.render();
        //treenodemove(true);
        console.log(datas);
    });
    form.on('select(teamss)', function (data) {
        bitopen = true;
        var listdatas = [];
        var id = data.value;
        if (data.value != "0") {
            var datas = datasour;

            var datasyuan = fleets[id];
            listdatas.push(datasyuan);
            listdatas = recursiveteam(listdatas, datas);
        } else {
            for (var i = 0; i < datasour.length; i++) {
                if (datasour[i].type == 0) {
                    listdatas.push(fromdevices(datasour[i]));
                } else {
                    listdatas.push(fromfleet(datasour[i]));
                }
            }
        }
        $("#dataTree").empty();
        Serialnumber = 0;
        $.fn.zTree.init($("#dataTree"), setting, listdatas);
        treenodemove(true);

    })
    //区域查车全部的下拉框
    form.on('select(Companypanelqucarlay)', function (data) {
        if (data.value == "0") {
            $("#finishingTask").bootstrapTable("load", insides);
        } else {
            var listid = [];
            var listdata = [];
            for (var i = 0; i < insides.length; i++) {
                if (alldevices[insides[i].id].pid == data.value) {
                    listdata.push(insides[i]);
                } else {
                }
            }
            $("#finishingTask").bootstrapTable("load", listdata);
        }
    });
    form.on('select(Companononlinelay)', function (data) {
        if (data.value == "0") {
            $("#finishingTaskonline").bootstrapTable("load", finishingTaskonlinedata);
        } else {
            var listid = [];
            var listdata = [];
            for (var i = 0; i < finishingTaskonlinedata.length; i++) {
                if (alldevices[finishingTaskonlinedata[i].id].pid == data.value) {
                    listdata.push(finishingTaskonlinedata[i]);
                } else {
                }
            }
            $("#finishingTaskonline").bootstrapTable("load", listdata);
        }
    });
    form.on('select(Companonofflinelay)', function (data) {
        if (data.value == "0") {
            $("#finishingTaskoffline").bootstrapTable("load", finishingTaskofflinedata);
        }
        else {
            var listid = [];
            var listdata = [];
            for (var i = 0; i < finishingTaskofflinedata.length; i++) {
                if (alldevices[finishingTaskofflinedata[i].id].pid == data.value) {
                    listdata.push(finishingTaskofflinedata[i]);
                } else {
                }
            }
            $("#finishingTaskoffline").bootstrapTable("load", listdata);
        }
    });
    form.on('select(Companonlocatlay)', function (data) {
        console.log(data.value);
    });
}

//判断是不是顶级的
function istopPid(pid, counlist) {
    var i = counlist.indexOf(pid);
    var list = [];
    if (i == -1) {
        list[0] = -1;
        list[1] = false;
        return list
    } else {
        list[0] = i;
        list[1] = true;
        return list
    }
}

//判断是否是最底级
function ifuptype(data) {
    var listdataresh = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].type == 0) {
            listdataresh.push(fromdevices(data[i]));
        } else {
            listdataresh.push(fromfleet(data[i]))
        }
    }
    if (listdataresh.length > 0) {
        $("#dataTree").empty();
        Serialnumber = 0;
        $.fn.zTree.init($("#dataTree"), setting, listdataresh);
        treenodemove(true);
    }
}

//点击位置服务的名称
function locatpoint(id, lng, lat) {
    var point = new BMap.Point(lng, lat);
    Setcenter(point, 15);
}

//判断是不是公司
function istypecompany(type) {
    //公司
    var list = 0;
    if (type === 2) {
        list = 2;
    } else if (type == 1) {
        list = 1
    }
    return list;
}

//车队的类型添加车  参数:车队的数据与整个数据  返回车队与车的数据
function recursiveteam(datateamlist, data) {
    var countlist = [];
    for (var j = 0; j < datateamlist.length; j++) {
        countlist.push(fromfleet(datateamlist[j]));
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid == datateamlist[j].id && data[i].type == 0) {
                countlist.push(fromdevices(data[i]));
            }
        }
    }
    return countlist;
}

//根据车往上找车队返回他的数据带着上级,参数车,整个数据
function screshcar(car, data) {
    var countlist = [];
    var indexofid = [];
    for (var i = 0; i < car.length; i++) {
        //加载所有的车
        countlist.push(fromdevices(car[i]));
        for (var j = 0; j < data.length; j++) {
            //这个车的车队
            if (car[i].pid == data[j].id) {
                if (countlist.length > 0) {
                    //如果这个车的车队已经出现过.
                    var isshow = indexofid.indexOf(data[j].id);
                    if (isshow == -1) {
                        indexofid.push(data[j].id);
                        countlist.push(fromfleet(data[j]));
                    }
                    // console.log(indexofid);
                }
            }
        }

    }
    return countlist;
}

//取消冒泡事件
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}

//根据车转换数据返回车与方向
function returnteamName(data) {
    var listdatathree = data;
    var name = [];
    var listdata = fleets[listdatathree.pId];
    listdatathree.team = listdata.na;

    listdatathree.d = gpsDataParser.parseDirection(listdatathree);
    return listdatathree;
}

//初始化搜索
function textscresh() {

    $("#textscresh").on("keyup", function (event) {
        var len = datasour.length;
        var arr = [];
        var Name = $("#textscresh").val();
        if (Name == "") {
            $("#dataTree").empty();
            Serialnumber = 0;
            bitopen = true;
            for (var i = 0; i < datasour.length; i++) {
                if (datasour[i].type == 0) {
                    arr.push(fromdevices(datasour[i]));
                } else {
                    arr.push(fromfleet(datasour[i]));
                }
            }
            $.fn.zTree.init($("#dataTree"), setting, arr);
            treenodemove(true);
            return;
        }
        var reg = new RegExp(Name);
        for (var i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (datasour[i].na.match(reg)) {
                if (datasour[i].type == 0) {
                    arr.push(datasour[i]);
                }
            }
        }

        var arrs = screshcar(arr, datasour);
        if (arrs.length > 0) {
            $("#dataTree").empty();
            Serialnumber = 0;
            bitopen = true;
            $.fn.zTree.init($("#dataTree"), setting, arrs);
            treenodemove(true);
        }
        //  $.fn.zTree.init($("#dataTree"), setting,listdatacer);
    });
    $("#textscreshcar").on("keyup", function (event) {
        var Name = $("#textscreshcar").val();
        if (Name == "" || Name.length == 0) {
            $("#finishingTask").bootstrapTable("load", insides);
        } else {
            var reg = new RegExp(Name);
            //全部
            var listid = [];
            var listdata = [];
            var trcount = $("#finishingTask tbody").find("tr");
            for (var i = 0; i < trcount.length; i++) {
                if ($(trcount[i].children[1]).text().trim().match(reg)) {
                    listid.push(alldevices[$(trcount[i].children[0]).text()]);
                }
            }
            $("#finishingTask").bootstrapTable("load", listid);
        }
    });
    $("#textscreshcaronline").on("keyup", function (event) {
        //在线
        var Name = $("#textscreshcaronline").val();
        if (Name == "" || Name.length == 0) {
            $("#finishingTaskonline").bootstrapTable("load", finishingTaskonlinedata);
        } else {
            var reg = new RegExp(Name);
            //全部
            var listid = [];
            var listdata = [];
            var trcount = $("#finishingTaskonline tbody").find("tr");
            for (var i = 0; i < trcount.length; i++) {
                if ($(trcount[i].children[1]).text().trim().match(reg)) {
                    listid.push(alldevices[$(trcount[i].children[0]).text()]);
                }
            }
            $("#finishingTaskonline").bootstrapTable("load", listid);
        }
    });
    $("#textscreshcaroffline").on("keyup", function (event) {
        //离线

        var Name = $("#textscreshcaroffline").val();
        if (Name == "" || Name.length == 0) {
            $("#finishingTaskoffline").bootstrapTable("load", finishingTaskofflinedata);
        } else {
            var reg = new RegExp(Name);
            //全部
            var listid = [];
            var listdata = [];
            var trcount = $("#finishingTaskoffline tbody").find("tr");
            for (var i = 0; i < trcount.length; i++) {
                if ($(trcount[i].children[1]).text().trim().match(reg)) {
                    listid.push(alldevices[$(trcount[i].children[0]).text()]);
                }
            }
            $("#finishingTaskoffline").bootstrapTable("load", listid);

        }

    });
    $("#textscreshlocat").on("keyup", function (event) {
        //离线

        var Name = $("#textscreshlocat").val();
        if (Name == "" || Name.length == 0) {

            var tabledata = {list: queryicondata};
            var html = template("tpllocat", tabledata);
            $('#locat_Data').html(html);
        } else {
            var reg = new RegExp(Name);
            //全部
            var listid = [];
            var listdata = [];
            var trcount = $("#locat_Data").find("tr");
            for (var i = 0; i < trcount.length; i++) {
                if ($(trcount[i].children[1]).text().trim().match(reg)) {
                    var arrlist = trcount[i].attributes[0].nodeValue;
                    arrlist = arrlist.substring(12);
                    arrlist = arrlist.replace(")", "");
                    arrlist = arrlist.split(",");
                    /* for(var i =0;i<queryicondata.length;i++){
                         if( queryicondata[i].showName.trim() ==(trcount[i].children[1]).text().trim()){}

                     }*/
                    var Name = {
                        showName: $(trcount[i].children[1]).text().trim(),
                        id: arrlist[0],
                        lng: arrlist[1],
                        alt: arrlist[2]
                    };
                    listid.push(Name);
                }
            }
            var tabledata = {list: listid};
            var html = template("tpllocat", tabledata);
            $('#locat_Data').html(html);
        }
    });
}

//单纯分钟和秒倒计时
function resetTime(time) {
    var t = 9999999999999999999;

    // var t = time;

    function countDown() {
        t--;
        //  console.log( t+"秒");
        $("#countdowntime").html(t);

        if (t == 0) {
            t = time;
            query(false, false);
        }
    }

    timerresetTime = setInterval(countDown, 1000);
}


//地图导航栏收缩
function mapnavigationshrinkage() {
    //last-child最后一个元素
    $(".nav_ul ul li:not(:last-child)").toggle(500);
    if ($(".nav_ul").hasClass("val_ul_hidden")) {
        $(".nav_ul").removeClass("val_ul_hidden");
        $("#map_shrinkage").attr('src', "/static/image/pointimage/xiaohungdeng.png");
        console.log("1");
    } else {
        $("#map_shrinkage").attr('src', "/static/image/pointimage/t2_1.png");
        $(".nav_ul").addClass("val_ul_hidden");
        console.log("2");
    }
}

//车辆列表移入地理位置的时候
function tdmousever() {
    $("#content_data tr td:last-child").mousemove(function (e) {
        $(this).children(".locatNamejingwei").css("display", "none");
        $(this).children(".locatName").css("display", "block");

    })

    $("#content_data tr td:last-child").mouseout(function (e) {
        $(this).children(".locatNamejingwei").css("display", "block");
        $(this).children(".locatName").css("display", "none");
    })
}

//选择计时器的时间
function choosetime() {
    clearTimeout(timerresetTime);
    var opt = $("#status").val();
    var opti = Number(opt);
    resetTime(opti);
}

//递归树形是否为打开状态
function typeisopen(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].type == 0) {
            isopenbyid.push({id: data[i].id, isopen: data[i].checked});
        } else {
            isopenbyid.push({id: data[i].id, isopen: data[i].open});
            //看看有没有子节点   已经有子节点
            return data.children == undefined ? "" : typeisopen(data.children);
        }
    }
}

//保存树形是否存在打开状态
function Set_whether_open(item) {

    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    var nodes = treeObj.getNodes();
    if (nodes.length > 0) {
        //    nodes[0].name = "test";
        // treeObj.updateNode(item);
    }
    treeObj.refresh();
    isopenbyid = [];
    var treeObj1 = $.fn.zTree.getZTreeObj("dataTree");
    var sNodes = treeObj1.getNodes();
    /*console.log(sNodes[0].getCheckStatus());
    console.log(sNodes[0].getNextNode());
    console.log(sNodes[0].getParentNode());
    console.log(sNodes[0].getPreNode());*/
    var nodes = treeObj.getSelectedNodes();
    for (n in nodes) {
        isopenbyid.push({id: nodes[n].id, isopen: nodes[n].checked});
    }
    //这里只循环顶级节点 ,那么顶级节点一定是父子点
    for (var i = 0; i < sNodes.length; i++) {
        var data = sNodes[i];//得到一个顶级父节点
        isopenbyid.push({id: data.id, isopen: data.open});
        console.log(data.children);
        //看看有没有子节点   已经有子节点

        data.children == undefined ? "" : typeisopen(data.children);
    }

    if (isopenbyid.length > 0) {
        for (i in isopenbyid) {
            for (j in item) {
                if (item[j].id == isopenbyid[i].id) {
                    if (item[j].type == 0) {
                        item[j].checked = isopenbyid[i].isopen;
                        //子节点是否选中
                    } else {
                        //父节点是否打开
                        item[j].open = isopenbyid[i].isopen;
                    }
                }
            }
        }
    }

    return item;
}

//打开状态下,赋值
function isopen(data) {
}

//去除重复标注
function Repeat_annotation(id) {
    var allOverlay = locate.webMap.mapObject.getOverlays();
    //  console.log(allOverlay);
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].point != null) {

            // console.log(allOverlay[i].getTitle());
            //判断地图里是否有重复的id
            if (allOverlay[i].getTitle() == id) {
                //   console.log("重复了");
                locate.webMap.mapObject.removeOverlay(allOverlay[i]);
            }
        }
        //if(allOverlay[i].getPosition().y==data.lng)
    }
}

//只有一个东南西北的图标
function removeiconbyid(directions) {
    console.log(this);
    var allOverlay = locate.webMap.mapObject.getOverlays();
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].getTitle() == directions[0].id) {
            allOverlay[i].setIcon(directions[0].icon);
            var label = allOverlay[i].getLabel();
            if (label != null) {
                label.remove();
            }
            if (directions[0].focus == true) {
                //是关注的添加关注  设置东南西北的专属标注
                allOverlay[i].setLabel(directions[0].label);
            } else {
                //不是关注的,清空标注
            }
            allOverlay[i].setRotation(directions[0].direction);
        }
    }
}

//更新树形数据
function updateshuxing(item) {
    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    var nodes = treeObj.getNodes();
    /* console.log(nodes);
     function ischildren() {
         for (var i in nodes) {
             if (nodes[i].type == 0) {
                 for (var k in item) {
                     if (item[k].type == 0 && nodes[i].id == item[k].id) {
                         nodes[i].sp=item[k].sp;
                         nodes[i].m =item[k].m;
                         nodes[i].na = item[k].na;
                     }
                 }
             } else {
                 if (nodes[i].children.length > 0) {

                     ischildren();
                 }
             }
         }
     }
     ischildren();
     console.log(nodes);*/
    nodes[0].children[0].na = "11";
    treeObj.updateNode(nodes[0].children[0]);
}

//更新节点赋值
function fuck(list) {
    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    var nodes = treeObj.getNodes();
    /* $.each(list, function (index, nodes) {
         console.log(nodes);

         if (nodes.type != 0) {
             fuck(nodes.children);

         }else{
                      nodes.sp = 100;
         }
     });*/
    nodes[0].children[0].name = "aaa";
    //   console.log(nodes);
    treeObj.updateNode(nodes[0]);
}

//树形右击事件
function zTreeOnRightClick(event, treeId, treeNode) {

    if (treeNode == null || treeNode.pId == null) return;
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        showRMenu("root", 154, event.clientY - 114);
    } else if (treeNode && !treeNode.noR) {
        showRMenu("node", 154, event.clientY - 114);
    }
}

//显示右键菜单
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    $("#rMenu").css({"top": y + "px", "left": x + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
    $("body").bind("mousedown", onBodyMouseDown);
}

//隐藏右键菜单
function hideRMenu() {
    if ($("#rMenu")) $("#rMenu").css({"visibility": "hidden"}); //设置右键菜单不可见
    $("body").unbind("mousedown", onBodyMouseDown);
}

//鼠标按下事件
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        $("#rMenu").css({"visibility": "hidden"});
    }
}

//刷新之后变颜色增加
function addcolorli(data) {
    var butong = `<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian(${data.dn})' value='点名' ></input> ` +
        "<input type='button' value='资料'></input>   </li>";
    var a = $("#" + data.id).parent().parent();
    a.addClass("ztreeonClickbackground");
    a.append(butong);
}

//上传视野
function Uploadvision() {
    var currervision = locate.webMap.mapObject.getBounds();
    var center = locate.webMap.mapObject.getCenter();
    var getZoomgetZoom = locate.webMap.mapObject.getZoom();

    console.log(currervision);
    var Viewport = new Object();
    //获取当前缩放等级
    Viewport.level = getZoomgetZoom;
    Viewport.lng = center.lng;
    Viewport.alt = center.lat;

    $.ajax({
        url: "/viewport/set", //请求地址
        dataType: "json", //数据格式
        data: {
            viewport: Viewport,
            level: Viewport.level,
            lng: Viewport.lng,
            alt: Viewport.alt

        },
        type: "post", //请求方式
        async: false, //是否异步请求
        success: function (data) { //如何发送成功
            console.log(data);
            if (data == 1) {
                layer.msg("上传视野成功");
            } else {
                layer.msg("上传视野失败");
            }
        }
    })
}

