var renderMaintain = function (url) {

    var mmp = `
      <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input type="text" id="vehicleId" name="vehicleId" class="layui-input"/>
			<input type="text" id="companyId" name="companyId" class="layui-input"/>
 
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车牌号码</label>
		<div class="layui-input-block">
			<input type="text" name="plateNumber" id="plateNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保养费用(元)</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="number" name="fee" id="fee" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保养日期</label>
		<div class="layui-input-block">
		<input type="text" name="doneDate" id="doneDate" placeholder="请输入" autocomplete="off" class="layui-input">
		 
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保养里程(公里)：</label>
		<div class="layui-input-block">
		<input type="number" name="mileage" id="mileage" placeholder="请输入" autocomplete="off" class="layui-input">
		 
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保养单位</label>
		<div class="layui-input-block">
		<input type="text" name="garage" id="garage" placeholder="请输入" autocomplete="off" class="layui-input">
		 
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">经办人</label>
		<div class="layui-input-block">
		<input type="text" name="agent" id="agent" placeholder="请输入" autocomplete="off" class="layui-input">
		 
		</div>
	</div>
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">下次保养日期</label>
		<div class="layui-input-block">
			<input type="text" name="nextDate" id="nextDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">下次保养里程(公里)</label>
		<div class="layui-input-block">
			<input type="text" name="nextMileage" id="nextMileage" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保养类型</label>
		<div class="layui-input-block">
			<select name="type" lay-verify="required" id="type">
			</select>
		</div>
	</div>
 	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">保养内容</label>
		<div class="layui-input-block">
			<textarea name="content" id="content" placeholder="请输入内容" class="layui-textarea"></textarea>
		</div>
	</div>
	 
	<div class="layui-form-item pane">
		<div class="layui-input-block">
			<button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
			<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		</div>
	</div>
</form>
    
    `;

    var sd = `<div class="layui-form-item layui-inline pane" style="margin-bottom: 0">
    <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">开始时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test19" placeholder="yyyy-MM-dd">
      </div>
    </div>`;

    var ed = `<div class="layui-form-item layui-inline pane" style="margin-bottom: 0">
    <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">结束时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test20" placeholder="yyyy-MM-dd">
      </div>
    </div>`;

    function getVehicle() {
        var shit;

        jQuery.ajax({
            url: "/vehicle/search", type: "POST", data: "pageIndex=1&pageSize=30", async: false,
            success: function (res) {
                shit = res;
                console.log(res);
            }
        });
        return shit;

    }


    function getYourDICK(type, ele) {
        var shit;

        jQuery.ajax({
            url: "/dictionary/list", type: "POST", async: false, data: {kind: type, grid: false},
            success: function (res) {
                shit = res;
                jQuery.each(res, function (index, data) {
                    var Option = "<option value='" + data.name + "'>" + data.name + "</option>";
                    // console.log(ele)
                    // console.log(Option)
                    // console.log(ele.append);
                    ele.append(Option);
                });
                // console.log(res);
            }
        });
        return shit;
    }


    document.getElementById("shitBar").innerHTML = shitbar;
    var table = layui.table;

    console.log(url);


    jQuery("#mmpxxx").prepend(ed);
    jQuery("#mmpxxx").prepend(sd);

    var laydate = layui.laydate;
    //初始赋值
    laydate.render({
        elem: '#test19'
        , value: formatTimeMin(new Date())
        , done: function (value, date, endDate) {
            // alert(value); //得到日期生成的值，如：2017-08-18

        }
    });

    //初始赋值
    laydate.render({
        elem: '#test20'
        , value: formatTime(new Date())
        , done: function (value, date, endDate) {
            // alert(value); //得到日期生成的值，如：2017-08-18

        }
    });


    var form = layui.form;
    form.render();

    var checkShitMaintain = [];

    // url = filter == null ? url : url + filter;
    // console.log(url)
    // 第一个实例
    function formatTimeMin(date) {
        var year = date.getFullYear();
        var month = date.getMonth(), month = month < 10 ? '0' + month : month;
        var day = date.getDate(), day = day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }

    function formatTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
        var day = date.getDate(), day = day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }


    table.render({
        id: 'idTest',
        elem: '#theTable',
        url: url,
        method: "POST",
        page: true,
        where: {
            plateNumber: "",
            from: formatTimeMin(new Date()),
            to: formatTime(new Date()),
            pageIndex: 1,
            pageSize: 30
        },
        cols: [
            [
                {type: 'checkbox'},
                //表头

                {field: 'content', title: '保养内容', sort: true},
                {field: 'doneDate', title: '保养时间', sort: true},
                {field: 'fee', title: '保养费用', sort: true},
                {field: 'mileage', title: '保养里程', sort: true},
                {field: 'nextDate', title: '下次保养时间', sort: true},
                {field: 'nextMileage', title: '下次保养里程', sort: true},
                {field: 'plateNumber', title: '车牌号', sort: true},
                {field: 'userName', title: '记录员', sort: true},

            ]
        ],
        skin: "nob",
        size: "sm",
        response: {
            countName: 'total' //数据总数的字段名称，默认：count
            , dataName: 'rows' //数据列表的字段名称，默认：data
        }
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitMaintain.push(obj) : removeWithoutCopy(checkShitMaintain, obj.data.id);
        var checkStatus = table.checkStatus('idTest')
            , data = checkStatus.data;
        console.log(data)

        // console.log(checkShitRenderVehicle);

        function removeWithoutCopy(arr, id) {
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i].data.id === id) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }

        // console.log(obj);
        // console.log(obj.checked); //当前是否选中状态
        // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    });


    //监听工具条
    var $ = layui.$, active = {
        add: function () { //获取选中数据
            layer.open({
                type: 1 //Page层类型
                , title: '添加'
                , shade: 0.6 //遮罩透明度
                , maxmin: true //允许全屏最小化
                , anim: 0 //0-6的动画形式，-1不开启
                , content: mmp
                , area: ['950px', '500px'],
                btn: ['取消'] //只是为了演示
                , yes: function () {
                    console.log("no");
                    layer.closeAll();
                }
                ,
                success: function (layero, index) {
                    console.log(layero, index);
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#doneDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                    laydate.render({
                        elem: '#nextDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


                    jQuery("#plateNumber").click(function () {
                        var Vehicle = getVehicle();
                        var did = jQuery("#vehicleId");
                        var mmp = jQuery(this);
                        console.log(Vehicle);
                        var kkk = layer.open({
                            type: 1 //Page层类型
                            , content: '<table id="VehicleFree" lay-filter="VehicleFree"></table>',
                            offset: 'lt',
                            success: function (layero, index) {
                                var table = layui.table;

                                //第一个实例
                                table.render({
                                    elem: '#VehicleFree'
                                    , url: '/vehicle/search', //数据接口
                                    method: "POST"
                                    , page: true //开启分页
                                    , cellMinWidth: 150,
                                    skin: "nob",
                                    size: "sm"
                                    , cols: [[ //表头
                                        {type: 'checkbox'},
                                        {field: 'annualSurveyDate', title: '年检日期', sort: true},

                                        {field: 'deviceNumber', title: '设备号', sort: true},
                                        {field: 'installDate', title: '安装日期', sort: true},

                                        {field: 'motorcade', title: '车队', sort: true},

                                        {field: 'phoneNumber', title: '电话号码', sort: true},
                                        {field: 'plateColor', title: '车牌颜色 ', sort: true},
                                        {field: 'plateNumber', title: '车牌号', sort: true},
                                        {field: 'remark', title: '备注', sort: true},

                                    ]],
                                    request: {
                                        pageName: 'pageIndex' //页码的参数名称，默认：page
                                        , limitName: 'pageSize' //每页数据量的参数名，默认：limit
                                    },
                                    response: {
                                        countName: 'total' //数据总数的字段名称，默认：count
                                        , dataName: 'rows' //数据列表的字段名称，默认：data
                                    }
                                });
                                // 监听表格复选框选择
                                table.on('checkbox(VehicleFree)', function (obj) {

                                    console.log(obj.data); //选中行的相关数据
                                    mmp.val(obj.data.plateNumber);
                                    did.val(obj.data.id);
                                    layer.close(kkk);
                                });

                            }
                        });
                    });


                    var AdminArea = getYourDICK(11, jQuery("#type"));
                    // console.log(AdminArea);

                    var form = layui.form;
                    form.render();


                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;


                        jQuery.ajax({
                            url: "/maintain/create.form",
                            type: "POST",
                            data: data.field,
                            success: function (res) {

                                console.log(res);

                                res.error ? layer.msg(res.msg) : layer.closeAll();

                                table.reload('idTest', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                });
                            },
                            error: function (res) {
                                console.log(res)
                                console.log(res.responseJSON.msg)
                                layer.msg(res.responseJSON.msg)
                            }
                        });

                        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    });

                }
            });


        }
        , modify: function () { //获取选中数目


            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            console.log(data.length)

            if (checkStatus.data.length === 1) {
                layer.open({
                    type: 1 //Page层类型
                    , title: '修改'
                    , shade: 0.6 //遮罩透明度
                    , maxmin: true //允许全屏最小化
                    , anim: 0 //0-6的动画形式，-1不开启
                    , area: ['950px', '500px']
                    , content: mmp,
                    btn: ['取消'] //只是为了演示
                    , yes: function () {
                        console.log("no");
                        layer.closeAll();
                    }
                    ,
                    success: function (layero, index) {
                        console.log(layero, index);
                        var laydate = layui.laydate;


                        jQuery("#plateNumber").click(function () {
                            var Vehicle = getVehicle();
                            var did = jQuery("#vehicleId");
                            var mmp = jQuery(this);
                            console.log(Vehicle);
                            var kkk = layer.open({
                                type: 1 //Page层类型
                                , content: '<table id="VehicleFree" lay-filter="VehicleFree"></table>',
                                offset: 'lt',
                                success: function (layero, index) {
                                    var table = layui.table;

                                    //第一个实例
                                    table.render({
                                        elem: '#VehicleFree'
                                        , url: '/vehicle/search', //数据接口
                                        method: "POST"
                                        , page: true //开启分页
                                        , cellMinWidth: 150,
                                        skin: "nob",
                                        size: "sm"
                                        , cols: [[ //表头
                                            {type: 'checkbox'},
                                            {field: 'annualSurveyDate', title: '年检日期', sort: true},

                                            {field: 'deviceNumber', title: '设备号', sort: true},
                                            {field: 'installDate', title: '安装日期', sort: true},

                                            {field: 'motorcade', title: '车队', sort: true},

                                            {field: 'phoneNumber', title: '电话号码', sort: true},
                                            {field: 'plateColor', title: '车牌颜色 ', sort: true},
                                            {field: 'plateNumber', title: '车牌号', sort: true},
                                            {field: 'remark', title: '备注', sort: true},

                                        ]],
                                        request: {
                                            pageName: 'pageIndex' //页码的参数名称，默认：page
                                            , limitName: 'pageSize' //每页数据量的参数名，默认：limit
                                        },
                                        response: {
                                            countName: 'total' //数据总数的字段名称，默认：count
                                            , dataName: 'rows' //数据列表的字段名称，默认：data
                                        }
                                    });
                                    // 监听表格复选框选择
                                    table.on('checkbox(VehicleFree)', function (obj) {

                                        console.log(obj.data); //选中行的相关数据
                                        mmp.val(obj.data.plateNumber);
                                        did.val(obj.data.id);
                                        layer.close(kkk);
                                    });

                                }
                            });
                        });


                        var AdminArea = getYourDICK(11, jQuery("#type"));

                        var form = layui.form;
                        form.render();


                        jQuery.ajax({
                            url: "/maintain/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                console.log(res);

                                laydate.render({
                                    elem: '#doneDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.doneDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                laydate.render({
                                    elem: '#nextDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.nextDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                jQuery("#id").val(res.id);
                                jQuery("#companyId").val(res.companyId);
                                jQuery("#vehicleId").val(res.vehicleId);
                                jQuery("#plateNumber").val(res.plateNumber);
                                jQuery("#mileage").val(res.mileage);
                                jQuery("#fee").val(res.fee);
                                jQuery("#garage").val(res.garage);
                                jQuery("#agent").val(res.agent);
                                jQuery("#nextMileage").val(res.nextMileage);
                                jQuery("#type").val(res.type);
                                jQuery("#content").val(res.content);

                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);


                            jQuery.ajax({
                                url: "/maintain/edit.form",
                                type: "POST",
                                data: data.field,
                                success: function (res) {

                                    console.log(res);

                                    res.error ? layer.msg(res.msg) : layer.closeAll();

                                    table.reload('idTest', {
                                        page: {
                                            curr: 1 //重新从第 1 页开始
                                        }
                                    });
                                },
                                error: function (res) {
                                    console.log(res)
                                    console.log(res.responseJSON.msg)
                                    layer.msg(res.responseJSON.msg)
                                }
                            });

                            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                            console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });

                    }
                });
            }


        }
        , delete: function () { //验证是否全选

            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;

            if (checkStatus.data.length > 1) {
                layer.msg('为了安全，请逐个删除');
            } else if (checkStatus.data.length === 0) {
                layer.msg('先選一個');
            } else {
                layer.confirm('真的删除行么？', {
                    btn: ['是', '否'] //按钮
                }, function () {
                    jQuery.ajax({
                        url: "/maintain/delete", type: "POST", data: {id: data[0].id}, async: false,
                        success: function (res) {
                            layer.msg(JSON.stringify(res.msg));
                            table.reload('idTest', {
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
                            console.log(res);
                        }
                    });

                }, function () {
                    layer.close();
                });
            }


        }, reload: function () {
            var tableReload = $('#tableReload');
            //执行重载
            table.reload('idTest', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    plateNumber: tableReload.val(),
                    from: jQuery("#test19").val(),
                    to: jQuery("#test20").val()
                }
            });
        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
        console.log(type);
        console.log(active);
    });


};
