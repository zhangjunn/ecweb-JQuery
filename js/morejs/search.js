var searchObj = {}
searchObj.init = function() {
  var searchUrl = {
    bbsindex:'/bbsw/getBbsHomePageData',//首页数据
    // homepage:'/bbsw/getBbsHomePageModule',//首页板块
    newsTab1:'/gqt/mh/qnsc/getMhQnsc',//资讯
    search:'/bbsw/queryPostList'
  }
     searchObj.getBbsindexData(searchUrl.bbsindex);
//   searchObj.getBbsHomePageModule (searchUrl.homepage);
     searchObj.getHomeNewsData1(searchUrl.newsTab1);
     searchObj.getSearch(searchUrl.search);
}
// 获取首页数据*************************************************************************
searchObj.getBbsindexData = function(url){
    var params = {
        essencePostCount:'10',
        moduleCount:'10',
        newCommentCount:'10',
        newPostCount:'10',
        orgCode:'ecyoa',
        postCount:'10',

    }
    $.templates('tmlHotmodels', '#hotmodels');
    $.ajax({
        type:"POST",
        url : APIGATEWAY + url,
        data : params,
        dataType:'json',
        success : function(result) {
          var data = result.body.vo;
          console.log('data热帖',data);
          var postList = result.body.vo.postList;
          var moduleList = result.body.vo.moduleList;
          if(postList.length>9){
              postList.length = 9;
          }
          var html = $("#hotLts").render(postList);
          $('.hotlists').html(html)
          var template = $.render.tmlHotmodels(moduleList);
          $("#modele").html(template);

        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    })
}
//获取最新资讯
searchObj.getHomeNewsData1 = function(url){
  var params = {
      lxs: '最新资讯'
  }
  $.ajax({
      type : "GET",
      contentType: "application/json;charset=UTF-8",
      url : APIGATEWAY + url,
      data : params,
      success : function(result) {
          var data = result.body.qnsc;
          console.log('data',data);
          var html = $("#news").render(data);
          $(".newlist").html(html);
      },
      error : function(e){
          console.log(e.status);
          console.log(e.responseText);
      }
  });
}

searchObj.getSearch = function(url){
    var params = {
        pageNum: 1,
        pageSize: 10,
        orgCode:'ecyoa',
        publishOrder:2,
        commentOrder:2,
        isEssence:0,
        title:''
    }
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.qnsc;
            console.log('data',data);
            var html = $("#news").render(data);
            $(".newlist").html(html);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

// 获取首页板块**************************************************************************
// searchObj.getBbsHomePageModule = function(url){
//     var params = {
//         orgCode:'ecyoa',  
//     }
//     $.templates('tmlAllpages', '#allpages');
//     $.ajax({
//         type:"POST",
//         url : APIGATEWAY + url,
//         data : params,
//         dataType:'json',
//         success : function(result) {
//           var data = result.body.vo;
//           var template = $.render.tmlAllpages(data.list);
//           $(".allmodel").html(template);
//         },
//         error : function(e){
//             console.log(e.status);
//             console.log(e.responseText);
//         }
//     })
//     $.ajax({
//         type:"get",
//         url : APIGATEWAY + '/gqt/grzx/user/download',
//         data : {
//             dataField:'LOGO_DATA',
//             nameField:'LOGO_NAME',
//             id:'ownerId'

//         },
//         dataType:'json',
//         success : function(result) {
//           var data = result;
//           var template = $.render.tmlAllpages(data);
//           $(".all-model").html(template);

//         },
//         error : function(e){
//             console.log(e.status);
//             console.log(e.responseText);
//         }
//     })
// }

$(function(){
    searchObj.init();
})