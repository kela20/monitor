//公共部分开始---------------------------
// 获取天气预报
$(function () {
    /*先获取位置、再获取天气预报信息*/
    $.ajax({
        url: "http://restapi.amap.com/v3/ip?key=11ddf2f282ee4c39d35a46c3a4dae845",
        type: "get",
        success: function (ip) {
            $("#wea_left").html(ip.city);
            $.ajax({

                url: "https://free-api.heweather.com/s6/weather/now?key=d66df9e9bec5484da78f88a5bb58d092&location=" + ip.city,

                type: "get",
                success: function (tem) {
                    // console.log(ip.city + "近三日天气")
                    $("#wea_info").text(tem.HeWeather6[0].now.tmp + "℃");
                    console.log(tem.HeWeather6[0].now.cond_code)
                    var shit = "static/image/cond_icon_heweather/" + tem.HeWeather6[0].now.cond_code + ".png";

                    $("#wea_right img").attr("src", shit);
                    console.log(tem.HeWeather6[0].now.tmp)
                    // console.log(tem.now.tmp)
                    // console.log(tem.now.cond_txt)
                    // $(".jumbotron h1").html(ip.city + "近三日天气");
                    var today_ = new Date().getDay();
                    console.log(today_);
                    var str_ri = ["一", "二", "三", "四", "五", "六", "日"];
                    if (today_ == 1) {
                        today_ = str_ri[0];
                    } else if (today_ == 2) {
                        today_ = str_ri[1];
                    } else if (today_ == 3) {
                        today_ = str_ri[2];
                    } else if (today_ == 4) {
                        today_ = str_ri[3];
                    } else if (today_ == 5) {
                        today_ = str_ri[4];
                    } else if (today_ == 6) {
                        today_ = str_ri[5];
                    } else if (today_ == 0) {
                        today_ = str_ri[6];
                    }
                    console.log(today_);
                    $("#date").html(new Date().getMonth() + 1 + "月" + new Date().getDate() + "日" + "星期" + today_);
                },
                error: function () {
                    console.log("获取天气失败...")
                }
            });
        },
        error: function () {
            console.log("定位失败...")
        }
    });
});

