$.fn.extend({
  updatecolor:function (data,returndata) {
      var target = $(this);

      console.log(target);

      for(var i =0;i<target.length;i++){
          var targettd = target[0].childNodes[1];
      $.each(data,function (index,datasource) {
          switch(datasource.o){
              case 0:
                  target.eq(1).css("color","#fff");
                  break;
              case 1:
                  target.eq(1).css("color","#000");
                  break;
              case 2:
                  target.eq(1).css("color","red");
                  break;
          }
          //返回数据
          returndata(index,datasource.o,target);


      });

      }
  }
})
/*(function ($,undefined) {
    $.fn.popupSmallMenu = function(options) {
        var $currMenu = $(this),
            defaultOptions = {
                event : null,
                onClickItem : null
            },
            options = $.extend(defaultOptions,options);
        var _smallMenu = {
            popupSmallMenu : function() {
                this._bindItemClick();
                this._bindMenuEvent();
                this._showMenu();
                return $currMenu;
            },
            _bindMenuEvent : function() {
                var thiz = this;
                $currMenu.hover(function(){
                },function(){
                    thiz._unBindItemClick();
                    $currMenu.hide();
                });

                $currMenu.click(function(){
                    thiz._unBindItemClick();
                    $currMenu.hide();
                });
            },
            _showMenu : function() {
                if(!options.event) {
                    alert('请传入鼠标事件');
                }
                $currMenu.css({
                    top:options.event.clientY+"px",
                    left:options.event.clientX+"px",
                    display:"block"
                });
            },
            _bindItemClick : function() {
                $currMenu.find('li').each(function(index,obj){
                    var $li = $(obj);
                    var itemIden = $li.attr('class');
                    $li.bind('click',function(event){
                        event.stopPropagation();
                        if(options.onClickItem
                            && typeof options.onClickItem === 'function') {
                            options.onClickItem(itemIden);
                        }
                    });
                });
            },
             _unBindItemClick : function(){
                $currMenu.find('li').each(function(index,obj){
                    $(obj).unbind();
                });
            }
        };
        return _smallMenu.popupSmallMenu();
    }

    })(jQuery);*/
//使用方法,用于ztree吧
/*

  $("#menu").popupSmallMenu({
event : event,
    onClickItem  : function(item) {
    chuli(treeNode,item);
}
});
*/