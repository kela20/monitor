<%@ page import="com.edata.monitor.cache.AuthorizeCache"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false" contentType="text/html; charset=utf-8"%>
<html>
<head>
<title>角色管理</title>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/baseinfo/role/role.js"></script>
</head>
<body>
	<%
		boolean create_auth = AuthorizeCache.hasAuthorized("baseinfo.role.create", request);
		request.setAttribute("create_auth", create_auth);

		boolean update_auth = AuthorizeCache.hasAuthorized("baseinfo.role.update", request);
		request.setAttribute("update_auth", update_auth);

		boolean delete_auth = AuthorizeCache.hasAuthorized("baseinfo.role.delete", request);
		request.setAttribute("delete_auth", delete_auth);

		boolean authorize_auth = AuthorizeCache.hasAuthorized("baseinfo.role.authorize", request);
		request.setAttribute("authorize_auth", authorize_auth);
	%>
	<div id="roleFrame">
		<div class="mon-toolbar metro-gray">
			<div class="title mon-xxx">角色列表</div>

			<div id="btnRefreshRole" class="mon-button">
				<div class="icon i-16-refresh"></div>
				<span>刷新</span>
			</div>
			<c:if test="${create_auth || update_auth || delete_auth}">
				<div class="spliter"></div>
			</c:if>
			<c:if test="${create_auth}">
				<div id="btnCreateRole" class="mon-button">
					<div class="icon i-16-add"></div>
					<span>添加</span>
				</div>
			</c:if>
			<c:if test="${update_auth}">
				<div id="btnEditRole" class="mon-button">
					<div class="icon i-16-edit"></div>
					<span>修改</span>
				</div>
			</c:if>
			<c:if test="${delete_auth}">
				<div id="btnRemoveRole" class="mon-button">
					<div class="icon i-16-remove"></div>
					<span>删除</span>
				</div>
			</c:if>
			<c:if test="${authorize_auth}">
				<div class="spliter"></div>
				<div id="btnAuthorizeRole" class="mon-button">
					<div class="icon i-16-authorize"></div>
					<span>授权</span>
				</div>
			</c:if>
		</div>
		<div class="mon-clear"></div>
		<div id="gridRole"></div>
	</div>
</body>
</html>