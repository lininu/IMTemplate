$(function(){
    
    $('.nav--main .nav__fir-li').hover(
        function() {
            $('.nav--main .nav__fir-li.active').removeClass('active').addClass('inactive');
        },
        function(){
            $('.nav--main .nav__fir-li.inactive').removeClass('inactive').addClass('active');
        });

    /* 每頁右下角返回頂部標示 - start - */
    if ($('.gotop').length > 0) {
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 200,
            //grab the "back to top" link
            $back_to_top = $('.gotop');

        $back_to_top.hide();
        //hide or show the "back to top" link
        $(window).scroll(function() {
            ($(this).scrollTop() >= offset) ? $back_to_top.fadeIn(): $back_to_top.fadeOut();
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });
    }
    /* 每頁右下角返回頂部標示 -  end  - */
});