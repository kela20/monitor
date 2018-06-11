var renderRole = function (url) {

    var mmp = `
        <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input id="companyId" name="companyId" type="hidden"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">名称</label>
		<div class="layui-input-block">
			<input type="text" name="name" id="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
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


    var checkShitRenderRole = [];

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


                {field: 'name', title: '名称', sort: true},
                {field: 'remark', title: '说明', sort: true},
                {fixed: 'right', align: 'center', toolbar: '#renderRoleBar'}

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

        obj.checked ? checkShitRenderRole.push(obj) : removeWithoutCopy(checkShitRenderRole, obj.data.id);
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
                url: "/role/authorizes", async: false, data: {roleId: data.id},
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

                , anim: 0 //0-6的动画形式，-1不开启
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
                        url: "/role/authorize", type: "POST", async: false, traditional: true,
                        data: {
                            roleId: data.id,
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
                , content: mmp,
                btn: ['取消'] //只是为了演示
                , yes: function () {
                    console.log("no")
                    layer.closeAll();
                }
                ,
                success: function (layero, index) {
                    console.log(layero, index);


                    var fuck;
                    // 即时校验
                    jQuery("#name").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/role/exist",
                            type: "POST",
                            data: {
                                name: name,
                                id: "",
                                checkId: false

                            },
                            success: function (res) {
                                fuck = res;
                                console.log(fuck);
                                if (!fuck) {
                                    layer.msg('Role已存在');
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
                            url: "/role/create.form",
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
                    , yes: function () {
                        console.log("no");
                        layer.closeAll();
                    }
                    ,
                    success: function (layero, index) {
                        console.log(layero, index);


                        var fuck = true;
                        // 即时校验
                        jQuery("#name").bind("input propertychange", function () {
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
                            url: "/role/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {


                                console.log(res);


                                jQuery("#id").val(res.id);


                                jQuery("#companyId").val(res.companyId);
                                jQuery("#name").val(res.name);
                                jQuery("#remark").val(res.remark);

                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            // return false;

                            if (!fuck && jQuery("#name").val().length !== 0) {
                                return false;
                            }
                            jQuery.ajax({
                                url: "/role/edit.form",
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
                        url: "/role/delete", type: "POST", data: {id: data[0].id}, async: false,
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
