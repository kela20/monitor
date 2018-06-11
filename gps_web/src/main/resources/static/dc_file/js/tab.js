$.fn.extend({
    // 添加li元素到ul中，并提供li点击事件
    _tabAdd: function(index, name, isFix, listClick, listDel) {
        if ($(this).get(0).tagName != "UL") {
            console.log("仅支持UL标签");
            return;
        }
        var del = $("<i>").text("x").addClass("delete").css("cursor","pointer").on("click", listDel);
        var span = $("<span>").text(name);
        var list = $("<li>").attr("index", index).on("click", listClick).append(span);
        if(isFix) {
            list.addClass("fix");
        } else {
            list.addClass("no-fix").append(del);
        }
        $(this).append(list);
    },
    // 判断当前li是否已经存在
    _tabExists: function(name) {
        var lists = $(this).children();
        var exists = false;
        lists.each(function(index, list) {
            if($(list)._getTabSpanText() == name) {
                exists = true;
            }
        });
        return exists;
    },
    // 切换li
    _tabSelected: function(name, changeView) {
        var pastSelectedIndex = $(".currentTab").attr("index");
        $(".currentTab").removeClass("currentTab");
        $(this).addClass("currentTab");
        changeView(pastSelectedIndex, $(this).attr("index"), name);
    },
    // 获取li内容
    _getTabSpanText: function() {
        return $(this).find("span").text();
    },

    // 动态添加元素
    tabAdd: function(index, name, isFix, changeView) {
        // 标签不存在则添加标签到列表中
        if (!$(this)._tabExists(name))  {
            $(this)._tabAdd(index, name, isFix, function(e) {
                // li点击事件处理，点击时切换对应tab
                var currentTag = $(e.target);
                // 如果点击对象为SPAN则获取其对应父元素
                if (currentTag.get(0).tagName == "SPAN") {
                    currentTag = currentTag.parent();
                }
                currentTag._tabSelected(currentTag._getTabSpanText(), changeView);
            }, function(e) {
                // 删除事件处理如果有多个标签
                e.stopPropagation();
                var currentTag = $(e.target).parent();
                var lists = currentTag.siblings(".no-fix");

                // 如果删除标签为当前标签，则需要根据条件切换到上一个标签或下一个标签
                if (currentTag.hasClass("currentTab")) {
                    var changeLi = currentTag.prev();
                    changeLi._tabSelected(changeLi._getTabSpanText(), changeView);
                }

                currentTag.remove();
            });
        }

        // 添加新选项卡并切换到新选项卡
        var lists = $(this).children();
        lists.each(function(index, list) {
            if ($(list)._getTabSpanText() == name) {
                $(list)._tabSelected(name, changeView);
            }
        });
    },

    // 导航部分处理
    _getNavImgObj: function() {
        var img = null;
        if ($(this).get(0).tagName == "IMG") {
            img = $(this);
        } else if($(this).get(0).tagName == "SPAN") {
            img = $(this).siblings("img");
        } else {
            img = $(this).find("img");
        }
        return img;
    },
    _getNavSpanObj: function(e) {
        var span = null;
        if ($(this).get(0).tagName == "IMG") {
            span = $(this).siblings("span");
        } else if($(this).get(0).tagName == "LI") {
            span = $(this).find("span");
        } else {
            span = $(this);
        }
        return span;
    },
    _getNavLiObj: function(e) {
        var span = null;
        if ($(this).get(0).tagName == "IMG" || $(this).get(0).tagName == "SPAN") {
            span = $(this).parent();
        } else {
            span = $(this);
        }
        return span;
    },

    navInit: function(nav_infos, tabHandler) {
        var target = $(this);
        $.each(nav_infos, function(index, data) {
            var img = $("<img>").attr("src", data.normal);
            var span = $("<span>").text(data.name).css("fontZise","12px");//.css("visibility", "hidden")
            var li = $("<li>").attr("index", index).on("mouseover", function(e) {
                if (!$(e.target)._getNavLiObj().hasClass("nav-selected")) {
                    $(this).css("backgroundColor","#036ba4");
                    $(e.target)._getNavImgObj().attr("src", data.hover);
                }
                $(e.target)._getNavSpanObj().css("visibility", "visible");
            }).on("mouseleave", function(e){
                if (!$(e.target)._getNavLiObj().hasClass("nav-selected")) {
                    $(this).css("backgroundColor","#0488d1");
                    $(e.target)._getNavImgObj().attr("src", data.normal);
                }
                if ($(e.target)._getNavLiObj().hasClass("nav-selected")) {
                    $(e.target)._getNavSpanObj().css("visibility", "visible");
                }else{
                    // $(e.target)._getNavSpanObj().css("visibility", "hidden");

                }
            }).append(img).append(span);;
            if (!data.disable) {
                li.on("click", function(e) {
                    var index = $(".nav-selected").attr("index");
                    if (index) {
                        var selectedData = nav_infos[index];
                        $(".nav-selected").removeClass("nav-selected").css("backgroundColor","#0488d1").find("img").attr("src", selectedData.normal).css("transform","translateY(0px)").parent().find("span");//.css("visibility", "hidden")
                    }
                    $(e.target)._getNavLiObj().addClass("nav-selected").css("backgroundColor","#036ba4");
                    $(e.target)._getNavImgObj().attr("src", data.selected).css("transform","translateY(-5px)");
                    $(e.target)._getNavSpanObj().css("visibility", "visible");

                    tabHandler($(e.target)._getNavLiObj().attr("index"), data.name, data.fix);
                });
            }else{
                li.on("click",function(){
                    alert("未授权");
                })
            }

            target.append(li);
        });
    },
    navSelected: function(pastSelectedData, currSelectData, index) {
        var li = $(this).find("li").eq(index);
        $(".nav-selected").removeClass("nav-selected").css("backgroundColor","#0488d1").find("img").attr("src", pastSelectedData.normal).css("transform","translateY(0px)").parent().find("span");//.css("visibility", "hidden")
        li._getNavLiObj().addClass("nav-selected").css("backgroundColor","#036ba4");
        li._getNavImgObj().attr("src", currSelectData.selected).css("transform","translateY(-5px)");
        li._getNavSpanObj().css("visibility", "visible");
    }
});
