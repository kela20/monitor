//监听登录页下部分高度
$(function () {
    function lp_h() {
        var s_H = $(document).height();
        // var h_H = $(".login_header").height();
        // var all_H = s_H - h_H;
        $(".login_page").height(s_H);
        // alert(all_H);
    }
    lp_h();
    $(window).resize(lp_h);
});