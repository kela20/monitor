window.webMap = window.webMap || {
	global : {
		kind : 1,
		apiLoaded : false
	}
};
window.webMap.maps = window.webMap.maps || {};
// 给其他页面提供的方法接口
window.webMap.events = {
	onMapLoadCompleted : {},
	onMapApiLoadCompleted : {}
};
// 传入不同种类的地图
window.webMap.createMap = function(name) {
	var map;
	switch (webMap.global.kind) {
	case 1: // 百度地图
		window.webMap.maps[name] = new webMap.baiduMap({
			name : name
		});
		break;
	case 2: // 谷歌地图
		window.webMap.maps[name] = new webMap.googleMap({
			name : name
		});
		break;
	default:
	}
	map = window.webMap.maps[name];
	map.loadMap();
	return map;
};
(function() {
	var initializing = false;
	webMap.Class = function() {
	};
	webMap.Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for ( var name in prop) {
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" ? (function(name, fn) {
				return function() {
					var tmp = this._super;

					this._super = _super[name];

					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, prop[name]) : prop[name];
		}

		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
})();

// 信息窗
window.webMap.infoWindow = webMap.Class.extend({
	init : function(config) {
	}
});
window.webMap.createInfoWindow = function(config) {
	switch (webMap.global.kind) {
	case 1:
		return new webMap.baiduInfoWindow(config);
		break;
	case 2:
		return new webMap.googleInfoWindow(config);
		break;
	}
};
// 百度信息窗
window.webMap.baiduInfoWindow = window.webMap.infoWindow.extend({
	data : undefined, // 位置数据
	window : undefined, // 窗体对象
	isHidden : false, // 是否已隐藏
	map : undefined, // 地图
	allowQueryAddress : true,
	makeContent : function() {
		if (!this.data)
			return "";
		var alarm = gpsDataParser.parseAlarm(this.data);
		var infoHtml = "<div style='margin:0'>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px;font-weight:bold'><span style='color:red;font-size:14px'>设备</span>:"
				+ this.data.na + "</div>" + "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>状态</span>:"
				+ gpsDataParser.parseStatus(this.data) + "</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>时间</span>:" + this.data.gt + "</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>速度</span>:" + this.data.sp
				+ "km/h</div>" + "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>位置</span>:"
				+ this.data.addr + "</div>";
		if (alarm.length > 0)
			infoHtml = infoHtml + "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>报警</span>:" + alarm
					+ "</div>"
		infoHtml = infoHtml + "</div>";
		return infoHtml;
	},
	init : function(config) {
		var me = this;
		this.width = config.width;
		this.data = config.data;
		this.map = config.map;
		this.allowQueryAddress = config.allowQueryAddress;
		this.makeTitle = config.makeTitle;
		this.makeContent = config.makeContent;

		this.window = new BMap.InfoWindow("", {
			width : this.width ? this.width : 360,
			enableAutoPan : false
		});
		this.window.addEventListener('close', function() {
			me.isHidden = true;
		});
		this.window.addEventListener('open', function() {
			me.isHidden = false;
		});
	},
	reset : function() {
		var me = this;
		if (this.data && this.allowQueryAddress === true) {
			if (this.map)
				this.map.queryAddress(me.data.olng, me.data.olat, function(address) {
					me.data.addr = address;
					me.window.setTitle(me.makeTitle());
					me.window.setContent(me.makeContent());
					me.window.redraw();
				});
		} else {
			this.window.setTitle(this.makeTitle());
			this.window.setContent(this.makeContent());
			this.window.redraw();
		}
	}
});
// 谷歌地图信息窗
window.webMap.googleInfoWindow = window.webMap.infoWindow.extend({
	data : undefined, // 位置数据
	window : undefined, // 窗体对象
	isHidden : false, // 是否已隐藏
	map : undefined, // 地图
	allowQueryAddress : true,
	makeContent : function() {
		if (!this.data)
			return "";
		var alarm = gpsDataParser.parseAlarm(this.data);
		var alarm = "";
		var infoHtml = "<div style='margin:0'>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px;font-weight:bold'><span style='color:red;font-size:14px'>" + '设备' + "</span>:"
				+ this.data.n
				+ "</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>"
				+ '状态'
				+ "</span>:"
				+ gpsDataParser.parseStatus(this.data)
				+ "</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>"
				+ '时间'
				+ "</span>:"
				+ this.data.t
				+ "</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>"
				+ '速度'
				+ "</span>:"
				+ this.data.sp
				+ "km/h</div>"
				+ "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>"
				+ '位置'
				+ "</span>:" + this.data.addr + "</div>";
		if (alarm.length > 0)
			infoHtml = infoHtml + "<div style='margin:0;line-height:1.5;font-size:13px'><span style='color:red;font-size:14px'>" + '报警' + "</span>:"
					+ alarm + "</div>"
		infoHtml = infoHtml + "</div>";
		return infoHtml;
	},
	init : function(config) {
		var me = this;
		this.data = config.data;
		this.map = config.map;
		this.allowQueryAddress = config.allowQueryAddress;
		if (config.makeContent && typeof (config.makeContent) == 'function') {
			this.makeContent = config.makeContent;
		}

		this.window = new google.maps.InfoWindow({
			maxWidth : 360
		});
		google.maps.event.addListener(this.window, 'closeclick', function() {
			me.IsHidden = true;
		});
		google.maps.event.addListener(this.window, 'domready', function() {
			me.IsHidden = false;
		});
	},
	reset : function(marker) {
		var me = this;
		if (this.data && this.allowQueryAddress === true) {
			if (this.map)
				this.map.queryAddress(me.data.olng, me.data.olat, function(address) {
					me.data.addr = address;
					me.window.setContent(me.makeContent());
					if (marker != null) {
						me.window.open(me.map.mapObject, marker);
					} else {
						me.window.open(me.map.mapObject);
					}

				});
		} else {
			this.window.setContent(this.makeContent());
			if (marker != null) {
				me.window.open(me.map.mapObject, marker);
			} else {
				me.window.open(me.map.mapObject);
			}
		}
	}
});

