var forumObj = {}
forumObj.init = function() {
  var forumUrl = {
    newsTab1:'/gqt/mh/qnsc/getMhQnsc',
    newsTab2: '/gqt/mh/articlemh/getByLb',
    // 获取bbs首页数据
    bbsindex:'/bbsw/getBbsHomePageData',
    //获取首页板块
    homepage:'/bbsw/getBbsHomePageModule',
    // 最新帖子列表
    query:'/bbsw/queryNewPostList',
    // 最新回复帖子页
    queryNew :'/bbsw/queryNewCommentPostList',
    // Bbs精华帖列表页
    queryEssence:'/bbsw/queryEssencePostList'
  }
  forumObj.events();
  forumObj.eventsclick();
  forumObj.clickbtn();
  forumObj.getHomeNewsData1(forumUrl.newsTab1);
  forumObj.getHomeNewsData2(forumUrl.newsTab2);
//   bbs匿名部分******************************
  forumObj.getBbsindexData(forumUrl.bbsindex);
  forumObj.getBbsHomePageModule(forumUrl.queryNew);
//   forumObj.queryPostDetailComment(forumUrl.detaillist);
//   forumObj.queryPostDetailInfo(forumUrl.detailinfo);
  forumObj.queryNewPostList(forumUrl.query,1);
  forumObj.queryNewCommentPostList(forumUrl.queryNew,1);
  forumObj.queryEssencePostList(forumUrl.queryEssence,1);
}
function newDoc(){
    var id = $.cookie("userId");
	window.location.href="bbsw/queryPostDetailInfo?id=id";
}
// home事件
forumObj.events = function(){
    forumObj.headNewsToggle();
}
forumObj.clickbtn = function(){
    $('.btn-xl').click(function(){
        $('.allmodel').toggleClass('c')  
    })
}

// 三帖子点击事件
forumObj.eventsclick = function(){
    $('.btn-click').click(function(){
      $(this).addClass('active').siblings().removeClass('active')
      var index = $(this).index();
      console.log($(".jhzt-box").eq(index));
    $(".jhzt-box").eq(index).show().siblings().hide();
      })
      $('.btn-gz').click(function(){
        $('.btn-gz').toggleClass('qxgz');
       if($('.btn-gz').is('.qxgz')){
         console.log(1)
         $('.gz').html("取消关注");
       } else{
         $('.gz').html("关注");
       }
      })
      
   }
// 获取首页数据*************************************************************************
forumObj.getBbsindexData = function(url){
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
          $('.hot-list').html(html)
          var template = $.render.tmlHotmodel(moduleList);
          $("#modele").html(template);

        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    })
}
// 获取首页板块**************************************************************************
forumObj.getBbsHomePageModule = function(url){
    var params = {
        orgCode:'ecyoa',  
    }
    $.templates('tmlAllpages', '#allpages');
    $.ajax({
        type:"POST",
        url : APIGATEWAY + url,
        data : params,
        dataType:'json',
        success : function(result) {
          var data = result.body.vo;
          var template = $.render.tmlAllpages(data.list);
          $(".allmodel").html(template);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    })
    $.ajax({
        type:"get",
        url : APIGATEWAY + '/gqt/grzx/user/download',
        data : {
            dataField:'LOGO_DATA',
            nameField:'LOGO_NAME',
            id:'ownerId'

        },
        dataType:'json',
        success : function(result) {
          var data = result;
          var template = $.render.tmlAllpages(data);
          $(".all-model").html(template);

        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    })
}
// 最新帖子列表*********************************************************
forumObj.queryNewPostList = function(url,nPage,searchObj){
    var params = {
        pageNum: nPage,
        pageSize: 10,
        order: 'cjsj asc',
        orgCode:'ecyoa'
    }
    params["searchMap"] = {};
    if(searchObj){
        for(item in searchObj){
            params["searchMap"][item] = searchObj[item];
        }
    }

    $.templates('tmlMostnew', '#mostnew');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
         xhrFields: {
        withCredentials: true
      },
        success : function(result) {
            var data = result.body.vo;
            console.log('最新',data);
            data.apigateway = APIGATEWAY;
            var template = $.render.tmlMostnew(data);
            $(".forum-zuixin").html(template);
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
                    forumObj.queryNewPostList(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    

}
// 最新回复帖子页
forumObj.queryNewCommentPostList = function(url,nPage,searchObj){
    var params = {
        pageNum: nPage,
        pageSize: 10,
        order: 'cjsj asc',
        orgCode:'ecyoa'
    }
    params["searchMap"] = {};
    if(searchObj){
        for(item in searchObj){
            params["searchMap"][item] = searchObj[item];
        }
    }

    $.templates('tmlHotdoor', '#hotdoor');
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
            console.log('热门',data);
            var template = $.render.tmlHotdoor(data);
            $(".forum-remen").html(template);
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
                    forumObj.queryNewCommentPostList(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    

}
// Bbs精华帖列表页
forumObj.queryEssencePostList = function(url,nPage,searchObj){
    var params = {
        pageNum: nPage,
        pageSize: 10,
        order: 'cjsj asc',
        orgCode:'ecyoa'
    }
    params["searchMap"] = {};
    if(searchObj){
        for(item in searchObj){
            params["searchMap"][item] = searchObj[item];
        }
    }

    $.templates('tmlMinihua', '#minihua');
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
            var template = $.render.tmlMinihua(data);
            $(".forum-rejinhua").html(template);
            if(data.total <= 12){
                $("#myPage").hide();
                $("#nodata").show();
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
                    forumObj.queryEssencePostList(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    

}

// bbs匿名接口部分结束


// news toggle
forumObj.headNewsToggle = function(){
    var newBtns = $('.news').find('.title').find('a'),
        newBoxs = $('.news').find('.news-list');
    newBtns.each(function(i,item){
        newBtns.eq(i).bind('click',function(){
            $(item).siblings().removeClass('active');
            $(item).addClass('active');
            newBoxs.hide();
            newBoxs.eq(i).show();
        })
    })
}

// 获取 news
forumObj.getHomeNewsData1 = function(url){
    var params = {
        lxs: '最新资讯'
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.vo;
            var html = $("#news-tab1").render(data);
            $(".news").find('.news-list').eq(0).html(html);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

forumObj.getHomeNewsData2 = function(url){
    var params = {
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
         xhrFields: {
        withCredentials: true
      },
        data : params,
        success : function(result) {
            var data = result.body.articleList;
            var html = $("#news-tab2").render(data);
            $(".news").find('.news-list').eq(1).html(html);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

$(function(){
    forumObj.init();
})