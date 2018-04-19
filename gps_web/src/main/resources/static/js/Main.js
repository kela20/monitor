/*设置树的属性*/
var alldevices = {};
var fleets = {};
var treeid = [];
var onlinedevices = {};
var offlinedevices = {};
var listdata = [];
var setting = {
    view: {
        showLine: false,
        showIcon: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    check: {
        enable: true,
    },
    callback: {
        beforeClick: beforeClick
    }
};
$(function () {
    $("#The_alarm").click(function () {
        alert("aaa");
    });
    /*初始化布局*/
    /* var ss = window.screen.width;
     if(ss>1800){
         $(".bottom_infos").attr("class", "bottom_info");
         $("#finishingTask").attr("class", "thwidth");
         $("#leftul").attr("class", "leftul");
         $(".left_bottom ul li").css("margin-left","6%");
     }
     $('body').css('zoom', 'reset');
     $(document).keydown(function (event) {
         //event.metaKey mac的command键
         if ((event.ctrlKey === true || event.metaKey === true) && (event.which === 61 || event.which === 107 || event.which === 173 || event.which === 109 || event.which === 187 || event.which === 189)) {
             event.preventDefault();
         }
     });
     $(window).bind('mousewheel DOMMouseScroll', function (event) {
         if (event.ctrlKey === true || event.metaKey) {
             event.preventDefault();
         }
     });*/
    //启动计时器
    // timer();
    // timedCount(20);
    // queryguiji();
});

/*下收缩*/
function sousuobottom() {
    if ($("#sousuobottom").val() == 0) {
        $("#sousuobottom").val(1);
        $(".bottomb").hide(500);
        $(".bottomhead").attr("class", "bottomheadguodu");
        $("#Rightbody_centen").attr("class", "Rightbody_centenguodu");
        $("#bottomRigth ").attr("class", "bottomRigthguodu");
        $("#right_bottom_page").hide(500);
        //$("#bottomb").css("display","none");
    } else {
        $("#sousuobottom").val(0);
        $(".bottomb").show(500);
        $(".bottomheadguodu").attr("class", "bottomhead");
        $("#Rightbody_centen").attr("class", "Rightbody_centen");
        $("#bottomRigth").attr("class", "bottomRigth");
        $("#right_bottom_page").show(500);
    }
}

/*左收缩*/
function soushuoleft() {
    if ($("#imgeleft").hasClass("glyphicon-chevron-left")) {
        $("#leftbody").hide(500);
        $(".sousuotubiao").attr("class", "sousuotubiaoguodu");
        $(".Rightbody").attr("style", "width:99%");
        $("#imgeleft").removeClass("glyphicon-chevron-left");
        $("#imgeleft").addClass("glyphicon-chevron-right");
    } else {

        $("#leftbody").show(500);
        $(".sousuotubiaoguodu").attr("class", "sousuotubiao");
        $(".Rightbody").attr("style", "width:80%");
        $("#imgeleft").addClass("glyphicon-chevron-left");
        $("#imgeleft").removeClass("glyphicon-chevron-right");
    }
}

/**
 * 自定义DOM节点
 */
function addDiyDom(treeId, treeNode) {
    if (treeNode.pId == null) {


    } else {
        var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId);
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var icoObj = $("#" + treeNode.tId + "_ico");
        var spanObj = $("#" + treeNode.tId + "_span");
        aObj.attr('title', '');
        aObj.append('<div class="diy swich"></div>');
        var div = $(liObj).find('div').eq(0);
        switchObj.remove();
        spanObj.remove();
        icoObj.remove();
        div.append(switchObj);
        div.append(spanObj);
        var spaceStr = "<span style='width:" + (spaceWidth * treeNode.level) + "px'><img src='/static/image/lixiandian.png'/></span>";
        switchObj.before(spaceStr);
        var editStr = '';
        editStr += '<div class="diy"> ' + (treeNode.CONTACT_USER == null ? '&nbsp;' : treeNode.CONTACT_USER) + '</div>';
        var corpCat = '<div title="' + treeNode.CORP_CAT + '">' + treeNode.CORP_CAT + '</div>';
        editStr += '<div class="diy">' + (treeNode.CORP_CAT == '-' ? '&nbsp;' : corpCat) + '</div>';
        editStr += '<div class="diy">' + (treeNode.CONTACT_PHONE == null ? '&nbsp;' : treeNode.CONTACT_PHONE) + '</div>';
        aObj.append(editStr);
    }
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
    var li_head = ' <li class="head"><div class="diy">车牌号</div><div class="diy">速度</div><div class="diy">里程</div>' +
        '<div class="diy">运行状态</div></li>';
    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
        // rows.eq(1).before(li_head)
    } else {
        $("#dataTree").append(li_head);
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
}

