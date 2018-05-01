var renderUser = function (url) {

    var mmp = `
   <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input type="text" id="companyId" name="companyId" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">賬號</label>
		<div class="layui-input-block">
			<input type="text" name="account" id="account" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">姓名</label>
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
		<label class="layui-form-label">电话</label>
		<div class="layui-input-block">
			<input type="text" name="phone" id="phone" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">联系人</label>
		<div class="layui-input-block">
			<input type="text" name="contact" id="contact" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item pane">
		<label class="layui-form-label">启用否</label>
		<div class="layui-input-block">
			<input type="radio" name="enable" value="true" title="是" checked>
			<input type="radio" name="enable" value="false" title="否">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务开始时间</label>
		<div class="layui-input-block">
			<input type="text" name="serviceStartDate" id="serviceStartDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务结束时间</label>
		<div class="layui-input-block">
			<input type="text" name="serviceEndDate" id="serviceEndDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<textarea name="remark" id="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
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


    document.getElementById("shitBar").innerHTML = shitbar;
    var table = layui.table;
    console.log(url);


    var checkShitRenderUser = [];

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

                {field: 'createTime', title: '注册时间', sort: true},
                {field: 'enable', title: '启用否', sort: true},
                {field: 'name', title: '名称', sort: true},
                {field: 'phone', title: '电话', sort: true},

                {field: 'remark', title: '说明', sort: true},
                {field: 'serviceEndDate', title: '服务结束时间', sort: true},
                {field: 'serviceStartDate', title: '服务开始时间', sort: true},

                {fixed: 'right', align: 'center', width: 200, toolbar: '#renderUserBar'}

            ]
        ],
        skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderUser.push(obj) : removeWithoutCopy(checkShitRenderUser, obj.data.id);
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
        if (obj.event === 'addTarget') {

            var theTarget = [];
            var mmm;
            // var DeviceFree = getDeviceFree();
            // var did = jQuery("#deviceId");
            // var mmp = this;
            // console.log(DeviceFree);
            var kkk = layer.open({
                type: 1 //Page层类型
                , content: '<table id="target" lay-filter="target"></table>',

                offset: 'auto',
                btn: ['添加', '取消', '查看已绑定'] //只是为了演示
                , yes: function () {
                    console.log(mmm);
                    // 监听表格复选框选择
                    for (var i = mmm.length - 1; i >= 0; i--) {
                        theTarget.push(mmm[i].id);
                    }
                    console.log(theTarget);
                    // return;
                    jQuery.ajax({
                        url: "/user/addMonitors", type: "POST", async: false, traditional: true,
                        data: {
                            userId: data.id,
                            targets: theTarget
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
                            layer.close(kkk);
                        }
                    });
                }
                , btn2: function () {
                    layer.close(kkk);
                },
                btn3: function () {
                    var ccc = layer.open({
                        type: 1 //Page层类型
                        , content: '<table id="targetShow" lay-filter="targetShow"></table>',
                        offset: 'auto',
                        btn: ['取消'] //只是为了演示
                        , yes: function () {
                            layer.close(ccc);


                        }
                        ,
                        success: function (layero, index) {
                            var table = layui.table;


                            //第一个实例
                            table.render({
                                elem: '#targetShow'
                                , url: '/user/monitors', //数据接口
                                page: true, // 开启分页
                                where: {userId: data.id}
                                , cellMinWidth: 150,
                                skin: "nob",
                                size: "sm"
                                , cols: [[ // 表头
                                    {field: 'name', title: '名称'}


                                    , {field: 'remark', title: '说明'}

                                    , {field: 'type', title: '类型', sort: true}
                                    , {fixed: 'right', align: 'center', toolbar: '#UserTargetBar'}
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


                            table.on('tool(targetShow)', function (obj) {
                                var target = obj.data;
                                if (obj.event === 'del') {
                                    layer.confirm('真的删除行么', function (index) {
                                        console.log(target);
                                        jQuery.ajax({
                                            url: "/user/removeMonitor", async: false, type: "POST", data: {
                                                userId: data.id,
                                                targetId: target.id
                                            },
                                            success: function (res) {
                                                console.log(res);
                                                table.reload('targetShow', {
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

                        }
                    });
                },
                success: function (layero, index) {
                    var table = layui.table;

                    //第一个实例
                    table.render({
                        elem: '#target'
                        , url: '/user/targets', //数据接口
                        page: true, // 开启分页
                        where: {filter: ''}
                        , cellMinWidth: 150,
                        skin: "nob",
                        size: "sm"
                        , cols: [[ // 表头
                            {type: 'checkbox'}


                            , {field: 'name', title: '名称'}


                            , {field: 'remark', title: '说明'}

                            , {field: 'type', title: '类型', sort: true}

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

                    table.on('checkbox(target)', function (obj) {

                        var checkStatus = table.checkStatus('target');
                        mmm = checkStatus.data;
                        // console.log(mmm)

                        // console.log(obj.data); //选中行的相关数据


                    });
                }
            });


        } else if (obj.event === 'addRole') {
            var theRoles = [];
            var fff;
            // var DeviceFree = getDeviceFree();
            // var did = jQuery("#deviceId");
            // var mmp = this;
            // console.log(DeviceFree);
            var jjj = layer.open({
                type: 1 //Page层类型
                , content: '<table id="role" lay-filter="role"></table>',
                offset: 'auto',
                btn: ['添加', '取消', '查看已绑定'] //只是为了演示
                , yes: function () {
                    console.log(fff);
                    // 监听表格复选框选择
                    for (var i = fff.length - 1; i >= 0; i--) {
                        theRoles.push(fff[i].id);
                    }
                    console.log(theRoles);
                    // return;
                    jQuery.ajax({
                        url: "/user/addRoles", type: "POST", async: false, traditional: true,
                        data: {
                            userId: data.id,
                            roles: theRoles
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
                        , content: '<table id="roleShow" lay-filter="roleShow"></table>',

                        btn: ['取消'] //只是为了演示
                        , yes: function () {
                            layer.close(eee);

                        }
                        ,
                        success: function (layero, index) {
                            var table = layui.table;


                            //第一个实例
                            table.render({
                                elem: '#roleShow'
                                , url: '/user/roles', //数据接口
                                page: true, // 开启分页
                                where: {userId: data.id}
                                , cellMinWidth: 150,
                                skin: "nob",
                                size: "sm"
                                , cols: [[ // 表头
                                    {field: 'name', title: '名称', sort: true},
                                    {field: 'remark', title: '备注'}


                                    , {fixed: 'right', align: 'center', toolbar: '#UserRoleBar'}
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


                            table.on('tool(roleShow)', function (obj) {
                                var role = obj.data;
                                if (obj.event === 'del') {
                                    layer.confirm('真的删除行么', function (index) {
                                        console.log(role);
                                        jQuery.ajax({
                                            url: "/user/removeRole", async: false, type: "POST", data: {
                                                userId: data.id,
                                                roleId: role.id
                                            },
                                            success: function (res) {
                                                console.log(res);
                                                table.reload('roleShow', {
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
                        elem: '#role'
                        , url: '/role/query', //数据接口
                        page: true, // 开启分页
                        where: {filter: ''}
                        , cellMinWidth: 150,
                        skin: "nob",
                        size: "sm"
                        , cols: [[ // 表头
                            {type: 'checkbox'},
                            {field: 'name', title: '名称', sort: true},
                            {field: 'remark', title: '备注'}

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

                    table.on('checkbox(role)', function (obj) {

                        var checkStatus = table.checkStatus('role');
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
                , content: mmp,

                btn: ['取消'] //只是为了演示
                , area: ['700px', '500px']
                , yes: function () {
                    console.log("no")
                    layer.closeAll();
                }
                ,
                success: function (layero, index) {
                    console.log(layero, index);
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#serviceEndDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                    laydate.render({
                        elem: '#serviceStartDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


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


                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;


                        if (!fuck) {
                            return false;
                        }
                        jQuery.ajax({
                            url: "/user/create.form",
                            type: "POST",
                            data: data.field,
                            success: function (res) {

                                console.log(res);

                                res.error ? layer.msg(res.error) : layer.closeAll();

                                table.reload('idTest', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                });
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
                            url: "/user/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                console.log(res);
                                laydate.render({
                                    elem: '#serviceStartDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.serviceStartDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                laydate.render({
                                    elem: '#serviceEndDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.serviceEndDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                jQuery("#id").val(res.id);


                                jQuery("#companyId").val(res.companyId);
                                jQuery("#account").val(res.account);
                                jQuery("#name").val(res.name);
                                jQuery("#email").val(res.email);
                                jQuery("#remark").val(res.remark);

                                var mmmmm = res.enable;
                                jQuery(":radio[name='enable'][value='" + mmmmm + "']").prop("checked", "checked");
                                jQuery("#phone").val(res.phone);
                                jQuery("#contact").val(res.contact);


                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            console.log(fuck)
                            console.log(jQuery("#account").val().length !== 0)
                            // fuck = jQuery("#plateNumber").val().length !== 0;
                            if (!fuck && jQuery("#account").val().length !== 0) {
                                console.log(!fuck)
                                return false;
                            }
                            jQuery.ajax({
                                url: "/user/edit.form",
                                type: "POST",
                                data: data.field,
                                success: function (res) {

                                    console.log(res);

                                    res.error ? layer.msg(res.error) : layer.closeAll();

                                    table.reload('idTest', {
                                        page: {
                                            curr: 1 //重新从第 1 页开始
                                        }
                                    });
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
                layer.msg('请一个个删除');
            } else if (checkStatus.data.length === 0) {
                layer.msg('先選一個');
            } else {
                layer.confirm('真的删除行么？', {
                    btn: ['是', '否'] //按钮
                }, function () {
                    jQuery.ajax({
                        url: "/user/delete", type: "POST", data: {id: data[0].id}, async: false,
                        success: function (res) {
                            layer.msg('OK', {icon: 1});
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