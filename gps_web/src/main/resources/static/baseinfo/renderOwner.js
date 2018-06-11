var renderOwner = function (url) {

    var mmp = `
<form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input type="text" id="pid" name="pid" class="layui-input"/>
			<input type="text" id="companyId" name="companyId" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">姓名</label>
		<div class="layui-input-block">
			<input type="text" name="ownerName" id="ownerName" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<textarea name="remark" id="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">证件类型</label>
		<div class="layui-input-block">
			<select name="idType" id="idType">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">证件号</label>
		<div class="layui-input-block">
			<input type="text" name="idNumber" id="idNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label"> 帐号</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="account" id="account" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">用户名</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="name" id="name" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">邮箱</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="email" id="email" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">启用否</label>
		<div class="layui-input-block">
			<input type="checkbox" lay-skin="primary" name="enable" id="enable" required lay-verify="required" value="true" title="启用否" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">联系电话</label>
		<div class="layui-input-block">
			<input type="text" name="phone" id="phone" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">联系人</label>
		<div class="layui-input-block">
			<input type="text" name="contact" id="contact" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务开始时间</label>
		<div class="layui-input-block">
			<input type="text" name="serviceStartDate" id="serviceStartDate"  required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务结束时间</label>
		<div class="layui-input-block">
			<input type="text" name="serviceEndDate" id="serviceEndDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
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


    var checkShitRenderOwner = [];

    // url = filter == null ? url : url + filter;
    // console.log(url)
    // 第一个实例
    table.render({
        id: 'idTest',
        elem: '#theTable',
        url: url,
        page: true,
        where: {filter: ''},
        cols: [
            [
                {type: 'checkbox'},
                //表头

                {field: 'ownerName', title: '姓名', sort: true},

                {field: 'phone', title: '电话', sort: true},
                {
                    field: 'createTime', title: '开户时间', sort: true

                },
                {field: 'enable', title: '启用否', sort: true},
                {field: 'idNumber', title: '证件编号', sort: true},
                {field: 'idType', title: '证件类型', sort: true},
                {field: 'remark', title: '说明', sort: true},
                {
                    field: 'serviceEndDate', title: '服务结束时间', sort: true

                },
                {
                    field: 'serviceStartDate', title: '服务开始时间', sort: true

                },
                {fixed: 'right', align: 'center', minWidth: 200, toolbar: '#renderOwnerBar'}
            ]
        ]
        ,
        skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderOwner.push(obj) : removeWithoutCopy(checkShitRenderOwner, obj.data.id);
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


    // 表格内按鈕
    table.on('tool(table)', function (obj) {
        var data = obj.data;
        if (obj.event === 'setCar') {
            var theVehicles = [];
            var fff;
            // var DeviceFree = getDeviceFree();
            // var did = jQuery("#deviceId");
            // var mmp = this;
            // console.log(DeviceFree);
            var jjj = layer.open({
                type: 1 //Page层类型
                , content: '<table id="vehicle" lay-filter="vehicle"></table>',
                offset: 'lt',
                btn: ['添加', '取消', '查看已绑定'] //只是为了演示
                , yes: function () {
                    console.log(fff);
                    // 监听表格复选框选择
                    for (var i = fff.length - 1; i >= 0; i--) {
                        theVehicles.push(fff[i].id);
                    }
                    console.log(theVehicles);
                    // return;
                    jQuery.ajax({
                        url: "/owner/addVehicles", type: "POST", async: false, traditional: true,
                        data: {
                            ownerId: data.id,
                            vehicles: theVehicles
                        },
                        success: function (res) {
                            console.log(res);
                            // jQuery.each(res, function (index, data) {
                            //     var Option = "<option value='" + data.name + "'>" + data.name + "</option>";
                            //     // console.log(ele)
                            //     // console.log(Option)
                            //     // console.log(ele.append);
                            //     ele.append(Option);
                            // });
                            // console.log(res);
                            layer.close(jjj);
                        }
                    });
                }
                , btn2: function () {
                    layer.close(jjj);
                },
                btn3: function () {
                    var eee = layer.open({
                        type: 1 //Page层类型
                        , content: '<table id="vehicleShow" lay-filter="vehicleShow"></table>',
                        offset: 'lt',
                        btn: ['取消'] //只是为了演示
                        , yes: function () {
                            layer.close(eee);
                            // // return;
                            // jQuery.ajax({
                            //     url: "/vehicle/owners",   async: false, traditional: true,
                            //     data: {
                            //         vehicleId: data.id
                            //     },
                            //     success: function (res) {
                            //         console.log(res);
                            //         // jQuery.each(res, function (index, data) {
                            //         //     var Option = "<option value='" + data.name + "'>" + data.name + "</option>";
                            //         //     // console.log(ele)
                            //         //     // console.log(Option)
                            //         //     // console.log(ele.append);
                            //         //     ele.append(Option);
                            //         // });
                            //         // console.log(res);
                            //         layer.close(ccc);
                            //     }
                            // });
                        }
                        ,
                        success: function (layero, index) {
                            var table = layui.table;

                            //第一个实例
                            table.render({
                                elem: '#vehicleShow'
                                , url: 'owner/vehicles', //数据接口
                                page: true, // 开启分页
                                where: {ownerId: data.id}
                                , cellMinWidth: 150,
                                skin: "nob",
                                size: "sm"
                                , cols: [[ // 表头

                                    {
                                        field: 'annualSurveyDate', title: '年检日期'

                                    }

                                    , {field: 'deviceNumber', title: '设备号'}
                                    , {
                                        field: 'installDate', title: '安装日期'


                                    }
                                    , {field: 'motorcade', title: '车队', sort: true}
                                    , {field: 'phoneNumber', title: '电话号码', sort: true}
                                    , {field: 'plateColor', title: '车牌颜色', sort: true}
                                    , {field: 'plateNumber', title: '车牌号', sort: true}
                                    , {field: 'remark', title: '备注', sort: true}
                                    , {fixed: 'right', align: 'center', toolbar: '#DriverVehicleBar'}
                                ]],
                                // request: {
                                //     pageName: 'pageIndex' //页码的参数名称，默认：page
                                //     , limitName: 'pageSize' //每页数据量的参数名，默认：limit
                                // },
                                response: {
                                    countName: 'total' //数据总数的字段名称，默认：count
                                    , dataName: 'rows' //数据列表的字段名称，默认：data
                                }
                            });


                            table.on('tool(vehicleShow)', function (obj) {
                                var vehicle = obj.data;
                                if (obj.event === 'del') {
                                    layer.confirm('真的删除行么', function (index) {
                                        console.log(vehicle);
                                        jQuery.ajax({
                                            url: "/owner/removeVehicle", async: false, type: "POST", data: {
                                                ownerId: data.id,
                                                vehicleId: vehicle.id
                                            },
                                            success: function (res) {
                                                console.log(res);
                                                table.reload('vehicleShow', {
                                                    page: {
                                                        curr: 1 //重新从第 1 页开始
                                                    }
                                                });
                                                // obj.del();
                                                layer.close(index);
                                            }
                                        });


                                    });
                                }
                            });
                            //
                            // table.on('checkbox(ownerShow)', function (obj) {
                            //
                            //     var checkStatus = table.checkStatus('ownerShow');
                            //
                            //     // console.log(mmm)
                            //
                            //     // console.log(obj.data); //选中行的相关数据
                            //
                            //
                            // });
                        }
                    });
                },
                success: function (layero, index) {
                    var table = layui.table;

                    //第一个实例
                    table.render({
                        elem: '#vehicle'
                        , url: '/vehicle/query', //数据接口
                        page: true, // 开启分页
                        where: {filter: ''}
                        , cellMinWidth: 150,
                        skin: "nob",
                        size: "sm"
                        , cols: [[ // 表头
                            {type: 'checkbox'}


                            , {
                                field: 'annualSurveyDate', title: '年检日期'


                            }

                            , {field: 'deviceNumber', title: '设备号'}
                            , {
                                field: 'installDate', title: '安装日期'


                            }
                            , {field: 'motorcade', title: '车队', sort: true}
                            , {field: 'phoneNumber', title: '电话号码', sort: true}
                            , {field: 'plateColor', title: '车牌颜色', sort: true}
                            , {field: 'plateNumber', title: '车牌号', sort: true}
                            , {field: 'remark', title: '备注', sort: true}


                        ]],
                        // request: {
                        //     pageName: 'pageIndex' //页码的参数名称，默认：page
                        //     , limitName: 'pageSize' //每页数据量的参数名，默认：limit
                        // },
                        // response: {
                        //     countName: 'total' //数据总数的字段名称，默认：count
                        //     , dataName: 'rows' //数据列表的字段名称，默认：data
                        // }
                    });

                    table.on('checkbox(vehicle)', function (obj) {

                        var checkStatus = table.checkStatus('vehicle');
                        fff = checkStatus.data;
                        // console.log(mmm)

                        // console.log(obj.data); //选中行的相关数据


                    });
                }
            });
        }
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
                , area: ['700px', '500px']
                , content: mmp,
                btn: ['取消'] //只是为了演示
                , yes: function () {
                    console.log("no")
                    layer.closeAll();
                }
                ,
                success: function (layero, index) {
                    console.log(layero, index);
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#serviceStartDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    laydate.render({
                        elem: '#serviceEndDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


                    getYourDICK(13, jQuery("#idType"));
                    var fuck;
                    // 即时校验
                    jQuery("#account").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/user/exist",
                            type: "POST",
                            data: {
                                account: name,
                                id: "",
                                checkId: false

                            },
                            success: function (res) {
                                fuck = res;
                                console.log(fuck);
                                if (!fuck) {
                                    layer.msg('该用户已存在');
                                }

                            }
                        });
                    });


                    var form = layui.form;
                    form.render();
                    form.on('checkbox(show)', function (data) {
                        console.log(data.elem); //得到checkbox原始DOM对象
                        console.log(data.elem.checked); //是否被选中，true或者false
                        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
                        console.log(data.othis); //得到美化后的DOM对象
                    });

                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;

                        if (!fuck) {
                            return false;
                        }

                        jQuery.ajax({
                            url: "/owner/create.form",
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
                    , content: mmp,
                    btn: ['取消'] //只是为了演示
                    , area: ['700px', '500px']
                    , yes: function () {
                        console.log("no");
                        layer.closeAll();
                    }
                    ,
                    success: function (layero, index) {
                        console.log(layero, index);
                        var laydate = layui.laydate;


                        getYourDICK(13, jQuery("#idType"));


                        var fuck = true;
                        // 即时校验
                        jQuery("#account").bind("input propertychange", function () {
                            let name = this.value;

                            console.log(name);
                            jQuery.ajax({
                                url: "/user/exist",
                                type: "POST",
                                data: {
                                    account: name,
                                    id: "",
                                    checkId: false

                                },
                                success: function (res) {
                                    fuck = res;
                                    console.log(fuck);
                                    if (!fuck) {
                                        layer.msg('该用户已存在');
                                    }

                                }
                            });
                        });

                        var form = layui.form;
                        form.render();


                        jQuery.ajax({
                            url: "/owner/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                console.log(res);
                                laydate.render({
                                    elem: '#serviceStartDate' //指定元素

                                    , value: res.serviceStartDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                laydate.render({
                                    elem: '#serviceEndDate' //指定元素

                                    , value: res.serviceEndDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });


                                jQuery("#id").val(res.id);
                                jQuery("#pid").val(res.pid);
                                jQuery("#companyId").val(res.companyId);
                                jQuery("#ownerName").val(res.ownerName);
                                jQuery("#name").val(res.name);

                                jQuery("#enable").prop("checked", res.enable);
                                jQuery("#phone").val(res.phone);
                                jQuery("#remark").val(res.remark);
                                jQuery("#idType").val(res.idType);
                                jQuery("#idNumber").val(res.idNumber);
                                jQuery("#account").val(res.account);
                                jQuery("#email").val(res.email);
                                jQuery("#contact").val(res.contact);
                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);
                            if (!fuck && jQuery("#account").val().length !== 0) {
                                console.log(!fuck)
                                return false;
                            }

                            jQuery.ajax({
                                url: "/owner/edit.form",
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
                        url: "/owner/delete", type: "POST", data: {id: data[0].id}, async: false,
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


        },
        reload: function () {
            var tableReload = $('#tableReload');
            //执行重载
            table.reload('idTest', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    filter: tableReload.val()
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
