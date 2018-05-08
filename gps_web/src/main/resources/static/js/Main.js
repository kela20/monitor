/*设置树的属性*/
var alldevices = {};//根据id查询数据类型是0
var alldevicespid={};
var fleets = {};//pid的存储
var treeids =[];//定义关注的存储id
var Timerefreshid=[];//存储id定时刷新
var onlinedevices = [];
var offlinedevices = [];
var listdata=[];//
var listdataflashing =[];//
var adddatalist = [];//添加数据列表
var addNamelist =[];//添加名称
var form,table, layer, laypage,upload,bitopen=true;//layer的属性
var count=0;//数据的总数
var suncount =0;//每次加载子id的总数
var treecount=0;//节点总数
var datasour =[];//数据源
var overlays =[];//存储测距的数据
var clickFlag = null;//是否点击标识（定时器编号）
var Serialnumber=0; //编号
var Clickidstorage=[];
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
        beforeClick: beforeClick,
        onClick: zTreeOnClick,
        onCheck: zTreeOnCheck,
        beforeDblClick:beforeDblClick,

    }

};
var setting2 = {
    view: {
        showLine: false,
        showIcon: true,
        addDiyDom: addDiyDoms
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    /* check: {
         enable: true,
     },*/

};


var listpoint =[];
$(function () {
    layui.use(['form', 'table', 'layer', 'laypage','upload'], function () {
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
    // timedCount(20);
    // queryguiji();
});


/**
 * 自定义DOM节点
 */
function addDiyDom(treeId, treeNode) {
    var li_head ;

    if(treeNode.pId ==null){
        var aObj = $("#" + treeNode.tId  + "_a");
        var switchObj = $("#" + treeNode.tId  + "_switch");
        var spanObj = $("#" + treeNode.tId  + "_span");
        var editStr = '';
        li_head = '<span style="width: 100%;background: #59B9C7;position: absolute;height: 3px;margin-top: 16px;left:0px"></span>' ;
        aObj.before(li_head);
    }
    treeNode.level==0?Serialnumber=0:"";
    if(treeNode.level ==1){
    }if(treeNode.pId != null && treeNode.type ==0){
        Serialnumber = Serialnumber+1;
        i++;
        var imgage  ="";
        var stylecolor="";
        var runstaust="";
        if(treeNode.o==0){
            imgage ="<img src='/image/lixiandian.png'/>";
            stylecolor = "style= 'color:#A0A0A0'"
            runstaust="离线";
        }else{
            imgage ="<img src='/image/zaixian.png'/>";
            stylecolor="style= 'color:#74CB63'";
            runstaust="在线";
            if(treeNode.sp>0){
                stylecolor = "style= 'color:#4EA7F7'"
                runstaust="行驶";
            }
        }
        var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId );
        var aObj = $("#" + treeNode.tId  + "_a");
        var switchObj = $("#" + treeNode.tId  + "_switch");
        var spanObj = $("#" + treeNode.tId  + "_span");

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
        editStr += '<div class="diy widthmin">' + intonumber(Serialnumber)  + '</div>';
        editStr += '<div class="diy divnema"'+ stylecolor+'>' + treeNode.na + '</div>';
        editStr += '<div class="diy">' + (treeNode.sp*10) + 'km/h</div>';
        editStr += '<div class="diy">' + (treeNode.m == null ? '&nbsp;' : treeNode.m ) + '</div>';
        editStr += '<div class="diy">' +  runstaust + '</div>';
        aObj.append(editStr);

    }
}
function addDiyDoms(treeId, treeNode) {

    var spaceWidth = 15;
    var liObj = $("#" + treeNode.tId );
    var aObj = $("#" + treeNode.tId  + "_a");
    var switchObj = $("#" + treeNode.tId  + "_switch");
    var spanObj = $("#" + treeNode.tId  + "_span");
    aObj.attr('title', '');
    //  aObj.append('<div class="diy"></div>');
    var div = $(liObj).find('div').eq(0);
    switchObj.remove();
    spanObj.remove();
    // icoObj.remove();
    // div.append(switchObj);
    // div.append(spanObj);
    var spaceStr = "<span>";
    // switchObj.before(spaceStr);
    var editStr = '';
    editStr += '<div class="diy">' + treeNode.name + '</div>';
    aObj.append(editStr);
}
//转成00编号
function intonumber(varlue) {

    var newnumberbyte = varlue/100;
    var newnumber  =newnumberbyte.toString().split(".");
  //  console.log(newnumber)
    var infonew  = newnumber[0]+newnumber[1];
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
    var li_head = '<span style="width: 100%;background: #c9c9c9"></span>' ;

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
            datasour= data;
            //  data = falsedata();
            // console.log(data);
            //总车辆
            bottomcardata(data);
            //匹配闪烁点
            bit_Change_location(data);
            var onlines = 0;
            var total = 0;
            var counlist =[];
            for (var x = 0; x < data.length; x++) {
                var item = data[x];
                counlist.push(item.id);
                if (item.type === 0) {
                    item.s=gpsDataParser.parseStatus(item);
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
            for(var tree in list){

                chushudataadd(list[tree].id,true,false);
                Timerefreshid.push(list[tree].id);
            }

            //初始化所属公司和所属车队
            datacompanyandcar(data,counlist);
        },
    })
    bitopen =true;
    Serialnumber=0;
    //初始化树
    $.fn.zTree.init($("#offlinedataTree"), setting, offlinelist);
    $.fn.zTree.init($("#dataTree"), setting, alllist);
    $.fn.zTree.init($("#onlinedataTree"), setting, onlinelist);
    //treenodemovebackground();
    treenodemove(true);
    //添加表头
    var li_head = '<span style="width: 100%;background: #c9c9c9"></span>' ;
    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
        //  rows.before(li_head)
    } else {
        // $("#dataTree").append(li_head);
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
    if(isforce ==true){
        var point = new BMap.Point("104.863586","34.866505");
        Setcenter(point, 5);
        //  setTimeout("mobileflashing("+3+")",700);
    }else{

    }
    if(treeids.length>0){
        adddatalist =[];
        for(var i =0 ; i<datasour.length;i++){
            for(var j=0;j<treeids.length;j++){
                if(datasour[i].id==treeids[j]){
                    adddatalist.push(returnteamName(fromdevices(datasour[i])));
                }
            }

        }
        var tabledata ={list:adddatalist};
        var html = template("tpl", tabledata);
        $('#content_data').html(html);

    }
}
/*
* 加载左侧底下的数据
* */
function bottomcardata(data) {
    var online=0 ;
    var offline=0;
    var sp = 0;
    for(var i in data){ data[i].type==0?(data[i].o==0?(offline++,offlinedevices.push(data[i]),sp += data[i].sp):(online++,onlinedevices.push(data[i])))

        :""}
    count  = offline+online;
    $(".cs_top span:nth-child(1)").html("总车辆:"+count);
    $(".cs_top span:nth-child(2)").html("当前在线率:"+(online/count).toFixed(2) *100+"%");
    $(".cs_middle span:nth-child(1)").html("在线:"+online);
    $(".cs_middle span:nth-child(2)").html("离线:"+offline);
    // $(".cs_bottom span:nth-child(1)").html("任务:"+data.);
   // console.log(sp+"sp");
    $(".cs_bottom span:nth-child(2)").html("行驶:"+sp*10+"h/km");

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
    fleet.ORG_ID = item.id;
    fleet.id = item.id;
    fleet.pId =item.pid;  //往上找的
    fleet.open = bitopen;
    fleet.name = item.na;
    fleet.stust = item.o;
    fleet.type=item.type;
    bitopen =false;
    return fleet;
}
$(function () {

    //初始化数据
    //query(false);
    $("#inputsrecsh").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            //  Treedata($(" #inputsrecsh ").val());
        }
    });
    $("#shuaxin").click(function () {
        query(true);
    })
})
//刷新
function refresh() {
    //  alert("改功能正在开发");

    query(true);
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
    for(var i = 0; i < overlays.length; i++){
        locate.webMap.mapObject.removeOverlay(overlays[i]);
    }
    for(var i = 0; i < overlays.disLabel; i++){
        locate.webMap.mapObject.removeOverlay(overlays[i]);
    }
    overlays = [];
    // locate.webMap.mapObject.clearOverlays();
    //  query(true);
}
//点击工具栏
function toolnav() {
    $("#toolnav_ul").toggle(500);
}
//测距
function  ranging() {
    //console.log(BMapLib);
//添加测量面积工具
    //var measureAreaTool = createMeasureAreaTool(locate.map);
    //面积测量
    var tool = new BMapLib.DistanceTool(locate.webMap.mapObject);
    tool.addEventListener("addpoint", function(e) {  rangingcaing(e) });
    tool.addEventListener("drawend", function(e) { rangingcallback(e)   });
    tool.open(); // 开启鼠标测距

}
//测距的回调函数
function rangingcallback(e) {
    for(var i=0;i<e.overlays.length;i++){
        overlays.push(e.overlays[i]);

    }

    for(var i=0;i<e.points.length;i++){
        overlays.push(e.overlays[i]);
    }
    console.log(e);
}
//测距中的数据
function rangingcaing(e) {

    overlays.push(e.point.disLabel);

    console.log(e);
}
//放大
function amplification(){
    window.locate.webMap.mapObject.zoomIn()
}
//缩小
function narrow() {
    window.locate.webMap.mapObject.zoomOut()
}
//打印地图
function  Print_map() {
    var myDate = new Date(); //获取时间
    var imagelayout="PNG"//获取导出的图片格式
    var targetDom = $("#bodyall_map");
    html2canvas(targetDom, { //要截图的区域ID
        background:"#fff",
        onrendered: function(canvas) {
            var Imgurl = canvas.toDataURL("image/png"); //画布转成图片
            //以下代码为下载此图片功能
            var triggerDownload =
                $("<a>").attr("href", Imgurl).attr("download", "" + myDate.getTime() + "."+imagelayout+"").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove(); //下载图片到本地
        }
    });
}
//默认视野
function default_view(){
    var lng =116.404  ;
    var lat =39.915;
    var cent=15;
    $.ajax({
        url: "/viewport/get", //请求地址
        dataType: "json", //数据格式
        type: "Get", //请求方式
        success: function (data) {
            lng =data.lng;
            lat = data.alt;
            cent = data.level
        }

    });
    var point = new BMap.Point(lng, lat);
    locate.webMap.mapObject.centerAndZoom(point, cent);
}
//  刷新地图
function Refreshmap() {
    var pointfull = new BMap.Point("113.429136", "23.169302");
    Setcenter(pointfull, 4);

    query(false);
    treenodemove(true);
    //   mobileflashing(2);
    /*  locate.webMap.mapObject.clearOverlays();*/
    // locate.webMap.mapObject.reset();
}
//全屏
function Full_screen(){
    var element = document.getElementById("locateMap");
    element.webkitRequestFullScreen();
}
//打印图片
function cutDiv(){
    var myDate = new Date(); //获取时间
    var imagelayout="PNG"//获取导出的图片格式
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
    var ctx =  canvas.getContext("2d");
    img.crossOrigin="anonymous";
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    ctx.drawImage(img, 0, 0);
    var canvasbase = canvas.toDataURL("image/png");
    var triggerDownload =
        $("<a>").attr("href", canvasbase).attr("download", "" + myDate.getTime() + "."+imagelayout+"").appendTo("body");
    triggerDownload[0].click();
    triggerDownload.remove(); //下载图片到本地
}
/**
 * 触发点名
 */
