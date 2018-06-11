var renderVehicle = function (url) {

    var mmp = `
      <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车牌号码</label>
		<div class="layui-input-block">
			<input type="text" name="plateNumber" id="plateNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车牌颜色</label>
		<div class="layui-input-block">
			<select name="plateColor" id="plateColor" required lay-verify="required">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆颜色</label>
		<div class="layui-input-block">
			<select name="vehicleColor" id="vehicleColor">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">所属行政区域</label>
		<div class="layui-input-block">
			<select name="adminArea" lay-verify="required" id="adminArea">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">载运类型</label>
		<div class="layui-input-block">
			<select name="carryType" lay-verify="required" id="carryType">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆类型</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="vehicleType" id="vehicleType" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">设备号</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="deviceNumber" id="deviceNumber" placeholder="请输入" autocomplete="off" class="layui-input">
			<input type="hidden" name="deviceId" id="deviceId">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆电压</label>
		<div class="layui-input-block">
			<select name="vehicleVoltage" lay-verify="required" id="vehicleVoltage">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆图标</label>
		<div class="layui-input-block">
			<select name="marker" lay-verify="required" id="marker">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车队</label>
		<div class="layui-input-block">
			<select name="motorcade" lay-verify="required" required id="motorcade" lay-filter="motorcade">
				<option value="">请选择</option>
			</select>
			<input type="hidden" name="motorcadeId" id="motorcadeId">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">初始里程</label>
		<div class="layui-input-block">
			<input type="number" name="initialMileage" id="initialMileage" placeholder="请输入" value="0" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">百公里油耗</label>
		<div class="layui-input-block">
			<input type="number" name="oilWear" id="oilWear" placeholder="请输入" value="0" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">自编号</label>
		<div class="layui-input-block">
			<input type="text" name="LICENSEPLATESELFNUM" id="LICENSEPLATESELFNUM" placeholder="请输入" value="0" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">使用年限</label>
		<div class="layui-input-block">
			<input type="number" name="usefulLife" id="usefulLife" required lay-verify="required" placeholder="请输入" value="0"  autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">创建日期</label>
		<div class="layui-input-block">
			<input type="text" name="installDate" id="installDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">年检日期</label>
		<div class="layui-input-block">
			<input type="text" name="annualSurveyDate" id="annualSurveyDate" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">购车日期</label>
		<div class="layui-input-block">
			<input type="text" name="BUYDATE" id="BUYDATE" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">上户日期</label>
		<div class="layui-input-block">
			<input type="text" name="REGISTRATIONDATE" id="REGISTRATIONDATE" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">挂车号</label>
		<div class="layui-input-block">
			<input type="text" name="TRAILERNUM" id="TRAILERNUM" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">危货牌号
</label>
		<div class="layui-input-block">
			<input type="text" name="DANGERPLATENUM" id="DANGERPLATENUM" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车轴数</label>
		<div class="layui-input-block">
			<input type="text" name="AXLENUM" id="AXLENUM" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车厢长度
</label>
		<div class="layui-input-block">
			<input type="text" name="CARRIAGELONG" id="CARRIAGELONG" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车载重


</label>
		<div class="layui-input-block">
			<input type="text" name="VEHICULARWEIGHT" id="VEHICULARWEIGHT" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">燃料类型
</label>
		<div class="layui-input-block">
			<input type="text" name="FUELTYPE" id="FUELTYPE" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">汽车厂家

</label>
		<div class="layui-input-block">
			<input type="text" name="MANUFACTURER" id="MANUFACTURER" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">行车证审验期


</label>
		<div class="layui-input-block">
			<input type="text" name="LICENSEEXAMINATIONPERIOD" id="LICENSEEXAMINATIONPERIOD" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发动机号



</label>
		<div class="layui-input-block">
			<input type="text" name="ENGINENUM" id="ENGINENUM" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车架号
		
</label>
		<div class="layui-input-block">
			<input type="text" name="VIN" id="VIN" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">汽车服务商

		
</label>
		<div class="layui-input-block">
			<input type="text" name="SERVICEPROVIDER" id="SERVICEPROVIDER" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务商联系人

		
</label>
		<div class="layui-input-block">
			<input type="text" name="PROVIDERCONTACT" id="PROVIDERCONTACT" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">服务商电话

		
</label>
		<div class="layui-input-block">
			<input type="text" name="PROVIDERTEL" id="PROVIDERTEL" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆照片


		
</label>
		<div class="layui-input-block">
			<input type="text" name="VEHICLEPIC" id="VEHICLEPIC" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">购车金额

</label>
		<div class="layui-input-block">
			<input type="text" name="BUYMONEY" id="BUYMONEY" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
		<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">发票金额


</label>
		<div class="layui-input-block">
			<input type="text" name="INVOICEAMOUNT" id="INVOICEAMOUNT" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">车辆购置税



</label>
		<div class="layui-input-block">
			<input type="text" name="BUYTAX" id="BUYTAX" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">旋转图标否</label>
		<div class="layui-input-block">
			<input type="radio" name="rotate" value="true" title="是" checked>
			<input type="radio" name="rotate" value="false" title="否">
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


    function getDeviceFree() {
        var shit;

        jQuery.ajax({
            url: "/device/free", type: "POST", data: "pageIndex=1&pageSize=30", async: false,
            success: function (res) {
                shit = res;
                console.log(res);
            }
        });
        return shit;

    }

    function getMotorcade(ele) {
        var shit;
        jQuery.ajax({
            url: "/motorcade/query", data: {grid: false}, async: false,
            success: function (res) {
                shit = res;
                console.log(res);
                jQuery.each(res, function (index, data) {
                    var Option = `<option value= ${data.name} dataid=${data.id}>  ${data.name}  </option>`;
                    // var m = jQuery(Option);
                    //  m.click(function () {
                    //      console.log($(this).val())
                    //  });
                    // console.log(ele)
                    // console.log(Option)
                    // console.log(ele.append);
                    ele.append(Option);

                });

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

    function getMarkers(ele) {

        jQuery.ajax({
            url: "/vehicle/getMarkers", async: false,
            success: function (res) {
                shit = res;
                console.log(res);
                jQuery.each(res, function (index, data) {
                    var Option = `<option value= ${data.name}>  ${data.name}  </option>`;

                    // console.log(ele);
                    // console.log(Option);
                    // console.log(ele.append);
                    ele.append(Option);

                });

            }
        });

    }

    document.getElementById("shitBar").innerHTML = shitbar;
    var table = layui.table;
    console.log(url);


    var checkShitRenderVehicle = [];

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

                {
                    field: 'annualSurveyDate', title: '年检日期', sort: true

                },
                {field: 'deviceNumber', title: '设备号', sort: true},
                {
                    field: 'installDate', title: '安装日期', sort: true

                },
                {field: 'marker', title: '车辆图标', sort: true},
                {field: 'motorcade', title: '车队', sort: true},
                {field: 'phoneNumber', title: '电话号码', sort: true},
                {field: 'plateColor', title: '车牌颜色', sort: true},
                {field: 'plateNumber', title: '车牌号', sort: true},
                {field: 'remark', title: '备注', sort: true},

                {fixed: 'right', align: 'center', width: 200, toolbar: '#renderVehicleBar'}

            ]
        ],
        skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderVehicle.push(obj) : removeWithoutCopy(checkShitRenderVehicle, obj.data.id);
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
        if (obj.event === 'addOwners') {
            // layer.msg('ID：' + data.id + ' 的查看操作');

            // var mmmppp;
            // jQuery.ajax({
            //     url: "/owner/query", async: false, data: "filter=&page=1&limit=30",
            //     success: function (res) {
            //         mmmppp = res;
            //         // jQuery.each(res, function (index, data) {
            //         //     var Option = "<option value='" + data.name + "'>" + data.name + "</option>";
            //         //     // console.log(ele)
            //         //     // console.log(Option)
            //         //     // console.log(ele.append);
            //         //     ele.append(Option);
            //         // });
            //         // console.log(res);
            //     }
            // });
            var theOwner = [];
            var mmm;
            // var DeviceFree = getDeviceFree();
            // var did = jQuery("#deviceId");
            // var mmp = this;
            // console.log(DeviceFree);
            var kkk = layer.open({
                type: 1 //Page层类型
                , content: '<table id="owner" lay-filter="owner"></table>',
                offset: 'lt'
                , btn: ['添加', '取消', '查看已绑定'] //只是为了演示
                , yes: function () {
                    console.log(mmm);
                    // 监听表格复选框选择
                    for (var i = mmm.length - 1; i >= 0; i--) {
                        theOwner.push(mmm[i].id);
                    }
                    console.log(theOwner);
                    // return;
                    jQuery.ajax({
                        url: "/vehicle/addOwners", type: "POST", async: false, traditional: true,
                        data: {
                            vehicleId: data.id,
                            owners: theOwner
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
                        , content: '<table id="ownerShow" lay-filter="ownerShow"></table>',
                        offset: 'lt',
                        btn: ['取消'] //只是为了演示
                        , yes: function () {
                            layer.close(ccc);
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
                                elem: '#ownerShow'
                                , url: '/vehicle/owners', //数据接口
                                page: true, // 开启分页

                                where: {vehicleId: data.id}
                                , cellMinWidth: 150,
                                skin: "nob",
                                size: "sm"
                                , cols: [[ // 表头


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
                                    {fixed: 'right', align: 'center', toolbar: '#VehicleOwnerBar'}
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


                            table.on('tool(ownerShow)', function (obj) {
                                var owner = obj.data;
                                if (obj.event === 'del') {
                                    layer.confirm('真的删除行么', function (index) {
                                        console.log(owner);
                                        jQuery.ajax({
                                            url: "/vehicle/removeOwner", async: false, type: "POST", data: {
                                                vehicleId: data.id,
                                                ownerId: owner.id
                                            },
                                            success: function (res) {
                                                console.log(res);
                                                table.reload('ownerShow', {
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
                        elem: '#owner'
                        , url: '/owner/query', //数据接口
                        page: true, // 开启分页
                        where: {filter: ''}
                        , cellMinWidth: 150,
                        skin: "nob",
                        size: "sm"
                        , cols: [[ // 表头
                            {type: 'checkbox'},
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


                            }

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

                    table.on('checkbox(owner)', function (obj) {

                        var checkStatus = table.checkStatus('owner');
                        mmm = checkStatus.data;
                        // console.log(mmm)

                        // console.log(obj.data); //选中行的相关数据


                    });
                }
            });


        } else if (obj.event === 'addDrivers') {
            var theDrivers = [];
            var fff;
            // var DeviceFree = getDeviceFree();
            // var did = jQuery("#deviceId");
            // var mmp = this;
            // console.log(DeviceFree);
            var jjj = layer.open({
                type: 1 //Page层类型
                , content: '<table id="driver" lay-filter="driver"></table>',
                offset: 'lt',
                btn: ['添加', '取消', '查看已绑定'] //只是为了演示
                , yes: function () {
                    console.log(fff);
                    // 监听表格复选框选择
                    for (var i = fff.length - 1; i >= 0; i--) {
                        theDrivers.push(fff[i].id);
                    }
                    console.log(theDrivers);
                    // return;
                    jQuery.ajax({
                        url: "/vehicle/addDrivers", type: "POST", async: false, traditional: true,
                        data: {
                            vehicleId: data.id,
                            drivers: theDrivers
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
                        , content: '<table id="driverShow" lay-filter="driverShow"></table>',
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
                                elem: '#driverShow'
                                , url: '/vehicle/drivers', //数据接口
                                page: true, // 开启分页
                                where: {vehicleId: data.id}
                                , cellMinWidth: 150,
                                skin: "nob",
                                size: "sm"
                                , cols: [[ // 表头

                                    {field: 'name', title: '姓名', sort: true},
                                    {field: 'sex', title: '性别', sort: true},
                                    {field: 'phone', title: '电话', sort: true},
                                    {field: 'drivingLicenseNumber', title: '驾驶证号', sort: true},
                                    {field: 'remark', title: '备注', sort: true},
                                    {fixed: 'right', align: 'center', toolbar: '#VehicleDriverBar'}
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


                            table.on('tool(driverShow)', function (obj) {
                                var driver = obj.data;
                                if (obj.event === 'del') {
                                    layer.confirm('真的删除行么', function (index) {
                                        console.log(driver);
                                        jQuery.ajax({
                                            url: "/vehicle/removeDriver", async: false, type: "POST", data: {
                                                vehicleId: data.id,
                                                driverId: driver.id
                                            },
                                            success: function (res) {
                                                console.log(res);
                                                table.reload('driverShow', {
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
                        elem: '#driver'
                        , url: '/driver/query', //数据接口
                        page: true, // 开启分页
                        where: {filter: ''}
                        , cellMinWidth: 150,
                        skin: "nob",
                        size: "sm"
                        , cols: [[ // 表头
                            {type: 'checkbox'},
                            {field: 'name', title: '姓名', sort: true},
                            {field: 'sex', title: '性别', sort: true},
                            {field: 'phone', title: '电话', sort: true},
                            {field: 'drivingLicenseNumber', title: '驾驶证号', sort: true},
                            {field: 'remark', title: '备注', sort: true}
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

                    table.on('checkbox(driver)', function (obj) {

                        var checkStatus = table.checkStatus('driver');
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
                        elem: '#annualSurveyDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                    laydate.render({
                        elem: '#installDate' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    laydate.render({
                        elem: '#BUYDATE' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


                    laydate.render({
                        elem: '#REGISTRATIONDATE' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });

                    jQuery("#vehicleType").click(function () {
                        var VehicleType;
                        jQuery.ajax({
                            url: "/dictionary/list", type: "POST", async: false, data: {kind: 3, grid: false},
                            success: function (res) {
                                VehicleType = res;
                                console.log(VehicleType)
                                // console.log(JSON.parse(VehicleType))
                                // console.log(JSON.stringify(VehicleType))
                            }
                        });

                        var mmp = $(this);
                        console.log(VehicleType);
                        var kkk = layer.open({
                            type: 1 //Page层类型
                            , content: ' <ul id="treeDemo" class="ztree"></ul>'
                            , area: ['300px', '400px']
                            , success: function (layero, index) {
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
                                    }
                                };

                                function zTreeOnClick(event, treeId, treeNode) {
                                    mmp.val(treeNode.name);
                                    layer.close(kkk);
                                    // alert(treeNode.tId + ", " + treeNode.name);
                                }

                                jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, VehicleType);

                            }
                        });
                    });


                    jQuery("#deviceNumber").click(function () {
                        var DeviceFree = getDeviceFree();
                        var did = jQuery("#deviceId");
                        var mmp = jQuery(this);
                        console.log(DeviceFree);
                        var kkk = layer.open({
                            type: 1 //Page层类型
                            , content: '<table id="DeviceFree" lay-filter="DeviceFree"></table>',
                            offset: 't',
                            success: function (layero, index) {
                                var table = layui.table;

                                //第一个实例
                                table.render({
                                    elem: '#DeviceFree'
                                    , url: '/device/free', //数据接口
                                    method: "POST"
                                    , page: true //开启分页
                                    , cellMinWidth: 150,
                                    skin: "nob",
                                    size: "sm"
                                    , cols: [[ //表头
                                        {type: 'checkbox'},
                                        {field: 'deviceNumber', title: '设备号', sort: true},

                                        {field: 'factoryNumber', title: '出厂号', sort: true},
                                        {field: 'model', title: '型号', sort: true},
                                        {field: 'phoneNumber', title: '电话号码', sort: true},

                                        {field: 'remark', title: '说明', sort: true},

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
                                table.on('checkbox(DeviceFree)', function (obj) {

                                    console.log(obj.data); //选中行的相关数据
                                    mmp.val(obj.data.deviceNumber);
                                    did.val(obj.data.id);
                                    layer.close(kkk);
                                });

                            }
                        });
                    });


                    var fuck;
                    // 即时校验
                    jQuery("#plateNumber").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/vehicle/exist",
                            type: "POST",
                            data: {
                                plateNumber: name,
                                id: "",
                                checkId: false

                            },
                            success: function (res) {
                                fuck = res;
                                console.log(fuck);
                                if (!fuck) {
                                    layer.msg('该车辆已存在');
                                }

                            }
                        });
                    });

                    var PlateColor = getYourDICK(1, jQuery("#plateColor"));
                    // console.log(PlateColor);
                    var CarColor = getYourDICK(2, jQuery("#vehicleColor"));
                    // console.log(CarColor);
                    var CarryType = getYourDICK(4, jQuery("#carryType"));
                    // console.log(CarryType);
                    var VehicleVoltage = getYourDICK(6, jQuery("#vehicleVoltage"));
                    // console.log(VehicleVoltage);
                    var Motorcade = getMotorcade(jQuery("#motorcade"));
                    getMarkers(jQuery("#marker"));
                    // console.log(DeviceFree);

                    // console.log(VehicleType);
                    var AdminArea = getYourDICK(5, jQuery("#adminArea"));
                    // console.log(AdminArea);

                    var form = layui.form;
                    form.render();

                    form.on('select(motorcade)', function (data) {
                        console.log(jQuery("#motorcade").find("option:selected").attr("dataid"));

                        jQuery("#motorcadeId").val(jQuery("#motorcade").find("option:selected").attr("dataid"));
                        // console.log(data.elem); //得到select原始DOM对象
                        // console.log(data.value); //得到被选中的值
                        // console.log(data.othis); //得到美化后的DOM对象
                    });

                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;


                        if (!fuck) {
                            return false;
                        }
                        jQuery.ajax({
                            url: "/vehicle/create.form",
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


                        jQuery("#vehicleType").click(function () {
                            var VehicleType;
                            jQuery.ajax({
                                url: "/dictionary/list", type: "POST", async: false, data: {kind: 3, grid: false},
                                success: function (res) {
                                    VehicleType = res;
                                    console.log(VehicleType)
                                    // console.log(JSON.parse(VehicleType))
                                    // console.log(JSON.stringify(VehicleType))
                                }
                            });


                            var mmp = $(this);
                            console.log(VehicleType);
                            var kkk = layer.open({
                                type: 1 //Page层类型
                                , content: ' <ul id="treeDemo" class="ztree"></ul>'
                                , area: ['300px', '400px'],
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
                                        }
                                    };

                                    function zTreeOnClick(event, treeId, treeNode) {
                                        mmp.val(treeNode.name);
                                        layer.close(kkk);
                                        // alert(treeNode.tId + ", " + treeNode.name);
                                    }

                                    jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, VehicleType);

                                }
                            });
                        });


                        jQuery("#deviceNumber").click(function () {
                            var DeviceFree = getDeviceFree();
                            var did = jQuery("#deviceId");
                            var mmp = jQuery(this);
                            console.log(DeviceFree);
                            var kkk = layer.open({
                                type: 1 //Page层类型
                                , content: '<table id="DeviceFree" lay-filter="DeviceFree"></table>',

                                offset: 't',
                                success: function (layero, index) {
                                    var table = layui.table;

                                    //第一个实例
                                    table.render({
                                        elem: '#DeviceFree'
                                        , url: '/device/free', //数据接口
                                        method: "POST"
                                        , cellMinWidth: 150,
                                        skin: "nob",
                                        size: "sm"
                                        , page: true //开启分页
                                        , cols: [[ //表头
                                            {type: 'checkbox'},


                                            {field: 'deviceNumber', title: '设备号', sort: true},

                                            {field: 'factoryNumber', title: '出厂号', sort: true},
                                            {field: 'model', title: '型号', sort: true},
                                            {field: 'phoneNumber', title: '电话号码', sort: true},

                                            {field: 'remark', title: '说明', sort: true},
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
                                    table.on('checkbox(DeviceFree)', function (obj) {

                                        console.log(obj.data); //选中行的相关数据
                                        mmp.val(obj.data.deviceNumber);
                                        did.val(obj.data.id);
                                        layer.close(kkk);
                                    });

                                }
                            });
                        });


                        var fuck = true;
                        // 即时校验
                        jQuery("#plateNumber").bind("input propertychange", function () {
                            let name = this.value;

                            console.log(name);
                            jQuery.ajax({
                                url: "/vehicle/exist",
                                type: "POST",
                                data: {
                                    plateNumber: name,
                                    id: "",
                                    checkId: false

                                },
                                success: function (res) {
                                    fuck = res;
                                    console.log(fuck);
                                    if (!fuck) {
                                        layer.msg('该车辆已存在');
                                    }

                                }
                            });
                        });

                        var PlateColor = getYourDICK(1, jQuery("#plateColor"));
                        // console.log(PlateColor);
                        var CarColor = getYourDICK(2, jQuery("#vehicleColor"));
                        // console.log(CarColor);
                        var CarryType = getYourDICK(4, jQuery("#carryType"));
                        // console.log(CarryType);
                        var VehicleVoltage = getYourDICK(6, jQuery("#vehicleVoltage"));
                        // console.log(VehicleVoltage);
                        var Motorcade = getMotorcade(jQuery("#motorcade"));
                        getMarkers(jQuery("#marker"));
                        // console.log(DeviceFree);

                        // console.log(VehicleType);
                        var AdminArea = getYourDICK(5, jQuery("#adminArea"));
                        // console.log(AdminArea);

                        var form = layui.form;
                        form.render();


                        jQuery.ajax({
                            url: "/vehicle/edit.form",

                            data: {id: data[0].id}
                            ,
                            async: false,
                            success: function (res) {

                                console.log(res);
                                laydate.render({
                                    elem: '#annualSurveyDate' //指定元素

                                    , value: res.annualSurveyDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                laydate.render({
                                    elem: '#installDate' //指定元素

                                    , value: res.installDate
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                laydate.render({
                                    elem: '#BUYDATE' //指定元素

                                    , value: res.bUYDATE
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });

                                laydate.render({
                                    elem: '#REGISTRATIONDATE' //指定元素

                                    , value: res.rEGISTRATIONDATE
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });
                                jQuery("#id").val(res.id);
                                jQuery("#adminArea").val(res.adminArea);
                                jQuery("#carryType").val(res.carryType);
                                jQuery("#companyId").val(res.companyId);
                                jQuery("#deviceId").val(res.deviceId);
                                jQuery("#deviceNumber").val(res.deviceNumber);
                                jQuery("#editTime").val(res.editTime);
                                jQuery("#LICENSEPLATESELFNUM").val(res.lICENSEPLATESELFNUM);
                                jQuery("#initialMileage").val(res.initialMileage);
                                jQuery("#marker").val(res.marker);


                                jQuery("#FACTORYPLATEMODE").val(res.fACTORYPLATEMODE);
                                jQuery("#AXLENUM").val(res.aXLENUM);
                                jQuery("#MANUFACTURER").val(res.mANUFACTURER);
                                jQuery("#TRAILERNUM").val(res.tRAILERNUM);
                                jQuery("#VIN").val(res.vIN);
                                jQuery("#BUYMONEY").val(res.bUYMONEY);
                                jQuery("#SERVICEPROVIDER").val(res.sERVICEPROVIDER);
                                jQuery("#LICENSEPLATESELFNUM").val(res.lICENSEPLATESELFNUM);
                                jQuery("#ENGINENUM").val(res.eNGINENUM);
                                jQuery("#CARRIAGELONG").val(res.cARRIAGELONG);
                                jQuery("#PROVIDERCONTACT").val(res.pROVIDERCONTACT);
                                jQuery("#DANGERPLATENUM").val(res.dANGERPLATENUM);
                                jQuery("#VEHICULARWEIGHT").val(res.vEHICULARWEIGHT);
                                jQuery("#INVOICEAMOUNT").val(res.iNVOICEAMOUNT);
                                jQuery("#PROVIDERTEL").val(res.pROVIDERTEL);
                                jQuery("#BUYTAX").val(res.bUYTAX);
                                jQuery("#LICENSEEXAMINATIONPERIOD").val(res.lICENSEEXAMINATIONPERIOD);
                                jQuery("#VEHICLEPIC").val(res.vEHICLEPIC);
                                jQuery("#VINPIC").val(res.vINPIC);
                                jQuery("#FUELTYPE").val(res.fUELTYPE);




                                jQuery("#motorcade").val(res.motorcade);
                                // jQuery("#motorcade").find("option[value='res.motorcade']").attr("selected",true);
                                jQuery("#motorcadeId").val(res.motorcadeId);
                                jQuery("#oilWear").val(res.oilWear);
                                jQuery("#plateColor").val(res.plateColor);
                                jQuery("#plateNumber").val(res.plateNumber);
                                jQuery("#remark").val(res.remark);
                                var mmmmm = res.rotate;
                                jQuery(":radio[name='rotate'][value='" + mmmmm + "']").prop("checked", "checked");
                                jQuery("#vehicleColor").val(res.vehicleColor);
                                jQuery("#vehicleType").val(res.vehicleType);
                                jQuery("#vehicleVoltage").val(res.vehicleVoltage);
                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });


                        form.on('select(motorcade)', function (data) {
                            jQuery("#motorcadeId").val(jQuery("#motorcade").find("option:selected").attr("dataid"));
                            // jQuery("#motorcadeId").val( data.elem.id) ;
                            // console.log(data.elem); //得到select原始DOM对象
                            // console.log(data.value); //得到被选中的值
                            // console.log(data.othis); //得到美化后的DOM对象
                        });

                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);

                            console.log(fuck)
                            console.log(jQuery("#plateNumber").val().length !== 0)
                            // fuck = jQuery("#plateNumber").val().length !== 0;
                            if (!fuck && jQuery("#plateNumber").val().length !== 0) {
                                console.log(!fuck)
                                return false;
                            }
                            jQuery.ajax({
                                url: "/vehicle/edit.form",
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
                        url: "/vehicle/delete", type: "POST", data: {id: data[0].id}, async: false,
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