//导航选项卡切屏
$(function(){
    (function () {
        var nav_infos = [
            {
                "name": "在线监控",
                "normal":"static/dc_file/image/online/online_kong.png",
                "hover": "static/dc_file/image/online/online_shi.png",
                "selected": "static/dc_file/image/online/online_shi.png",
                "default": true,
                "fix": true,
                "disable":false
            }, {
                "name": "基础数据",
                "normal": "static/dc_file/image/basic/basic_kong.png",
                "hover": "static/dc_file/image/basic/basic_shi.png",
                "selected": "static/dc_file/image/basic/basic_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "多车跟踪",
                "normal": "static/dc_file/image/cars/car_kong.png",
                "hover": "static/dc_file/image/cars/car_shi.png",
                "selected": "static/dc_file/image/cars/car_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "统计分析",
                "normal": "static/dc_file/image/think/think_kong.png",
                "hover": "static/dc_file/image/think/think_shi.png",
                "selected": "static/dc_file/image/think/think_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "运行管理",
                "normal": "static/dc_file/image/driving/driving_kong.png",
                "hover": "static/dc_file/image/driving/driving_shi.png",
                "selected": "static/dc_file/image/driving/driving_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "报表管理",
                "normal": "static/dc_file/image/report/report_kong.png",
                "hover": "static/dc_file/image/report/report_shi.png",
                "selected": "static/dc_file/image/report/report_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "行程管理",
                "normal": "static/dc_file/image/history/history_kong.png",
                "hover": "static/dc_file/image/history/history_shi.png",
                "selected": "static/dc_file/image/history/history_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "信令管理",
                "normal": "static/dc_file/image/message/message_kong.png",
                "hover": "static/dc_file/image/message/message_shi.png",
                "selected": "static/dc_file/image/message/message_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "告警管理",
                "normal": "static/dc_file/image/warn/warn_kong.png",
                "hover": "static/dc_file/image/warn/warn_shi.png",
                "selected": "static/dc_file/image/warn/warn_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "通知管理",
                "normal": "static/dc_file/image/call/call_kong.png",
                "hover": "static/dc_file/image/call/call_shi.png",
                "selected": "static/dc_file/image/call/call_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "更多功能",
                "normal": "static/dc_file/image/more/more_kong.png",
                "hover": "static/dc_file/image/more/more_shi.png",
                "selected": "static/dc_file/image/more/more_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }
        ];
        $("#nav").navInit(nav_infos, function (index, name, isFix) { // 点击导航回调处理，创建或切换tab
            $("#tab").tabAdd(index, name, isFix, function (pastIndex, currIndex, name) { // 切换tab回调处理，切换可视区域同时更换导航显示

                if (pastIndex) {
                    $("#nav").navSelected(nav_infos[pastIndex], nav_infos[currIndex], currIndex);
                }
                switch (name) {
                    case "在线监控":
                        $("#container_ .content_box-1").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "基础数据":
                        $("#container_ .content_box-2").css('display', 'block').siblings('div').css('display', 'none');
                        if($("#container_ .content_box-2 iframe").length>0){
                            return;
                        }else {
                            var iframe1 = "<iframe src=\"/admin\" style=\"width: 100%;height: 100%;border: none;vertical-align:top;\"></iframe>";
                            $("#container_ .content_box-2").append(iframe1);
                        }
                        break;
                    case "多车跟踪":
                        $("#container_ .content_box-3").css('display', 'block').siblings('div').css('display', 'none');
                        if($("#container_ .content_box-3 iframe").length>0){
                            return;
                        }else {
                            var iframe2 = "<iframe src=\"/multi\" style=\"width: 100%;height: 100%;border: none;vertical-align:top;\"></iframe>";
                            $("#container_ .content_box-3").append(iframe2);
                        }
                        break;
                    case "统计分析":
                        $("#container_ .content_box-4").css('display', 'block').siblings('div').css('display', 'none');
                        if($("#container_ .content_box-4 iframe").length>0){
                            return;
                        }else {
                            var iframe3 = "<iframe src=\"/statistics\" style=\"width: 100%;height: 100%;border: none;vertical-align:top;\"></iframe>";
                            $("#container_ .content_box-4").append(iframe3);
                        }
                        break;
                    case "运行管理":
                        $("#container_ .content_box-5").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "报表管理":
                        $("#container_ .content_box-6").css('display', 'block').siblings('div').css('display', 'none');
                        if($("#container_ .content_box-6 iframe").length>0){
                            return;
                        }else {
                            var iframe5 = "<iframe src=\"/report\" style=\"width: 100%;height: 100%;border: none;vertical-align:top;\"></iframe>";
                            $("#container_ .content_box-6").append(iframe5);
                        }
                        break;
                    case "行程管理":
                        $("#container_ .content_box-7").css('display', 'block').siblings('div').css('display', 'none');
                        if($("#container_ .content_box-7 iframe").length>0){
                            return;
                        }else {
                            var iframe6 = "<iframe src=\"/replay\" style=\"width: 100%;height: 100%;border: none;vertical-align:top;\"></iframe>";
                            $("#container_ .content_box-7").append(iframe6);
                        }
                        break;
                    case "信令管理":
                        $("#container_ .content_box-8").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "告警管理":
                        $("#container_ .content_box-9").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "通知管理":
                        $("#container_ .content_box-10").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "更多功能":
                        $("#container_ .content_box-11").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                }
                // $("#leftContainer").html("左边:" + name);
                // $("#rightContent").html("右边:" + name);
            });
        });
        $("#nav li").eq(0).click();
    })();
})

// 监听下方内容高度（所有页）
$(function () {
    function mm() {
        var s_h = $(window).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var all_H = $(window).height() - top - middle-1+'px';
        $(".content_box-1,.content_box-2,.content_box-3,.content_box-4,.content_box-5,.content_box-6,.content_box-7,.content_box-8,.content_box-9,.content_box-10,.content_box-11").height(all_H);
        // console.log(all_H);
    }
    mm();
    $(window).resize(mm);
});
//公共部分结束----------------------------

//在线监控开始 ---------------------------1
// 切换车辆、地图列表
$(function(){
    $(".car-info-header .cih_small span").click(function(){
        $(this).addClass("current_cm").css("color","#00ade1").siblings().css("color","#fff").removeClass("current_cm");
        $(".car-info>.dl").eq($(this).index()).css('display','block').siblings('.dl').css('display','none');
        $(this).parent().parent().parent().css("overflow","visible");
        if(($(this).index())==0){
            // console.log(123);
            $(this).parent().parent().parent().css("overflow","scroll");
        }
    })
})

// map_info左右拖拉
$(function () {
    var x = '';
    var y = '';
    var boxDrag = $("#box_drag")[0];
    var boxLeft = $("#box_left")[0];
    var boxLeft_b = $("#car-status")[0];
    var boxRight = $("#box_right")[0];
    $("#box_drag").mousedown(function (e) {
        var iEvent = e || event;
        var boxRightWidth = boxRight.offsetWidth;
        var boxDragClientLeft = iEvent.clientX;
        var boxDragWidth = boxDrag.offsetWidth;
        var screenWidth = boxRightWidth + boxDragClientLeft + boxDragWidth;
        if (iEvent.clientX < boxDrag.offsetLeft + 10) {
            X = 'left';
            boxDrag.style.cursor = 'ew-resize';
        }
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            if (iEvent.clientX < 0 || iEvent.clientX > window.innerWidth*0.33) {
                return;
            }
            console.log("screenwidth:" + screenWidth);
            boxRight.style.width = boxRightWidth - (iEvent.clientX - boxDragClientLeft) - boxDragWidth + 'px';
            boxRight.style.left = screenWidth - boxRight.offsetWidth + 'px';
            boxLeft.style.width = screenWidth - (boxRightWidth - (iEvent.clientX - boxDragClientLeft)) + 'px';
            boxLeft_b.style.width = screenWidth - (boxRightWidth - (iEvent.clientX - boxDragClientLeft)) + 'px';
            boxDrag.style.left = screenWidth - boxRight.offsetWidth - boxDragWidth + 'px';
            console.log('iEvent.clientX:' + iEvent.clientX);
        })
        $(document).mouseup(function () {
            $(document).off("mousedown mousemove");
        })
        return false;
    })
});

