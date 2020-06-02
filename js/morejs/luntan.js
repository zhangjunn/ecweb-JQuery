
var luntanObj = {};
var  nickname = null;
var  ownerId  = null;
var datalist = [];
var  moduleId = null;
var postId = null;
var moduleName = null;
var postTitle = null;
var orderNo = null;
var postTitle = null;
var idd = null;
var idd1 = null
var luntanUrl={ 
  detaillist:'/bbsw/queryPostDetailComment',//获取回复列表
  detailInfo:'/bbsw/queryPostDetailInfo',//获取列表详情
  bbsindex:'/bbsw/getBbsHomePageData', // 获取bbs首页数据
  sentitige:'/bbs/sensitiveWord/querydata',//敏感词查询
  getuserInfo:'/bbsw/queryBbsUserInfo',//获取会员信息
  // ifguanzhu:'/bbs/concernsUser/checkConcerns'//判断是否关注
  getCollect:'/gqt/grzx/collection/insert',
  qxgetCollect:'/gqt/grzx/collection/delete',
  replay:'/bbs/forumComment/insert'//论坛回复
}
luntanObj.init = function(){
      // 详情页回复列表
 luntanObj.event();
 luntanObj.getDetailist(luntanUrl.detaillist,1);
 luntanObj.getDetailInfo(luntanUrl.detailInfo);
 luntanObj.getBbsindexData(luntanUrl.bbsindex);
 luntanObj.sentitigeData(luntanUrl.sentitige);
 luntanObj.getuserInfo(luntanUrl.getuserInfo);
}
//获取会员个人信息
luntanObj.getuserInfo = function(url){
  var userId = $.cookie("userId");
  var params = {
    id: userId
} 
  $.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    xhrFields: {
      withCredentials: true
  },
    data : params,
    success : function(result) {
        var data = result.body.vo;
        console.log('data111',data);
         nickname = data.nickname;
         ownerId  = data.ownerId;
        data.apigateway = APIGATEWAY;
        var userinfo = $('#userinfo').render(data)
        console.log('cjsj',result.body)
        // luntanObj.sentitigeData(url);
        $('.qmcy-right-box').html(userinfo);
        $('#focusContainer').on('click','.btn-gz',function(){
          $('.btn-gz').toggleClass('qxgz');

         if($('.btn-gz').is('.qxgz')){
           $('.gz').html("取消关注");
           var hyId =  $.cookie("userId");
           var userName = $.cookie("userName ");
           var params = {
              bhyId:ownerId,
              bhyXm: nickname,
              hyXm: userName,
              hyId: hyId
           } 
             $.ajax({
               type : "POST",
               url : APIGATEWAY + '/bbs/concernsUser/insert',//关注
               xhrFields: {
                 withCredentials: true
             },
             dataType:'json',
             contentType:'application/json',
               data : JSON.stringify(params),
               success : function(result) {
                   var data = result.body.vo;
                   idd = data.id;
                   console.log(result);
               },
               error : function(e){
                   console.log(e.status);
                   console.log(e.responseText);
               }
             });
       
         } else{
           $('.gz').html("关注");
           var params = idd;
           console.log("idd",idd);
           $.ajax({
            type : "DELETE",
            url : APIGATEWAY + '/bbs/concernsUser/delete?ids='+params,//取消关注
            xhrFields: {
              withCredentials: true
           },
           dataType:'json',
           contentType:'application/json',
            success : function(result) {
                var data = result.body.vo;
                console.log(result);
            },
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
           });   
          }
        })
          // 收藏和取消收藏******************************************
  $('#collect').on('click','.coloect',function(){
    console.log('111',111);
    $('.coloect').toggleClass('red-color');
   if($('.coloect').is('.red-color')){
     $('.coloect').html("收藏");
   } else{
     $('.coloect').html("取消收藏");
    }
  })
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
  });
}
//关注
luntanObj.event = function(){
 
}
// 获取回复列表***********************************
   luntanObj.getDetailist = function(url,nPage,searchObj){
    let ids = window.location.href.split('=')
    let id = ids[1]
    console.log('id',id);
    var params = {
      page: nPage,
      pageSize: 10,
      order: 'cjsj asc',
      orgCode:'ecyoa',
      postId:id
  }
  params["searchMap"] = {};
  if(searchObj){
      for(item in searchObj){
          params["searchMap"][item] = searchObj[item];
      }
  }

  $.templates('tmllists', '#lists');
  $.ajax({
      type : "POST",
      url : APIGATEWAY + url,
      data : params,
       xhrFields: {
      withCredentials: true
    },
      success : function(result) {
          var data = result.body.vo;
           data.apigateway = APIGATEWAY;
          console.log('回复列表',data);
          var template = $.render.tmllists(data);
          for(var i=0;i<data.list.length;i++){
            moduleId = data.list[i].moduleId;
            moduleName = data.list[i].moduleName;
            postId = data.list[i].postId;
            postNum = data.list[i].postTitle;
            orderNo = data.total;
            postTitle = data.list[i].postTitle;
          }
          $(".replayList").html(template);
        for(var i=0;i<data.list.length;i++){
          if(data.list[0].orderNo == 1){
            $('.pepoel-sf').html("沙发")
          }else if(data.list[1].orderNo == 2){
            $('.pepoel-sf').html("板凳")
          }else if(data.list[2].orderNo == 3){
            $('.pepoel-sf').html("地板")
          }else{
            $('.pepoel-sf').html("data.orderNo#")
          }
        }
          if(data.total <= 12){
              $("#myPage").hide();
              return;
          }
          $("#myPage").sPage({
              page:nPage,//当前页码，必填
              total:data.total,//数据总条数，必填
              pageSize:10,//每页显示多少条数据，默认10条
              showTotal:true,//是否显示总条数，默认关闭：false
              totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
              showSkip:true,//是否显示跳页，默认关闭：false
              showPN:true,//是否显示上下翻页，默认开启：true
              prevPage:"←",//上翻页文字描述，默认“上一页”
              nextPage:"→",//下翻页文字描述，默认“下一页”
              backFun:function(page){
                //点击分页按钮回调函数，返回当前页码
                luntanObj.getDetailist(url,page);
              }
          });
      },
      error : function(e){
          console.log(e.status);
          console.log(e.responseText);
      }
  });
}

     // 详情页
     luntanObj.getDetailInfo = function(){
       let ids = window.location.href.split('=')
       let id = ids[1]
      var params = {
        postId:id,
      }
      $.templates('tmlDetailInfo', '#detailinfo');
      $.ajax({
          type:"POST",
          url : APIGATEWAY + '/bbsw/queryPostDetailInfo',// 详情页帖子信息
          data : params,
          dataType:'json',
          success : function(result) {
            var data = result.body.vo.postVO;
            console.log('data',data);
            var template = $.render.tmlDetailInfo(data);
            $(".detaiinfos").html(template);
          },
          error : function(e){
              console.log(e.status);
              console.log(e.responseText);
          }
      });
     
     }
    
     luntanObj.event = function(){
        
     }
     // 获取首页数据*************************************************************************
     luntanObj.getBbsindexData = function(url){
  var params = {
      essencePostCount:'10',
      moduleCount:'10',
      newCommentCount:'10',
      newPostCount:'10',
      orgCode:'ecyoa',
      postCount:'10',

  }
  $.templates('tmlHotmodel', '#hotmodel');
  $.ajax({
      type:"POST",
      url : APIGATEWAY + url,
      data : params,
      dataType:'json',
      success : function(result) {
        var data = result.body.vo;
        var postList = result.body.vo.postList;
        var moduleList = result.body.vo.moduleList;
        if(postList.length>9){
            postList.length = 9;
        }
        var html = $("#hotLt").render(postList);
          $('.hotlist').html(html)
        var template = $.render.tmlHotmodel(moduleList);
        $("#modele").html(template);

      },
      error : function(e){
          console.log(e.status);
          console.log(e.responseText);
      }
  })
}

