var shitbar = `
     <div class="layui-form layui-form-pane demoTable" id="mmpxxx" style="width: 100%;">
    
    <div class="layui-form-item">
    <!--<label class="layui-form-label">联动选择框</label>--> 
    <div class="layui-input-inline">
      <select id="com" lay-filter="com" >
        <option value="">公司</option>
      </select>
    </div>
    <div class="layui-input-inline">
      <select id="carg" lay-filter="carg">
        <option value="">车队</option>
 
      </select>
        </div>
       <div class="layui-input-inline">
      <select id="dn" lay-filter="dn">
    <option value="">车牌</option>
 
      </select >
      
      </div>
      
          <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">时间</label>
      <div class="layui-input-inline">
         <select name="time" lay-filter="time">
         
        <option value="">请选择</option>
        <option value="今天">今天</option>
        <option value="昨天">昨天</option>
        <option value="本周">本周</option>
    
    
      </select >
      </div>
    
      <label class="layui-form-label">开始时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test19" placeholder="yyyy-MM-dd">
      </div>
      
       <div class="layui-inline" style="margin-bottom: 0">
      <label class="layui-form-label">结束时间</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" id="test20" placeholder="yyyy-MM-dd">
      </div>
      
 
      
    </div>
     
        <div class="layui-inline" style="margin-bottom: 0" id="waytohell">
         <label class="layui-form-label">统计方式</label>
    <div class="layui-input-inline">
      <input type="radio" name="waytohell" value="里程" title="里程" checked="">
      <input type="radio" name="waytohell" value="天" title="天">
    </div>
     
     
                <div class="layui-inline sbox" style="width: 20%" >
                    <input class="layui-input" name="id" id="tableReload" autocomplete="off" style="color: black;">
                </div>
                <button class="layui-btn  layui-bg-blue "  id="search">查询</button>
 
                 
                 
                     
                     
                      </div>
     </div>
     
     
     
    `;


function nav_to(url, title) {
    jQuery("#tableTitle").text(title);
    jQuery("#tableMain").remove();
    jQuery("#chart").show();
    $("#theTable").bootstrapTable('destroy');


    if (url === "/report/TripCount") {
        renderTrip(url);
    }
    else if (url === "/report/ACCCount") {
        renderAcc(url);
    }
    else if (url === "/report/OverspeedCount") {
        renderOverSpeed(url)
    }
    else if (url === "/report/ParkingCount") {
        renderParking(url)
    }
    else if (url === "/report/DrivingCount") {
        renderReport(url)
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
        url: "/report/menus", success: function (res) {

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

    $("document").on("click", "#exp", function () {
        $("table").tableExport({
            type: 'excel',
            escape: 'false',

        });
    })


});



