var editObj = {};
var ownerId = null
var postId  = null
var moduleName = null
var moduleId = null
var nickName = null
var ownerId = null
      // 详情页回复列表
      var editUrl={ 
        editList:'/bbs/forumComment/insert',//论坛回复
        userSearch:'/bbs/forumComment/getById'//根据用户id查询
    }
editObj.init = function(){
    editObj.getuserSearch(editUrl.userSearch);
}

editObj.getDetailist = function(url,nPage,searchObj){
  let ids = window.location.href.split('=')
  let id = ids[1]
  var params = {
    page: nPage,
    pageSize: 10,
    order: 'cjsj asc',
    orgCode:'ecyoa',
    postId: id
}
params["searchMap"] = {};
if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    data : params,
     xhrFields: {
    withCredentials: true
  },
    success : function(result) {
        var data = result.body.vo;
        let ids = window.location.href.split('=')
        let idds = window.location.href;
        console.log('idds',idds)
        console.log('ids',ids);
        let id = ids[1]
        console.log('回复列表',data);
        for(var i=0;i<data.list.length;i++){
          
          moduleId = data.list[i].moduleId;
          moduleName = data.list[i].moduleName;
          postId = data.list[i].postId;
          postNum = data.list[i].postTitle;
          orderNo = data.total;
          ownerId = data.list[i].ownerId;
          postTitle = data.list[i].postTitle;
          nickName = data.list[i].nickName;
          
        }
        // ***********************************
               //** */
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
editObj.getuserSearch = function(url){
  let ids = window.location.href.split('=')
  let id = ids[1]
      var params = {
        id:id,
      }
      $.ajax({
        type : "GET",
        url : APIGATEWAY + url,
        xhrFields: {
          withCredentials: true
      },
      dataType:'json',
      contentType:'application/json',
        data : params,
        success : function(result) {
          var data = result.body.vo;
          var html = $('#hotLt').render(data);
          $('.replays').html(html)
          console.log('html',html);
          console.log('data',data);
          moduleId = data.moduleId;
          moduleName = data.moduleName;
          postId = data.postId;
          postNum = data.postTitle;
          orderNo = data.total;
          ownerId = data.ownerId;
          postTitle = data.postTitle;
            $('.button').on('click','.button-tiezi',function(){
              var sensitiveWords = $(".panel-body>p").html()
              console.log('sensitiveWords',sensitiveWords)
              var userName = $.cookie("userName");
              let ids = window.location.href.split('=')
              let id = ids[1]
              var params = {
                  author:userName,//ok
                  content: sensitiveWords,//ok
                  contentText: sensitiveWords,//ok
                  deviceType: 0,//ok
                  moduleId: moduleId,
                  moduleName:moduleName,//ok
                  orderNo:orderNo++,
                  ownerId:ownerId,
                  postId: postId,
                  postTitle: postTitle,//ok
                  status: 1,
                  upCommentId:id
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
                    console.log('result',result);
                },
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                }
              });
            })
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
      });
}
$(function(){
  editObj.init();
})