luntanObj.sentitigeData=function(url){
  $('.pinglun').on('click','.pinglun-fb',function(){
    var params = [{compare: "=", field: "status", merge: true, value: 1}];
$.ajax({
 type: 'POST',
 contentType: 'application/json',
 dataType:'json',
 data: JSON.stringify(params),
 url : APIGATEWAY + url,
 xhrFields: {
   withCredentials: true // 这里设置了withCredentials
 },
 success : function(result) {
   
   var data = result.body.listdata;

   console.log('datalenght11',data)
   for(var i=0; i< data.length; i++){
     datalist.push(data[i].sensitiveWord) 
     var sensitiveWords = $("#speaks").val()
     console.log('sensitiveWords',sensitiveWords);
     if(sensitiveWords == datalist[i]){
       $('.red-tx').show()
       return
     } else if(sensitiveWords !== null)
     {
      var userName = $.cookie("userName");
       var params = {
           author:userName,
           content: sensitiveWords,
           contentText: sensitiveWords,
           deviceType: 0,
           moduleId: moduleId,
           moduleName:moduleName,
           orderNo:orderNo++,
           ownerId:ownerId,
           postId: postId,
           postTitle: postTitle,
           status: 1
       }
           console.log('params',params)
       $.ajax({
         type : "POST",
         url : APIGATEWAY + '/bbs/forumComment/insert',
         xhrFields: {
           withCredentials: true
       },
       dataType:'json',
       contentType:'application/json',
         data : JSON.stringify(params),
         success : function(result) {
             var data = result.body.vo;
             window.history.go(-1);
             console.log('result',result);
         },
         error : function(e){
             console.log(e.status);
             console.log(e.responseText);
         }
       });
     }
   }
 
 },
 error : function(e){
   console.log(e.status);
   console.log(e.responseText);
 }
});
     
   })
}

     $(function(){
      luntanObj.init();
  })
 
  