// 标注
window.webMap.marker = webMap.Class.extend({
	init : function(config) {
	}
});
window.webMap.createMarker = function(config) {
	switch (webMap.global.kind) {
	case 1:
		return new webMap.baiduMarker(config);
		break;
	case 2:
		return new webMap.googleMarker(config);
		break;
	}
};
// 百度标注
window.webMap.baiduMarker = window.webMap.marker.extend({
	id : undefined,
	data : undefined,
	enableClicking : true,
	allowShowLabel : true,
	allowRotate : true,
	map : undefined,
	marker : undefined,
	iconUrl : null,
	iconAnchor : null,
	infoWindow : undefined,
	zIndex : null,
	openInfoWindow : function() {
		this.infoWindow.data = this.data;
		this.infoWindow.reset();
		this.infoWindow.owner = this;
		var map = this.map.mapObject;
		map.centerAndZoom(new BMap.Point(this.data.olng, this.data.olat), map.getZoom());
		this.marker.openInfoWindow(this.infoWindow.window);
	},
	closeInfoWindow : function() {
		this.marker.closeInfoWindow();
	},
	init : function(config) {
		var me = this;
		this.map = config.map;
		this.data = config.data;
		this.allowShowLabel = config.allowShowLabel;
		this.allowRotate = config.allowRotate;
		this.id = this.data.dn;
		this.iconSetting = config.icon || gpsDataParser.parseIcon(this.data);
		this.iconAnchor = config.iconAnchor || {
			x : 16,
			y : 16
		};
		this.zIndex = config.zIndex;
		var icon = new BMap.Icon(this.iconSetting.url, new BMap.Size(32, 32), {
			imageOffset : new BMap.Size(-this.iconSetting.offset, 0),
			infoWindowAnchor : new BMap.Size(20, 0),
			anchor : new BMap.Size(this.iconAnchor.x, this.iconAnchor.y)
		});
		this.marker = new BMap.Marker(new BMap.Point(this.data.olng, this.data.olat), {
			icon : icon,
			enableClicking : this.enableClicking,
			rotation : this.allowRotate === true ? this.data.d : 0
		}); // 创建标注

		if (this.zIndex) {
			this.marker.setZIndex(this.zIndex);
		}

		if (this.allowShowLabel === true)
			this.resetLabel();

		this.marker.addEventListener('click', function() {
			me.openInfoWindow();
		});
		this.infoWindow = config.infoWindow;
		this.map.mapObject.addOverlay(this.marker);
	},
	refresh : function() {
		var iconSetting = gpsDataParser.parseIcon(this.data);
		var icon = this.marker.getIcon();
		icon.setImageUrl(iconSetting.url);
		icon.setImageOffset(new BMap.Size(-iconSetting.offset, 0));
		this.marker.setIcon(icon);
		if (this.allowRotate === true)
			this.marker.setRotation(this.data.d);

		this.marker.setPosition(new BMap.Point(this.data.olng, this.data.olat));

		if (this.infoWindow && this.infoWindow.isHidden === false && this.infoWindow.data && this.infoWindow.data.dn == this.data.dn) {
			this.infoWindow.data = this.data;
			this.infoWindow.reset();
		}
	},
	resetLabel : function() {
		var label = this.marker.getLabel();
		if (label)
			return;
		label = new BMap.Label(this.data.na, {
			offset : new BMap.Size(32, 16)
		})
		label.setStyle({
			fontSize : "12px",
			border : "1px solid White"
		});
		this.marker.setLabel(label);
	},
	removeLabel : function() {
		var label = this.marker.getLabel();
		if (label)
			this.map.mapObject.removeOverlay(label);
	},
	dispose : function() {
		this.removeLabel();
		this.map.mapObject.removeOverlay(this.marker);
	}
});
// 谷歌标注
window.webMap.googleMarker = window.webMap.marker.extend({
	id : undefined,
	data : undefined,
	enableClicking : true,
	allowShowLabel : true,
	map : undefined,
	marker : undefined,
	infoWindow : undefined,
	label : undefined,
	openInfoWindow : function() {
		this.infoWindow.data = this.data;
		this.infoWindow.map = this.map;
		this.infoWindow.reset(this.marker);
	},
	closeInfoWindow : function() {
		this.infoWindow.close();
	},
	init : function(config) {
		var me = this;
		this.map = config.map;
		this.data = config.data;
		this.allowShowLabel = config.allowShowLabel;
		this.id = this.data.dn;
		var iconUrl = gpsDataParser.parseIcon(this.data);
		var icon = new google.maps.MarkerImage(iconUrl, new google.maps.Size(32, 32));
		var point = new google.maps.LatLng(this.data.olat, this.data.olng);
		this.marker = new google.maps.Marker({
			position : point,
			icon : icon,
			clickable : this.enableClicking,
			map : me.map.mapObject
		}); // 创建标注
		this.map.markerArray.push({
			id : this.data.id + "marker",
			overlay : this.marker
		});
		if (this.allowShowLabel === true)
			this.resetLabel();

		google.maps.event.addListener(me.marker, 'click', function() {
			me.openInfoWindow();
		});
		this.infoWindow = config.infoWindow;
	},
	refresh : function() {
		var iconUrl = gpsDataParser.parseIcon(this.data);
		var iconImage = new google.maps.MarkerImage(iconUrl, new google.maps.Size(32, 32));
		this.marker.setIcon(iconImage);
		var point = new google.maps.LatLng(this.data.olat, this.data.olng);
		this.marker.setPosition(point);
		if (this.infoWindow && this.infoWindow.isHidden === false && this.infoWindow.data && this.infoWindow.data.dn == this.data.dn) {
			this.infoWindow.data = this.data;
			this.infoWindow.reset(this.marker);
		}
		if (this.label) {
			this.label.latlng_ = point;
			this.label.draw();
		}
	},
	resetLabel : function() {
		var label = this.label;
		if (label)
			return;
		this.label = this.map.addLabel(this.data.n, this.data.olng, this.data.olat, {
			x : 15,
			y : -20
		}, this.data.id + "label");
	},
	removeLabel : function() {
		var label = this.label;
		if (label)
			label.setMap(null);
		this.map.removeOverlay(this.data.id + "label");
		this.label = null;
	},
	dispose : function() {
		this.removeLabel();
		this.marker.setMap(null);
		this.map.removeOverlay(this.data.id + "marker");
	}
});

