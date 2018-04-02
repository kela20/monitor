<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" contentType="text/html; charset=utf-8" %>
<html>
<head>
    <title>多媒体检索</title>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/resources/js/gpsparser.js"></script>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/resources/js/webmap.js"></script>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/resources/js/center/deviceData/multimediaRetrieval.js"></script>
</head>
<body>
<div id="divCenter">
    <div id="multimediaRetrievalMap"
         style="width: 100%; height: 100%; -webkit-transition: all 0.5s ease-in-out; transition: all 0.5s ease-in-out;"></div>
</div>
<div id="divBottom">
    <div class="mon-toolbar metro-gray">
        <div class="title mon-3x">图片列表</div>
        <div class="prompt editor-field">
            <input id="txtStartDate" type="text"/>
        </div>
        <div class="prompt editor-field">
            <input id="txtEndDate" type="text"/>
        </div>
        <div id="btnQuery" class="mon-button">
            <div class="icon i-16-search"></div>
            <span>查询</span>
        </div>
    </div>
    <div class="mon-clear"></div>
    <div id="gridMultimediaRetrieval"></div>
</div>
</body>
</html>