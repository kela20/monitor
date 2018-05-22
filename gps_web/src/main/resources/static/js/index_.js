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
                    var str_ri = ["一", "二", "三", "四", "五", "六", "天"];
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
                "normal":"static/image/online/online_kong.png",
                "hover": "static/image/online/online_shi.png",
                "selected": "static/image/online/online_shi.png",
                "default": true,
                "fix": true,
                "disable":false
            }, {
                "name": "基础数据",
                "normal": "static/image/basic/basic_kong.png",
                "hover": "static/image/basic/basic_shi.png",
                "selected": "static/image/basic/basic_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "多车跟踪",
                "normal": "static/image/cars/car_kong.png",
                "hover": "static/image/cars/car_shi.png",
                "selected": "static/image/cars/car_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "统计分析",
                "normal": "static/image/think/think_kong.png",
                "hover": "static/image/think/think_shi.png",
                "selected": "static/image/think/think_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "运行管理",
                "normal": "static/image/driving/driving_kong.png",
                "hover": "static/image/driving/driving_shi.png",
                "selected": "static/image/driving/driving_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "报表管理",
                "normal": "static/image/report/report_kong.png",
                "hover": "static/image/report/report_shi.png",
                "selected": "static/image/report/report_shi.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "行程管理",
                "normal": "static/image/history/history_kong.png",
                "hover": "static/image/history/history_kong.png",
                "selected": "static/image/history/history_kong.png",
                "default": false,
                "fix": false,
                "disable":false
            }, {
                "name": "信令管理",
                "normal": "static/image/message/message_kong.png",
                "hover": "static/image/message/message_shi.png",
                "selected": "static/image/message/message_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "告警管理",
                "normal": "static/image/warn/warn_kong.png",
                "hover": "static/image/warn/warn_shi.png",
                "selected": "static/image/warn/warn_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "通知管理",
                "normal": "static/image/call/call_kong.png",
                "hover": "static/image/call/call_shi.png",
                "selected": "static/image/call/call_shi.png",
                "default": false,
                "fix": false,
                "disable":true
            }, {
                "name": "更多功能",
                "normal": "static/image/more/more_kong.png",
                "hover": "static/image/more/more_shi.png",
                "selected": "static/image/more/more_shi.png",
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
                        break;
                    case "多车跟踪":
                        $("#container_ .content_box-3").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "统计分析":
                        $("#container_ .content_box-4").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "运行管理":
                        $("#container_ .content_box-5").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "报表管理":
                        $("#container_ .content_box-6").css('display', 'block').siblings('div').css('display', 'none');
                        break;
                    case "行程管理":
                        $("#container_ .content_box-7").css('display', 'block').siblings('div').css('display', 'none');
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

// map_info向左（拖拉）
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
            // 11111111111111111111111111111111111111111111111
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
    //88888888888888888888888888888888888888
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
        // 222222222222222222222222222222222222222
        mapDrag.style.cursor = 'ns-resize';
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            //33333333333333333333333333333333333333333333
            if (iEvent.clientY < window.innerHeight*0.5 || iEvent.clientY > window.innerHeight - 26) {
                return;
            }
            mapContent.style.height = iEvent.clientY - 105 + "px";
            mapDrag.style.top = iEvent.clientY - 105 + "px";
            mapStatus.style.top = iEvent.clientY - 105 + "px";
            mapStatus.style.height = screenHeight - (iEvent.clientY - 105) + 'px';
            $(".map-car-details").css("height", $("#box_mc").height() - $(".map-car-message").height()-$("#bottom_box").height());

            console.log('iEvent.clientY:' + iEvent.clientY);
        })
        $(document).mouseup(function () {
            $(document).off("mousedown mousemove");
        })
        return false;
    })
});

// 监听下方内容高度
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

