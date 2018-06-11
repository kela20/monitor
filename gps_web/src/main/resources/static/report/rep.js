var replay = {

    /**
     * 设备号
     */
    deviceNumber: null,
    /**
     * 分页下载时的页大小
     */
    pageSize: 100,
    /**
     * 播放状态:初始化(init),下载中(loading),下载完成(loaded), 播放中(play),暂停(pause),停止(stop)
     */
    playStatus: 'init',
    /**
     * setTimeout
     */
    timer: null,
    statistics: 1,
    /**
     * 分页的当前页
     */
    layerpageindex: null,

    pagelength: null,

    /**
     * 播放速度
     */
    playAccelerate: 1000,
    /**
     * 位置数据总数
     */
    trackCount: 0,
    /**
     * 位置数据
     */
    tracks: [],
    /**
     * 正在播放位置数据
     */
    playtracks: [],

    numberstr: null,

    /**
     * 正在播放的tihs
     */
    playthis: null,
    /**
     * 正在播放位置数据
     */
    drivingedtracks: [],

    /**
     * 页序号
     */
    pageIndex: 0,
    /**
     * 地图
     */
    webMap: null,
    /**
     * 信息窗口
     */
    infoWindow: null,
    /**
     * 行程
     */
    trips: {
        list: [],
        days: {}
    },

    /**
     * 按天的行程
     */
    dtrips: {
        list: [],
        days: {}
    },
    /**
     * 停车
     */
    parks: {
        list: [],
        days: {}
    },
    /**
     * 报警
     */
    alarms: {
        list: [],
        days: {}
    },
    /**
     * 线段
     */
    speeds: [],

    webMap: undefined,

    onMapLoaded: function (map) {
        replay.webMap = map;


    },
    /**
     * 数据下载完成
     */
    downloadCompleted: function () {
        replay.playStatus = 'loaded';
        replay.vehicleMarker = null;
        replay.index = 0;
        replay.pageIndex = 0;
        this.trips = {
            list: [],
            days: {}
        };
        this.parks = {
            list: [],
            days: {}
        };

        this.dtrips= {
            list: [],
            days: {}
        };


        this.alarms = {
            list: [],
            days: {}
        };
        this.speeds = [];
        console.warn(this)
        var acc = null;
        /**
         * 行程
         */
        var trip = {
            data: []
        };

        var divisionDate;
        /**
         * 按天的行程
         */
        var dtrip = {
            data: []
        };
        /**
         * 速度计
         */
        var velocimeter = {
            total: 0,
            times: 0
        };
        /**
         * 里程计
         */
        var milemeter = {
            start: this.tracks[0].m,
            befor: 0,
            reset: null,
            end: this.tracks[this.tracks.length - 1].m
        };
        /**
         * 油量计
         */
        oilmeter = {
            total: 0,
            befor: null
        };
        /**
         * 行驶时间
         */
        var runtimes = 0;

        for (var x = 0; x < this.tracks.length; x++) {
            // var item = this.tracks[x];
            var item = this.tracks[x];
            item.na = this.plateNumber;

            if (item.a !== 0) {
                var date = item.gt.toDate().toShortDateString();
                this.alarms.days[date] = this.alarms.days[date] || [];
                this.alarms.days[date].push(item);
                this.alarms.list.push(item);
            }
            this.speeds.push({
                x: item.gt.toDate().getTime(),
                y: item.sp
            });

            // 速度
            if (item.sp > 0) {
                velocimeter.total += item.sp;
                velocimeter.times++;
            }
            if(x==0){
                replay.allMaxSp=item.sp;
            }

            if(replay.allMaxSp<item.sp){
                replay.allMaxSp=item.sp;
            }


            // 里程是否有归零
            if (!item.reset)
                milemeter.befor = item.m;
            if (item.m < milemeter.befor && !item.reset)
                milemeter.reset = item.m;

            // 统计油耗
            if (oilmeter.befor) {
                var oil = oilmeter.befor - item.oil;
                if (oil > 0)
                    oilmeter.total += oil;
            }
            oilmeter.befor = item.oil;

            // 分析
            var accStatus = gpsDataParser.parseAcc(item);
            //console.log("accStatus : " + accStatus);
            if (!trip.acc) {
                trip.acc = accStatus;
                trip.timeStart = item.gt;
                trip.pointStart = {
                    lng: item.olng,
                    lat: item.olat
                };
                trip.mileageStart = item.m;
                trip.oilStart = item.oil;
            } else if (trip.acc === accStatus) {
                trip.data.push(item);
                // 查检最后一条记录
                if (x == this.tracks.length - 1) {
                    trip.timeEnd = item.gt;
                    trip.pointEnd = {
                        lng: item.olng,
                        lat: item.olat
                    };
                    trip.mileageEnd = item.m;
                    trip.oilEnd = item.oil;
                    if (trip.acc == '点火') {// 行驶中
                        var date = trip.timeStart.toDate().toShortDateString();
                        this.trips.days[date] = this.trips.days[date] || [];
                        this.trips.days[date].push(trip);
                        this.trips.list.push(trip);

                        // 统计行驶时间
                        var end = trip.timeEnd.toDate().getTime();
                        var start = trip.timeStart.toDate().getTime();
                        runtimes += end - start;
                    } else {// 停车中
                        var date = trip.timeStart.toDate().toShortDateString();
                        this.parks.days[date] = this.parks.days[date] || [];
                        this.parks.days[date].push(trip);
                        this.parks.list.push(trip);
                        // 找出上一个行程
                        if (this.trips.list.length > 0) {
                            var prev = this.trips.list[this.trips.list.length - 1]
                            prev.timeNext = item.gt;
                        }
                    }
                }
            } else {
                trip.timeEnd = item.gt;
                trip.pointEnd = {
                    lng: item.olng,
                    lat: item.olat
                };
                trip.mileageEnd = item.m;
                trip.oilEnd = item.oil;
                if (trip.acc == '点火') {// 行程结束
                    trip.data.push(item);
                    var date = trip.timeStart.toDate().toShortDateString();
                    this.trips.days[date] = this.trips.days[date] || [];
                    this.trips.days[date].push(trip);
                    this.trips.list.push(trip);

                    // 统计行驶时间
                    var end = trip.timeEnd.toDate().getTime();
                    var start = trip.timeStart.toDate().getTime();
                    runtimes += end - start;
                } else {// 行程开始
                    trip.data.push(item);
                    var date = trip.timeStart.toDate().toShortDateString();
                    this.parks.days[date] = this.parks.days[date] || [];
                    this.parks.days[date].push(trip);
                    this.parks.list.push(trip);
                    // 找出上一个行程
                    if (this.trips.list.length > 0) {
                        var prev = this.trips.list[this.trips.list.length - 1]
                        prev.timeNext = item.gt;
                    }
                }
                trip = {
                    data: []
                };
                trip.acc = accStatus;
                trip.timeStart = item.gt;
                trip.pointStart = {
                    lng: item.olng,
                    lat: item.olat
                };
                trip.mileageStart = item.m;
                trip.oilStart = item.oil;
                // 找出上一个停车点
                if (trip.acc == '点火' && this.parks.list.length > 0) {
                    var prev = this.parks.list[this.parks.list.length - 1];
                    trip.data.push(prev.data[0]);
                }
                trip.data.push(item);

            }

            //这里处理按天统计的 ，上面那个按acc的必须存在
            if(replay.statistics == 1){
                if(x==0){  //一开始
                    dtrip = {
                        data: []
                    };
                    dtrip.acc = accStatus;
                    //  console.log(" item.gt : "+item.gt.toDate().toDateTimeString("MM-dd hh:mm:ss") );
                    dtrip.timeStart = item.gt;
                    dtrip.pointStart = {
                        lng: item.olng,
                        lat: item.olat
                    };
                    dtrip.mileageStart = item.m;
                    dtrip.oilStart = item.oil;

                    divisionDate=item.gt.toDate().toShortDateString();
                    dtrip.data.push(item);
                }

                if( divisionDate==item.gt.toDate().toShortDateString()){
                    dtrip.data.push(item);
                    //  console.log(" item.gt : "+item.gt.toDate().toDateTimeString("MM-dd hh:mm:ss") );
                    // 查检最后一条记录
                    if (x == this.tracks.length - 1) {
                        var item2 = this.tracks[x-1];
                        dtrip.timeEnd = item2.gt;
                        dtrip.pointEnd = {
                            lng: item2.olng,
                            lat: item2.olat
                        };
                        dtrip.mileageEnd = item2.m;
                        dtrip.oilEnd = item2.oil;

                        this.dtrips.days[divisionDate] = this.dtrips.days[divisionDate] || [];
                        this.dtrips.days[divisionDate].push(dtrip);
                        this.dtrips.list.push(dtrip);
                    }
                }else{
                    //这里找到昨天的
                    console.log(" item.gt : "+item.gt.toDate().toDateTimeString("MM-dd hh:mm:ss") );
                    var item2 = this.tracks[x-1];
                    dtrip.timeEnd = item2.gt;
                    dtrip.pointEnd = {
                        lng: item2.olng,
                        lat: item2.olat
                    };
                    dtrip.mileageEnd = item2.m;
                    dtrip.oilEnd = item2.oil;

                    this.dtrips.days[divisionDate] = this.dtrips.days[divisionDate] || [];
                    this.dtrips.days[divisionDate].push(dtrip);
                    this.dtrips.list.push(dtrip);

                    //设置成今天的
                    dtrip = {
                        data: []
                    };
                    dtrip.acc = accStatus;
                    dtrip.timeStart = item.gt;
                    dtrip.pointStart = {
                        lng: item.olng,
                        lat: item.olat
                    };
                    dtrip.mileageStart = item.m;
                    dtrip.oilStart = item.oil;
                    divisionDate=item.gt.toDate().toShortDateString();
                    dtrip.data.push(item);
                }

            }
        }


        for (var x = 0; x < this.parks.list.length; x++) {
            var park = this.parks.list[x];
            if (park.data && park.data.length > 0) {

            }
        }


        // 更新平均速度
        var averageSpeed = velocimeter.times == 0 ? 0 : velocimeter.total / velocimeter.times;

        // 更新里程
        var mileage = milemeter.end - milemeter.start;
        if (milemeter.reset) {
            mileage = milemeter.befor - milemeter.start;
            mileage += milemeter.end;
        }

        var averageOil = 0;
        if (mileage > 0) {
            averageOil = oilmeter.total / mileage * 100;
        }


        if(replay.statistics==1){
            for (var x in this.dtrips.days) {
                var daytrips = this.dtrips.days[x];
                var trip = daytrips[0];
                console.log(" s : "+ trip.timeStart.toDate().toDateTimeString("MM-dd hh:mm:ss") +"   e : "+trip.timeEnd.toDate().toDateTimeString("MM-dd hh:mm:ss"));
                parseTrip(0, trip);
            }
        }else{
            // 更新行程表
            for (var x in this.trips.days) {
                var daytrips = this.trips.days[x];
                updateGridReplayTrackRow(daytrips);
            }
        }



        /**
         * 更新行程表
         */
        function updateGridReplayTrackRow(daytrips) {
            for (var index = 0; index < daytrips.length; index++) {
                var trip = daytrips[index];
                parseTrip(index, trip);
            }
        }

        parseAllTrip(this.tracks);

        /**
         * 解析所有行程
         */
        function parseAllTrip(tracks) {
            // 更新平均速度
            var averageSpeed = velocimeter.times == 0 ? 0 : velocimeter.total / velocimeter.times;
            //   $('#txtAverageSpeed').text(common.round(averageSpeed, 1) + "km/h");
            // 更新行驶时长
            //   $('#txtRunTime').text(common.timespan(runtimes));
            // 更新里程
            var mileage = milemeter.end - milemeter.start;
            if (milemeter.reset) {
                mileage = milemeter.befor - milemeter.start;
                mileage += milemeter.end;
            }
            //  $('#txtRunMileage').text(common.round(mileage, 1) + 'km');
            // 更新油耗
            //  $('#txtRunOil').text(common.round(oilmeter.total, 1) + 'L');
            var averageOil = 0;
            if (mileage > 0) {
                averageOil = oilmeter.total / mileage * 100;
            }
            // $('#txtAverageOil').text(common.round(averageOil, 1) + 'L/100km');

            var dates = replay.selectDate();
            // var startDate = dates.start.toDateTimeString();
            // console.log(startDate);
            // if (!dates) {
            //     layer.msg('<div style="color: #0C0C0C">请选择时间段！</div>', {icon: 4});
            //
            //     return;
            // }
            // if (dates.valid === false)
            //     return;
            // var startDate = dates.start.toDateTimeString();
            // var endDate = dates.end.toDateTimeString();


            //结束


            var trip = {
                data: tracks
            };
            var newRow = {};
            console.log(trip);
            // newRow.push({
            //     timeStart: dates.start.toDateTimeString("MM-dd hh:mm:ss")
            //
            // });
            //
            // newRow.push(
            //     {
            //         timeEnd: dates.end.toDateTimeString("MM-dd hh:mm:ss")
            //
            //     }
            // );


            newRow.mileage = common.round(mileage, 1);
            newRow.averageSpeed = common.round(averageSpeed, 1);
            newRow.oilmeter = common.round(oilmeter.total, 1);
            newRow.runtimes = common.timespan(runtimes, 1);
            newRow.pointStart = {lng: tracks[0].olng, lat: tracks[0].olat};
            newRow.pointEnd = {lng: tracks[tracks.length - 1].olng, lat: tracks[tracks.length - 1].olat};


            replay.fuck = [];
            replay.fuck.push(newRow)
            // row.data('trip', trip);


        }

        /**
         * 解析行程
         */
        function parseTrip(index, trip) {
            var timeStart = trip.timeStart.toDate().getTime();
            var timeEnd = trip.timeEnd.toDate().getTime();
            var milliseconds = timeEnd - timeStart;
            var runtimes = common.timespan(milliseconds);
            trip.runtimes = runtimes;

            trip.paktimes = '行驶中......';
            if (trip.timeNext) {
                var timeNext = trip.timeNext.toDate().getTime();
                milliseconds = timeNext - timeEnd;
                var paktimes = common.timespan(milliseconds);
                trip.paktimes = paktimes;
            }
            /**
             * 速度计
             */
            var velocimeter = {
                total: 0,
                times: 0
            };
            /**
             * 油量计
             */
            oilmeter = {
                total: 0,
                befor: null
            };
            var maxSp;
            /**
             * 里程计
             */
            var milemeter = {
                start: trip.data[0].m,
                befor: 0,
                reset: null,
                end: trip.data[trip.data.length - 1].m
            };


            var maxss = [];

            trip.mileages = 0;
            if (trip.data) {
                for (var index = 0; index < trip.data.length; index++) {
                    var item = trip.data[index];
                    // 速度
                    if (item.sp > 0) {
                        velocimeter.total += item.sp;
                        velocimeter.times++;
                    }

                    if(index==0){
                        maxSp= item.sp;
                    }
                    if(maxSp<item.sp){
                        maxSp= item.sp;
                    }

                    // 里程是否有归零
                    if (!item.reset)
                        milemeter.befor = item.m;
                    if (item.m < milemeter.befor && !item.reset)
                        milemeter.reset = item.m;

                    // 统计油耗
                    if (oilmeter.befor) {
                        var oil = oilmeter.befor - item.oil;
                        if (oil > 0)
                            oilmeter.total += oil;
                    }
                    oilmeter.befor = item.oil;
                    maxss.push(item.sp)
                }
            }
            var max = Math.max.apply(null, maxss);
            trip.max = max;


            var extimes = 0;

            for (var mm of maxss) {
                if (mm > 10) {
                    extimes++;
                }
            }
            trip.extimes = extimes;
            // 更新平均速度
            var averageSpeed = velocimeter.times == 0 ? 0 : velocimeter.total / velocimeter.times;
            trip.averageSpeed = common.round(averageSpeed, 1);
            trip.maxSp = common.round(maxSp, 1);
            // 更新里程
            var mileage = milemeter.end - milemeter.start;
            if (milemeter.reset) {
                mileage = milemeter.befor - milemeter.start;
                mileage += milemeter.end;
            }
            trip.mileages = common.round(mileage, 1);
            trip.oils = common.round(oilmeter.total, 1);
            // 更新油耗
            var averageOil = 0;
            if (mileage > 0) {
                averageOil = oilmeter.total / mileage * 100;
            }
            trip.averageOil = common.round(averageOil, 1);


            console.log("=====");
            console.log(trip);


        }

        // 更新停车表

        for (var x in this.parks.days) {
            var daytrips = this.parks.days[x];
            // var newRow = [];
            // newRow.push('<tr>');
            // newRow.push('<td>');
            // newRow.push('	<div style = "background-color: #00ade1;">');
            // newRow.push('		<b>' + date + '停车记录</b>');
            // newRow.push('		<hr />');
            // newRow.push('	</div>');
            // newRow.push('</td>');
            // newRow.push('</tr>');
            // var row = newRow.join('');
            // $("#gridReplayPark").append($(row));
            updateGridReplayParkRow(daytrips);
        }

        /**
         * 更新停车表
         */
        function updateGridReplayParkRow(daytrips) {
            for (var index = 0; index < daytrips.length; index++) {
                var trip = daytrips[index];
                parsePark(trip);
            }
        }

        /**
         * 解析停车
         */
        function parsePark(trip) {
            var timeStart = trip.timeStart.toDate().getTime();
            var timeEnd = trip.timeEnd.toDate().getTime();
            var milliseconds = timeEnd - timeStart;
            var paktimes = common.timespan(milliseconds);
            trip.paktimes = paktimes;

            // var newRow = [];
            // newRow.push('<tr>');
            // newRow.push('<td>');
            // newRow.push('	<div><div class="mon-icon-h-x16 i-16-parkpoint"></div>');
            // newRow.push('		<span style="color:red;">' + trip.timeStart.toDate().toDateTimeString('hh:mm:ss') + '-'
            //     + trip.timeEnd.toDate().toDateTimeString('hh:mm:ss') + '</span>');
            // newRow.push('		<span style="color:#999999;">停车:<span style="color:red;">' + trip.paktimes + '</span></span>');
            // newRow.push('		<span style="color:#999999;">地点:<span name="address" style="color:#999999;"></span></span>');
            // newRow.push('	</div><hr>');
            // newRow.push('</td>');
            // newRow.push('</tr>');
            // var row = $(newRow.join(''));
            // $("#gridReplayPark").append(row);
            // row.data('trip', trip);
            // row.on("click", function () {
            //     $("#gridReplayPark").find(".tr-selected").removeClass('tr-selected');
            //     $(this).addClass('tr-selected');
            //     var trip = $(this).data('trip');
            //     if (trip) {
            //         // 画点
            //         if (replay.selectedPark)
            //             replay.selectedPark.dispose();
            //         if (trip.data && trip.data.length > 0) {
            //             replay.selectedPark = webMap.createMarker({
            //                 map: replay.webMap,
            //                 data: trip.data[0],
            //                 allowShowLabel: false,
            //                 infoWindow: replay.infoWindow,
            //                 icon: {
            //                     url: '../static/img/car.png',
            //                     offset: 0
            //                 },
            //                 iconAnchor: {
            //                     x: 16,
            //                     y: 32
            //                 }
            //             });
            //             replay.selectedPark.openInfoWindow();
            //         }
            //     }
            // });
            // replay.webMap.queryAddress(trip.pointStart.lng, trip.pointStart.lat, function (address, row) {
            //     row.find('span[name="address"]').text(address);
            // }, row);
        }

        // 更新报警表

        for (var x in replay.alarms.days) {
            var dayalarms = replay.alarms.days[x];
            // var newRow = [];
            // newRow.push('<tr>');
            // newRow.push('<td>');
            // newRow.push('	<div>');
            // newRow.push('		<b>' + date + '报警记录</b>');
            // newRow.push('		<hr />');
            // newRow.push('	</div>');
            // newRow.push('</td>');
            // newRow.push('</tr>');
            // var row = newRow.join('');
            // $("#gridReplayAlarm").append($(row));
            updateGridReplayAlarmRow(dayalarms);
        }

        /**
         * 更新报警表
         */
        function updateGridReplayAlarmRow(dayalarms) {
            for (var index = 0; index < dayalarms.length; index++) {
                var alarm = dayalarms[index];
                parseAlarm(alarm);
            }
        }

        /**
         * 解析报警
         */
        function parseAlarm(alarm) {
            // var newRow = [];
            // newRow.push('<tr>');
            // newRow.push('<td>');
            // newRow.push('	<div><div class="mon-icon-h-x16 i-16-alarmpoint"></div>');
            // newRow.push('		<span>' + alarm.gt.toDate().toDateTimeString('hh:mm:ss') + '</span><br />');
            // newRow.push('		<span style="color:#999999;">报警:<span style="color:red;">' + gpsDataParser.parseAlarm(alarm) + '</span></span><br />');
            // newRow.push('		<span style="color:#999999;">地点:<span name="address" style="color:#999999;"></span></span>');
            // newRow.push('	</div>');
            // newRow.push('</td>');
            // newRow.push('</tr>');
            // var row = $(newRow.join(''));
            // $("#gridReplayAlarm").append(row);
            // row.data('alarm', alarm);
            // row.live("click", function () {
            //     $("#gridReplayAlarm").find(".tr-selected").removeClass('tr-selected');
            //     $(this).addClass('tr-selected');
            //     var alarm = $(this).data('alarm');
            //     if (alarm) {
            //         // 画点
            //         if (replay.selectedAlarm)
            //             replay.selectedAlarm.dispose();
            //         if (alarm) {
            //             replay.selectedAlarm = webMap.createMarker({
            //                 map: replay.webMap,
            //                 data: alarm,
            //                 allowShowLabel: false,
            //                 infoWindow: replay.infoWindow,
            //                 icon: {
            //                     url: '../resources/images/alarmpoint.png',
            //                     offset: 0
            //                 },
            //                 iconAnchor: {
            //                     x: 16,
            //                     y: 32
            //                 }
            //             });
            //             replay.selectedAlarm.openInfoWindow();
            //         }
            //     }
            // });
            // replay.webMap.queryAddress(alarm.olng, alarm.olat, function (address, row) {
            //     row.find('span[name="address"]').text(address);
            // }, row);
        }

        // replay.resetSpeedChart(replay.speeds);
        // replay.resetButtons(1, 2);


    },
    download: function (number, start, end, pageIndex, pageSize, callback) {
        replay.playStatus = 'loading';
        // 对时间需要计算
        $.post('../replay/load', {
            number: number,
            start: start,
            end: end,
            pageIndex: pageIndex,
            pageSize: 500
        }, function (list) {
            if (list && list.length > 0) {

                console.log("dd")
                replay.webMap.translate(list, 0, function () {

                    replay.pageIndex++;
                    console.log(replay.pageIndex)
                    replay.tracks = replay.tracks.concat(list);
                    // console.log("ss")
                    if (replay.tracks.length >= replay.trackCount) {
                        // console.log("aa")
                        replay.downloadCompleted();
                        $("#pb").empty();
                        callback && callback();
                    } else {

                        if (replay.trackCount && replay.trackCount > 0) {
                            var ratio = replay.tracks.length / replay.trackCount;
                            var width = Math.round(ratio * 100);
                            if (width > 100)
                                width = 100;
                            var ratioText = width + '%';
                            console.log(replay.trackCount)
                            console.log(ratio)
                            console.log(replay.tracks.length)
                            var element = layui.element;
                            element.progress('demo', ratioText);
                            // $('#divProcess > div').css('width', ratioText);
                        }
                        replay.download(number, start, end, replay.pageIndex, replay.pageSize, callback);
                    }

                });
            }
        });
    },


    /**
     * 选取时间
     */
    selectDate: function () {
        var dateStart = new Date().addDays(-1);
        var dateEnd = new Date();

        var start = replay.txtStartTime;
        var end = replay.txtEndTime;

        console.log(start + " ++++" + end);
        if (start == null || end == null)
            return null;
        else {
            dateStart = new Date(start);
            dateEnd = new Date(end);
        }

        if (dateStart.getOffDays(dateEnd) > 7) {
            console.log('时间范围不超过7天');

            this.resetButtons(1);
            return {
                start: dateStart,
                end: dateEnd,
                valid: false
            };
        }

        return {
            start: dateStart,
            end: dateEnd,
            valid: true
        };
    },
}





