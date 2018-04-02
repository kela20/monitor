<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" contentType="text/html; charset=utf-8" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<html>
<head>
    <title>监控中心</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/pure.css"/>
    <link href="${ctx}/resources/new/css/zTreeStyle.css" rel="stylesheet" />
    <link href="${ctx}/resources/new/js/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${ctx}/resources/new/css/Maincss.css" rel="stylesheet" />
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/resources/js/gpsparser.js"></script>
    <script src="${ctx}/resources/new/js/jquery/jquery.2.1.4.min.js"></script>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/resources/js/webmap.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=EqLFrxbDZx7VfrnnXAm8X6km&callback"></script>
</head>
<body>
<div class=" bodyall">
    <div class="  rowheight ">
        <!-- 左边 -->
        <div class="leftbody" id="leftbody">
            <!-- 头部 -->
            <div class="LefttopLeft">
                <div class="headleftbody">
                    <span class="car">车辆列表</span>
                    <img src="${ctx}/resources/new/image/directory.png"/>
                    <img src="${ctx}/resources/new/image/Double_right.png"/>
                        <div style="float: right;padding-right: 10px;" id="shuaxin">
                        <span class="shuaxin">刷新 </span>  <img src="${ctx}/resources/new/image/refresh.png"/>
                    </div>
                </div>
                <div class="search">
                    <img src="${ctx}/resources/new/image/search.png"/>
                    <input type="text" class="form-control" placeholder="车牌号v" id="inputsrecsh">
                </div>
            </div>
            <ul id="myTab" class="nav nav-tabs navlefthead" >
                <li class="active">
                    <a href="#All" data-toggle="tab">
                        全部 <span id="txtAllVehicles"></span>
                    </a>
                </li>

                <li><a href="#online" data-toggle="tab">在线  <span
                        id="txtOnlineVehicles"></span></a></li>
                <li><a href="#offline" data-toggle="tab">离线<span
                        id="txtOfflineVehicles"></span></a></li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade in active" id="All">
                    <div class="layer">
                        <div id="tableMain">
                            <ul id="dataTree" class="ztree">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="online">
                    <div class="layer">
                        <div id="onlinetableMain">
                            <ul id="onlinedataTree" class="ztree">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="offline">
                    <div class="layer">
                        <div id="offlinetableMain">
                            <ul id="offlinedataTree" class="ztree">
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div class="left_bottom">
                <ul>
                    <li>
                        <img src="${ctx}/resources/new/image/zaixian.png"/>
                        <span> 在线</span>
                    </li>
                    <li>
                        <img src="${ctx}/resources/new/image/lansedian.png"/>
                        <span> 行驶</span>

                    </li>
                    <li>
                        <img src="${ctx}/resources/new/image/budingwei.png"/>
                        <span> 不定位 </span>
                    </li>
                    <li>
                        <img src="${ctx}/resources/new/image/lixiandian.png"/>
                        <span>     离线   </span>
                    </li>
                    <li>
                        <img src="${ctx}/resources/new/image/baojingdian.png"/>
                        <span>报警   </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sousuotubiao" id="sousuotubiao" onclick="soushuoleft()">
            <i class="glyphicon glyphicon-chevron-left" id="imgeleft"></i>
        </div>
        <!-- 右边 -->
        <div class="Rightbody">
            <!-- 上面-->
            <div class="Rightbody_top">
                <div class="btn-group btn-group-sm ">
                    <button type="button" >查看区域车辆 <img src="${ctx}/resources/new/image/smallcar.png"/></button>
                    <button type="button" >默认视野 <img src="${ctx}/resources/new/image/eyes.png"/></button>
                    <button type="button" >刷新地图 <img src="${ctx}/resources/new/image/refresh.png"/></button>
                    <button type="button" >全屏 <img src="${ctx}/resources/new/image/foursurface.png"/></button>
                    <button type="button" >工具 <img src="${ctx}/resources/new/image/pliers.png"/></button>
                    <button type="button" >设置 <img src="${ctx}/resources/new/image/srtting.png"/></button>
                    <button type="button" >打印地图 <img src="${ctx}/resources/new/image/ditudayin.png"/></button>
                    <button type="button" >位置服务 <img src="${ctx}/resources/new/image/weizhifuwu.png"/></button>
                    <button type="button" >预留</button>
                </div>
            </div>
            <!-- 嵌套地图-->
            <div class="Rightbody_centen" id="Rightbody_centen">
                <div id="divLocateAllMap" style="height: 100%;">
                    <div id="locateMap"
                         style="width: 100%; height: 100%; -webkit-transition: all 0.5s ease-in-out; transition: all 0.5s ease-in-out;left:4px"></div>
                </div>
            </div>
            <!-- 下面-->
            <div class="bottomRigth" id="bottomRigth">
                <div class="arrow">
                    <i class="glyphicon glyphicon-chevron-down imgclass" onclick="sousuo()" id="imgclass"></i>
                </div>
                <div class="bottomhead">
                    <small>车机状态</small>
                    <img src="${ctx}/resources/new/image/srtting.png" />
                    <img src="${ctx}/resources/new/image/V.png"/>
                    <small>全部 120</small>
                    <small>在线70</small>
                    <small>异常80</small>
                </div>
                <div class="bottomb">
                    <table id="finishingTask" data-toggle="table"  data-pagination="true"   data-page-number="1" data-page-size="2"
                           data-striped =true;>

                        <thead >
                        <tr>
                            <th  data-field="id" style="display: none" class="noneid">id</th>
                            <th data-field="val"> 定位状态</th>
                            <th data-field="na">车牌号</th>
                            <th data-field="dn">终端号</th>
                            <th data-field="sp">速度</th>
                            <th data-field="sp">方向</th>
                            <th data-field="m">里程(km)</th>
                            <th data-field="s">状态</th>
                            <th data-field="addr">地址</th>
                            <th data-field="gt">最后定位时间</th>
                            <th data-field="st">数据接收时间</th>
                            <th >操作</th>
                        </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${ctx}/resources/new/js/bootstrap/js/bootstrap-table.js"></script>
<script src="${ctx}/resources/new/js/jquery/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx}/resources/new/js/jquery/jquery.ztree.exedit.js"></script>
<script src="${ctx}/resources/new/js/jquery/jquery.ztree.excheck-3.5.js"></script>
<script src="${ctx}/resources/new/js/bootstrap/js/bootstrap.min.js"></script>
<script src="${ctx}/resources/new/js/Main.js"></script>
<script src="${ctx}/resources/new/js/js/locate.js"></script>
<script src="${ctx}/resources/js/center/center.js"></script>
<script>

</script>
</body>
</html>