var renderSIM = function (url) {

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
		<label class="layui-form-label">电话号码</label>
		<div class="layui-input-block">
			<input type="text" name="phoneNumber" id="phoneNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">开通短信否</label>
		<div class="layui-input-block">
			<input type="checkbox" lay-skin="primary" name="openSMS" id="openSMS" required lay-verify="required" title="开通短信否" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">语音类型</label>
		<div class="layui-input-block">
			<select name="speechType" lay-verify="required" id="speechType">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">开通日期</label>
		<div class="layui-input-block">
			<input type="text" name="openDate" id="openDate" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">流量套餐</label>
		<div class="layui-input-block">
			<input type="text" name="flowset" id="flowset" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">sim卡号</label>
		<div class="layui-input-block">
			<input type="text" name="simcardNumber" id="simcardNumber" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">购买日期</label>
		<div class="layui-input-block">
			<input type="text" name="purchaseDate" id="purchaseDate" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">运营商</label>
		<div class="layui-input-block">
			<input type="text" name="carrierOperator" id="carrierOperator" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">预交费(元)</label>
		<div class="layui-input-block">
			<input type="number" name="prepayment" id="prepayment" required lay-verify="required" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label" title="预交费到期日期">预交费到期日期</label>
		<div class="layui-input-block">
			<input type="text" name="expireDate" id="expireDate" placeholder="请输入" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-form-text">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<textarea name="remark" id="remark" placeholder="请输入" class="layui-textarea"></textarea>
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

    var checkShitRenderSIM = [];

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


                {field: 'carrierOperator', title: '运营商', sort: true},
                {field: 'openSMS', title: '开通短信否', sort: true},
                {field: 'phoneNumber', title: '电话号码', sort: true},
                {field: 'createTime', title: '创建时间', sort: true},
                {field: 'expireDate', title: '到期日期', sort: true},
                {field: 'prepayment', title: '预交费', sort: true},
                {field: 'purchaseDate', title: '购买日期', sort: true},
                {field: 'remark', title: '说明', sort: true},
                {field: 'simcardNumber', title: '卡号', sort: true},
                {field: 'speechType', title: '语音类型', sort: true},


            ]
        ],
        skin: "nob",
        size: "sm"
        // response: {
        //     countName: 'total' //数据总数的字段名称，默认：count
        //     , dataName: 'rows' //数据列表的字段名称，默认：data
        // }
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderSIM.push(obj) : removeWithoutCopy(checkShitRenderSIM, obj.data.id);
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
                area: ['950px', '500px'],
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
                    jQuery("#phoneNumber").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/simcard/exist",
                            type: "POST",
                            data: {
                                phoneNumber: name,
                                id: "",
                                checkId: false

                            },
                            success: function (res) {
                                fuck = res;
                                console.log(fuck);
                                if (!fuck) {
                                    layer.msg('SIM已存在');
                                }

                            }
                        });
                    });


                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#openDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                    laydate.render({
                        elem: '#purchaseDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    laydate.render({
                        elem: '#expireDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                    getYourDICK(7, jQuery("#speechType"));
                    var form = layui.form;
                    form.render();



                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;


                        if (!fuck) {
                            return false;
                        }


                        jQuery.ajax({
                            url: "/simcard/create.form",
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
                                layer.msg( res.responseJSON.msg )
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
                    area: ['950px', '500px'],
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
                        jQuery("#phoneNumber").bind("input propertychange", function () {
                            let name = this.value;

                            console.log(name);
                            jQuery.ajax({
                                url: "/simcard/exist",
                                type: "POST",
                                data: {
                                    phoneNumber: name,
                                    id: "",
                                    checkId: false

                                },
                                success: function (res) {
                                    fuck = res;
                                    console.log(fuck);
                                    if (!fuck) {
                                        layer.msg('SIM已存在');
                                    }

                                }
                            });
                        });

                        getYourDICK(7, jQuery("#speechType"));
                        var form = layui.form;

                        // form.render();


                        jQuery.ajax({
                            url: "/simcard/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                var laydate = layui.laydate;
                                laydate.render({
                                    elem: '#openDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.openDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                laydate.render({
                                    elem: '#purchaseDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.purchaseDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                laydate.render({
                                    elem: '#expireDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.expireDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                console.log(res);


                                jQuery("#id").val(res.id);


                                jQuery("#companyId").val(res.companyId);
                                jQuery("#phoneNumber").val(res.phoneNumber);
                                jQuery("#speechType").val(res.speechType);

                                jQuery("#flowset").val(res.flowset);
                                jQuery("#simcardNumber").val(res.simcardNumber);
                                jQuery("#carrierOperator").val(res.carrierOperator);
                                jQuery("#prepayment").val(res.prepayment);
                                jQuery("#remark").val(res.remark);
                                jQuery("#openSMS").prop("checked", res.openSMS);

                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            // return false;

                            if (!fuck && jQuery("#phoneNumber").val().length !== 0) {
                                return false;
                            }
                            jQuery.ajax({
                                url: "/simcard/edit.form",
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
                                    layer.msg( res.responseJSON.msg )
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
                        url: "/simcard/delete", type: "POST", data: {id: data[0].id}, async: false,
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
