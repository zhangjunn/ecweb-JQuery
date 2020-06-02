var myluntanObj = {}
var nickname = null
var ownerId = null//定义了全局变量
var idd = null
var forumUrl = {
  getuserInfo:'/bbsw/queryBbsUserInfo',//获取会员信息
  getmainList:'/bbs/forumPost/queryUserPostList',//主题帖子
  getModel:'/bbs/concernsModule/listdata',//关注板块
  getModelpeple:'/bbs/concernsUser/listdata', //关注用户
  repalyList:'/bbs/forumComment/listdata'//回复列表
}
myluntanObj.init = function() {
  myluntanObj.clickbtn();
  // myluntanObj.clickqx();
  myluntanObj.getuserInfo(forumUrl.getuserInfo);
  myluntanObj.repalyList(forumUrl.repalyList);
  myluntanObj.getModel(forumUrl.getModel);
  myluntanObj.getModelpeple(forumUrl.getModelpeple);
}
myluntanObj.clickbtn = function(){
    $('.btn-click').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    var index = $(this).index();
  $(".jhzt-box").eq(index).show().siblings().hide();
    })
}
// 获取会员信息
myluntanObj.getuserInfo = function(url){
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
        nickname = data.nickname;
        ownerId = data.ownerId;
        data.apigateway = APIGATEWAY;
        var userinfo = $('#userinfo').render(data)
        
        console.log('cjsj',result.body)
        $('.qmcy-right-box').html(userinfo);
        myluntanObj.getmainList(forumUrl.getmainList);
        myluntanObj.repalyList(forumUrl.repalyList)
        myluntanObj.getModelpeple(forumUrl.getModelpeple)
        
        
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
  });
        // var params ={
        //   busiId: ownerId
        // }
        // $.ajax({
        //   type : "GET",
        //   url : APIGATEWAY + '/bbs/concernsUser/checkConcerns',//是否关注
        //   xhrFields: {
        //     withCredentials: true
        // },
        //   data : params,
        //   success : function(result) {
        //        var data = result.body.vo;
        //        idd = data.id;
        //   },
        //   error : function(e){
        //       console.log(e.status);
        //       console.log(e.responseText);
        //   }
        // });
    $('#focusContainer').on('click','.gz-zy',function(){
      $('.qx-gzs').toggleClass('qx-gzs-df');
      if($('.qx-gzs').is('.qx-gzs-df')){
        $('.qx-gzs').html('关注')
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
      }else{
        $('.qx-gzs').html('取消关注')
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
                  //  var data = result.body.vo.id;
                   idd = result.body.vo.id;
                   console.log('45678',result.body.vo.id);
               },
               error : function(e){
                   console.log(e.status);
                   console.log(e.responseText);
               }
             });
          }
    })
    myluntanObj.getmainList = function(url,nPage,searchObj,searchTime){
      var params = {
        pageNum: nPage,
        pageSize: 12,
        orderBy: 'cjsj desc',
        listpageId: '',
        searchAndOr: 'and',
        commentOrder: 3,
        isEssence: 0,
        publishOrder: 1,
        ownerId: ownerId
    }
    console.log('ownerId',ownerId);
    params["searchMap"] = {};
    
    if(searchObj){
        for(item in searchObj){
            params["searchMap"][item] = searchObj[item];
        }
    }
    if(searchTime){
        params["urlsearch"] = 'cjsj>:' + searchTime;
    }
    $.templates('tmlZyzhdList', '#zyzhdList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        xhrFields: {
          withCredentials: true // 这里设置了withCredentials
        },
        success : function(result) {
            var data = result.body.vo;
            console.log('data',data);
            data.apigateway = APIGATEWAY;
            var template = $.render.tmlZyzhdList(data);
            $(".jhzt-pro").html(template);
            if(data.list.length <= 12){
                if(data.total == 0){
                    $("#nodata").show();
                }else{
                    $("#nodata").hide();
                }
            }
            if(data.pages == 0){
                return;
            }
            $("#myPage").sPage({
                page:nPage,//当前页码，必填
                total:data.total,//数据总条数，必填
              pageSize:12,//每页显示多少条数据，默认10条
              showTotal:true,//是否显示总条数，默认关闭：false
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
              showSkip:true,//是否显示跳页，默认关闭：false
              showPN:true,//是否显示上下翻页，默认开启：true
              prevPage:"←",//上翻页文字描述，默认“上一页”
              nextPage:"→",//下翻页文字描述，默认“下一页”
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    }
}
myluntanObj.getModel = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'cjsj desc',
    listpageId: '',
    searchAndOr: 'and',
    commentOrder: 3,
    isEssence: 0,
    publishOrder: 1,
    ownerId: '1'
}
params["searchMap"] = {};

if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'cjsj>:' + searchTime;
}
$.templates('tmlgzModle', '#gzModle');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    data : params,
    xhrFields: {
      withCredentials: true // 这里设置了withCredentials
    },
    success : function(result) {
        var data = result.body.pageInfo;
        data.apigateway = APIGATEWAY;
        var template = $.render.tmlgzModle(data);
        $(".gzModle").html(template);
        if(data.list.length <= 12){
            if(data.total == 0){
                $("#nodata").show();
            }else{
                $("#nodata").hide();
            }
        }
        if(data.pages == 0){
            return;
        }
        $("#myPage").sPage({
            page:nPage,//当前页码，必填
            total:data.total,//数据总条数，必填
            pageSize:12,//每页显示多少条数据，默认10条
            showTotal:true,//是否显示总条数，默认关闭：false
            totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showSkip:true,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"←",//上翻页文字描述，默认“上一页”
            nextPage:"→",//下翻页文字描述，默认“下一页”
        });
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
});
}
//关注用户
myluntanObj.getModelpeple = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'cjsj desc',
    listpageId: '',
    searchAndOr: 'and',
    commentOrder: 3,
    isEssence: 0,
    publishOrder: 1,
    ownerId: ownerId
}
   console.log('222',ownerId);