//监听车辆列表高度
$(function(){
    function carI_h(){
        var s_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom0 = $(".car-info-header").height();
        var bottom = $(".car-status").height();
        var c_h = $(document).height() - top - middle - bottom0 - bottom + 12 + 'px';
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

//监听地图列表高度
$(function(){
    function map_h(){
        var s_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom = $(".car-status").height();
        var m_h = $(document).height() - top - middle - bottom - 24 +'px';
        $(".map_list").height(m_h);
    }
    map_h();
    $(window).resize(map_h);
})

//监听车机状态详情高度
//7777777777777777777777777777777777777777
$(function(){
    function hh() {
        var s_h = $(window).innerHeight();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom = $("#box_map").height();
        var all_H3 = s_h - top - middle - bottom;
        $("#box_mc").height(all_H3);
        $(".map-car-details").css("height", $("#box_mc").height() - $(".map-car-message").height()-$("#bottom_box").height());
    }
    hh();
    $(window).resize(hh);
});

// 监听右侧宽度
$(function () {
    function nn() {
        var s_w = $(document).width();
        var left = $("#box_left").width();
        var all_W = s_w - left-17+'px';
        $("#box_right").width(all_W);
        // console.log(all_H);
    }
    nn();
    $(window).resize(nn);
});

//底部tab栏
$(function(){
    $('.map-car-info>a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        // var i = $(".current").index()
        // console.log(i);
        // $("a:nth-child(i)::after").css("display","block");
        // .siblings(":before").css("display","block");
        // $("a:nth-child(i):before").css("display","none").siblings(":after").css("display","none");
        $('.map-car-details>div').eq($(this).index()).css('display','block').siblings('div').css('display','none');
    })
});

//7、（历史轨迹）监听内容部分高度
$(function(){
    function bh_7(){
        var b_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var all_H = b_h -top - middle;
        $(".driving_map,.box7_drag,.driving_list").height(all_H);
    }
    bh_7();
    $(window).resize(bh_7);
})

// 监听左侧行程、停车等列表高度 1
$(function(){
    function l_h7(){
        var b_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom0 = $(".dl_header").height();
        var bottom1 = $(".dl_search_up").height();
        var bottom2 = $(".dl_search_down").height();
        var bottom3 = $(".dl_way").height();
        var bottom4 = $(".dl_select").height();
        var l_h = b_h -top - middle - bottom0 - bottom1 - bottom2 - bottom3 - bottom4;
        $(".dl_info").height(l_h);
    }
    l_h7();
    $(window).resize(l_h7);
})

//监听左侧行程、停车等列表高度 2
$(function(){
    function l_h71(){
        var b_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var bottom0 = $(".dl_header").height();
        var bottom1 = $(".dl2_search_up").height();
        var bottom2 = $(".dl2_search_down").height();
        var bottom3 = $(".dl2_way").height();
        var bottom4 = $(".dl2_select").height();
        var l_h = b_h -top - middle - bottom0 - bottom1 - bottom2 - bottom3 - bottom4;
        $(".dl2_info").height(l_h);
    }
    l_h71();
    $(window).resize(l_h71);
})

// 监听右侧轨迹详情高度
$(function(){
    function dmt_h(){
        var b_h = $(document).height();
        var top = $("#up_box").height();
        var middle = $("#mid_box").height();
        var dmtH = b_h -top - middle - 148 + 'px';
        $(".dm_top").height(dmtH);
    }
    dmt_h();
    $(window).resize(dmt_h);
})

//时间轴
$(function () {
    var s = new Date().toLocaleDateString();
    s = s.replace(/\//g, "-");
    var t = new Date().toTimeString();
    t = t.substring(8, 0);
    console.log(s + " " + t);
    var st = s + " " + t;
    $("#test5,#test6,#test7,#test8").val(st);


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

//左右拖拉(在线监控)
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

//上下拖拉（在线监控）
$(function () {
    var dmTop = $("#dmTop")[0];
    var dmDrag = $("#dmDrag")[0];
    var dmMiddle = $("#dmMiddle")[0];
    var dmBottom = $("#dmBottom")[0];
    $("#dmDrag").mousedown(function (e) {
        var iEvent = e || event;
        var screenHeight = $("#driving_right").height();
        console.log(screenHeight);
        //555555555555555555555555555555555555555555
        dmDrag.style.cursor = 'ns-resize';
        $(document).mousemove(function (e) {
            var iEvent = e || event;
            //444444444444444444444444444444444444444
            if (iEvent.clientY < window.innerHeight*0.5 || iEvent.clientY > window.innerHeight -20) {
                return;
            }
            dmTop.style.height = iEvent.clientY - 105 + "px";
            dmDrag.style.top = iEvent.clientY - 105 + "px";
            dmMiddle.style.height = screenHeight - (iEvent.clientY - 105 ) + 'px';
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

//切换右边栏头部
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

//左边栏点击状态列表(所有行程) 999999999999999999999999999999999999
$(function(){
    $(".dl_info ul").on("li","click",function(){
        var flag1 = $(this).css("height")==140+'px';
        var temp1 = $(this).css("height")==170+'px';
        if(flag1){
            $(this).css("height","170px").css("backgroundColor","#ffe8e0").siblings("li").css("height","140px").css("backgroundColor","#f1f1f1");
            $(this).children(".drivingPro").css("display","block");
            $(this).siblings("li").children(".drivingPro").css("display","none");
            $(this).children(".drivingTime").css("display","block");
            $(this).siblings("li").children(".drivingPro").css("display","none");
        }else if(temp1){
            $(this).css("height","140px").css("backgroundColor","#f1f1f1");
            $(this).children(".drivingPro").css("display","none");
            $(this).children(".drivingTime").css("display","none");
        }
    })
    $(".dl_info ul li").delegate(".iplay","click",function(e){
        e.stopPropagation();
        console.log(123);
    })
    // $(".dl_info ul li").delegate("#qian0","click",function(e){
    //     e.stopPropagation();
    //     console.log(456);
    // })
})

// 7(结束)





