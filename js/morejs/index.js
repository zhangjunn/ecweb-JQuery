$(document).ready(function(){
  var apiUrl = "http://192.168.1.107:8071/ecweb";
  // 切换样式*********************************
  $('.gr-list-li').on('click', '.gr-list-a', function(e){
    $('.gr-list-a').removeClass('red-color');
    $(this).addClass('red-color');
});

$('.grtx').click(function(){
   $('.grtx').removeClass('active1')
   $(this).addClass('active1')
})
// ***********界面切换***************
$('.gr-list-li').click(function(){
 var index = $(this).index();
 $(".pp-rights").eq(index).show().siblings().hide();
})

$('.grtxs').click(function(){
  var index = $(this).index();
  $(".zl-box").eq(index).show().siblings().hide();
})

$('.pp-rights').eq(4).find('.sx-bigbox-list').click(function(){

  console.log('111',$('.pp-rights').eq(4).find('sx-bigbox-list'));
  // $('.hd-box-title').show();
  $('.sx-bigbox-list').hide().siblings().show();
  
})
// 个人中心接口部分****************************************
$(window).load(function(){
    $.ajax({
      url:apiUrl+'/gqt/grzx/user/getVoById?id=1',
      type: 'GET',
      xhrFields: {
        withCredentials: true
    },
      contentType:'application/json',
      success:function(result) {
        if(result.code == "success"){
          console.log('个人中心',result.body.vo);
          // 统一用户
          userList = result.body.vo.user;
          if(userList.xm == null){
            $('.wf').html( "admin")
          }else{
            $('.wf').html(userList.xm)
          }
  
          $('.zl-bottom').eq(0).html(userList.nc);
          $('.zl-bottom').eq(1).html(userList.xm);
          $('.zl-bottom').eq(2).html(userList.ms);
          $('.zl-bottom').eq(3).html(userList.zjhm);
          $('.zl-bottom').eq(4).html(userList.xzqh);
          $('.zl-bottom').eq(5).html(userList.yx);
          // 青创汇用户
          userQc = result.body.vo.userQc;
          // U友缘会员
          userUyy = result.body.vo.userUyy;
          // 志愿者
          userZy = result.body.vo.uerZy;
          // 团员
          userTw = result.body.vo.userTw;
          // 互动讨论************
          userhdTl = result.body.vo.interact;
           // **********************判断用户显示*************************
         if(userQc == null){
          $('.gz-list-five').eq(1).hide();
          $('.zys-ul>.zys-li').eq(1).hide();
        }else{
           // *********************清创汇显示次数***********
          $('.cycyhd').html(userQc.cycyhdcs);
          $('.cyjyhdcs').html(userQc.cyjyhdcs);
          $('.fbcyxmcs').html(userQc.fbcyxmcs);
          $('.tdjlcs').html(userQc.tdjlcs);
        };
        if(userUyy == null){
          $('.gz-list-five').eq(2).hide();
          $('.zys-ul>.zys-li').eq(2).hide();
        }else{
           // u有缘发表个人动态次数
           $('.fbgrdtcs').html(userUyy.fbgrdtcs);
           $('.uyyhdcs').html(userUyy.uyyhdcs);
        };
        if(userZy == null){
         $('.gz-list-five').eq(3).hide();
         $('.zys-ul>.zys-li').eq(0).hide();
        }else{
          // 志愿时******************************
       $('cyzyhdcs').html(userQc.cyzyhdcs);
       $('gxqhdcs').html(userQc.gxqhdcs);
       $('zysc').html(userQc.zysc);
       }  
       
        if(userTw == null){
         $('.gz-list-five').eq(4).hide();
        }
        if(userhdTl == null){
          $('.zys-ul>.zys-li').eq(3).hide();
         } else{
           // 互动与讨论********
           $('.tjjcmycs').html(userhdTl.tjjcmycs);
           $('.tjsjyxcs').html(userhdTl.tjsjyxcs);
           $('.fbzttcs').html(userhdTl.fbzttcs);
           $('.hfzttcs').html(userhdTl.hfzttcs);
         }
       
        }
      }
    });
    
})

});