// 多线段
window.webMap.polyline = webMap.Class.extend({
	init : function(config) {
	}
});
window.webMap.createPolyline = function(config) {
	switch (webMap.global.kind) {
	case 1:
		return new webMap.baiduPolyline(config);
		break;
	case 2:
		return new webMap.googlePolyline(config);
		break;
	}
};

// 百度多线段
window.webMap.baiduPolyline = window.webMap.polyline.extend({
	map : undefined,
	lineObj : undefined,
	points : [],
	color : null,
	init : function(config) {
		this.map = config.map;
		this.points = config.points || [];
		this.color = config.color || 'red';
		this.lineObj = new BMap.Polyline(this.points, {
			strokeColor : this.color,
			strokeWeight : 3,
			strokeOpacity : 0.6,
			enableClicking : false
		});
		this.map.mapObject.addOverlay(this.lineObj);
	},
	addPoint : function(olng, olat) {
		var point = new BMap.Point(olng, olat);
		this.points.push(point);
		this.lineObj.setPath(this.points);
	},
	refresh : function() {
		this.lineObj.setPath(this.points);
	},
	clear : function() {
		if (this.lineObj)
			this.map.mapObject.removeOverlay(this.lineObj);
		this.lineObj = null;
		this.points = null;
	}
});
// 谷歌多线段
window.webMap.googlePolyline = window.webMap.polyline.extend({
	map : undefined,
	lineObj : undefined,
	points : [],
	init : function(config) {
		this.map = config.map;
		var googleLatLntArray = [];
		// 将百度地图的经纬度对象转换成谷歌地图经纬度
		if (this.points != null) {
			for (var i = 0; i < this.points.length; i++) {
				var baiduPoint = this.points[i];
				if (baiduPoint != null) {
					googleLatLntArray.push(new google.maps.LatLng(baiduPoint.lat, baiduPoint.lng));
				}
			}
		}
		this.lineObj = new google.maps.polyline({
			path : googleLatLntArray,
			strokeColor : 'red',
			strokeWeight : 6,
			strokeOpacity : 0.5,
			clickable : false
		});
		this.lineObj.setMap(this.map.mapObject);
		this.map.markerArray.push({
			id : "",
			overlay : this.lineObj
		});
	},
	addPoint : function(olng, olat) {
		var point = new google.maps.LatLng(olat, olng)
		this.points.push(point);
		this.map.panTo(olng, olat);
		this.lineObj.setPath(this.points);
	},
	refresh : function() {
		this.lineObj.setPath(this.points);
	}
});