// map_contents向下（拖拉）
$(function () {
    $(".map-car-details").css("height", $("#box_mc").height() - $(".map-car-message").height()- $("#bottom_box").height());
    var mapContent = $("#box_map")[0];
    var mapDrag = $("#box_upDown")[0];
    var mapStatus = $(".mc_all")[0];
    var mcM = $(".map-car-message")[0];
    var mcD = $(".map-car-details")[0];
    var bottomBox = $("#bottom_box")[0];
    $("#box_upDown").mousedown(function (e) {
        var iEvent = e || event;
        var screenHeight = $("#box_right").height();
        mapDrag.style.cursor = 'ns-resize';
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            if (iEvent.clientY < window.innerHeight*0.5 || iEvent.clientY > window.innerHeight - 26) {
                return;
            }
            mapContent.style.height = iEvent.clientY + 'px';
            mapDrag.style.top = iEvent.clientY  + 'px' ;
            mapStatus.style.top = iEvent.clientY + 'px';
            mapStatus.style.height = screenHeight - iEvent.clientY + 'px';
            $(".map-car-details").css("height", $("#box_mc").height() - $(".map-car-message").height()-$("#bottom_box").height());

            console.log('iEvent.clientY:' + iEvent.clientY);
        })
        $(document).mouseup(function () {
            $(document).off("mousedown mousemove");
        })
        return false;
    })
});

//监听车辆列表高度（在线监控）
$(function(){
    function carI_h(){
        var s_h = $(document).height();
        var bottom0 = $(".car-info-header").height();
        var bottom = $(".car-status").height();
        var c_h = s_h  - bottom0 - bottom + 12 + 'px';
        $(".dis_list").height(c_h);
    }
    carI_h();
    $(window).resize(carI_h);
})

// $(function(){
//     function tree_h(){
//         var s_h = $(document).height();
//         var top = $("#up_box").height();
//         var middle = $("#mid_box").height();
//         var bottom = $(".car-status").height();
//         var t_h = $(document).height() - top - middle - bottom - 91 +'px';
//         $(".tree_class").height(t_h);
//     }
//     tree_h();
//     $(window).resize(tree_h);
// })

//监听地图列表高度（在线监控）
$(function(){
    function map_h(){
        var s_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom = $(".car-status").height();
        var m_h = s_h - top - middle - bottom - 24 +'px';
        $(".map_list").height(m_h);
    }
    map_h();
    $(window).resize(map_h);
})

//监听车机状态详情高度（在线监控）
$(function(){
    function hh() {
        var s_h = $(document).height();
        var bottom = $("#box_map").height();
        var all_H3 = s_h  - bottom;
        $("#box_mc").height(all_H3);
        $(".map-car-details").css("height", $("#box_mc").height() - $(".map-car-message").height()-$("#bottom_box").height());
    }
    hh();
    $(window).resize(hh);
});