/*加载树数据
*初始化
* */
function query(isforce) {
    var alllist = [];
    var onlinelist = [];
    var offlinelist = [];
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
            console.log(data);
            var onlines = 0;
            var total = 0;
            for (var x = 0; x < data.length; x++) {
                var item = data[x];
                if (item.type === 0) {
                    item.s = gpsDataParser.parseStatus(item);
                    list.push(item);
                    console.log(item.id);
                    alldevices[item.id] = item;
                    total += 1
                    onlines += item.o
                    alllist.push(fromdevices(item));
                    if (item.o == 1) {
                        onlinelist.push(fromdevices(item));
                    } else {
                        offlinelist.push(fromdevices(item));
                    }
                } else {
                    fleets[item.id] = item;
                    alllist.push(fromfleet(item));
                    onlinelist.push(fromfleet(item));
                    offlinelist.push(fromfleet(item));
                }
            }
            //初始化加载
            for (var tree in list) {
                //用户点击刷新
                if (isforce == true) {
                    //记录上次是否有移动过
                    if (listdata != undefined || listdata != null || listdata.length == 0) {
                        //把移动过的闪烁
                        //   listdata.push(listdata[tree]);
                    }
                }
                chushudataadd(list[tree].id, true);
                treeid.push(list[tree].id);
            }

            $("#finishingTask").bootstrapTable("load", list);
            $('#txtAllVehicles').text(total);
            $('#txtOnlineVehicles').text(onlines);
            $('#txtOfflineVehicles').text(total - onlines);
            console.log(alllist);
            console.log(onlinelist);
            console.log(offlinelist);

        },
    })
    //初始化树
    $.fn.zTree.init($("#offlinedataTree"), setting, offlinelist);
    $.fn.zTree.init($("#dataTree"), setting, alllist);
    $.fn.zTree.init($("#onlinedataTree"), setting, onlinelist);
    //添加表头
    /*  var li_head = ' <li class="head"><div class="diy">车牌号</div><div class="diy">速度</div><div class="diy">里程</div>' +
          '<div class="diy">运行状态</div></li>';*/
    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
        //  rows.eq(1).before(li_head)
    } else {
        $("#dataTree").append(li_head);
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
}

/*转换数据*/
function fromdevices(item) {
    var device = new Object();
    device.CONTACT_USER = item.sp;
    device.SECTOR_NAME = item.na;
    device.CONTACT_PHONE = "已停";
    device.ORG_ID = item.pid;
    device.id = item.id;
    device.pId = item.pid;
    device.name = item.na;
    device.CORP_CAT = item.m;
    device.iconClose = "/image/zaixian.png";
    device.iconOpen = "/image/zaixian.png";
    return device;
}

/*转换数据*/
function fromfleet(item) {
    var fleet = new Object();
    fleet.ORG_ID = item.id;
    fleet.id = item.id;
    fleet.pId = "onull";
    fleet.open = true;
    fleet.name = item.na;
    return fleet;
}

$(function () {
    //初始化数据
    //query(false);
    $("#inputsrecsh").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            Treedata($(" #inputsrecsh ").val());
        }
    });
    $("#shuaxin").click(function () {
        query(true);
    })
})

function carlist() {
    alert("车辆列表点击成功");
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
    locate.webMap.mapObject.clearOverlays();
    query(true);
}

function toolnav() {
    $("#toolnav_ul").toggle(500);
}

