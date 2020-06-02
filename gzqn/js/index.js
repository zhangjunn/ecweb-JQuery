gzqnIndex = {};

gzqnIndex.init = function(){
    gzqnIndex.setSwiperNews();
    window.popHTML = gzqnIndex.popHTML;
    window.askForLeave = gzqnIndex.askForLeave;
    window.showMeeting = gzqnIndex.showMeeting;
}

gzqnIndex.setSwiperNews = function(){
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        autoplay : 5000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
        autoplayDisableOnInteraction : false,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    })
   
    $('.prev').click(function(){
        mySwiper.swipePrev(); 
    })
    $('.next').click(function(){
        mySwiper.swipeNext(); 
    })
}

gzqnIndex.popHTML  = function(src,itemId){
    if($('body').hasClass('pop-lock')) return;
    var url = 'tmpl/' + src.split('_')[1].toLowerCase() + '.html';
    $('body').addClass('pop-lock');
    var id = 'pop_'+ new Date().getTime();
    
    $('body').append('<div class="pop" id="'+ id +'" meeting="'+itemId+'"><img src="images/close.png" class="close"><div class="pop-content"></div></div>');
    var popBox = $('#' + id);
    popBox.find('.pop-content').load(url,function(){
        setTimeout(function(){
            var sw = $(window).width();
            var sh = $(window).height();
            var st = $(window).scrollTop();
            var w = popBox.outerWidth();
            var h= popBox.outerHeight();
            popBox.css({
                "top": (sh-h)/2 + st,
                "left":'50%',
                "marginLeft": -w/2
            })
        },10)

        popBox.on('click','.close',function(){
            $('body').removeClass('pop-lock');
            popBox.remove();

        })
    });

}

gzqnIndex.askForLeave = function(id){
    popHTML('GZQN_ASKFORLEAVE',id);
}
gzqnIndex.showMeeting = function(id){
    popHTML('GZQN_MEETINGINFO',id);
}

$(function(){
    gzqnIndex.init();
})