// 监听右侧宽度（在线监控）
$(function () {
    function nn() {
        var s_w = $(document).width();
        var left = $("#box_left").width();
        var all_W = s_w - left-17+'px';
        console.log(left);
        $("#box_right").width(all_W);
        // $("#box_right3").width(all_W);
        // console.log(all_H);
    }
    nn();
    $(window).resize(nn);
});


//底部tab栏（在线监控）
$(function(){
    $('.map-car-info>a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.map-car-details>div').eq($(this).index()).css('display','block').siblings('div').css('display','none');
    })
});
//在线监控结束-----------------------

//多车跟踪开始-----------------------3
// 切换车辆、地图列表
$(function(){
    $(".car-info-header3 .cih_small3 span").click(function(){
        $(this).addClass("current_cm3").css("color","#00ade1").siblings().css("color","#fff").removeClass("current_cm3");
        $(".car-info3>.dl3").eq($(this).index()).css('display','block').siblings('.dl3').css('display','none');
        $(this).parent().parent().parent().css("overflow","visible");
        if(($(this).index())==0){
            // console.log(123);
            $(this).parent().parent().parent().css("overflow","scroll");
        }
    })
})


// map_info左右拖拉
$(function () {
    var x = '';
    var y = '';
    var boxDrag = $("#box_drag3")[0];
    var boxLeft = $("#box_left")[0];
    var boxLeft_b = $("#car-status")[0];
    var boxRight = $("#box_right3")[0];
    $("#box_drag3").mousedown(function (e) {
        var iEvent = e || event;
        var boxRightWidth = boxRight.offsetWidth;
        var boxDragClientLeft = iEvent.clientX;
        var boxDragWidth = boxDrag.offsetWidth;
        var screenWidth = boxRightWidth + boxDragClientLeft + boxDragWidth;
        if (iEvent.clientX < boxDrag.offsetLeft + 10) {
            X = 'left';
            boxDrag.style.cursor = 'ew-resize';
        }
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            if (iEvent.clientX < 0 || iEvent.clientX > window.innerWidth*0.33) {
                return;
            }
            console.log("screenwidth:" + screenWidth);
            boxRight.style.width = boxRightWidth - (iEvent.clientX - boxDragClientLeft) - boxDragWidth + 'px';
            boxRight.style.left = screenWidth - boxRight.offsetWidth + 'px';
            boxLeft.style.width = screenWidth - (boxRightWidth - (iEvent.clientX - boxDragClientLeft)) + 'px';
            boxLeft_b.style.width = screenWidth - (boxRightWidth - (iEvent.clientX - boxDragClientLeft)) + 'px';
            boxDrag.style.left = screenWidth - boxRight.offsetWidth - boxDragWidth + 'px';
            console.log('iEvent.clientX:' + iEvent.clientX);
        })
        $(document).mouseup(function () {
            $(document).off("mousedown mousemove");
        })
        return false;
    })
});
//监听车辆列表高度（多车跟踪）
$(function(){
    function carI_h3(){
        var s_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom0 = $(".car-info-header3").height();
        var bottom = $(".car-status3").height();
        var c_h = s_h - top - middle - bottom0 - bottom + 12 + 'px';
        $(".dis_list3").height(c_h);
    }
    carI_h3();
    $(window).resize(carI_h3);
})

//监听地图列表高度（多车跟踪）
$(function(){
    function map_h3(){
        var s_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom = $(".car-status3").height();
        var m_h = s_h - top - middle - bottom - 24 +'px';
        $(".map_list3").height(m_h);
    }
    map_h3();
    $(window).resize(map_h3);
})

// 监听右侧宽度（多车跟踪）
// $(function () {
//     function nn3() {
//         var s_w = $(document).width();
//         var left0 = $("#box_left3").width();
//         var all_W3 = s_w - left0-17+'px';
//         console.log(left0);
//         $("#box_right3").width(all_W3);
//         console.log(all_W3);
//         // $("#box.map3").width(all_W);
//     }
//     nn3();
//     $(window).resize(nn3);
// });