function  dataTreedian() {
    layer.msg("点名成功,该功能正在开发");
    /*  for(var tree in Timerefreshid){
          chushudataadd(Timerefreshid[tree],false,true);
      }*/
}
/*定时刷新*/
function timer(){
    var t2 = window.setInterval("query(false)",20000);
}
//双击获取
function  beforeDblClick(treeId, treeNode) {
    if(clickFlag) {//取消上次延时未执行的方法
        clickFlag = clearTimeout(clickFlag);
    }
    layer.msg("点名成功,该功能正在开发");
    return false;
}
/*点击树节点获取对象*/
function beforeClick(treeId, treeNode) {
    if(clickFlag) {//取消上次延时未执行的方法
        clickFlag = clearTimeout(clickFlag);
    }
    clickFlag = setTimeout(function() {
        //  console.log(locate.markers[treeNode.dn]);
        //BMap.Convertor.translate(BDPoint,0,translateCallback); //真实经纬度转成百度坐标
        if(treeNode.type ==0)
        {  // console.log(treeNode);
            $("#libuoonton").remove();
            var treeid = treeNode.tId;
            var butong ="<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian()' value='点名' ></input> " +
                "<input type='button' value='资料'></input>   </li>";
            $("#"+treeid).append(butong);
            var id = treeNode.id;
            var iscunzai=Clickidstorage.indexOf(id);
            if(iscunzai==-1){
                //不存在
                Clickidstorage.push(id);
            }

            if(!Arrayis(id)[1]){
                adddatalist.push(returnteamName(fromdevices(alldevices[id])));
                treeids.push(id);
                var tabledata ={list:adddatalist};
                var html = template("tpl", tabledata);
                $('#content_data').html(html);
            }
            // chushudataadd(id,true,true);
            qiehuan(id);
        }},200);
    clearTimeout();
}
//点击表格定位切换
function tables(id,e) {
    qiehuan(id);
    $("#content_data tr").removeAttr("style");
    $(e).css("background","#FFDECF");
}
/**
 * 切换图片定位
 */