params["searchMap"] = {};

if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'cjsj>:' + searchTime;
}
$.templates('tmlGzuser', '#gzuser');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    data : params,
    xhrFields: {
      withCredentials: true // 这里设置了withCredentials
    },
    success : function(result) {
        var data = result.body.pageInfo;
        data.apigateway = APIGATEWAY;
        console.log('data111',data);
        var template = $.render.tmlGzuser(data);
        $(".gzuser-pro").html(template);
        if(data.list.length <= 12){
            if(data.total == 0){
                $("#nodata").show();
            }else{
                $("#nodata").hide();
            }
        }
        if(data.pages == 0){
            return;
        }
        $("#myPage").sPage({
            page:nPage,//当前页码，必填
            total:data.total,//数据总条数，必填
            pageSize:12,//每页显示多少条数据，默认10条
            showTotal:true,//是否显示总条数，默认关闭：false
            totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showSkip:true,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"←",//上翻页文字描述，默认“上一页”
            nextPage:"→",//下翻页文字描述，默认“下一页”
        });
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
});
}
//回复列表***************
myluntanObj.repalyList = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'contentTime desc',
    listpageId: '',
    searchAndOr: 'and',
    commentOrder: 3,
    isEssence: 0,
    publishOrder: 1,
    ownerId:ownerId
}
params["searchMap"] = {};

if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'contentTime>:' + searchTime;
}
$.templates('tmlReplayList', '#replayList');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    data : params,
    xhrFields: {
      withCredentials: true // 这里设置了withCredentials
    },
    success : function(result) {
        var data = result.body.pageInfo;
        data.apigateway = APIGATEWAY;
        console.log('data5555',data);
        var template = $.render.tmlReplayList(data);
        $(".tmlHuifu").html(template);
        if(data.list.length <= 12){
            if(data.total == 0){
                $("#nodata").show();
            }else{
                $("#nodata").hide();
            }
        }
        if(data.pages == 0){
            return;
        }
        $("#myPage").sPage({
            page:nPage,//当前页码，必填
            // total:data.total,//数据总条数，必填
            pageSize:12,//每页显示多少条数据，默认10条
            showTotal:true,//是否显示总条数，默认关闭：false
            totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showSkip:true,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"←",//上翻页文字描述，默认“上一页”
            nextPage:"→",//下翻页文字描述，默认“下一页”
        });
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
});
}

$(function(){
    myluntanObj.init();
})