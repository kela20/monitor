var renderVehicleLicence = function (url) {

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
		<label class="layui-form-label">所有人</label>
		<div class="layui-input-block">
			<input type="text" name="owner" id="owner" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">外廓尺寸</label>
		<div class="layui-input-block">
			<input type="text" name="overallSize" id="overallSize" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">准牵引总质量</label>
		<div class="layui-input-block">
			<input type="text" name="tractionMass" id="tractionMass" required lay-verify="required"  class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">住址</label>
		<div class="layui-input-block">
			<input type="text" name="address" id="address" placeholder="请输入内容" class="layui-input"/>
		</div>
	</div>
 
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">核定载人数</label>
		<div class="layui-input-block">
			<input type="text" name="approvedPassengersCapacity" id="approvedPassengersCapacity" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">检验记录</label>
		<div class="layui-input-block">
			<input type="text" name="inspectionRecord" id="inspectionRecord" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆类型</label>
		<div class="layui-input-block">
			<input type="text" name="vehicleType" id="vehicleType" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">注册日期</label>
		<div class="layui-input-block">
			<input type="text" name="registerDate" id="registerDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<input type="text" name="remark" id="remark" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">核定载质量</label>
		<div class="layui-input-block">
			<input type="text" name="approvedLoad" id="approvedLoad" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发动机号码</label>
		<div class="layui-input-block">
			<input type="text" name="engineNo" id="engineNo" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发证日期</label>
		<div class="layui-input-block">
			<input type="text" name="issueDate" id="issueDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车牌号</label>
		<div class="layui-input-block">
			<input type="text" name="plateNo" id="plateNo" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">档案编号</label>
		<div class="layui-input-block">
			<input type="text" name="documentNo" id="documentNo" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">使用性质</label>
		<div class="layui-input-block">
			<input type="text" name="useCharacter" id="useCharacter" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">品牌型号</label>
		<div class="layui-input-block">
			<input type="text" name="model" id="model" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆识别代号</label>
		<div class="layui-input-block">
			<input type="text" name="vin" id="vin" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">整备质量</label>
		<div class="layui-input-block">
			<input type="text" name="curbWeight" id="curbWeight" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">总质量</label>
		<div class="layui-input-block">
			<input type="text" name="totalMass" id="totalMass" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
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

    var checkShitRenderVehicleLicense = [];

    // url = filter == null ? url : url + filter;
    // console.log(url)
    // 第一个实例
    table.render({
        id: 'idTest',
        elem: '#theTable',
        url: url,
        page: true,
        where: {filter: ''},
        cellMinWidth: 180,
    cols: [
            [
                {type: 'checkbox'},
                //表头


                {field: 'owner', title: '所有人', sort: true},
                {field: 'overallSize', title: '外廓尺寸', sort: true},
                {field: 'tractionMass', title: '准牵引总质量', sort: true},
                {field: 'address', title: '住址', sort: true},
                {field: 'approvedPassengersCapacity', title: '核定载人数', sort: true},
                {field: 'inspectionRecord', title: '检验记录', sort: true},
                {field: 'vehicleType', title: '车辆类型', sort: true},
                {field: 'registerDate', title: '注册日期', sort: true},
                {field: 'remark', title: '备注', sort: true},
                {field: 'approvedLoad', title: '核定载质量', sort: true},
                {field: 'engineNo', title: '发动机号码', sort: true},
                {field: 'issueDate', title: '发证日期', sort: true},
                {field: 'plateNo', title: '车牌号', sort: true},
                {field: 'documentNo', title: '档案编号', sort: true},
                {field: 'useCharacter', title: '使用性质', sort: true},
                {field: 'model', title: '品牌型号', sort: true},
                {field: 'vin', title: '车辆识别代号', sort: true},
                {field: 'curbWeight', title: '整备质量', sort: true},
                {field: 'totalMass', title: '总质量', sort: true}
            ]
        ],
        // response: {
        //     countName: 'total' //数据总数的字段名称，默认：count
        //     , dataName: 'rows' //数据列表的字段名称，默认：data
        // },
        skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderVehicleLicense.push(obj) : removeWithoutCopy(checkShitRenderVehicleLicense, obj.data.id);
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
                    console.log("no")
                    layer.closeAll();
                }
                ,
                success: function (layero, index) {
                    console.log(layero, index);


                    // var fuck;
                    // // 即时校验
                    // jQuery("#name").bind("input propertychange", function () {
                    //     let name = this.value;
                    //
                    //     console.log(name);
                    //     jQuery.ajax({
                    //         url: "/drivingLicence/exist",
                    //         type: "POST",
                    //         data: {
                    //             name: name
                    //
                    //         },
                    //         success: function (res) {
                    //             fuck = res;
                    //             console.log(fuck);
                    //             if (!fuck) {
                    //                 layer.msg('已存在');
                    //             }
                    //
                    //         }
                    //     });
                    // });

                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#registerDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    laydate.render({
                        elem: '#issueDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


                    var form = layui.form;
                    form.render();


                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;

                        //
                        // if (!fuck) {
                        //     return false;
                        // }
                        jQuery.ajax({
                            url: "/vehicleLicense/create.form",
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


                        // var fuck = true;
                        // // 即时校验
                        // jQuery("#name").bind("input propertychange", function () {
                        //     let name = this.value;
                        //
                        //     console.log(name);
                        //     jQuery.ajax({
                        //         url: "/drivingLicence/exist",
                        //         type: "POST",
                        //         data: {
                        //             name: name
                        //
                        //         },
                        //         success: function (res) {
                        //             fuck = res;
                        //             console.log(fuck);
                        //             if (!fuck) {
                        //                 layer.msg('已存在');
                        //             }
                        //
                        //         }
                        //     });
                        // });

                        var form = layui.form;

                        // form.render();


                        jQuery.ajax({
                            url: "/vehicleLicense/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {


                                var laydate = layui.laydate;
                                laydate.render({
                                    elem: '#registerDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.registerDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                laydate.render({
                                    elem: '#issueDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.issueDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                console.log(res);


                                jQuery("#id").val(res.id);


                                jQuery("#companyId").val(res.companyId);

                                jQuery("#owner").val(res.owner);
                                jQuery("#overallSize").val(res.overallSize);
                                jQuery("#tractionMass").val(res.tractionMass);
                                jQuery("#address").val(res.address);
                                jQuery("#approvedPassengersCapacity").val(res.approvedPassengersCapacity);
                                jQuery("#inspectionRecord").val(res.inspectionRecord);
                                jQuery("#vehicleType").val(res.vehicleType);
                                jQuery("#remark").val(res.remark);
                                jQuery("#approvedLoad").val(res.approvedLoad);
                                jQuery("#engineNo").val(res.engineNo);
                                jQuery("#plateNo").val(res.plateNo);
                                jQuery("#documentNo").val(res.documentNo);
                                jQuery("#useCharacter").val(res.useCharacter);
                                jQuery("#model").val(res.model);
                                jQuery("#vin").val(res.vin);
                                jQuery("#curbWeight").val(res.curbWeight);
                                jQuery("#totalMass").val(res.totalMass);

                                // jQuery("#parentVisible").prop("checked",res.parentVisible);
                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            // return false;

                            // if (!fuck && jQuery("#name").val().length !== 0) {
                            //     return false;
                            // }
                            jQuery.ajax({
                                url: "/vehicleLicense/edit.form",
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
                        url: "/vehicleLicense/delete", type: "POST", data: {id: data[0].id}, async: false,
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
