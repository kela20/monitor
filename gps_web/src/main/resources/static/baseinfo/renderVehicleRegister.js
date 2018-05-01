


var renderVehicleRegister = function (url) {

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
		<label class="layui-form-label">颜色</label>
		<div class="layui-input-block">
			<input type="text" name="color" id="color" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">使用性质</label>
		<div class="layui-input-block">
			<input type="text" name="purposeOfUse" id="purposeOfUse" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">登记编号</label>
		<div class="layui-input-block">
			<input type="text" name="registerNo" id="registerNo" required lay-verify="required"  class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item  layui-inline  pane">
		<label class="layui-form-label">是否国产</label>
		<div class="layui-input-block">
		<input type="radio" name="importOrNot" value="true" title="是">
      <input type="radio" name="importOrNot" value="false" title="否" checked>
	 
		</div>
	</div>
 
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">钢板弹簧片数</label>
		<div class="layui-input-block">
			<input type="text" name="numberOfSpringLeaf" id="numberOfSpringLeaf" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆类型</label>
		<div class="layui-input-block">
			<input type="text" name="type" id="type" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发动机型号</label>
		<div class="layui-input-block">
			<input type="text" name="engineModel" id="engineModel" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">转向形式</label>
		<div class="layui-input-block">
			<input type="text" name="steeringType" id="steeringType" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">制造厂</label>
		<div class="layui-input-block">
			<input type="text" name="manufacturer" id="manufacturer" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">总质量</label>
		<div class="layui-input-block">
			<input type="text" name="grossMass" id="grossMass" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">获得方式</label>
		<div class="layui-input-block">
			<input type="text" name="meansOfAcquisition" id="meansOfAcquisition" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">准牵引总质量</label>
		<div class="layui-input-block">
			<input type="text" name="totalTractionWeight" id="totalTractionWeight" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发动机号</label>
		<div class="layui-input-block">
			<input type="text" name="engineNo" id="engineNo" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">轮胎数</label>
		<div class="layui-input-block">
			<input type="text" name="numberOfWheel" id="numberOfWheel" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆型号</label>
		<div class="layui-input-block">
			<input type="text" name="model" id="model" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">燃料种类</label>
		<div class="layui-input-block">
			<input type="text" name="fuelType" id="fuelType" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">轮距</label>
		<div class="layui-input-block">
			<input type="text" name="track" id="track" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">轴数</label>
		<div class="layui-input-block">
			<input type="text" name="numberOfAxles" id="numberOfAxles" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
			<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆品牌</label>
		<div class="layui-input-block">
			<input type="text" name="brand" id="brand" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">驾驶室载客</label>
		<div class="layui-input-block">
			<input type="text" name="passengerCapacityOfCab" id="passengerCapacityOfCab" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">登记机关</label>
		<div class="layui-input-block">
			<input type="text" name="registerOffice" id="registerOffice" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">货箱内部尺寸</label>
		<div class="layui-input-block">
			<input type="text" name="internalSize" id="internalSize" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">所有人</label>
		<div class="layui-input-block">
			<input type="text" name="ownerNumber" id="ownerNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">识别代号</label>
		<div class="layui-input-block">
			<input type="text" name="identifyCode" id="identifyCode" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">轮胎规格</label>
		<div class="layui-input-block">
			<input type="text" name="tyreSize" id="tyreSize" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">登记日期</label>
		<div class="layui-input-block">
			<input type="text" name="registerDate" id="registerDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">核定载客</label>
		<div class="layui-input-block">
			<input type="text" name="ratedPassengerCapacity" id="ratedPassengerCapacity" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">外廓尺寸</label>
		<div class="layui-input-block">
			<input type="text" name="allSize" id="allSize" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">排量</label>
		<div class="layui-input-block">
			<input type="text" name="outputVolume" id="outputVolume" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">轴距</label>
		<div class="layui-input-block">
			<input type="text" name="wheelbase" id="wheelbase" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">核定载质量</label>
		<div class="layui-input-block">
			<input type="text" name="ratedLoadingWeight" id="ratedLoadingWeight" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
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

    var checkShitRenderVehicleRegister = [];

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
                {field: 'exFactoryDate', title: '出厂日期', sort: true},
                {field: 'color', title: '颜色', sort: true},
                {field: 'purposeOfUse', title: '使用性质', sort: true},
                {field: 'registerNo', title: '登记编号', sort: true},
                {field: 'importOrNot', title: '是否国产', sort: true},
                {field: 'numberOfSpringLeaf', title: '钢板弹簧片数', sort: true},
                {field: 'type', title: '车辆类型', sort: true},
                {field: 'engineModel', title: '发动机型号', sort: true},
                {field: 'steeringType', title: '转向形式', sort: true},
                {field: 'manufacturer', title: '制造厂', sort: true},
                {field: 'grossMass', title: '总质量', sort: true},
                {field: 'meansOfAcquisition', title: '获得方式', sort: true},
                {field: 'totalTractionWeight', title: '准牵引总质量', sort: true},
                {field: 'numberOfWheel', title: '轮胎数', sort: true},
                {field: 'engineNo', title: '发动机号', sort: true},
                {field: 'model', title: '车辆型号', sort: true},
                {field: 'engineNo', title: '发动机号', sort: true},
                {field: 'fuelType', title: '燃料种类', sort: true},
                {field: 'track', title: '轮距', sort: true},
                {field: 'numberOfAxles', title: '轴数', sort: true},
                {field: 'brand', title: '车辆品牌', sort: true},
                {field: 'passengerCapacityOfCab', title: '驾驶室载客', sort: true},
                {field: 'registerOffice', title: '登记机关', sort: true},
                {field: 'internalSize', title: '货箱内部尺寸', sort: true},
                {field: 'ownerNumber', title: '所有人', sort: true},
                {field: 'identifyCode', title: '识别代号', sort: true},
                {field: 'tyreSize', title: '轮胎规格', sort: true},
                {field: 'registerDate', title: '登记日期', sort: true},
                {field: 'ratedPassengerCapacity', title: '核定载客', sort: true},
                {field: 'allSize', title: '外廓尺寸', sort: true},
                {field: 'outputVolume', title: '排量', sort: true},
                {field: 'wheelbase', title: '轴距', sort: true},
                {field: 'ratedLoadingWeight', title: '核定载质量', sort: true},
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

        obj.checked ? checkShitRenderVehicleRegister.push(obj) : removeWithoutCopy(checkShitRenderVehicleRegister, obj.data.id);
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
                        elem: '#exFactoryDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    laydate.render({
                        elem: '#registerDate' //指定元素
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
                            url: "/vehicleRegister/create.form",
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
                            url: "/vehicleRegister/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {


                                var laydate = layui.laydate;
                                laydate.render({
                                    elem: '#exFactoryDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.exFactoryDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

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

                                console.log(res);


                                jQuery("#id").val(res.id);
                                jQuery("#companyId").val(res.companyId);


                                jQuery("#color").val(res.color);

                                jQuery("#purposeOfUse").val(res.purposeOfUse);
                                jQuery("#registerNo").val(res.registerNo);
                                jQuery("#numberOfSpringLeaf").val(res.numberOfSpringLeaf);
                                jQuery(":radio[name='importOrNot'][value='" + res.importOrNot + "']").prop("checked", "checked");
                               
                                jQuery("#type").val(res.type);
                                jQuery("#engineNo").val(res.engineNo);
                                jQuery("#engineModel").val(res.engineModel);
                                jQuery("#steeringType").val(res.steeringType);
                                jQuery("#manufacturer").val(res.manufacturer);
                                jQuery("#grossMass").val(res.grossMass);
                                jQuery("#meansOfAcquisition").val(res.meansOfAcquisition);
                                jQuery("#totalTractionWeight").val(res.totalTractionWeight);
                                jQuery("#numberOfWheel").val(res.numberOfWheel);
                                jQuery("#model").val(res.model);
                                jQuery("#fuelType").val(res.fuelType);
                                jQuery("#track").val(res.track);
                                jQuery("#numberOfAxles").val(res.numberOfAxles);
                                jQuery("#brand").val(res.brand);
                                jQuery("#passengerCapacityOfCab").val(res.passengerCapacityOfCab);
                                jQuery("#registerOffice").val(res.registerOffice);
                                jQuery("#internalSize").val(res.internalSize);
                                jQuery("#ownerNumber").val(res.ownerNumber);
                                jQuery("#identifyCode").val(res.identifyCode);
                                jQuery("#tyreSize").val(res.tyreSize);
                                jQuery("#ratedPassengerCapacity").val(res.ratedPassengerCapacity);
                                jQuery("#allSize").val(res.allSize);
                                jQuery("#outputVolume").val(res.outputVolume);
                                jQuery("#wheelbase").val(res.wheelbase);
                                jQuery("#ratedLoadingWeight").val(res.ratedLoadingWeight);


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
                                url: "/vehicleRegister/edit.form",
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
                        url: "/vehicleRegister/delete", type: "POST", data: {id: data[0].id}, async: false,
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