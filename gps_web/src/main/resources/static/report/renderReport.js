function renderReport(url) {


    var shitbar = `
     <div class="layui-form layui-form-pane demoTable" id="mmpxxx" style="width: 100%;">
    
    <div class="layui-form-item">
    <!--<label class="layui-form-label">联动选择框</label>-->
    <div class="layui-input-inline">
      <select id="com" lay-filter="com" >
        <option value="">公司</option>
      </select>
    </div>
    <div class="layui-input-inline">
      <select id="carg" lay-filter="carg">
        <option value="">车队</option>
 
      </select>
        </div>
       <div class="layui-input-inline">
      <select id="dn" lay-filter="dn">
    <option value="">车牌</option>
 
      </select >
      
      </div>
      
          <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">时间</label>
      <div class="layui-input-inline">
         <select name="time" lay-filter="time">
         
        <option value="">请选择</option>
        <option value="今天">今天</option>
        <option value="昨天">昨天</option>
        <option value="本周">本周</option>
    
    
      </select >
      </div>
    
      <label class="layui-form-label">开始时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test19" placeholder="yyyy-MM-dd">
      </div>
      
       <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">结束时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test20" placeholder="yyyy-MM-dd">
      </div>
      
 
      
    </div>
     
       
       
     
                <div class="layui-inline sbox" style="width: 20%" >
                    <input class="layui-input" name="id" id="tableReload" autocomplete="off" style="color: black;">
                </div>
                <button class="layui-btn  layui-bg-blue "  id="search">查询</button>
 
 
                     
                     
                      </div>
     </div>
     
     
     
    `;


    document.getElementById("shitBar").innerHTML = shitbar;
    var table = layui.table;
    console.log(url);

    var com = [];
    var carg = [];
    var dn = [];
    var na = [];


    jQuery.ajax({
        url: "/locate/groupVehicles", //请求地址
        dataType: "json", //数据格式
        data: {
            force: true
        },
        type: "post", // 请求方式
        async: false, //是否异步请求
        success: function (data) { //如何发送成功


            function fuckCom(data, id, wap) {
                jQuery.each(data, function (index, shit) {
                    if (shit.pid === id && shit.type === 1) {
                        fuckCom(data, shit.id, wap);
                        wap.push(shit);
                    }
                });
            }

            function fuckCarg(data, id, wap) {
                jQuery.each(data, function (index, shit) {
                    if (shit.pid === id && shit.type === 0) {
                        fuckCarg(data, shit.id, wap);
                        wap.push(shit);
                    }
                });
            }

            jQuery.each(data, function (index, shit) {
                // console.log(shit);
                if (shit.type === 2) {
                    var a = {};
                    a.com = shit;
                    a.c = [];
                    com.push(a);

                    fuckCom(data, shit.id, a.c)
                } else if (shit.type === 1) {
                    var b = {};
                    b.carg = shit;
                    b.c = [];
                    carg.push(b);
                    fuckCarg(data, shit.id, b.c)
                } else {
                    na.push(shit)
                }

            });
            console.log(com)
            console.log(carg)
            console.log(na)


            //
            jQuery.each(com, function (index, data) {
                var Option = `<option value= ${data.com.na} dataid=${data.com.id}>  ${data.com.na}  </option>`;

                jQuery("#com").append(Option);

            });

        },
    })


    var form = layui.form;
    form.render();

    form.on('select(com)', function (data) {
        console.log(data.elem.getAttribute("dataid")); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        console.log(data.othis); //得到美化后的DOM对象

        var cccc;

        jQuery("#carg").empty();
        jQuery.each(com, function (index, ff) {


            console.log(ff)
            if (ff.com.id === jQuery("#com").find("option:selected").attr("dataid")) {
                cccc = ff;
                console.log(cccc)
                console.log(cccc)


                var Option = `<option  >  请选择 </option>`;

                jQuery("#carg").append(Option);

                jQuery.each(ff.c, function (index, ddd) {


                    // console.log(ddd)
                    // if (ddd..id == data.elem.getAttribute("dataid"))

                    var Option = `<option value= ${ddd.na} dataid=${ddd.id}>  ${ddd.na}  </option>`;

                    jQuery("#carg").append(Option);


                });
                var form = layui.form;
                form.render();
                // var Option = `<option value= ${ff.com.na} dataid=${ff.com.id}>  ${ff.com.na}  </option>`;
            }


            // jQuery("#com").append(Option);

        });


        var form = layui.form;
        form.render();

        form.on('select(carg)', function (data) {
            console.log(data.elem.getAttribute("dataid")); //得到select原始DOM对象
            console.log(data.value); // 得到被选中的值
            console.log(data.othis); //得到美化后的DOM对象
            jQuery("#dn").empty();

            var Option = `<option  >  请选择 </option>`;

            jQuery("#dn").append(Option);

            jQuery.each(carg, function (index, ff) {


                console.log(ff)
                // if (ff.id == data.elem.getAttribute("dataid"))


                if (ff.carg.id === jQuery("#carg").find("option:selected").attr("dataid")) {


                    jQuery.each(ff.c, function (index, ddd) {


                        // console.log(ddd)
                        // if (ddd..id == data.elem.getAttribute("dataid"))

                        var Option = `<option value= ${ddd.dn} dataid=${ddd.id} na= ${ddd.na} >  ${ddd.na}  </option>`;

                        jQuery("#dn").append(Option);


                    });
                    var form = layui.form;
                    form.render();


                }


            });


            var form = layui.form;
            form.render();


        });


    });

    var laydate = layui.laydate;
    //初始赋值
    laydate.render({
        elem: '#test19'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm:ss'
        , value: formatTimeMin()
        , done: function (value, date, endDate) {
            // alert(value); //得到日期生成的值，如：2017-08-18

        }
    });

    //初始赋值
    laydate.render({
        elem: '#test20'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm:ss'
        , value: formatTime()
        , done: function (value, date, endDate) {
            // alert(value); //得到日期生成的值，如：2017-08-18

        }
    });
    form.on('select(time)', function (data) {
        console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); // 得到被选中的值
        console.log(data.othis);

        if (data.value === "今天") {
            laydate.render({
                elem: '#test19'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: formatTimeMin()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });
            laydate.render({
                elem: '#test20'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: formatTime()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });
        } else if (data.value === "昨天") {
            laydate.render({
                elem: '#test19'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: new Date().addDays(-2).toDateTimeString()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });
            laydate.render({
                elem: '#test20'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: new Date().addDays(-1).toDateTimeString()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });

        } else if (data.value === "本周") {
            laydate.render({
                elem: '#test19'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: new Date().addDays(-6).toDateTimeString()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });
            laydate.render({
                elem: '#test20'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH:mm:ss'
                , value: new Date().toDateTimeString()
                , done: function (value, date, endDate) {
                    // alert(value); //得到日期生成的值，如：2017-08-18

                }
            });
        }


        var form = layui.form;
        form.render();
    });


    var form = layui.form;
    form.render();


    function formatTimeMin() {
        return new Date().addDays(-1).toDateTimeString();
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
        // var day = date.getDate() - 1, day = day < 10 ? '0' + day : day;
        // return year + '-' + month + '-' + day;
    }

    function formatTime() {
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
        // var day = date.getDate(), day = day < 10 ? '0' + day : day;
        // return year + '-' + month + '-' + day;
        return new Date().toDateTimeString();
    }


    var checkShitHistoryOnlineOffline = [];


    var ass = webMap.createMap("a");
    window.webMap.events.onMapLoadCompleted['a'] = replay.onMapLoaded;


    jQuery("#search").click(function () {

        if (jQuery("#dn").find("option:selected").val() == '' || jQuery("#dn").find("option:selected").val() == '请选择') {
            layer.msg("请选择");
            return;
        }

        $("#theTable").bootstrapTable('destroy');
        $("#pb").html('<div class="layui-progress-bar layui-bg-blue"   lay-percent="0%"></div>')
        var dddnnn;
        jQuery.ajax({
            url: '/device/getD',
            type: "GET",
            data: {
                deviceNumber: jQuery("#dn").find("option:selected").val()
            },
            async: false,
            success: function (res) {
                dddnnn = res;
            }
        });


        var aaabbb;
        jQuery.ajax({
            url: '/vehicle/getByD',
            type: "GET",
            data: {

                dn: jQuery("#dn").find("option:selected").val()
            },
            async: false,
            success: function (res) {
                aaabbb = res;
            }
        });
        // jQuery("#theTable").empty();
        var eee;
        jQuery.ajax({
            url: ' /vehicle/getW',
            type: "GET",
            data: {
                dn: jQuery("#dn").find("option:selected").val()
            },
            async: false,
            success: function (res) {
                eee = res;

            }
        });
        replay.tracks = []
        jQuery.ajax({
            url: '../replay/count',
            type: "POST",
            data: {
                number: jQuery("#dn").find("option:selected").val(),
                // number: 120187322620,
                //
                // start: '2018-05-17 14:51:27',
                // end: '2018-05-18 14:51:27'
                start: jQuery("#test19").val(),
                end: jQuery("#test20").val()
            },
            success: function (r) {
                // 获取历史数据总数量
                replay.trackCount = r.total;


                if (replay.trackCount <= 0) {
                    layer.msg('<div style="color: #0C0C0C">此时间段无数据！</div>', {icon: 4});
                    return;
                }


                // replay.download(120187322620, '2018-05-17 14:51:27', '2018-05-18 14:51:27', 1, replay.pageSize, function () {
                replay.download(jQuery("#dn").find("option:selected").val(), jQuery("#test19").val(), jQuery("#test20").val(), 1, replay.pageSize, function () {
                    console.log(replay.trips);
                    console.log(replay.parks);
                    console.log(replay.tracks);

                    var sp = []

                    for (var x in replay.speeds) {
                        var it = replay.speeds[x];
                        sp.push(it.y);

                    }


                    var max = Math.max.apply(null, sp);

                    replay.tracks.mile = 0;
                    replay.tracks.index = 0;

                    jQuery.each(replay.tracks, function (index, ddd) {

                        ddd.com = jQuery("#com").find("option:selected").val();
                        ddd.carg = jQuery("#carg").find("option:selected").val();
                        ddd.pn = jQuery("#dn").find("option:selected").attr("na");
                        ddd.deviceNumber = dddnnn.deviceNumber;

                        ddd.lICENSEPLATESELFNUM = eee.lICENSEPLATESELFNUM;
                        ddd.model = dddnnn.model;
                        ddd.imei = dddnnn.iMEI;
                        ddd.drin = "";
                        ddd.oilWear = eee.oilWear;
                        for (var jjj of aaabbb.rows) {
                            ddd.drin += (jjj.name + " ");
                        }
                        ddd.drip = "";
                        for (var jjj of aaabbb.rows) {
                            ddd.drip += (jjj.phone + " ");
                        }


                        if (replay.tracks.index < replay.tracks.length - 1) {


                            replay.tracks.mile += (ddd.sp * 10 * (new Date(replay.tracks[++replay.tracks.index].gt) - new Date(ddd.gt)) / 1000 / (60 * 60))

                            ddd.mileages = replay.tracks.mile;

                        }

                        ddd.oils = (replay.tracks.mile * ddd.oilWear / 100)


                    });


                    $("#theTable").bootstrapTable('destroy');
                    $("#theTable").bootstrapTable({ // 对应table标签的id
                        data: replay.tracks,
                        pagination: true, // 在表格底部显示分页组件，默认false
                        pageList: [10, 20], // 设置页面可以显示的数据条数
                        cache: false,
                        pageSize: 10, // 页面数据条数
                        pageNumber: 1, // 首页页码
                        showColumns: true,
                        sortName: 'id', // 要排序的字段
                        sortOrder: 'desc', // 排序规则
                        showExport: true,
                        exportDataType: "all",
                        columns: [
                            {
                                checkbox: true, // 显示一个勾选框
                            },

                            {
                                field: 'com', // 返回json数据中的name
                                title: '公司名称', // 表格表头显示文字
                            },
                            {
                                field: 'carg', // 返回json数据中的name
                                title: '车队名称', // 表格表头显示文字
                            },
                            {
                                field: 'drin', // 返回json数据中的name
                                title: '司机姓名', // 表格表头显示文字
                            },
                            {
                                field: 'drip', // 返回json数据中的name
                                title: '司机手机', // 表格表头显示文字
                            },
                            {
                                field: 'pn', // 返回json数据中的name
                                title: '车牌号', // 表格表头显示文字
                            },
                            {
                                field: 'lICENSEPLATESELFNUM', // 返回json数据中的name
                                title: '自编号', // 表格表头显示文字
                            },
                            // {
                            //     field: '', // 返回json数据中的name
                            //     title: '车辆类型', // 表格表头显示文字
                            // },
                            {
                                field: 'st', // 返回json数据中的name
                                title: 'GPRS回传时间', // 表格表头显示文字

                            },
                            // {
                            //     field: '', // 返回json数据中的name
                            //     title: '停车次数', // 表格表头显示文字
                            // },
                            {
                                field: 'gt', // 返回json数据中的name
                                title: '卫星时间', // 表格表头显示文字
                            },
                            {
                                field: '', // 返回json数据中的name
                                title: '告警类型', // 表格表头显示文字
                            },
                            {
                                field: 'imei', // 返回json数据中的name
                                title: '设备IMEI', // 表格表头显示文字
                            },
                            {
                                field: 'deviceNumber', // 返回json数据中的name
                                title: '设备ID', // 表格表头显示文字
                            },
                            {
                                field: 'model', // 返回json数据中的name
                                title: '设备型号', // 表格表头显示文字
                            },

                            {
                                field: 'sp', // 返回json数据中的name
                                title: '速度', // 表格表头显示文字

                                formatter: function (value, row, index) { // 单元格格式化函数
                                    return value * 10;

                                }
                            },
                            {
                                field: 'oils', // 返回json数据中的name
                                title: '油耗', // 表格表头显示文字
                                formatter: function (value, row, index) { // 单元格格式化函数

                                    return value.toFixed(1)
                                    // return (replay.tracks.mile * row.oilWear / 100).toFixed(1)
                                    // console.log(row.oilWear)
                                    // console.log(value)
                                    // console.log(row)
                                    // console.log(index)

                                }

                            },

                            {
                                field: 'mileages',
                                title: '行车里程',
                                formatter: function (value, row, index) { // 单元格格式化函数


                                    return value.toFixed(1)
                                    // if (replay.tracks.index < replay.tracks.length - 1) {
                                    //
                                    //     replay.tracks.mile += (row.sp * 10 * (new Date(replay.tracks[++replay.tracks.index].gt) - new Date(row.gt)) / 1000 / (60 * 60))
                                    //     console.error((new Date(replay.tracks[++replay.tracks.index].gt) - new Date(row.gt)) / 1000 / (60 * 60))
                                    // } else {
                                    //
                                    // }
                                    //
                                    // return  replay.tracks.mile.toFixed(1);


                                }


                            },
                            {
                                field: 'net',
                                title: 'GPRS信号',


                            },
                            {
                                field: ' ',
                                title: '卫星信号',


                            },
                            {
                                field: 'sat',
                                title: '卫星数量',


                            },

                            {
                                field: 'xxx',
                                title: '位置',
                                //
                                formatter: operateFormatter,
                                events: operateEvents,
                            },
                            {
                                field: ' ',
                                title: '系统VID',


                            },
                            {
                                field: ' ',
                                title: '操作员账号',


                            },

                        ],
                        onPostBody: function () {

                            jQuery("a.remove").trigger("mouseover");

                            replay.tracks.mile = 0;
                            replay.tracks.index = 0;

                        }

                    })


                });


            }


        });
    });

    function aa(value, row, index) { // 单元格格式化函数
        // var text;
        //

        alert("ok")
        //
        //
        // return text;
        return JSON.stringify(value)
    }

    function operateFormatter(value, row, index) {


        return '<a class="remove" href="javascript:void(0)" >' + row.lng + "-" + row.lat + '</a>';
    }

    window.operateEvents = {

        'mouseover .remove': function (e, value, row, index) {

            var point = new BMap.Point(row.lng, row.lat);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                var text = addComp.province + "-" + addComp.city + "-" + addComp.district + "-" + addComp.street + "-" + addComp.streetNumber;

                jQuery(e.target).text(text)
            });
            console.log(e)
            console.log(e.target)
            console.log(value)
            console.log(row)
            console.log(index)

            console.log(this)

        },
        'click .remove': function (e, value, row, index) {

            var layer = layui.layer;

            layer.open({
                type: 1,
                title: '地图'
                , shade: 0.6 //遮罩透明度
                , maxmin: true //允许全屏最小化
                , anim: 0, //0-6的动画形式，-1不开启

                area: ['1000px', '500px'], //宽高
                content: '<div id="map_canvas" style="width: 100%;height: 100%;"></div>',


                success: function (layero, index) {


                    var map = new BMap.Map('map_canvas');
                    map.enableScrollWheelZoom();
                    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);

                    var point = new BMap.Point(row.lng, row.lat);
                    map.centerAndZoom(point, 20);

                    var marker = new BMap.Marker(new BMap.Point(row.lng, row.lat)); // 创建点

                    map.addOverlay(marker);            //增加点


                }
            });
            console.log(e)
            console.log(e.target)
            console.log(value)
            console.log(row)
            console.log(index)

            console.log(this)

        }
    };
    // url = filter == null ? url : url + filter;
    // console.log(url)
    // 第一个实例
    // table.render({
    //     id: 'idTest',
    //     method: "POST",
    //     elem: '#theTable',
    //     url: url,
    //     page: true,
    //     where: {
    //         motorcade: '',
    //         start: formatTimeMin(new Date()),
    //         end: formatTime(new Date()),
    //     },
    //     cols: [
    //         [
    //
    //             //表头
    //
    //             {field: 'motorcade', title: '车队', sort: true},
    //             {field: 'end', title: '结束时间', sort: true},
    //             {field: 'offline', title: '下线数量', sort: true},
    //             {field: 'offlineRate', title: '下线率', sort: true},
    //             {field: 'online', title: '上线数量', sort: true},
    //             {field: 'onlineRate', title: '上线率', sort: true},
    //             {field: 'start', title: '开始时间', sort: true},
    //             {field: 'total', title: '车辆总数', sort: true},
    //
    //             {fixed: 'right', align: 'center', toolbar: '#moreBar'}
    //             ,
    //             {fixed: 'right', align: 'center', toolbar: '#expBar'}
    //         ]
    //     ],
    //     skin: "nob",
    //     size: "sm",
    //     request: {
    //         pageName: 'pageIndex' //页码的参数名称，默认：page
    //         , limitName: 'pageSize' //每页数据量的参数名，默认：limit
    //     },
    //     response: {
    //         countName: 'total' //数据总数的字段名称，默认：count
    //         , dataName: 'rows' //数据列表的字段名称，默认：data
    //     },
    //     done: function (res, curr, count) {
    //         //如果是异步请求数据方式，res即为你接口返回的信息。
    //         //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
    //
    //         echarts.dispose(document.getElementById('chart'));
    //         // 基于准备好的dom，初始化echarts实例
    //         var myChart = echarts.init(document.getElementById('chart'));
    //
    //
    //         console.log(res.rows);
    //         var source = [];
    //         var p = ['product', '上线', '下线'];
    //         source[0] = p;
    //         for (let it of res.rows) {
    //             let arr = [];
    //             arr.push(it.motorcade);
    //             arr.push(it.online);
    //             arr.push(it.offline);
    //             source[source.length] = arr;
    //         }
    //         console.log(source)
    //         // 指定图表的配置项和数据
    //         let option = {
    //             legend: {},
    //             tooltip: {},
    //             dataset: {
    //                 source: source
    //             },
    //             xAxis: {type: 'category'},
    //             yAxis: {min:'dataMin',   minInterval: 1},
    //             // Declare several bar series, each will be mapped
    //             // to a column of dataset.source by default.
    //             series: [
    //                 {type: 'bar'},
    //                 {type: 'bar'},
    //
    //             ]
    //         };
    //
    //         // 使用刚指定的配置项和数据显示图表。
    //         myChart.setOption(option);
    //         //得到当前页码
    //         console.log(curr);
    //
    //         //得到数据总量
    //         console.log(count);
    //     }
    //
    // });

    // // 监听表格复选框选择
    // table.on('checkbox(table)', function (obj) {
    //
    //     obj.checked ? checkShitHistoryOnlineOffline.push(obj) : removeWithoutCopy(checkShitHistoryOnlineOffline, obj.data.id);
    //     var checkStatus = table.checkStatus('idTest')
    //         , data = checkStatus.data;
    //     console.log(data);
    //
    //     // console.log(checkShitRenderVehicle);
    //
    //     function removeWithoutCopy(arr, id) {
    //         for (var i = arr.length - 1; i >= 0; i--) {
    //             if (arr[i].data.id === id) {
    //                 arr.splice(i, 1);
    //             }
    //         }
    //         return arr;
    //     }
    //
    //     // console.log(obj);
    //     // console.log(obj.checked); //当前是否选中状态
    //     // console.log(obj.data); //选中行的相关数据
    //     // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    // });
    //
    //
    // // 表格内按鈕
    // table.on('tool(table)', function (obj) {
    //     var data = obj.data;
    //     if (obj.event === 'more') {
    //
    //         var jjj = layer.open({
    //             type: 1 //Page层类型
    //             , content: '<table id="detail" lay-filter="detail"></table>',
    //             offset: 'lt',
    //             btn: ['导出', '取消'] //只是为了演示
    //             , yes: function () {
    //
    //                 // var params = {
    //                 //     motorcade: data.motorcade,
    //                 //     motorcadeId: data.motorcadeId,
    //                 //     start: formatTimeMin(new Date()),
    //                 //     end: formatTime(new Date()),
    //                 //     type: "excel"
    //                 //
    //                 // };
    //                 // jQuery.ajax({
    //                 //     url: '/statistics/historyOnlineOfflineCountExport',
    //                 //     type: "POST",
    //                 //     data: params,
    //                 //     success: function (response, status, request) {
    //                 //         var u='/statistics/historyOnlineOfflineCountExport';
    //                 //         var disp = request.getResponseHeader('Content-Disposition');
    //                 //         if (disp && disp.search('attachment') != -1) {  //判断是否为文件
    //                 //             var form = jQuery('<form method="POST" action="' + u + '">');
    //                 //             jQuery.each(params, function (k, v) {
    //                 //                 form.append(jQuery('<input type="hidden" name="' + k +
    //                 //                     '" value="' + v + '">'));
    //                 //             });
    //                 //             jQuery('body').append(form);
    //                 //             form.submit(); //自动提交
    //                 //         }
    //                 //     }
    //                 // });
    //             }
    //             , btn2: function () {
    //                 layer.close(jjj);
    //             },
    //
    //             success: function (layero, index) {
    //                 var table = layui.table;
    //
    //                 //第一个实例
    //                 table.render({
    //                     elem: '#detail'
    //                     , url: '/statistics/historyOnlineOfflineDetail', //数据接口
    //                     page: true, // 开启分页
    //                     method: "POST",
    //                     where: {
    //                         motorcade: data.motorcade,
    //                         motorcadeId: data.motorcadeId,
    //                         start: formatTimeMin(new Date()),
    //                         end: formatTime(new Date()),
    //                     }
    //                     , cellMinWidth: 150,
    //                     skin: "nob",
    //                     size: "sm",
    //                     cols: [[ // 表头
    //                         {field: 'deviceNumber', title: '设备号'}
    //                         , {field: 'end', title: '结束时间'}
    //                         , {field: 'motorcade', title: '车队', sort: true}
    //                         , {field: 'start', title: '开始时间', sort: true}
    //                         , {field: 'online', title: '在线情况', sort: true}
    //                         , {field: 'plateNumber', title: '车牌号', sort: true}
    //
    //
    //                     ]],
    //                     request: {
    //                         pageName: 'pageIndex' //页码的参数名称，默认：page
    //                         , limitName: 'pageSize' //每页数据量的参数名，默认：limit
    //                     },
    //                     response: {
    //                         countName: 'total' //数据总数的字段名称，默认：count
    //                         , dataName: 'rows' //数据列表的字段名称，默认：data
    //                     }
    //                 });
    //
    //                 // table.on('checkbox(vehicle)', function (obj) {
    //                 //
    //                 //     var checkStatus = table.checkStatus('vehicle');
    //                 //     fff = checkStatus.data;
    //                 //     // console.log(mmm)
    //                 //
    //                 //     // console.log(obj.data); //选中行的相关数据
    //                 //
    //                 //
    //                 // });
    //             }
    //         });
    //     } else if (obj.event === 'exp') {
    //         var params = {
    //             motorcade: data.motorcade,
    //             motorcadeId: data.motorcadeId,
    //             start: jQuery("#test19").val(),
    //             end: jQuery("#test20").val(),
    //             type: "excel"
    //
    //         };
    //         jQuery.ajax({
    //             url: '/statistics/historyOnlineOfflineCountExport',
    //             type: "POST",
    //             data: params,
    //             success: function (response, status, request) {
    //                 var u = '/statistics/historyOnlineOfflineCountExport';
    //                 var disp = request.getResponseHeader('Content-Disposition');
    //                 if (disp && disp.search('attachment') != -1) {  //判断是否为文件
    //                     var form = jQuery('<form method="POST" action="' + u + '">');
    //                     jQuery.each(params, function (k, v) {
    //                         form.append(jQuery('<input type="hidden" name="' + k +
    //                             '" value="' + v + '">'));
    //                     });
    //                     jQuery('body').append(form);
    //                     form.submit(); //自动提交
    //                 }
    //             }
    //         });
    //     }
    // });
    //监听工具条
    // var $ = layui.$, active = {
    //     reload: function () {
    //         var tableReload = $('#tableReload');
    //         //执行重载
    //         table.reload('idTest', {
    //             page: {
    //                 curr: 1 //重新从第 1 页开始
    //             }
    //             , where: {
    //                 motorcade: tableReload.val(),
    //                 start: jQuery("#test19").val(),
    //                 end: jQuery("#test20").val()
    //             }
    //         });
    //     }
    // };
    //
    // $('.demoTable .layui-btn').on('click', function () {
    //     var type = $(this).data('type');
    //     active[type] ? active[type].call(this) : '';
    //     console.log(type);
    //     console.log(active);
    // });


}