//测距
function ranging() {
    //console.log(BMapLib);
//添加测量面积工具
    //var measureAreaTool = createMeasureAreaTool(locate.map);
    //面积测量
    var tool = new BMapLib.DistanceTool(locate.webMap.mapObject);
    tool.open(); // 开启鼠标测距

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
    var point = new BMap.Point(116.404, 39.915);
    locate.webMap.mapObject.centerAndZoom(point, 15);
}

//  刷新地图
function Refreshmap() {
    var point = BMap.Point("113.429136", "23.169302");
    locate.webMap.mapObject.centerAndZoom(point, 4);
    mobileflashing(4);
    /*  locate.webMap.mapObject.clearOverlays();*/
    // locate.webMap.mapObject.reset();
}

//全屏
function Full_screen() {
    var element = document.getElementById("locateMap");
    element.webkitRequestFullScreen();
}

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
 *
 * 触发点名
 */
function dataTreedian() {
    for (var tree in treeid) {
        chushudataadd(treeid[tree], false);
    }
}

/*定时刷新*/
function timer() {
    var t2 = window.setInterval("dataTreedian()", 20000);
}

/*点击树节点获取对象*/
function beforeClick(treeId, treeNode) {
    console.log(locate.markers[treeNode.dn]);
    //BMap.Convertor.translate(BDPoint,0,translateCallback); //真实经纬度转成百度坐标
    console.log(treeNode);
    $("#libuoonton").remove();
    var treeid = treeNode.tId;
    if (treeNode.pId != null) {
        var butong = "<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian()' value='点名'></input> " +
            "<input type='button' value='资料'></input><input type='button' value='轨迹' onclick='guiji()'></input> <input type='button' value='回放' onclick='huifang()'></input></li>";
        $("#" + treeid).append(butong);

        var id = treeNode.id;
        chushudataadd(id, true)
    }
}

/**
 * 测试轨迹回放
 */
var lushu;

function guiji() {
    window.locate.webMap.mapObject.enableScrollWheelZoom();
    window.locate.webMap.mapObject.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
    // 实例化一个驾车导航用来生成路线
    var drv = new BMap.DrivingRoute('北京', {
        onSearchComplete: function (res) {
            if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = res.getPlan(0);
                var arrPois = [];
                for (var j = 0; j < plan.getNumRoutes(); j++) {
                    var route = plan.getRoute(j);
                    arrPois = arrPois.concat(route.getPath());
                }
                window.locate.webMap.mapObject.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
                window.locate.webMap.mapObject.setViewport(arrPois);

                lushu = new BMapLib.LuShu(window.locate.webMap.mapObject, arrPois, {
                    defaultContent: "<div><span style='color:red'>哈哈</span><b>嘻嘻</b></div>",//"从天安门到百度大厦"
                    autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52, 26), {anchor: new BMap.Size(27, 13)}),
                    speed: 4500,
                    enableRotation: true,//是否设置marker随着道路的走向进行旋转
                    landmarkPois: [
                        {lng: 116.314782, lat: 39.913508, html: '饶平站到了', pauseTime: 1},
                        {lng: 116.315391, lat: 39.964429, html: '高速公路收费', pauseTime: 2},
                        {lng: 116.381476, lat: 39.974073, html: '肯德基早餐', pauseTime: 1}
                    ]
                });
            }
        }
    });
    drv.search('天安门', '百度大厦');

    /*lushu.marker.addEventListener("click",function(){
        console.log("您点击了路书覆盖物");
        console.log(lushu._marker.ba);
        console.log(lushu);
    });*/
}

//启动回放
function huifang() {
    lushu.start();
}