// 地图
window.webMap.map = webMap.Class.extend({
	init : function(config) {
	}
});
// 百度地图
window.webMap.baiduMap = window.webMap.map.extend({
	// 本地MAP对象
	mapObject : undefined,
	// MAP名称
	name : undefined,
	init : function(config) {
		this.name = config.name;
	},
	loadMap : function() {
		var me = this;
		window.baiduMapApiLoad = function() {
			var link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('type', 'text/css');
			link.setAttribute('href', 'http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css');
			document.body.appendChild(link);
			link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('type', 'text/css');
			link.setAttribute('href', 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css');
			document.body.appendChild(link);
			var s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js';
			document.body.appendChild(s);
			s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay.js';
			document.body.appendChild(s);
			s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer.js';
			document.body.appendChild(s);
			s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js';
			document.body.appendChild(s);
			s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';
			document.body.appendChild(s);
			s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/library/RectangleZoom/1.2/src/RectangleZoom_min.js';
			document.body.appendChild(s);

			for ( var name in window.webMap.events.onMapApiLoadCompleted) {
				window.webMap.events.onMapApiLoadCompleted[name](me);
			}

			if (me.name) {
				me.mapObject = new BMap.Map(me.name, {
					enableMapClick : false
				});
				me.mapObject.centerAndZoom(new BMap.Point(104.822339, 37.839088), 5);
				me.mapObject.addControl(new BMap.NavigationControl());
				me.mapObject.addControl(new BMap.ScaleControl());
				me.mapObject.addControl(new BMap.OverviewMapControl());
				me.mapObject.addControl(new BMap.MapTypeControl());
				me.mapObject.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
				me.mapObject.enableContinuousZoom();
				me.mapObject.addEventListener("tilesloaded", loaded);
			}
			function loaded() {
				me.mapObject.removeEventListener("tilesloaded", loaded);

				if (me.name in window.webMap.events.onMapLoadCompleted) {
					window.webMap.events.onMapLoadCompleted[me.name](me);
				}
			}

			// var localCity = new BMap.LocalCity();
			// localCity.get(function(result) {
			// me.mapObject.setCenter(result.name);
			// });
		};
		if (window.webMap.global.apiLoaded === false) {
			window.webMap.global.apiLoaded = true;
			var s = document.createElement('script');
			s.src = "http://api.map.baidu.com/api?v=2.0&ak=EqLFrxbDZx7VfrnnXAm8X6km&callback=baiduMapApiLoad";
			document.body.appendChild(s);
		} else
			window.baiduMapApiLoad();
	},
	// 测距
	distance : function() {
		var tool = new BMapLib.DistanceTool(this.mapObject);
		tool.open(); // 开启鼠标测距
	},
	// 纠偏
	convertor : function(lng, lat, callback, context) {
		$.ajax({
			async : false,
			url : "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&mode=1&x=" + lng + "&y=" + lat,
			type : "GET",
			dataType : 'jsonp',
			jsonp : 'callback',
			data : null,
			timeout : 5000,
			beforeSend : function() {

			},
			success : function(json) {// 客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
				var point = new BMap.Point(json[0].x, json[0].y);
				callback(point, context);
			},
			complete : function(XMLHttpRequest, textStatus) {

			},
			error : function(xhr) {
				// jsonp
				// 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
				// 请求出错处理
			}
		});
	},
	translate : function(points, index, callback, context) {
		if (points.length <= 0) {
			callback && callback(points, context);
			return;
		}
		me = this;
		var x = [];
		var y = [];
		var start = index
		for (start = index; index < points.length; index++) {
			var p = points[index];
			x.push(p.lng);
			y.push(p.lat);
			if (x.length == 20) {
				index++;
				break;
			}
		}
		$.ajax({
			async : false,
			url : "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&mode=1&x=" + x.join(',') + "&y=" + y.join(','),
			type : "GET",
			dataType : 'jsonp',
			jsonp : 'callback',
			data : null,
			timeout : 5000,
			beforeSend : function() {

			},
			success : function(json) {// 客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
				for (var i = 0; i < json.length; i++) {
					var point = new BMap.Point(json[i].x, json[i].y);
					var item = points[start + i];
					item.olng = point.lng;
					item.olat = point.lat;
				}
				if (index < points.length)
					me.translate(points, index, callback, context);
				else
					callback && callback(points, context);
			},
			complete : function(XMLHttpRequest, textStatus) {

			},
			error : function(xhr) {
				// jsonp
				// 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
				// 请求出错处理
			}
		});
	},
	queryAddress : function(olng, olat, callback, context) {
		var me = this;
		var point = new BMap.Point(olng, olat);
		var gc = new BMap.Geocoder();
		gc.getLocation(point, function(rs) {
			if (!rs)
				return '';

			var addComp = rs.addressComponents;
			var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
			if (address.length < 2) {
				address = "经度:" + 0 + ",纬度：" + 0;
			} else {
				var surround = rs.surroundingPois;
				for (var i = 0; i < surround.length; i++) {
					address += ",离" + surround[i].title + "约" + Math.round(me.mapObject.getDistance(point, surround[i].point)) + "米";
				}
			}
			;
			callback(address, context);
		}, {
			poiRadius : 1000,
			numPois : 2
		});
	},
	makePoints : function(list) {
		var points = [];
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var point = new BMap.Point(item.olng, item.olat);
			points.push(point);
		}
		return points;
	},
	getCenter : function() {
		var point = this.mapObject.getCenter();
		return point;
	},
	setCenter : function(point) {
		var to = new BMap.Point(point.lng, point.lat);
		this.mapObject.setCenter(to);
	},
	getZoom : function() {
		return this.mapObject.getZoom();
	},
	// 设置缩放级别
	setZoom : function(zoom) {
		this.mapObject.setZoom(zoom);
	},
	zoomout : function() {
		var zoomout = new BMapLib.RectangleZoom(this.mapObject, {
			zoomType : 0,
			autoClose : true,
			followText : "拉框放大"
		});
		zoomout.open(); // 开启拉框放
	},
	zoomin : function() {
		var zoomout = new BMapLib.RectangleZoom(this.mapObject, {
			zoomType : 1,
			autoClose : true,
			followText : "拉框缩小"
		});
		zoomout.open(); // 开启拉框放
	},
	// 清除復盖物
	clearOverlays : function() {
		this.mapObject.clearOverlays();
	},
	removeOverlay : function(overlay) {
		this.mapObject.removeOverlay(overlay);
	},
	// 设置最佳视角
	setViewport : function(list) {
		var points = this.makePoints(list);
		this.mapObject.setViewport(points);
	},
	// 重设中心
	panTo : function(olng, olat) {
		this.mapObject.panTo(new BMap.Point(olng, olat));
	},
	// 获取两点距离
	getDistance : function(point1, point2) {
		var p1 = new BMap.Point(point1.lng, point1.lat);
		var p2 = new BMap.Point(point2.lng, point2.lat);
		return Math.round(this.mapObject.getDistance(p1, p2));
	},
	// 设置工具栏
	setCustomControl : function(div, option) {
		var o = option || {
			anchor : "top_left",
			offset : {
				x : 80,
				y : 10
			}
		};
		// 定义一个控件类,即function
		function CustomControl() {
			switch (option.anchor) {
			case "top_right":
				this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
				break;
			default:
				// 默认停靠位置和偏移量
				this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
				break;
			}

			this.defaultOffset = new BMap.Size(o.offset.x, o.offset.y);
		}
		// 通过JavaScript的prototype属性继承于BMap.Control
		CustomControl.prototype = new BMap.Control();

		// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
		// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
		CustomControl.prototype.initialize = function(map) {
			// 创建一个DOM元素
			// var container = document.createElement("div");
			// $(container).html(html);
			// 设置样式
			// container.style.cursor = "pointer";
			// container.style.border = "1px solid gray";
			// container.style.borderRadius = "5px";
			// container.style.backgroundColor = "white";
			// container.style.opacity = 0.8;
			// 添加DOM元素到地图中
			map.getContainer().appendChild(div);
			// 将DOM元素返回
			return div;
		}
		// 创建控件
		var customControl = new CustomControl();
		// 添加到地图当中
		this.mapObject.addControl(customControl);
	},
	traffic : function() {
		if (!this.trafficControl) {
			this.trafficControl = new BMapLib.TrafficControl({
				showPanel : false
			});
			this.mapObject.addControl(this.trafficControl);
			this.trafficControl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
		}
		if (!this.trafficOn || this.trafficOn === false) {
			this.trafficControl.showTraffic();
			this.trafficOn = true;
		} else {
			this.trafficControl.hideTraffic();
			this.trafficOn = false;
		}

	},
	/**
	 * 打开手绘面板
	 */
	drawingOpen : function(callback) {
		if (!this.drawingManager) {
			var styleOptions = {
				strokeColor : "blue", // 边线颜色。
				// fillColor : "red", // 填充颜色。当参数为空时，圆形将没有填充效果。
				strokeWeight : 2, // 边线的宽度，以像素为单位。
				strokeOpacity : 0.6, // 边线透明度，取值范围0 - 1。
				fillOpacity : 0.2, // 填充的透明度，取值范围0 - 1。
				strokeStyle : 'solid' // 边线的样式，solid或dashed。
			}
			// 实例化鼠标绘制工具
			this.drawingManager = new BMapLib.DrawingManager(this.mapObject, {
				isOpen : false, // 是否开启绘制模式
				enableDrawingTool : false, // 是否显示工具栏
				drawingToolOptions : {
					anchor : BMAP_ANCHOR_TOP_RIGHT, // 位置
					offset : new BMap.Size(10, 40), // 偏离值
					drawingModes : [ BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE ]
				},
				circleOptions : styleOptions, // 圆的样式
				polylineOptions : styleOptions, // 线的样式
				polygonOptions : styleOptions, // 多边形的样式
				rectangleOptions : styleOptions
			// 矩形的样式
			});
			// 添加鼠标绘制工具监听事件，用于获取绘制结果
			this.drawingManager.addEventListener('overlaycomplete', callback);
		}
		this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
		this.drawingManager.open();
	},
	/**
	 * 关闭手绘面板
	 */
	drawingClose : function(callback) {
		if (!this.drawingManager) {
			return;
		}
		this.drawingManager.close();
	},
	/**
	 * 画圆形
	 */
	drawingCircle : function(point, radius, name) {
		var center = new BMap.Point(point.lng, point.lat);
		var circle = new BMap.Circle(center, radius, {
			strokeColor : "blue",
			fillColor : "red",
			strokeWeight : 2,
			strokeOpacity : 0.6,
			fillOpacity : 0.2,
			strokeStyle : 'solid'
		});
		this.mapObject.addOverlay(circle);

		if (name) {
			var label = new BMap.Label(name, {
				position : center
			})
			circle.label = label;
			this.mapObject.addOverlay(label);
		}

		return circle;
	},
	/**
	 * 画多边形
	 */
	drawPolygon : function(points, name) {
		var path = [];
		for (var x = 0; x < points.length; x++) {
			var point = points[x];
			point = new BMap.Point(point.lng, point.lat);
			path.push(point);
		}
		var rectangle = new BMap.Polygon(path, {
			strokeColor : "blue",
			fillColor : "red",
			strokeWeight : 2,
			strokeOpacity : 0.6,
			fillOpacity : 0.2,
			strokeStyle : 'solid'
		});

		this.mapObject.addOverlay(rectangle);

		if (name) {
			var label = new BMap.Label(name, {
				position : rectangle.getBounds().getCenter()
			})
			rectangle.label = label;
			this.mapObject.addOverlay(label);
		}

		return rectangle;
	},
	/**
	 * 画线
	 */
	drawPolyline : function(points) {
		var path = [];
		for (var x = 0; x < points.length; x++) {
			var point = points[x];
			point = new BMap.Point(point.lng, point.lat);
			path.push(point);
		}
		var polyline = new BMap.Polyline(path, {
			strokeColor : "red", // 折线颜色
			strokeWeight : 5, // 折线的宽度，以像素为单位。
			strokeOpacity : 0.6, // 折线的透明度，取值范围0 - 1。
			strokeStyle : 'solid' // 折线的样式，solid或dashed。
		});
		this.mapObject.addOverlay(polyline);

		return polyline;
	},
	/**
	 * 画兴趣点
	 */
	drawPoi : function(point, name, icon) {
		var p = new BMap.Point(point.lng, point.lat);
		var poi = new BMap.Marker(p, {
			strokeColor : "blue",
			fillColor : "red",
			strokeWeight : 2,
			strokeOpacity : 0.6,
			fillOpacity : 0.2,
			strokeStyle : 'solid'
		});
		if (icon) {
			var ico = new BMap.Icon(icon.url, new BMap.Size(icon.size.width, icon.size.height));
			ico.setAnchor(new BMap.Size(icon.anchor.x, icon.anchor.y));
			poi.setIcon(ico);
		}
		if (name) {
			var label = new BMap.Label(name, {
				position : p,
				offset : new BMap.Size(20, 15)
			})
			poi.setLabel(label);
		}

		this.mapObject.addOverlay(poi);
		return poi;
	}
});
// 谷歌地图
window.webMap.googleMap = window.webMap.map
		.extend({
			// 本地MAP对象
			mapObject : undefined,
			// MAP名称
			name : undefined,
			markerArray : new Array(), // 存放地图覆盖物的数组,Google
			drawTool : undefined, // ,Google
			init : function(config) {
				this.name = config.name;
			},
			loadMap : function() {
				var me = this;
				window.googleMapApiLoad = function() {
					var latlng = new google.maps.LatLng(39.784, -86.108);
					var myOptions = {
						zoom : 15,
						center : latlng,
						mapTypeId : google.maps.MapTypeId.ROADMAP,
						navigationControl : true, // 导航控件
						scaleControl : true, // 缩放控件
						overviewMapControl : true,
						streetViewControl : true, // 全景图
						scrollwheel : true
					// 启用滚轮缩放地图，默认为true
					};
					me.mapObject = new google.maps.Map(document.getElementById(me.Name), myOptions);
					function loaded() {
						USGSOverlay.prototype = new google.maps.OverlayView();

						/** ************************************************测距相关***************************************** */
						var _map = me.mapObject;
						var drawTool = new google.maps.drawing.DrawingManager({
							map : _map,
							drawingControl : true,
							drawingControlOptions : {
								position : google.maps.ControlPosition.TOP_CENTER,
								drawingModes : [ google.maps.drawing.OverlayType.POLYLINE, ]
							}
						});
						me.DrawTool = drawTool;
						// 绘制完成时触发
						google.maps.event
								.addListener(
										me.drawTool,
										"overlaycomplete",
										function(m) {
											var length = 0; // 距离
											var overlay = new Object();
											var paths = m.overlay.getPath();
											length = google.maps.geometry.spherical.computeLength(paths);
											length = length / 1000; // 转换为KM
											length = length.toFixed(3);
											var str = length + "km";
											var keyDate = new Date().getTime(); // 当前时间的毫秒，用做ID
											me.markerArray.push({
												id : "drawLine" + keyDate,
												Overlay : m.overlay
											}); // 将当前画的线存入数组
											// 在地图上显示一个文本结果，为测距总距离
											me.addLabel(str, paths.getAt(paths.length - 1).lng(), paths.getAt(paths.length - 1).lat(), {
												x : -5,
												y : 15
											}, "drawLabel" + keyDate);
											// 添加一个删除按钮的图层，用与删除当前的测距
											var obj = document.createElement("DIV");
											obj.id = keyDate;
											obj.style.position = "absolute";
											obj.innerHTML = "<a href='javascript:viod(0)' style='color:red; text-decoration:none; font-weight:bold; font-size:16px;display:block;height:15px;width:15px;background-color:White;border:1px solid red;text-align:center;line-height:15px;'>x</a>";
											var overlay = new USGSOverlay(obj, new google.maps.LatLng(paths.getAt(paths.length - 1).lat(), paths
													.getAt(paths.length - 1).lng()), {
												x : -5,
												y : -5
											}, 'label', "");
											me.markerArray.push({
												id : "drawClose" + keyDate,
												overlay : overlay
											}); // 添加到数组
											overlay.setMap(me.mapObject); // 在地图上显示
											overlay.bind("click", function(e) {
												var keyDate = e.currentTarget.id; // 获得存放在div里面的key
												me.removeOverlay("drawLine" + keyDate);
												me.removeOverlay("drawLabel" + keyDate);
												me.removeOverlay("drawClose" + keyDate);
											});
											me.drawTool.setDrawingMode(null);

										});

						if (window.webMap.events.onMapLoadCompleted) {
							window.webMap.events.onMapLoadCompleted(me);
						}
					}
					;
					google.maps.event.addListenerOnce(me.mapObject, "tilesloaded", loaded); // 改事件触发后，会自动删除
				};
				var script = document.createElement("script");
				script.type = "text/javascript";
				// var language = common.global.GetCookie('language');
				// language = language || 'zh-CN';
				// if (language === 'zh-CN')
				script.src = "http://ditu.google.cn/maps/api/js?sensor=false&libraries=drawing&callback=GoogleMapApiLoad";
				// else
				// script.src =
				// "http://maps.google.com/maps/api/js?sensor=false&libraries=drawing&callback=GoogleMapApiLoad";
				document.getElementsByTagName("head")[0].appendChild(script);
			}, // 测距
			distance : function() {
				var mObj = this;
				this.drawTool.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
			}, // 纠偏
			convertor : function(lng, lat, callback) {
				var strPoints = lng + ',' + lat;
				var url = "/Utility/Shared/GetGooglePoint";
				$.get(url, {
					lng : lng,
					lat : lat
				}, function(data) {
					var point = new google.maps.LatLng(data.lat, data.lng);
					callback({
						lng : point.lng(),
						lat : point.lat()
					});
				});
			},
			translate : function(points, callback) {
				var requests = [];
				for (var i = 0; i < points.length; i++) {
					var p = points[i];
					requests.push("," + p.lng + "," + p.lat);
				}
				var url = "/Utility/Shared/GetGooglePoints";
				$.get(url, {
					points : requests.join(';')
				}, function(list) {
					for (var i = 0; i < list.length; i++) {
						var point = new google.maps.LatLng(list[i].lat, list[i].lng);
						var item = points[i];
						item.olng = point.lng();
						item.olat = point.lat();
					}
					callback(points);
				});
			},
			queryAddress : function(olng, olat, callback) {
				var geocoder = new google.maps.Geocoder();
				var point = new google.maps.LatLng(olat, olng);
				geocoder.geocode({
					'location' : point
				}, function(results, status) {
					var address = "";
					if (status == google.maps.GeocoderStatus.OK) {
						if (results.length > 0) {
							address = results[0].formatted_address;
						}
					}
					callback(address);
				});
			},
			makePoints : function(list) {
				var points = [];
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					var point = new google.maps.LatLng(item.olat, item.olng);
					points.push(point);
				}
				return points;
			},
			// 清除復盖物
			clearOverlays : function() {
				for (var i = 0; i < this.markerArray.length; ++i) {
					if (this.markerArray[i] != null) {
						this.markerArray[i].overlay.setMap(null);
						delete this.markerArray[i];
					}
				}
				this.markerArray = null;
				this.markerArray = new Array();
			},
			// 设置最佳视角
			setViewport : function(list) {
				var points = this.makePoints(list);
				if (points.length >= 2) {
					var latLngBounds = new google.maps.LatLngBounds(points[0], points[1]);
					this.mapObject.fitBounds(latLngBounds);
				}
			},
			// 设置缩放级别
			setZoomLevel : function(zoom) {
				this.mapObject.setZoom(zoom);
			},
			// 重设中心
			panTo : function(olng, olat) {
				this.mapObject.panTo(new google.maps.LatLng(olat, olng));
			},
			// 获取两点距离
			getDistance : function(point1, point2) {
				var radLat1 = point1.lat * Math.PI / 180.0;
				var radLat2 = point2.lat * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = (point1.lng * Math.PI / 180.0) - (point2.lng * Math.PI / 180.0);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000);
				s = s / 10000;
				return parseInt(s * 1000); // 计算单位：KM
			},
			addLabel : function(htmlStr, lng, lat, offset, id) { // 添加文本到地图,Google
				var obj = document.createElement("DIV");
				obj.id = id;
				obj.style.position = "absolute";
				obj.style.color = "blue";
				obj.style.height = "16px";
				obj.style.whiteSpace = "nowrap";
				obj.style.backgroundColor = "white";
				obj.style.fontSize = "12px";
				obj.innerHTML = htmlStr;
				var overlay = new USGSOverlay(obj, new google.maps.LatLng(lat, lng), offset, 'label', id);
				this.markerArray.push({
					id : id,
					Overlay : overlay
				}); // 添加到数组
				overlay.setMap(this.mapObject); // 在地图上显示
				return overlay;

			},
			removeOverlay : function(id) { // 从地图上删除指定覆盖物,Google
				for (var i = 0; i < this.MarkerArray.length; ++i) {
					if (this.markerArray[i] != null) {
						if (this.markerArray[i].id == id) {
							this.markerArray[i].overlay.setMap(null);
							this.markerArray.splice(i, 1);
							break;
						}
					}
				}
			}
		});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ************************************************谷歌地图用户自定义覆盖物************************************************ */