function  qiehuan(id) {
    var device = alldevices[id];
    var geoc = new BMap.Geocoder();

    convertor(device.lng, device.lat, function (point) {
        Setcenter(point, 14);
    });
    var icon = new BMap.Icon('/static/image/pointimage/attentionicon.png', new BMap.Size(69,70), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /* anchor: new BMap.Size(30, 30)*/
    });
    var icon3 = new BMap.Icon('/static/image/defaultsmine.png', new BMap.Size(69,65), {
        imageOffset: new BMap.Size(0, 0),
        infoWindowAnchor: new BMap.Size(0, 0),
        /*anchor: new BMap.Size(30, 30)*/
    });
    //标注设置属性
    var labe2 = new BMap.Label(" <span  class='iconbigshow'>km/h</span> <span class='iconbigshowna'  >"+device.na+" </span>",
        {offset:new BMap.Size(10,20)});
    labe2.setStyle({
        border: "none",
        height : "10px",
        lineHeight : "20px",
        margin:"0px 0px 50px 5px "
    });
    var labeName = new BMap.Label("<span class='iconbigsp' >"+device.sp*10+"</span> ",{offset:new BMap.Size(10,20)});
    labe2.setStyle({
        border: "none",
        height : "10px",
        lineHeight : "20px",
        margin:"0px 0px 10px 5px "
    });
    var labe3 = new BMap.Label("<span style='color:#0489D6;position: relative; right: 25px;'>"+device.na+"</span>" ,{offset:new BMap.Size(10,20)});
    labe3.setStyle({
        border: "none",
        height : "10px",
        lineHeight : "20px",
        margin:"0px 0px 0px 5px "
    });
    var allOverlay = locate.webMap.mapObject.getOverlays();
    for(var i  =0 ; i<allOverlay.length;i++){
        if(allOverlay[i].getTitle()==device.id){
            allOverlay[i].setIcon(icon);
            var label = allOverlay[i].getLabel()
            label.setContent("");//设置标签内容为空
            label.setStyle({borderWidth:"0px"});
            allOverlay[i].setLabel(labe2);
            allOverlay[i].setLabel(labeName);
            allOverlay[i].setRotation(device.d);
        }else{
            if(allOverlay[i].getTitle()!="0"){
                /* allOverlay[i].setIcon(icon3);
                 var label = allOverlay[i].getLabel();
               // if(label.point.)
                 label.setContent("");//设置标签内容为空
                 label.setStyle({borderWidth:"0px"});
                 allOverlay[i].setLabel(labe3);*/
            }}
    }
}
/**
 * 测试轨迹回放
 */
