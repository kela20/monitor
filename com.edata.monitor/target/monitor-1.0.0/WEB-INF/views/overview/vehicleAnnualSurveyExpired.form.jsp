<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" contentType="text/html; charset=utf-8"%>
<html>
<head>
<title>车辆年检到期</title>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/overview/vehicleAnnualSurveyExpired.js"></script>
</head>
<body>
	<div class="mon-toolbar metro-gray">
		<div class="title mon-3x">车辆列表</div>
		<a href="../overview/vehicleAnnualSurveyExpiredExcel?days=${days}"
			class="mon-button">
			<div class="icon i-16-excel"></div> <span>导出Excel</span>
		</a> <a href="../overview/vehicleAnnualSurveyExpiredPdf?days=${days}"
			class="mon-button">
			<div class="icon i-16-pdf"></div> <span>导出Pdf</span>
		</a>
	</div>
	<div id="gridVehicleExpired"></div>
</body>
</html>