/*
 * Google Maps API 第 3 版提供了用于创建自定义叠加层的 OverlayView 类。OverlayView
 * 是一个基类，提供了您在创建叠加层时必须实现的若干方法。 要创建自定义叠加层，请执行以下操作： •将自定义对象的 prototype 设置为
 * google.maps.OverlayView() 的新实例。这可以有效地实现叠加层类的“子类化”。
 * •为自定义叠加层创建构造函数，并将该构造函数中的所有初始化参数都设置为自定义属性。 •在原型中实现 onAdd()
 * 方法，以将叠加层附加到地图上。当地图准备好附加叠加层后，系统将会调用 OverlayView.onAdd()。 •在原型中实现 draw()
 * 方法，以处理对象的视觉显示。同样，在对象首次显示后，系统将会调用 OverlayView.draw()。 •您还应当实现 onRemove()
 * 方法，以清理在叠加层中添加的所有元素。
 */
function USGSOverlay(htmlObj/* DOM对象 */
, latlng/* 中心点 */
, offset/* 可选参数，相对于中心点偏移量 */
, typeId/* 可选参数，覆盖物类型ID */
, Id/* 可选参数，覆盖物ID */
) {
	this.latlng_ = latlng;
	this.htmlObj_ = htmlObj;
	this.offset_ = offset;
	this.typeId_ = typeId;
	this.Id_ = Id;

	this.draw = function() {
		var overlayProjection = this.getProjection();
		var sw = overlayProjection.fromLatLngToDivPixel(this.latlng_);
		var div = this.htmlObj_;
		if (this.offset_ != undefined && this.offset_ != null) {
			div.style.left = sw.x + this.offset_.x + 'px';
			div.style.top = sw.y + this.offset_.y + 'px';
		} else {
			div.style.left = sw.x + 'px';
			div.style.top = sw.y + 'px';
		}
	}

	this.onAdd = function() {
		var panes = this.getPanes();
		// panes.overlayLayer.appendChild(this.htmlObj_);
		panes.overlayMouseTarget.appendChild(this.htmlObj_);
	}

	this.onRemove = function() {
		this.htmlObj_.parentNode.removeChild(this.htmlObj_);
		this.htmlObj_ = null;
	}

	this.hide = function() {
		if (this.htmlObj_) {
			this.htmlObj_.style.visibility = "hidden";
		}
	}

	this.show = function() {
		if (this.htmlObj_) {
			this.htmlObj_.style.visibility = "visible";
		}
	}

	// 绑定事件
	this.bind = function(eventname, callback) {
		google.maps.event.addDomListener(this.htmlObj_, eventname, callback);
		// google.maps.event.addListener(this, eventname, callback);
	}
}