var lushu;
function  guiji() {
    window.locate.webMap.mapObject.enableScrollWheelZoom();
    window.locate.webMap.mapObject.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
    // 实例化一个驾车导航用来生成路线
    var drv = new BMap.DrivingRoute('北京', {
        onSearchComplete: function(res) {
            if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = res.getPlan(0);
                var arrPois =[];
                for(var j=0;j<plan.getNumRoutes();j++){
                    var route = plan.getRoute(j);
                    arrPois= arrPois.concat(route.getPath());
                }
                window.locate.webMap.mapObject.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
                window.locate.webMap.mapObject.setViewport(arrPois);

                lushu = new BMapLib.LuShu(window.locate.webMap.mapObject,arrPois,{
                    defaultContent:"<div><span style='color:red'>测试北京天安们到达</span><b>植物园</b></div>",//"从天安门到百度大厦"
                    autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon  : new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                    speed: 4500,
                    enableRotation:true,//是否设置marker随着道路的走向进行旋转
                    landmarkPois: [
                        {lng:116.314782,lat:39.913508,html:'饶平站到了',pauseTime:1},
                        {lng:116.315391,lat:39.964429,html:'高速公路收费',pauseTime:2},
                        {lng:116.381476,lat:39.974073,html:'肯德基早餐',pauseTime:1}
                    ]});
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
function  huifang() {
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
    var data = [{"lng":113.429123,"lat":23.169472},{"lng":113.429123,"lat":23.169472},{"lng":113.429123,"lat":23.169472},{"lng":113.429137,"lat":23.16946},{"lng":113.429137,"lat":23.16946},{"lng":113.429137,"lat":23.16946},
        {"lng":113.429136,"lat":23.169402},{"lng":113.429136,"lat":23.169402},{"lng":113.429136,"lat":23.169402},{"lng":113.429143,"lat":23.169464},{"lng":113.42915,"lat":23.169418},{"lng":113.42915,"lat":23.169418},
    ];
    for(var i =0 ; i<data.length;i++) {
        points.push(new BMap.Point(data[i].lng, data[i].lat));
    }
    var pointCollection = new BMap.PointCollection(points, options);
    locate.webMap.mapObject.addOverlay(pointCollection);

}
/*
* 计时器
* */
function  timedCount(c) {
    var t;
    c = c<= 0 ? 20: c;
    $('#txtOnlineVehicles').text(String(c));
    c--;
    t=setTimeout("timedCount("+c+")",1000);
}
/*
 加载数据   传来的id ,判断是不是第一次穿来的数据 true是第一次 自己设置中心点
* */
function chushudataadd(id,change,Number){

    var device = alldevices[id];
    var geoc = new BMap.Geocoder();
    convertor(device.lng, device.lat, function (point) {
        device.lng = point.lng;
        device.lat=point.lat;
        locate.devicespoint.push(device);
        //  console.log(locate.devicespoint);

        queryAddress(point, function (address) {
            if (device != null) {
                //  console.log(address);
                var sContent = "<div style='margin:0px;padding:0px;border-top: 1px solid #c9c9c9;'>" +
                    "<div class='display-label'> <b>时间:</b> " + device.st  + "</div>" +
                    "<div class='display-label'> <b>定位:</b>" + gpsDataParser.parseLocateType(device) + "[" + gpsDataParser.parseDirection(device) +"]</div>"+
                    "<div class='display-label'><b>状态:</b>" + gpsDataParser.parseAcc(device) + "</div>" +
                    "<div class='display-label'><b>里程:</b> " + device.m + "km</div>"+
                    "<div class='display-label'><b>速度:</b>" + device.sp + "km</div>" +
                    "<div style='margin:2px;'><b>位置:</b>" + address + "</div>" +
                    "<div class='mon_button' id='The_alarm'>" +
                    "<span>街景</span> " +
                    "<span>追踪</span><span>轨迹</span><span>详情</span><span > 告警</span><b></b>"    +
                    "<span>指令</span><span>轨迹</span><span>详情</span><span>告警</span>"+
                    "</div>" +
                    "</div>";
                var data = [{
                    lng: point.lng,
                    lat: point.lat,
                    na: sContent
                }
                ]
                showGpsinfo(data, device,change);
            }
        });
    });
}
//根据点设置中心点
function Setcenter(point, Number) {
    locate.webMap.mapObject.centerAndZoom(point, Number);
}
//处理位置是否移动过   listdataflashing   存储变动过的数据
function bit_Change_location(data) {
    listdataflashing = [];
    //如果大于0,表示有数据
    if(listdata.length>0){
        //处理每条数据的id是否匹配
        for(var i =0;i<listdata[0].length;i++){
            for(var j =0;j<data.length;j++){
                if(data[j].type ==0 && listdata[0][i].id==data[j].id ){
                    //匹配成功计算经纬度是否一致
                    if(listdata[0][i].lat==data[j].lat && listdata[0][i].lng ==data[j].lng){
                        //一致,没变,不用处理
                    }else{
                        listdataflashing.push(listdata[0][i]);
                    }
                }
            }
        }
    }
    listdata =[];
    listdata.push(data);
}
//计算位置是否移动过,来一闪一闪功能
function mobileflashing(c) {
    var allOverlay = locate.webMap.mapObject.getOverlays();
    //获取地图上的点
    if(listpoint.length>0){
        for(k in listpoint){
            locate.webMap.mapObject.removeOverlay(allOverlay[k]);
        }}else{
        for (var i = 0; i < allOverlay.length ; i++){
            for(j in listdataflashing){
                if(allOverlay[i].getTitle() == listdataflashing[j].id){
                    listpoint.push(i);
                    locate.webMap.mapObject.removeOverlay(allOverlay[i]);
                }else {
                    //更换图片
                    /* var icon = new BMap.Icon('/gps_web/resources/new/image/car.png', new BMap.Size(69,65), {
                         imageOffset: new BMap.Size(0, 0),
                         infoWindowAnchor: new BMap.Size(0, 0),
                         anchor: new BMap.Size(30, 30)
                     });
                     allOverlay[i].setIcon(icon);*/
                }
            }}
    }
    c=c-1;
    setTimeout("showpoint("+c+")",700);
}
//显示
function showpoint(c) {
    if(c>0){
        for(var tree in listdataflashing){
            chushudataadd(listdataflashing[tree].id,true,false);
        }
        setTimeout("mobileflashing("+c+")",700);
    }else{
        for(var tree in listdataflashing){
            chushudataadd(listdataflashing[tree].id,true,false);
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

    var headhtml = "<html><head><title></title></head><body>";
    var foothtml = "</body>";
    // 获取div中的html内容
    var newhtml = document.all.item("box_map").innerHTML;
    // 获取div中的html内容，jquery写法如下
    // var newhtml= $("#" + printpage).html();

    // 获取原来的窗口界面body的html内容，并保存起来
    var oldhtml = document.body.innerHTML;

    // 给窗口界面重新赋值，赋自己拼接起来的html内容
    document.body.innerHTML = headhtml + newhtml + foothtml;
    // 调用window.print方法打印新窗口


    window.print();
    // 将原来窗口body的html值回填展示

    location.reload();

}
/*
 * 根据x和y,加地址显示弹窗
 * */
function showGpsinfo(data, device,change) {
    var allOverlay = locate.webMap.mapObject.getOverlays();
    //  console.log(allOverlay);
    for(var i =0;i<allOverlay.length;i++){
        if(allOverlay[i].point !=null ) {

            // console.log(allOverlay[i].getTitle());
            //判断地图里是否有重复的id
            if (allOverlay[i].getTitle() == device.id) {
                //   console.log("重复了");
                locate.webMap.mapObject.removeOverlay(allOverlay[i]);
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
    title += '<div> </div>'; /*<img  src="/image/xiaoxi.png" />*/
    title += '</div>';
    title += '</div>';
    title += '</div>';
    for (var i = 0; i < data.length; i++) {
        data_info.push(data[0].lng);
        data_info.push(data[0].lat);
        data_info.push(data[0].na);
    }
    locate.opts = {
        width: 360,     // 信息窗口宽度
        height: 0,     // 信息窗口高度
        title: title, // 信息窗口标题
        enableMessage: true//设置允许信息窗发送短息
    };
    var icon ;
    var label;
    var labe2;
    var iscunlie = Clickidstorage.indexOf(device.id);
    if(iscunlie==-1){
        icon = new BMap.Icon('/static/image/defaultsmine.png', new BMap.Size(20,26), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
        });
          label = new BMap.Label("<span style='color:#0489D6;position: relative; right: 30px;'>"+device.na+"</span>" ,{offset:new BMap.Size(10,20)});
        label.setStyle({
            border: "none",
            height : "10px",
            lineHeight : "20px",
            margin:"0px 0px 0px 10px "
        });
        locate.markers = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]), {
            icon: icon
        });
        locate.markers.setLabel(label);
    }else {
          icon = new BMap.Icon('/static/image/pointimage/attentionicon.png', new BMap.Size(69,70), {
            imageOffset: new BMap.Size(0, 0),
            infoWindowAnchor: new BMap.Size(0, 0),
            /* anchor: new BMap.Size(30, 30)*/
        });
        var labe2 = new BMap.Label(" <span  class='iconbigshow'>km/h</span> <span class='iconbigshowna'  >"+device.na+" </span>" +
            "<span class='iconbigspload' >"+device.sp*10+"</span>",
            {offset:new BMap.Size(10,20)});
        labe2.setStyle({
            border: "none",
            height : "10px",
            lineHeight : "20px",
            margin:"0px 0px 50px 5px "
        });

        locate.markers = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]), {
            icon: icon
        });
        locate.markers.setLabel(labe2);

    }

    //注入标注

    //标注设置属性"<span>12km</span> <span style='position: relative;top: 25px; background: #fff;padding: 5px;'>"+
    //给每个标注的标题加入id
    locate.markers.setTitle(device.id) ;
    console.log("方向"+device.d);
    var content = data_info[2];
    locate.markers.setRotation(device.d);
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
            //  console.log(e);
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
function  Page(page) {
    var pageName  =page.innerText;
    switch (pageName){
        case "在线监控":
            window.location="/gps_web/center";
            break;
        case "司机管理":
            window.location="/gps_web/driver";
            break;
        case "多车跟踪":
            window.location="/gps_web/carstracking";
            break;
        case "统计分析":
            window.location="/gps_web/statistical";
            break;
        case "运行管理":
            window.location="/gps_web/run";
            break;
        case "报表管理":
            window.location="/gps_web/report";
            break;
        case "历史轨迹":
            window.location="/gps_web/history";
            break;
        case "信令管理":
            window.location="/gps_web/Signaling";
            break;
        case "告警管理":
            window.location="/gps_web/alarm";
            break;
        case "更多功能":
            window.location="/gps_web/More_functions";
            break;
        default:

    }
}
/**
 *  关闭面板的车辆信息
 * @type {Element}
 */
function penlarareacar() {
    $("#panelqucar").toggle(500);
}
function Drag_the(id) {
    //获取元素

    var dv = document.getElementById(id);
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
//鼠标按下事件
    dv.onmousedown = function(e) {
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
    }
//鼠标移动
    window.onmousemove = function(e) {
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
    }
//鼠标抬起事件
    dv.onmouseup = function() {
        //开关关闭
        isDown = false;
        dv.style.cursor = 'default';
    }
}
function Drag_thes(id) {
    //获取元素
    var ds = document.getElementById(id);
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
//鼠标按下事件
    ds.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = ds.offsetLeft;
        t = ds.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        ds.style.cursor = 'move';
    }
//鼠标移动
    window.onmousemove = function(e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        ds.style.left = nl + 'px';
        ds.style.top = nt + 'px';
    }
//鼠标抬起事件
    ds.onmouseup = function() {
        //开关关闭
        isDown = false;
        ds.style.cursor = 'default';
    }
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
function showInfo(e){

    var html='<br /><div class="layui-upload-list" style="width:40%; margin:0 auto;">'
        +' <input type="text" id="inputname" name="title" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"> />'
        +'<img class="layui-upload-img ui-border-radius" id="Picture" name="file"  src="/static/image/alarmpoint.png">'
        +'</div><br />'
        +'<div style="width:40%;height:20px;margin:0 auto;text-align:center;">'
        +'<button class="layui-btn layui-btn-primary" style="width:100%" id="SelectPicture">选择图标</button>'
        +'<button class="layui-btn" style="width:100%;margin-top:10px;margin-left:0px;"  id="UpdatePictures">保存图片</button>'
        +'<button class="ui-btn-lg ui-btn-primary" id="UploadPictures" style="display: none" >确定选择</button>'
        +'</div>';

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
        ,data:{
            name:   function(){

                return $('#inputname').val();

            },
            lng:function () {
                return   e.point.lng;
            } ,
            lat:function () {
                return   e.point.lat;
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
            if(res.error=="ok..."){
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
            location.reload();
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


    var point = new BMap.Point(e.point.lng,e.point.lat);
    var marker = new BMap.Marker(point);// 创建标注
    locate.webMap.mapObject.addOverlay(marker);             // 将标注添加到地图中
    locate.webMap.mapObject.setDefaultCursor("pointer");
    locate.webMap.mapObject.removeEventListener("click", showInfo);
}
//定义临时数据
function  falsedata() {
    var data = [{"dn":"12123212321","na":"京B37A01","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":1,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067bc7b03682842ea3c8b","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"120187322661","na":"京B37A95","gt":"2018-04-18 01:26:41","st":"2018-04-18 09:26:42","val":1,"lng":113.429546,"lat":23.168944,"alt":0,"sp":0.0,"d":163,"a":0,"s":6,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":24,"sat":0,"id":"5aab54147b0368691e55c68e","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"10189415505","na":"京B37A93","gt":"2018-04-16 19:12:52","st":"2018-04-16 19:13:44","val":1,"lng":112.50104,"lat":37.80122,"alt":0,"sp":7.0,"d":257,"a":0,"s":786435,"o":0,"m":749.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":8,"sat":1,"id":"5aa741df7b03680b92edf012","pid":"5a72abd83d769a75b6309dee","type":0,"icon":" ","marker":"00.png","rotate":1},{"dn":"12345678911","na":"京B37A02","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5abc94297b03682842ea3567","pid":"5abc94017b03682842ea3566","type":0,"icon":" ","marker":"00.png","rotate":1},{"dn":"888888888888888","na":"京B37A03","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067e97b03682842ea3c8f","pid":"5a72abd83d769a75b6309dee","type":0,"icon":" ","marker":"00.png","rotate":1},{"dn":"3333333333333","na":"京B37A04","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067ad7b03682842ea3c8a","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"1111111111111","na":"京B37A05","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067947b03682842ea3c88","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"5555555555555","na":"京B37A06","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067c77b03682842ea3c8c","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"22222222222","na":"京B37A06","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067a17b03682842ea3c89","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"13311012700","na":"京B37A94","gt":"2018-03-23 09:35:38","st":"2018-03-23 09:35:39","val":1,"lng":113.429116,"lat":23.169497,"alt":0,"sp":0.0,"d":59,"a":0,"s":3,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5a74182b3d769a7dcc878d5d","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"99999999999999","na":"京B37A07","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067f57b03682842ea3c90","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"6666666666666","na":"京B37A09","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067d17b03682842ea3c8d","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":"777777777777","na":"京B37A08","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5ad067de7b03682842ea3c8e","pid":"5a72abd83d769a75b6309dee","type":0,"icon":"","marker":"00.png","rotate":1},{"dn":null,"na":"第一车队","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5a72abd83d769a75b6309dee","pid":"5a72c8733d769a75b6309ff0","type":1,"icon":"","marker":null,"rotate":0},{"dn":null,"na":"锐讯易通","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5a72ab073d769a75b6309dec","pid":"5a72c8733d769a75b6309ff0","type":2,"icon":"","marker":null,"rotate":0},{"dn":null,"na":"测试公司","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5abc8e257b03682842ea33e9","pid":"5a72c8733d769a75b6309ff0","type":2,"icon":"","marker":null,"rotate":0},{"dn":null,"na":"测试公司的测试车队","gt":null,"st":null,"val":0,"lng":0.0,"lat":0.0,"alt":0,"sp":0.0,"d":0,"a":0,"s":0,"o":0,"m":0.0,"oil":0.0,"vss":0.0,"ovt":0,"oid":0,"iot":0,"iid":0,"iof":0,"rid":0,"rt":0,"rf":0,"aid":0,"exs":0,"ios":0,"ad0":0,"ad1":0,"net":0,"sat":0,"id":"5abc94017b03682842ea3566","pid":"5abc8e257b03682842ea33e9","type":1,"icon":"","marker":null,"rotate":0}];
    return data;
    //  console.log(data);
}
//地图列表
function maplistdata() {
    var list=[];
    $.ajax({
        url: "/dictionary/list", //请求地址
        dataType: "json", //数据格式
        data: {
            kind: 5,
            grid:true,
        },
        type: "post", //请求方式
        async: false, //是否异步请求
        success:function (data) {
            var zNodes="[{";
            for(i in data.rows){
                list.push(mapTransformdata(data.rows[i]));
                // var ss =  data.rows[i].pid;
                /* if(ss==undefined){
                     zNodes+="name:"+ss.name+",open:true"
                 }*/
            }
            //  console.log(data);
            // $.fn.zTree.init($("#dataTreedis"), setting2,list);
            /* var htmlmap = {list:data.rows}
            $("#maplist_tpl").html(htmlmap);*/
        }
    })
}
//转换数据地图列表的
function  mapTransformdata(datas) {
    var pids =datas.pid;
    if(pids ==undefined){
        pids=0;
    }
    var data = new Object();
    data.pId = pids;
    data.name = datas.name;
    data.id=datas.id;
    data.open = true;
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
        success:function (data) {
            var allimage =  data.msg;
            if(data.rows.length>0){
                for(var datas in data.rows){
                    markloadlocet(data.rows[datas].lng,data.rows[datas].alt, data.rows[datas].name,true,data.rows[datas].showName);
                    //datalist.push(data.rows[datas].showName);
                }
                var tabledata ={list:data.rows};
                var html = template("tpllocat", tabledata);
                $('#locat_Data').html(html);
            }}
    })
}
/*
  标注
 参数:经纬度,图片,是否启用纠偏
 */
function markloadlocet(lnga,lata,image,isrectifying,showName) {
    var lng = lnga;
    var lat  = lata;
    if(isrectifying == true){
        var point = new BMap.Point(lng,lat);
        var myIcon = new BMap.Icon("/static/icons/"+image, new BMap.Size(20,20));
        var marker2 = new BMap.Marker(point, {
            icon: myIcon
        });
        var labe3 = new BMap.Label("<span style='color:#0489D6;position: relative; right: 20px;'>"+showName+"</span>" ,{offset:new BMap.Size(10,20)});
        labe3.setStyle({
            border: "none",
            height : "10px",
            lineHeight : "20px",
            margin:"0px 0px 0px 5px "
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
    var butong = "<li class='libuoonton' id='libuoonton'> <input type='button' onclick='dataTreedian()' value='点名'></input> " +
        "<input type='button' value='资料'></input>  </li>";

    // $(".level0").
    $(".ztree li").on("mouseover",function(e){
        e.stopPropagation();
        //  stopBubble(e);
        //$("#libuoonton").remove();
        // $(".libuoonton").remove();
        $(this).parent().removeAttr("style");
        // console.log(this);
        var isName =$(this).find("a");
        isName.length==count?"":  e.stopPropagation();
        for(var i=0;i<isName.length;i++){
            //  console.log(isName[0].childNodes[1]);
            if(isName[i].childNodes.length>3){
                if(isName[i].childNodes[2].className=="diy divnema"){
                    $(isName[i]).parent().css("background","#FFDECF");
                    return;

                    // $(isName[i]).parent().append(butong);
                }}
        }


    });
    $(".ztree li").on("mouseleave",function(e){
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
    $(".ztree li ").on("mouseover",function(e){
        $(this).css("background","#FFDECF");
        isName.length==count?"":  e.stopPropagation();
        var isName =$(this).find("a");
        e.stopPropagation();
        for(var i=0;i<isName.length;i++){
            //  console.log(isName[0].childNodes[1]);
            if(isName[i].childNodes[2].className=="diy divnema"){
                $(this).parent().css("background","#FFDECF");
                return;

            }
        }
    })
    $(".ztree li").on("mouseleave",function(e){
        e.stopPropagation();
        $(this).parent().removeAttr("style");
    })
}
//判断一个元素是否存在数组里
function Arrayis(id) {
    var i =treeids.indexOf(id);
    var list=[];
    if(i==-1){
        list[0] =-1;
        list[1]= false;
        return list
    }else {
        list[0] =i;
        list[1]= true;
        return list
    }
}
//侧面,隐藏,显示。
function hidden_bottom() {
    $(".cs_bottom").toggle(500);
    $(".cs_middle").toggle(500);
    $(".cs_top span:nth-child(3)").text()=="显示"? ($(".cs_top span:nth-child(3)").text("隐藏"), $(".dis_list").css("height",""+$(".dis_list").get(0).offsetHeight+"px")):$(".cs_top span:nth-child(3)").text("显示");
    $(".cs_top span:nth-child(3)::before").css("background","url(../image/t2_1.png)  no-repeat");
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

    var zTree = $.fn.zTree.getZTreeObj("dataTree"), treeNode;
    var id = treeNode.id;
    var childrendata = treeNode.children==undefined?undefined:typecar(treeNode.children);

    if(childrendata!=undefined){
        treeNode.checked==true?adddataztree(childrendata):removecarteam(childrendata);
    }else{
        //被勾选到
        treeNode.checked==true? beforeClick(treeId,treeNode):removercar(treeNode);
    }
    // alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
};
//勾选某车队
function adddataztree(childrendata) {
    for(var i=0;i<childrendata.length;i++){
        var dataxhuanuhan  = childrendata[i].id;
        if(!Arrayis(dataxhuanuhan)[1]){
            adddatalist.push(returnteamName(childrendata[i]));
            treeids.push(dataxhuanuhan);
        }
    }
    var tabledata ={list:adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}
//移除关注的某车队
function removecarteam(childrendata) {
    for(var i=0;i<childrendata.length;i++){
        var listis =Arrayis(childrendata[i].id);
        //存在
        if(listis[1]){
            //把存在的移除掉
            //treeids.splice(listis[0]);
            //adddatalist.splice(jQuery.inArray(childrendata[i],adddatalist),1);
            /*    treeids.splice(jQuery.inArray(childrendata[i].id,treeids),listis[0]);*/
            removercarliang(childrendata[i].id);
            removerarr(treeids,childrendata[i].id);
        }
    }
    var tabledata ={list:adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}
//移除某个车辆
function removercar(treeNode) {
    var listis =Arrayis(treeNode.id);
    if(listis[1]){
        removercarliang(treeNode.id);
        removerarr(treeids,treeNode.id);
    }
    var tabledata ={list:adddatalist};
    var html = template("tpl", tabledata);
    $('#content_data').html(html);
}
//在线车辆
function Onlinecar() {
    bitopen =true;
    //目前假数据,真数据需要修改
    // var data =falsedata();
    var data =datasour;
    $("#dataTree").empty();
    var listdatacer =[];
    for(var i =0;i<data.length;i++){
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id);
            if (item.o == 1) {
                listdatacer.push(fromdevices(item));
            }
        }else{
            listdatacer.push(fromfleet(item));
        }
    }
    Serialnumber=0;
    $.fn.zTree.init($("#dataTree"), setting,listdatacer);
    treenodemove(true);
}
//离线车辆
function offlinecar() {
    bitopen =true;
    $("#dataTree").empty();
    //var data =falsedata();
    var data =datasour;
    var listdatacer =[];
    suncount =0;
    treecount=0;
    for(var i =0;i<data.length;i++){
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id);
            if (item.o != 1) {
                suncount =suncount+1;
                listdatacer.push(fromdevices(item));
            }
        }else{
            treecount = treecount+1;
            listdatacer.push(fromfleet(item));
        }
    }
    count =listdatacer.length;
    Serialnumber=0;
    $.fn.zTree.init($("#dataTree"), setting,listdatacer);
    treenodemove(false);
}
//总车辆
function countcar() {
    bitopen =true;
    $("#dataTree").empty();
    // var data =falsedata();
    var data =datasour;
    var listdatacer =[];
    for(var i =0;i<data.length;i++){
        var item = data[i];
        if (item.type === 0) {
            //console.log(item.id)
            listdatacer.push(fromdevices(item));
        }else{
            listdatacer.push(fromfleet(item));
        }
    }
    Serialnumber=0;
    $.fn.zTree.init($("#dataTree"), setting,listdatacer);
    treenodemove(true);
}
//转换刚加载数据
function fromdevices(data) {
    var datastart = new Object();
    datastart.a=data.a;
    datastart.ad0=data.ad0;
    datastart.ad1=data.ad1;
    datastart.aid=data.aid;
    datastart.alt=data.alt;
    datastart.d=data.d;
    datastart.dn=data.dn;
    datastart.exs=data.exs;
    datastart.gt=data.gt;
    datastart.icon=data.icon;
    datastart.id=data.id;
    datastart.iid=data.iid;
    datastart.iof=data.iof;
    datastart.ios=data.ios;
    datastart.iot=data.iot;
    datastart.lat=data.lat;
    datastart.lng=data.lng;
    datastart.m=data.m;
    datastart.marker=data.marker;
    datastart.na=data.na;
    datastart.net=data.net;
    datastart.o=data.o;
    datastart.oid=data.oid;
    datastart.oil=data.oil;
    datastart.ovt=data.ovt;
    datastart.pId=data.pid;
    datastart.rf=data.rf;
    datastart.rid=data.rid;
    datastart.rotate=data.rotate;
    datastart.rt=data.rt;
    datastart.s=data.s;
    datastart.sat=data.sat;
    datastart.sp=data.sp;
    datastart.st=data.st;
    datastart.type=data.type;
    datastart.val=data.val;
    datastart.vss=data.vss;
    datastart.team=0;
    return datastart;

}
//移除存储id
function removerarr(arr,val) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
//移除车辆
function removercarliang(id) {
    for(var i =0;i<adddatalist.length;i++){
        if(adddatalist[i].id==id){
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
    for(var i=0;i<data.length;i++){
        if(data[i].type==0){
            return data;
        }else{
        }
        return typecar(data[i].children);
        if(data[i].type==0){
            return data;
        }else {
        }
    }
}
//绑定下拉框的所属公司与所属车队
function datacompanyandcar(data,counlist) {
    var form = layui.form;
    var car =[]
    var company =[];

    $("#Company").empty();
    $("#team").empty();
    document.getElementById('Company').add(new Option("全部", 0));
    document.getElementById('team').add(new Option("全部", 0));
    for(var i = 0 ;i<data.length;i++){
        // var ispid =  istopPid(data[i].pid,counlist);根据最高顶级

        if(data[i].type==2){
            //  car.push(data[i]);  //绑定顶级值
            document.getElementById('Company').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
        }

        if(data[i].type==1){
            //     company.push(data[i]);
            document.getElementById('team').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
            document.getElementById('Companypanelqucar').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
            document.getElementById('Companononline').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
            document.getElementById('Companonoffline').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
            document.getElementById('Companonlocat').add(new Option(data[i].na, data[i].id));//绑定DropDownList的value值，text值
        }
    }
    form.render();
    form.on('select(test)', function(data){
        bitopen =true;
        var id = data.value;
        var datasyuan = fleets[id];
        var listdatas =[];
        var datas =datasour;
        if(data.value!="0"){
            $("#team").empty();
            for(var i = 0;i<datas.length;i++){
                if(datas[i].pid==data.value && datas[i].type!=2){
                    document.getElementById('team').add(new Option(datas[i].na, datas[i].id));
                    //获取属于这个公司的车队与车的数据
                    listdatas.push(datas[i]);
                }
                else if(datas[i].pid==data.value && datas[i].type==0){
                    $("#team").html("没有车队了。");
                    listdatas.push(datas[i]);
                }
            }
            // listdatas.push(datasyuan);
            listdatas  = recursiveteam(listdatas,datas);
            $("#dataTree").empty();
            Serialnumber=0;
            $.fn.zTree.init($("#dataTree"), setting,listdatas);
            treenodemove(true);
        }else {
            $("#team").empty();
            document.getElementById('team').add(new Option("全部", 0));
            for(var i = 0 ;i<datas.length;i++){
                if(datas[i].type==1){
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
    form.on('select(teamss)',function (data) {
        bitopen =true;
        var id = data.value;
        var datas =datasour;
        var listdatas =[];
        var datasyuan = fleets[id];
        listdatas.push(datasyuan);
        listdatas  =   recursiveteam(listdatas,datas);
        $("#dataTree").empty();
        Serialnumber=0;
        $.fn.zTree.init($("#dataTree"), setting,listdatas);
        treenodemove(true);
    })
    form.on('select(Companypanelqucar)',function (data) {

    });
}
//判断是不是顶级的
function istopPid(pid,counlist) {
    var i =counlist.indexOf(pid);
    var list=[];
    if(i==-1){
        list[0] =-1;
        list[1]= false;
        return list
    }else {
        list[0] =i;
        list[1]= true;
        return list
    }
}
//判断是否是最底级
function ifuptype(data) {
    var listdataresh =[];
    for(var i=0;i<data.length;i++){
        if(data[i].type==0){
            listdataresh.push(fromdevices(data[i]));
        }else{
            listdataresh.push(fromfleet(data[i]))
        }
    }if(listdataresh.length>0){
        $("#dataTree").empty();
        Serialnumber=0;
        $.fn.zTree.init($("#dataTree"), setting,listdataresh);
        treenodemove(true);
    }
}
//点击位置服务的名称
function locatpoint(id,lng,lat) {
    var point = new BMap.Point(lng,lat);
    Setcenter(point,15);
}
//判断是不是公司
function istypecompany(type) {
    //公司
    var list =0;
    if(type===2){
        list=2;
    }else if(type==1){list=1}
    return list;
}
//车队的类型添加车  参数:车队的数据与整个数据  返回车队与车的数据
function recursiveteam(datateamlist,data) {

    var countlist=[];
    for(var j =0;j<datateamlist.length;j++){
        countlist.push(fromfleet(datateamlist[j]));
        for(var i =0 ;i<data.length;i++){
            if(data[i].pid==datateamlist[j].id && data[i].type==0){
                countlist.push(fromdevices(data[i]));
            }
        }}
    return countlist;
}
//根据车往上找车队返回他的数据带着上级,参数车,整个数据
function screshcar(car,data) {
    var countlist=[];
    var indexofid=[];
    for(var i =0 ;i<car.length;i++){
        //加载所有的车
        countlist.push(fromdevices(car[i]));
        for(var j =0 ;j<data.length;j++) {
            //这个车的车队
            if (car[i].pid==data[j].id){
                if(countlist.length>0){
                    //如果这个车的车队已经出现过.
                    var sss =indexofid.indexOf(data[j].id);
                   if(sss==-1){
                    indexofid.push(data[j].id);
                    countlist.push(fromfleet(data[j]));
                }
               console.log(indexofid);
            }
        }
    }

}
    return countlist;
}
//取消冒泡事件
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}
//根据车转换数据返回车与方向
function returnteamName(data) {
    var name =[];

        var listdata =fleets[data.pId];
        var point = new BMap.Point(data.lng, data.lat);
        data.team =listdata.na;
        data.d= gpsDataParser.parseDirection(data);
        data.sp = data.sp*10;
        queryAddress(point,function(address){
            name.push(address);
            console.log(address);
            data.locatName=name;

        });

    return data;
}
//搜索
function textscresh() {
    $("#textscresh").on("keyup",function (event) {

        var Name = $("#textscresh").val();
        var len = datasour.length;
        var arr = [];
        var reg = new RegExp(Name);
        for(var i=0;i<len;i++){
            //如果字符串中不包含目标字符会返回-1
            if(datasour[i].na.match(reg)){
                if(datasour[i].type==0){
                    arr.push(datasour[i] );
                }

            }
        }
        var arrs=   screshcar(arr,datasour);
        if(arrs.length>0){
            $("#dataTree").empty();
            Serialnumber=0;
            bitopen=true;
            $.fn.zTree.init($("#dataTree"), setting, arrs);
            treenodemove(true);
        }
        //  $.fn.zTree.init($("#dataTree"), setting,listdatacer);
    });
}
