var renderDevice = function (url) {

    var mmp = `
  <form class="layui-form layui-form-pane" action="" style="color: black">
	<div class="layui-form-item layui-inline pane" style="display: none">
		<label class="layui-form-label"></label>
		<div class="layui-input-block">
			<input type="text" id="id" name="id" class="layui-input"/>
			<input id="pid" name="pid" type="hidden" value=""/>
			<input id="companyId" name="companyId" type="hidden"/>
			<input id="protocol" name="protocol" type="hidden"/>
			<input id="simcardId" name="simcardId" type="hidden"/>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">终端号</label>
		<div class="layui-input-block">
			<input type="text" name="deviceNumber" id="deviceNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">电话号码</label>
		<div class="layui-input-block">
			<input type="text" name="phoneNumber" id="phoneNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">型号</label>
		<div class="layui-input-block">
			<input type="text" name="model" id="model" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">出厂号</label>
		<div class="layui-input-block">
			<input type="text" name="factoryNumber" id="factoryNumber" required lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">厂家</label>
		<div class="layui-input-block">
			<select name="factoryName" lay-verify="required" id="factoryName">
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">传感器</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="text" name="sensors" id="sensors" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">摄像头路数</label>
		<div class="layui-input-block">
			<!-- 打开新弹窗-->
			<input type="number" name="cameras" id="cameras" value="0" max="100" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">有无麦克风</label>
		<div class="layui-input-block">
			<input type="checkbox" lay-skin="primary" name="hasMicrophone" id="hasMicrophone" required lay-verify="required" title="有无麦克风" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">有无导航屏</label>
		<div class="layui-input-block">
			<input type="checkbox" lay-skin="primary" name="hasNavigation" id="hasNavigation" required lay-verify="required" title="有无导航屏" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">保修期</label>
		<div class="layui-input-block">
			<input type="text" name="warranty" id="warranty" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">购买日期</label>
		<div class="layui-input-block">
			<input type="text" name="purchaseDate" id="purchaseDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">安装日期</label>
		<div class="layui-input-block">
			<input type="text" name="installDate" id="installDate" placeholder="请输入" autocomplete="off" class="layui-input">
		</div>
	</div>
	
 <div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">协议</label>
		<div class="layui-input-block">
			<select name="protocolName" id="protocolName" lay-filter="protocolName" lay-verify="required" required>
			<option value="">请选择</option>
			</select>
		</div>
	</div>
	<div class="layui-form-item layui-form-text pane">
		<label class="layui-form-label">备注</label>
		<div class="layui-input-block">
			<textarea name="remark" id="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
		</div>
	</div>
	<div class="layui-form-item layui-inline pane">
		<label class="layui-form-label">帐号</label>
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


    function getSIMFree() {
        var shit;

        jQuery.ajax({
            url: "/simcard/free", type: "POST", data: "pageIndex=1&pageSize=30", async: false,
            success: function (res) {
                shit = res;
                console.log(res);
            }
        });
        return shit;

    }

    function getYourPro(type,ele) {
        var shit;
        jQuery.ajax({
            url: "/dictionary/list", type: "POST", async: false, data: {kind: type, grid: false},
            success: function (res) {
                shit = res;
                console.log(res);
                jQuery.each(res, function (index, data) {
                    var Option = `<option value= ${data.name} dataid=${data.code}>  ${data.name}  </option>`;
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


    document.getElementById("shitBar").innerHTML = shitbar;
    var table = layui.table;
    console.log(url);


    var checkShitRenderDevice = [];

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

                {field: 'deviceNumber', title: '设备号', sort: true},
                {field: 'enable', title: '启用否', sort: true},
                {field: 'factoryNumber', title: '出厂号', sort: true},
                {field: 'model', title: '型号', sort: true},
                {field: 'serviceEndDate', title: '服务结束时间', sort: true},
                {field: 'phoneNumber', title: '电话号码', sort: true},
                {field: 'serviceStartDate', title: '服务开始时间', sort: true},
                {field: 'warranty', title: '保修期', sort: true},
                {field: 'protocolName', title: '协议', sort: true},
                {field: 'remark', title: '说明', sort: true},

            ]
        ], skin: "nob",
        size: "sm"
    });

    // 监听表格复选框选择
    table.on('checkbox(table)', function (obj) {

        obj.checked ? checkShitRenderDevice.push(obj) : removeWithoutCopy(checkShitRenderDevice, obj.data.id);
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
                    laydate.render({
                        elem: '#installDate' //指定元素
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
                        elem: '#warranty' //指定元素
                        , done: function (value, date, endDate) {
                            console.log(value); //得到日期生成的值，如：2017-08-18
                            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });


                    jQuery("#model").click(function () {
                        var model;
                        jQuery.ajax({
                            url: "/dictionary/list", type: "POST", async: false, data: {kind: 8, grid: false},
                            success: function (res) {
                                model = res;
                                console.log(model)
                                // console.log(JSON.parse(VehicleType))
                                // console.log(JSON.stringify(VehicleType))
                            }
                        });

                        var mmp = $(this);
                        console.log(model);
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

                                jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, model);

                            }
                        });
                    });


                    jQuery("#phoneNumber").click(function () {
                        var SIMFree = getSIMFree();
                        var did = jQuery("#simcardId");
                        var mmp = jQuery(this);
                        console.log(SIMFree);
                        var kkk = layer.open({
                            type: 1 //Page层类型
                            , content: '<table id="SIMFree" lay-filter="SIMFree"></table>',
                            offset: 't',
                            success: function (layero, index) {
                                var table = layui.table;

                                //第一个实例
                                table.render({
                                    elem: '#SIMFree'
                                    , url: '/simcard/free', //数据接口
                                    method: "POST"
                                    , page: true //开启分页
                                    , cellMinWidth: 150,
                                    skin: "nob",
                                    size: "sm"
                                    , cols: [[ //表头
                                        {type: 'checkbox'},


                                        {field: 'carrierOperator', title: '运营商', sort: true},
                                        {field: 'openSMS', title: '开通短信否', sort: true},
                                        {field: 'phoneNumber', title: '电话号码', sort: true},

                                        {field: 'remark', title: '说明', sort: true},

                                        {field: 'speechType', title: '语音类型', sort: true}


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
                                table.on('checkbox(SIMFree)', function (obj) {

                                    console.log(obj.data); //选中行的相关数据
                                    mmp.val(obj.data.phoneNumber);
                                    did.val(obj.data.id);
                                    layer.close(kkk);
                                });

                            }
                        });
                    });


                    var fuck;
                    // 即时校验
                    jQuery("#deviceNumber").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/device/exist",
                            type: "POST",
                            data: {
                                deviceNumber: name,
                                id: -1,
                                checkId: false

                            },
                            success: function (res) {
                                fuck = res;
                                console.log(fuck);
                                if (!fuck) {
                                    layer.msg('设备已存在');
                                }

                            }
                        });
                    });

                    jQuery("#cameras").bind("input prepayment", function () {

                        console.log(this)
                        if (jQuery("#cameras").val() > 100) {
                            layer.msg("数字100内！");


                        }

                    });
                    var cnm;

                    jQuery("#account").bind("input propertychange", function () {
                        let name = this.value;

                        console.log(name);
                        jQuery.ajax({
                            url: "/user/exist",
                            type: "POST",
                            data: {
                                account: name,
                                id: -1,
                                checkId: false

                            },
                            success: function (res) {
                                cnm = res;
                                console.log(fuck);
                                if (!cnm) {
                                    layer.msg('用户已存在');
                                }

                            }
                        });
                    });

                    getYourDICK(9, jQuery("#factoryName"));
                    getYourPro(15, jQuery("#protocolName"));


                    var form = layui.form;
                    form.render();

                    form.on('select(protocolName)', function (data) {
                        console.log(jQuery("#protocolName").find("option:selected").attr("dataid"));

                        jQuery("#protocol").val(jQuery("#protocolName").find("option:selected").attr("dataid"));
                        // console.log(data.elem); //得到select原始DOM对象
                        // console.log(data.value); //得到被选中的值
                        // console.log(data.othis); //得到美化后的DOM对象
                    });





                    form.on('submit(formDemo)', function (data) {

                        console.log(data.field);

                        // return false;


                        if (!fuck || !cnm) {
                            return false;
                        }
                        jQuery.ajax({
                            url: "/device/create.form",
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


                        jQuery("#model").click(function () {
                            var model;
                            jQuery.ajax({
                                url: "/dictionary/list", type: "POST", async: false, data: {kind: 8, grid: false},
                                success: function (res) {
                                    model = res;
                                    // console.log(VehicleType)
                                    // console.log(JSON.parse(VehicleType))
                                    // console.log(JSON.stringify(VehicleType))
                                }
                            });

                            var mmp = $(this);
                            console.log(model);
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

                                    jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, model);

                                }
                            });
                        });


                        jQuery("#phoneNumber").click(function () {
                            var SIMFree = getSIMFree();
                            var did = jQuery("#simcardId");
                            var mmp = jQuery(this);
                            console.log(SIMFree);
                            var kkk = layer.open({
                                type: 1 //Page层类型
                                , content: '<table id="SIMFree" lay-filter="SIMFree"></table>',
                                offset: 't',
                                success: function (layero, index) {
                                    var table = layui.table;

                                    //第一个实例
                                    table.render({
                                        elem: '#SIMFree'
                                        , url: '/simcard/free', //数据接口
                                        method: "POST"
                                        , cellMinWidth: 150,

                                        skin: "nob",
                                        size: "sm"
                                        , page: true //开启分页
                                        , cols: [[ //表头
                                            {type: 'checkbox'},

                                            {field: 'carrierOperator', title: '运营商', sort: true},
                                            {field: 'openSMS', title: '开通短信否', sort: true},
                                            {field: 'phoneNumber', title: '电话号码', sort: true},

                                            {field: 'remark', title: '说明', sort: true},

                                            {field: 'speechType', title: '语音类型', sort: true}
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
                                    table.on('checkbox(SIMFree)', function (obj) {

                                        console.log(obj.data); //选中行的相关数据
                                        mmp.val(obj.data.phoneNumber);
                                        did.val(obj.data.id);
                                        layer.close(kkk);
                                    });

                                }
                            });
                        });

                        jQuery("#cameras").bind("input prepayment", function () {

                            console.log(this)
                            if (jQuery("#cameras").val() > 100) {
                                layer.msg("数字100内！");


                            }

                        });
                        var fuck = true;
                        // 即时校验


                        jQuery("#deviceNumber").bind("input propertychange", function () {
                            let name = this.value;

                            console.log(name);
                            jQuery.ajax({
                                url: "/device/exist",
                                type: "POST",
                                data: {
                                    deviceNumber: name,
                                    id: -1,
                                    checkId: false

                                },
                                success: function (res) {
                                    fuck = res;
                                    console.log(fuck);
                                    if (!fuck) {
                                        layer.msg('设备已存在');
                                    }

                                }
                            });
                        });


                        var cnm = true;

                        jQuery("#account").bind("input propertychange", function () {
                            let name = this.value;

                            console.log(name);
                            jQuery.ajax({
                                url: "/user/exist",
                                type: "POST",
                                data: {
                                    account: name,
                                    id: -1,
                                    checkId: false

                                },
                                success: function (res) {
                                    cnm = res;
                                    console.log(fuck);
                                    if (!cnm) {
                                        layer.msg('用户已存在');
                                    }

                                }
                            });
                        });
                        getYourDICK(9, jQuery("#factoryName"));

                        getYourPro(15, jQuery("#protocolName"));

                        var form = layui.form;
                        form.render();


                        jQuery.ajax({
                            url: "/device/edit.form",

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
                                laydate.render({
                                    elem: '#installDate' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.installDate
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
                                    elem: '#warranty' //指定元素
                                    , format: "yyyy-MM-dd HH:mm:ss"
                                    , value: res.warranty
                                    , done: function (value, date, endDate) {
                                        console.log(value); //得到日期生成的值，如：2017-08-18
                                        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                                        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                                    }
                                });


                                jQuery("#id").val(res.id);

                                jQuery("#pid").val(res.pid);
                                jQuery("#companyId").val(res.companyId);
                                jQuery("#simcardId").val(res.simcardId);
                                jQuery("#protocol").val(res.protocol);
                                jQuery("#protocolName").val(res.protocolName);

                                jQuery("#hasMicrophone").prop("checked", res.hasMicrophone);
                                jQuery("#hasNavigation").prop("checked", res.hasNavigation);
                                jQuery("#enable").prop("checked", res.enable);


                                jQuery("#deviceNumber").val(res.deviceNumber);
                                jQuery("#phoneNumber").val(res.phoneNumber);
                                jQuery("#model").val(res.model);
                                jQuery("#factoryNumber").val(res.factoryNumber);
                                jQuery("#factoryName").val(res.factoryName);
                                // jQuery("#motorcade").find("option[value='res.motorcade']").attr("selected",true);
                                jQuery("#sensors").val(res.sensors);
                                jQuery("#cameras").val(res.cameras);


                                jQuery("#account").val(res.account);
                                jQuery("#name").val(res.name);
                                jQuery("#email").val(res.email);
                                jQuery("#phone").val(res.phone);
                                jQuery("#contact").val(res.contact);
                                jQuery("#remark").val(res.remark);

                                console.log(jQuery("#id").val());
                                console.log(res.id);
                                form.render();
                            }
                        });

                        form.on('select(protocolName)', function (data) {
                            console.log(jQuery("#protocolName").find("option:selected").attr("dataid"));

                            jQuery("#protocol").val(jQuery("#protocolName").find("option:selected").attr("dataid"));
                            // console.log(data.elem); //得到select原始DOM对象
                            // console.log(data.value); //得到被选中的值
                            // console.log(data.othis); //得到美化后的DOM对象
                        });

                        form.on('submit(formDemo)', function (data) {
                            console.log(jQuery("#id").val());
                            console.log(data.field);


                            // fuck = jQuery("#plateNumber").val().length !== 0;
                            if (!fuck && jQuery("#account").val().length !== 0 && !cnm && jQuery("#deviceNumber").val().length !== 0) {
                                console.log(!fuck)
                                return false;
                            }
                            jQuery.ajax({
                                url: "/device/edit.form",
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
                        url: "/device/delete", type: "POST", data: {id: data[0].id}, async: false,
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
