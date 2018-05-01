var renderCompany = function (url) {

    var mmp = `
      <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input id="pid" name="pid" type="hidden"/>
			<input id="companyId" name="companyId" type="hidden"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">简称</label>
		<div class="layui-input-block">
			<input type="text" name="shortName" id="shortName" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">全称</label>
		<div class="layui-input-block">
			<input type="text" name="fullName" id="fullName" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">组织机构编号</label>
		<div class="layui-input-block">
			<input type="text" name="organCode" id="organCode" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">法人代表</label>
		<div class="layui-input-block">
			<input type="text" name="corporation" id="corporation" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">上级可见否</label>
		<div class="layui-input-block">
			<input type="checkbox" lay-skin="primary" name="parentVisible" id="parentVisible" required lay-verify="required" title="上级可见否" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">注册日期</label>
		<div class="layui-input-block">
			<input type="text" name="registDate" id="registDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">24小时值班电话</label>
		<div class="layui-input-block">
			<input type="text" name="ondutyPhone" id="ondutyPhone" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">办公地址</label>
		<div class="layui-input-block">
			<input type="text" name="officeAddress" id="officeAddress" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">注册地址</label>
		<div class="layui-input-block">
			<input type="text" name="registAddress" id="registAddress" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<textarea name="remark" id="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">管理员信息 帐号</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="account" id="account" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">管理员信息 用户名</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="name" id="name" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">管理员信息 邮箱</label>
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


    var checkShitRenderCompany = [];

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

                {field: 'fullName', title: '全称', sort: true},
                {field: 'shortName', title: '简称', sort: true},
                {field: 'officeAddress', title: '办公地址', sort: true},
                {field: 'serviceStartDate', title: '服务开始时间', sort: true},
                {field: 'serviceEndDate', title: '服务结束时间', sort: true},
                {field: 'enable', title: '启用否', sort: true},
                {field: 'createTime', title: '入网时间', sort: true},
                {field: 'ondutyPhone', title: '值班电话', sort: true},
                {field: 'remark', title: '说明', sort: true},
                {fixed: 'right', align: 'center', toolbar: '#renderCompanyBar'}

            ]
        ],
        skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderCompany.push(obj) : removeWithoutCopy(checkShitRenderCompany, obj.data.id);
        var checkStatus = table.checkStatus('idTest')
            , data = checkStatus.data;
        console.log(data);

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
        if (obj.event === 'auth') {
            // layer.msg('ID：' + data.id + ' 的查看操作');

            var authcHas = [];

            jQuery.ajax({
                url: "/company/authorizes", async: false, data: {companyId: data.id},
                success: function (res) {
                    authcHas = res;
                    console.log(authcHas)
                    // console.log(JSON.parse(VehicleType))
                    // console.log(JSON.stringify(VehicleType))
                }
            });
            var authAll = [];

            jQuery.ajax({
                url: "/common/authorizes", async: false,
                success: function (res) {
                    authAll = res;
                    console.log(authAll)
                    // console.log(JSON.parse(VehicleType))
                    // console.log(JSON.stringify(VehicleType))
                }
            });
            for (var i = authAll.length - 1; i >= 0; i--) {
                for (var j = authcHas.length - 1; j >= 0; j--) {
                    if (authcHas[j] === authAll[i].id) {
                        authAll[i].checked = true;
                    }
                }
            }


            var kkk = layer.open({
                type: 1 //Page层类型
                , content: '<ul id="treeDemo" class="ztree"></ul>'
                , shade: 0.6 //遮罩透明度

                , area: ['300px', '400px']
                , btn: ['确定', '取消'] //只是为了演示
                , yes: function () {
                    var list = [];
                    var treeObj = jQuery.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = treeObj.getCheckedNodes(true);
                    console.log(nodes);
                    // 监听表格复选框选择
                    for (var i = nodes.length - 1; i >= 0; i--) {
                        list.push(nodes[i].id);
                    }
                    console.log(list);
                    // return;
                    jQuery.ajax({
                        url: "/company/authorize", type: "POST", async: false, traditional: true,
                        data: {
                            companyId: data.id,
                            list: list
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

                success: function (layero, index) {
                    var setting = {
                        data: {
                            // mmp 大小写
                            simpleData: {
                                enable: true,
                                idKey: "id",
                                pIdKey: "pid",
                                rootPId: 0
                            }
                        },
                        callback: {
                            onClick: zTreeOnClick
                        },
                        check: {
                            enable: true,
                            chkboxType: {"Y": "ps", "N": "ps"}
                        }
                    };

                    function zTreeOnClick(event, treeId, treeNode) {
                        // mmp.val(treeNode.name);
                        // layer.close(kkk);
                        // alert(treeNode.tId + ", " + treeNode.name);
                    }

                    console.log(authAll);
                    jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, authAll);
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
                , area: ['950px', '500px']
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
                        elem: '#registDate' //指定元素
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

                    laydate.render({
                        elem: '#serviceEndDate' //指定元素
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
                                    layer.msg('用户名已存在');
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
                            url: "/company/create.form",
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
                                        layer.msg('用户名已存在');
                                    }

                                }
                            });
                        });

                        var form = layui.form;

                        // form.render();


                        jQuery.ajax({
                            url: "/company/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                laydate.render({
                                    elem: '#registDate' //指定元素,
                                    , value: res.registDate
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
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


                                console.log(res);


                                jQuery("#id").val(res.id);
                                jQuery("#pid").val(res.pid);

                                jQuery("#companyId").val(res.companyId);
                                jQuery("#shortName").val(res.shortName);
                                jQuery("#fullName").val(res.fullName);

                                jQuery("#organCode").val(res.organCode);
                                jQuery("#corporation").val(res.corporation);
                                jQuery("#parentVisible").prop("checked", res.parentVisible);
                                console.log(res.parentVisible);
                                // jQuery("#registDate").val(res.registDate);
                                console.log(res.registDate);
                                jQuery("#ondutyPhone").val(res.ondutyPhone);
                                jQuery("#officeAddress").val(res.officeAddress);
                                jQuery("#registAddress").val(res.registAddress);
                                jQuery("#remark").val(res.remark);

                                jQuery("#account").val(res.account);
                                jQuery("#name").val(res.name);
                                jQuery("#email").val(res.email);
                                jQuery("#enable").prop("checked", res.enable);

                                jQuery("#phone").val(res.phone);
                                jQuery("#contact").val(res.contact);

                                // jQuery("#serviceStartDate").val(res.serviceStartDate);
                                // jQuery("#serviceEndDate").val(res.serviceEndDate);
                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            // return false;

                            if (!fuck && jQuery("#account").val().length !== 0) {
                                return false;
                            }
                            jQuery.ajax({
                                url: "/company/edit.form",
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
                        url: "/company/delete", type: "POST", data: {id: data[0].id}, async: false,
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