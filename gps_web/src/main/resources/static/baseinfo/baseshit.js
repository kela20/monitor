//由于模块都一次性加载，因此不用执行 layui.use() 来加载对应模块，直接使用即可：
let x = 1,
    y = 2;
console.log(`${x} + ${y * 2} = ${x + y * 2}`)//  "1 + 4 = 5"


var shitbar = `
     <div class="layui-form layui-form-pane demoTable" id="mmpxxx" style="width: 100%;">
                <div class="layui-inline sbox" style="width: 20%" >
                    <input class="layui-input" name="id" id="tableReload" autocomplete="off" style="color: black;">
                </div>
                <button class="layui-btn  layui-bg-blue " data-type="reload">搜索</button>
                <button class="layui-btn  layui-bg-blue ssss" data-type="add">添加</button>
                <button class="layui-btn  layui-bg-blue ssss" data-type="modify">修改</button>
                <button class="layui-btn  layui-bg-blue ssss" data-type="delete">刪除</button>
                    
     </div>
    `;


function nav_to(url, title) {
    jQuery("#tableTitle").text(title);
    jQuery("#tableMain").remove();
    // console.log($(this));
    if (url === "/company/query") {
        renderCompany(url);
    } else if (url === "/role/query") {
        renderRole(url);
    } else if (url === "/user/query") {
        renderUser(url);
    } else if (url === "/owner/query") {
        renderOwner(url);
    } else if (url === "/driver/query") {
        renderDriver(url);
    } else if (url === "/simcard/query") {
        renderSIM(url);
    } else if (url === "/device/query") {
        renderDevice(url);
    } else if (url === "/motorcade/query") {
        renderMotorcade(url);
    } else if (url === "/vehicle/query") {
        renderVehicle(url);
    }
    else if (url === "/maintain/query") {
        renderMaintain(url);
    }
    else if (url === "/drivingLicence/query") {
        renderDrivingLicence(url);
    }
    else if (url === "/vehicleLicence/query") {

        renderVehicleLicence(url);
    }
    else if (url === "/vehicleRegister/query") {

        renderVehicleRegister(url);
    }
    else if (url === "dictionary/dictionary.iframe") {

        renderDic();
    }
    else if (url === "svid/list") {

        renderSys(url);
    }
    else {
        jQuery(".layui-form").hide();
        jQuery("#shitBar").hide();
        console.log(url);
        alert("开发中");
        return;
    }
    jQuery("#shitBar").show();
    if (window.top !== window.self) {
        // alert("mmp")
        jQuery(".ssss").remove();

        jQuery("body").on('click', function (event) {
            jQuery("a.layui-layer-btn0").css("display", "none");
            jQuery("a.layui-btn-danger").css("display", "none");

        });
    }

}


$(function () {
    $.ajax({
        url: "/baseinfo/menus", success: function (res) {

            console.log(document.getElementById('view'));
            console.log(document.getElementById('nav2'));
            console.log(res);
            // console.log(template("nav2", {
            //     data: res
            // }));

            document.getElementById('view').innerHTML = template("nav2", {
                data: res
            });
        }
    });


    $("#view").on("click", ".cccc", function () {
        // console.log(this)
        var fuck = $(this).parent().find("dl");
        // fuck.is(":hidden") ? fuck.show("normal") : fuck.hide("normal");
        if (fuck.is(":hidden")) {
            var sss = $(this);
            fuck.show("normal", function () {
                sss.parent().addClass("layui-nav-itemed");
            });


        } else {
            var sss = $(this);
            fuck.hide("normal", function () {
                sss.parent().removeClass("layui-nav-itemed");
            });


        }


    });
});