//给路书更换事件
function LushuorthJS() {
    /*  lushu._opts.speed = 1000;
      console.log(lushu.marker.ba);*/
    var allOverlay = locate.webMap.mapObject.getOverlays();
    locate.webMap.mapObject.removeOverlay(allOverlay);
    var options = {
        size: BMAP_POINT_SIZE_SMALL,
        shape: BMAP_POINT_SHAPE_STAR,
        color: '#d340c3'
    }
    //添加多个标注点
    var points = [];
    var data = [{"lng": 113.429123, "lat": 23.169472}, {"lng": 113.429123, "lat": 23.169472}, {
        "lng": 113.429123,
        "lat": 23.169472
    }, {"lng": 113.429137, "lat": 23.16946}, {"lng": 113.429137, "lat": 23.16946}, {"lng": 113.429137, "lat": 23.16946},
        {"lng": 113.429136, "lat": 23.169402}, {"lng": 113.429136, "lat": 23.169402}, {
            "lng": 113.429136,
            "lat": 23.169402
        }, {"lng": 113.429143, "lat": 23.169464}, {"lng": 113.42915, "lat": 23.169418}, {
            "lng": 113.42915,
            "lat": 23.169418
        },
    ];
    for (var i = 0; i < data.length; i++) {
        points.push(new BMap.Point(data[i].lng, data[i].lat));
    }
    var pointCollection = new BMap.PointCollection(points, options);
    locate.webMap.mapObject.addOverlay(pointCollection);

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
function chushudataadd(id, change) {
    var device = alldevices[id];
    var geoc = new BMap.Geocoder();
    convertor(device.lng, device.lat, function (point) {
        locate.devicespoint.push({lng: point.lng, lat: point.lat,});
        change == true ? Setcenter(point, 14) : "";
        queryAddress(point, function (address) {
            if (device != null) {
                console.log(address);
                var sContent = "<div style='margin:0px;padding:0px;border-top: 1px solid #c9c9c9;'>" +
                    "<div class='display-label'> <b>时间:</b> " + device.st + "</div>" +
                    "<div class='display-label'> <b>定位:</b>" + gpsDataParser.parseLocateType(device) + "[" + gpsDataParser.parseDirection(device) + "]</div>" +
                    " <div class='display-label'><b>状态:</b>" + gpsDataParser.parseAcc(device) + "</div>" +
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
                showGpsinfo(data, device, change);

            }
        });
    });
}

//根据点设置中心点
function Setcenter(point, Number) {
    locate.webMap.mapObject.centerAndZoom(point, Number);
}

//计算位置是否移动过,来一闪一闪功能
function mobileflashing(c) {

    var allOverlay = locate.webMap.mapObject.getOverlays();

    for (var i = 0; i < allOverlay.length; i++) {

        if (allOverlay[i].getTitle() == "5a74182b3d769a7dcc878d5d") {

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
    c = c - 1;
    var icon = new BMap.Icon('/image/tubiaoyuan.png', new BMap.Size(69, 65), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        anchor: new BMap.Size(30, 30)
    });
    if (c > 0) {
        setTimeout("showpoint(" + c + ")", 500);
    } else {
        locate.markers = new BMap.Marker(new BMap.Point("113.429136", "23.169302"), {
            icon: icon
        });
        locate.markers.setTitle("5a74182b3d769a7dcc878d5d");
        locate.webMap.mapObject.addOverlay(locate.markers);
        clearTimeout();
    }
    //获取地图上的覆盖物

}

//显示
function showpoint(c) {

    var icon = new BMap.Icon('/image/tubiaoyuan.png', new BMap.Size(69, 65), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        anchor: new BMap.Size(30, 30)
    });
    //注入标注
    locate.markers = new BMap.Marker(new BMap.Point("113.429136", "23.169302"), {
        icon: icon
    });
    locate.markers.setTitle("5a74182b3d769a7dcc878d5d");
    locate.webMap.mapObject.addOverlay(locate.markers);
    setTimeout("mobileflashing(" + c + ")", 500);

}

//这个方法占时不用,嘻嘻
function libutton(id) {
    var butong = "<li class='libuoonton'> <button>点名</button> <button>资料</button><button>点名</button> <button>资料</button></li>";
    return butong;

}

function areacar() {
    locate.webMap.drawingOpen(locate.overlayComplete);
}

//测试打印
function dayin() {

    var bdhtml = window.document.body.innerHTML;//获取当前页的html代码
    var startStr = "<!--startprint-->";//设置打印开始区域
    var endStr = "<!--endprint-->";//设置打印结束区域
    var printHtml = bdhtml.substring(bdhtml.indexOf(startStr) + startStr.length, bdhtml.indexOf(endStr));//从标记里获取需要打印的页面

    window.document.body.innerHTML = printHtml;//需要打印的页面
    window.print();
    window.document.body.innerHTML = bdhtml;//还原界面

}

/*
 * 根据x和y,加地址显示弹窗
 * */
function showGpsinfo(data, device, change) {
    var allOverlay = locate.webMap.mapObject.getOverlays();
    console.log(allOverlay);
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].point != null) {

            console.log(allOverlay[i].getTitle());
            //判断地图里是否有重复的id
            if (allOverlay[i].getTitle() == device.id) {

                console.log("重复了");
                locate.webMap.mapObject.removeOverlay(allOverlay[i]);
            }
            //是用户点击刷新
            if (change == true) {

            }
        }
        //if(allOverlay[i].getPosition().y==data.lng)
    }
    var data_info = [];
    var title = "";
    title += '<div style="margin:0px;padding:0px">';
    title += '<div style="height:30px;margin:2px;">';
    title += '<b>';
    title += device.na;
    title += '</b>';
    title += '<div style="margin-left:15px;display:inline-block;">';
    title += '<div> </div>';
    /*<img  src="/gps_web/resources/new/image/xiaoxi.png" />*/
    title += '</div>';
    title += '</div>';
    title += '</div>';
    for (var i = 0; i < data.length; i++) {
        data_info.push(data[0].lng);
        data_info.push(data[0].lat);
        data_info.push(data[0].na);
        if (change == false) {
            var listdataone = [{id: device.id, lng: data_info[0], lat: data_info[1]}];
            //第一次 加载,全部放进去
            listdata.push(listdataone);
        }
    }
    console.log(listdata);
    locate.opts = {
        width: 360,     // 信息窗口宽度
        height: 0,     // 信息窗口高度
        title: title, // 信息窗口标题
        enableMessage: true//设置允许信息窗发送短息
    };
    var icon = new BMap.Icon('/image/tubiaoyuan.png', new BMap.Size(69, 65), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        anchor: new BMap.Size(30, 30)
    });
    //注入标注
    locate.markers = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]), {
        icon: icon
    });

    //标注设置属性
    var label = new BMap.Label("<span>12km</span> <span style='position: relative;top: 25px; background: #fff;padding: 5px;'>" + device.na + " </span>", {offset: new BMap.Size(10, 20)});
    label.setStyle({
        border: "none",
        height: "10px",
        lineHeight: "20px",
        margin: "0px 0px 0px 5px "
    });
    //给每个标注的标题加入id
    locate.markers.setTitle(device.id);
    //locate.markers.setRotation(270);
    locate.markers.setLabel(label);
    var content = data_info[2];
    //添加标注
    locate.webMap.mapObject.addOverlay(locate.markers);
    addClickHandler(content, locate.markers);
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
function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
            openInfo(content, e);
            console.log(e);
        }
    );
}