//切换大小地图（多车跟踪）
$(function () {
    $(".map-contents3>.s_map>.cut_sn").click(function () {
        var flag_0 = $(this).parent().siblings(".s_map").css("display")=="block";
        var flag_ = $(this).parent().siblings(".s_map").css("display")=="none";
        if(flag_0){
            $(this).parent().css("width","100%").css("height","100%").siblings(".s_map").css("display","none");
        }else if(flag_){
            $(this).parent().css("width","49.9%").css("height","49.9%").siblings(".s_map").css("display","block");
        }

    })
})

// 监听车机状态详情高度（多车跟踪）
// $(function(){
//     function hh3() {
//         var s_h = $(document).height();
//         var top = $("#up_box").height();
//         var middle = $("#mid_box").height();
//         var bottom = $("#box_map3").height();
//         var bottom0 = $("#box_mc3").height();
//         $("#box_map3").height(s_h - top - middle-bottom0);
//         $("#box_mc3").height(s_h - top - middle - bottom);
//         // $(".map-car-details3").css("height", $("#box_mc3").height() - $(".map-car-message3").height()-$("#bottom_box3").height());
//         $(".map-car-details3").height($("#box_mc3").height() - $(".map-car-message3").height()-$("#bottom_box3").height());
//     }
//     hh3();
//     $(window).resize(hh3);
//
// });

//底部tab栏（多车跟踪）
$(function(){
    $('.map-car-info3>a').click(function(){
        $(this).addClass('current3').siblings().removeClass('current3');
        $('.map-car-details3>div').eq($(this).index()).css('display','block').siblings('div').css('display','none');
    })
});
//多车跟踪结束-------------------

//7、（历史轨迹）------------------
// 监听内容部分高度
// $(function(){
//     function bh_7(){
//         var b_h = $(document).height();
//         $(".driving_map,.box7_drag,.driving_list").height(b_h);
//     }
//     bh_7();
//     $(window).resize(bh_7);
// })

// 监听左侧行程、停车等列表高度 1
$(function(){
    function l_h7(){
        var b_h = $(document).height();
        var bottom0 = $(".dl_header").height();
        var bottom1 = $(".dl_search_up").height();
        var bottom2 = $(".dl_search_down").height();
        var bottom3 = $(".dl_way").height();
        var bottom4 = $(".dl_select").height();
        var l_h = b_h - bottom0 - bottom1 - bottom2 - bottom3 - bottom4;
        $(".dl_info").height(l_h);
    }
    l_h7();
    $(window).resize(l_h7);
})

//监听左侧行程、停车等列表高度 2
// $(function(){
//     function l_h71(){
//         var b_h = $(document).height();
//         var top = $("#up_box").height();
//         var middle = $("#mid_box").height();
//         var bottom0 = $(".dl_header").height();
//         var bottom1 = $(".dl2_search_up").height();
//         var bottom2 = $(".dl2_search_down").height();
//         var bottom3 = $(".dl2_way").height();
//         var bottom4 = $(".dl2_select").height();
//         var l_h = b_h -top - middle - bottom0 - bottom1 - bottom2 - bottom3 - bottom4;
//         $(".dl2_info").height(l_h);
//     }
//     l_h71();
//     $(window).resize(l_h71);
// })

// 监听右侧轨迹详情高度
$(function(){
    function dmt_h(){
        var b_h = $("#driving_right").height();
        var dm_bottom = $("#box_mc7").height();
        var dmtH = b_h  - dm_bottom;
        $(".dm_top").height(dmtH);
        $("#dmMiddle").css("height", $("#box_mc7").height() -$("#dmBottom").height());
    }
    dmt_h();
    $(window).resize(dmt_h);
})

// $(function(){
//     function dmall_h(){
//         var b_h = $(document).height();
//         var dm_t = $("#dmTop").height();
//         // var dm_bottom = $("#dmBottom").height();
//         var dmallH = b_h  - dm_t;
//         $("#box_mc7").height(dmallH);
//     }
//     dmall_h();
//     $(window).resize(dmall_h);
// })

// $(function () {
//        function dm_h() {
//            var b_h = $(document).height();
//            var top = $("#up_box").height();
//            var middle = $("#mid_box").height();
//            var bottom = $("#box_mc3").height();
//            console.log(b_h);
//            var dmh = b_h - top - middle - bottom;
//            $("#box_map3").height(dmh);
//
//        }
//        dm_h();
//        console.log($("#box_map3").height());
//        $(window).resize(dm_h);
//
//
// })
//时间轴
$(function () {
    // var s = new Date().toLocaleDateString();
    // s = s.replace(/\//g, "-");
    // var t = new Date().toTimeString();
    // t = t.substring(8, 0);
    // console.log(s + " " + t);
    // var st = s + " " + t;
    // $("#test5,#test6,#test7,#test8").val(st);


    layui.use('laydate', function () {
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#test5'
            , type: 'datetime'
        });
        laydate.render({
            elem: '#test6'
            , type: 'datetime'
        });
        laydate.render({
            elem: '#test7'
            , type: 'datetime'
        });
        laydate.render({
            elem: '#test8'
            , type: 'datetime'
        });

        //日期范围
        laydate.render({
            elem: '#test6'
            , range: true
        });

        //年范围
        laydate.render({
            elem: '#test7'
            , type: 'year'
            , range: true
        });

        //年月范围
        laydate.render({
            elem: '#test8'
            , type: 'month'
            , range: true
        });

        //时间范围
        laydate.render({
            elem: '#test9'
            , type: 'time'
            , range: true
        });

        //日期时间范围
        laydate.render({
            elem: '#test10'
            , type: 'datetime'
            , range: true
        });
    });
})

//左右拖拉(行程管理)
$(function(){
    $("#driving_drag").click(function(){
        var flag = $("#driving_left").css("display")=="block";
        var temp = $("#driving_left").css("display")=="none";
        console.log(flag);
        console.log(temp);
        if(flag){
            $("#driving_left").css("display","none");
            $("#driving_drag").css("left","0");
            $("#driving_right").css("left","0.1%").css("width","99.9%");
        }else if(temp){
            $("#driving_left").css("display","block");
            $("#driving_drag").css("left","20%");
            $("#driving_right").css("left","20.1%").css("width","79.9%");
        }
    })
})

//上下拖拉（行程管理）
$(function () {
    // $("#dmDrag").css("top",$("#box_mc7").height()-3+'px');
    var dmTop = $("#dmTop")[0];
    var dmDrag = $("#dmDrag")[0];
    var dmMiddle = $("#dmMiddle")[0];
    var dmBottom = $("#dmBottom")[0];
    $("#dmDrag").mousedown(function (e) {
        var iEvent = e || event;
        var screenHeight = $("#driving_right").height();
        console.log(screenHeight);
        dmDrag.style.cursor = 'ns-resize';
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            if (iEvent.clientY < window.innerHeight*0.5 || iEvent.clientY > window.innerHeight -30) {
                return;
            }
            dmTop.style.height = iEvent.clientY  + "px";
            dmDrag.style.top = iEvent.clientY  + "px";
            dmMiddle.style.height = screenHeight - iEvent.clientY  + 'px';
            // $("#dmMiddle").css("height",$("#box_mc7").height()-$("#dmBottom").height());
            // $("#dmDrag").css("top",$("#box_mc7").height()-3+'px');
            console.log(dmTop.style.height);
            console.log('iEvent.clientY:' + iEvent.clientY);
        })
        $(document).mouseup(function () {
            $(document).off("mousedown mousemove");
        })
        return false;
    })
});

//切换底部轨迹信息详情
$(function(){
    $(".dm_bottom span").click(function(){
        $(this).addClass("cur_dmb").siblings("span").removeClass("cur_dmb");
        $(".dm_middle>div").eq($(this).index()).css("display","block").siblings("div").css("display","none");
    })
})

//切换左边栏头部
$(function(){
    $(".dl_header span").click(function(){
        $(this).addClass("dlh_b").siblings("span").removeClass("dlh_b");
        $(".driving_list>.da").eq($(this).index()).css("display","block").siblings(".da").css("display","none");
    })
})

// 切换右栏选择 1
$(function(){
    $(".dl_select span").click(function(){
        $(this).addClass("dl_s").siblings("span").removeClass("dl_s");
        $(".dl_info>div").eq($(this).index()).css("display","block").siblings().css("display","none");
    })
})

// 切换右栏选择 2
$(function(){
    $(".dl2_select span").click(function(){
        $(this).addClass("dl_s").siblings("span").removeClass("dl_s");
        $(".dl2_info>div").eq($(this).index()).css("display","block").siblings().css("display","none");
    })
})