/**
 * 弹窗
 * @param content
 * @param e
 */
function openInfo(content, e) {

    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    //locate.map.centerAndZoom(point, 12);
    var infoWindow = new BMap.InfoWindow(content, locate.opts);  // 创建信息窗口对象
    locate.webMap.mapObject.openInfoWindow(infoWindow, point); //开启信息窗口
}

/**
 * 跳转
 * @param page
 * @constructor
 */
function Page(page) {
    var pageName = page.innerText;
    switch (pageName) {
        case "在线监控":
            window.location = "/gps_web/center";
            break;
        case "司机管理":
            window.location = "/gps_web/driver";
            break;
        case "多车跟踪":
            window.location = "/gps_web/carstracking";
            break;
        case "统计分析":
            window.location = "/gps_web/statistical";
            break;
        case "运行管理":
            window.location = "/gps_web/run";
            break;
        case "报表管理":
            window.location = "/gps_web/report";
            break;
        case "历史轨迹":
            window.location = "/gps_web/history";
            break;
        case "信令管理":
            window.location = "/gps_web/Signaling";
            break;
        case "告警管理":
            window.location = "/gps_web/alarm";
            break;
        case "更多功能":
            window.location = "/gps_web/More_functions";
            break;
        default:

    }
}

/*
告警
* */