//搜索框
$(function () {
    (function () {
        $.ajax({
            url: "/locate/groupVehicles", //请求地址
            dataType: "json", //数据格式
            data: {
                force: false
            },
            type: "post", //请求方式
            async: false, //是否异步请求
            success: function (data) { //如何发送成功
                datasour= data;
                console.log(datasour);
                var strs = [];
                //    var aaa ={name:"设备号",pid:"0",id:10,open: true};
                //    strs.push(aaa);
                for(var i=0;i<datasour.length;i++){

                    if(datasour[i].type==0){
                        var bbb ={name:datasour[i].na+'—'+datasour[i].dn,pid:datasour[i].pid,id:datasour[i].id,type:datasour[i].type,open: true};
                        strs.push(bbb);

                    }else{
                        var bbb ={name:datasour[i].na,pid:datasour[i].pid,id:datasour[i].id,type:datasour[i].type,open: true};
                        strs.push(bbb);
                    }
                    //  console.log(datasour[i].dn);
                }

                console.log(strs);
                $("#number").focus(function () {
                    // if($("#number").val()==""){
                    //     $(".ztree_0").remove();
                    // }
                    if($("#pop #treeDemo").length>0){
                        return;
                    }

                    console.log(7788);
                    var divDom0 = $("<div></div>").attr("id", "pop").css("width",$("#number").width()+$("#number").width());
                    var input0 = "<input type=\"text\" placeholder=\"搜索设备号\" id=\"number0\">";
                    var ulDom0 = "<ul id=\"treeDemo\" class=\"ztree_0\"></ul>";
                    divDom0.append(input0);
                    divDom0.append(ulDom0);
                    $("#cm_cardwarper").append(divDom0);
                    var setting = {
                        data: {
                            simpleData: {
                                enable: true,
                                idKey: "id",
                                pIdKey: "pid",
                                rootPId: 0
                            }
                        },
                        callback: {
                            onClick: zTree_onClick
                        }
                    };
                    function zTree_onClick(event, treeId, treeNode) {
                        if(treeNode.type==0){
                            console.log(treeNode);
                            var fr_tn = treeNode.name;
                            console.log(fr_tn.substring(fr_tn.indexOf("—")+1));
                            $("#number").val(fr_tn.substring(fr_tn.indexOf("—")+1));
                            $("#pop").remove();

                        }else{
                            return;
                        }

                    }
                    jQuery.fn.zTree.init(jQuery("#treeDemo"), setting,strs);
                })
                $("#cm_cardwarper").delegate("#number0","keyup",function () {
                    $(".ztree_0").remove();
                    console.log(7776);
                    console.log(strs);
                    var aaa = [];
                    var t_value = $("#number0").val();
                    if(t_value.length == 0) {
                        $(".ztree_1").html("");
                        return;
                    }
                    var fr_arr=[];
                    for (var i = 0; i < strs.length; i++) {
                        if (strs[i].name.indexOf(t_value) != -1) {
                            fr_arr.push(strs[i]);
                            console.log(fr_arr);
                            for(var d in datasour){
                                if(strs[i].pid==datasour[d].id){
                                    datasour[d].name =datasour[d].na;
                                    console.log(strs[i].pid);
                                    console.log(datasour[d].id);
                                    //其实错了
                                    if(aaa.indexOf(datasour[d].id)==0){

                                    }else{
                                        console.log(datasour[d]);
                                        datasour[d].open=true;
                                        fr_arr.push(datasour[d]);
                                        aaa.push(datasour[d].id);
                                    }

                                }
                            }
                        }
                    }
                    console.log(fr_arr);
                    if (fr_arr.length > 0) {
                        var ulDom = "<ul id=\"treeDemo\" class=\"ztree_1\"></ul>";
                        $(".ztree_0").remove();
                        $("#pop").append(ulDom);
                        var setting = {
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: "id",
                                    pIdKey: "pid",
                                    rootPId: 0
                                }
                            },
                            callback: {
                                onClick: zTree_onClick
                            },
                            view:{
                                open:true
                            }
                        };
                        function zTree_onClick(event, treeId, treeNode) {
                            if(treeNode.type==0){
                                console.log(treeNode);
                                var fr_tn = treeNode.name;
                                console.log(fr_tn.substring(fr_tn.indexOf("—")+1));
                                $("#number").val(fr_tn.substring(fr_tn.indexOf("—")+1));
                                $("#pop").remove();

                            }else{
                                return;
                            }

                        }
                        console.log(fr_arr);
                        jQuery.fn.zTree.init(jQuery("#treeDemo"), setting,fr_arr);
                    }
                })
            }
        })
    })()
})
// 7(结束)-------------------------
































