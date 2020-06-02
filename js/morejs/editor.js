var editObj = {};
var orderNo = null
var ownerId = null
var postId  = null
var modelname = null
var moduleId = null
      // 详情页回复列表
      var editUrl={ 
        editList:'/bbs/forumPost/insert',//发表主题
        pageModule:'/bbsw/getBbsHomePageModule',//获取板块
        getuserinfo:'/bbsw/queryBbsUserInfo'//获取会员信息
    }
editObj.init = function(){
    // editObj.editList(editUrl.editList);
    // editObj.pageModule(editUrl.pageModule);
    editObj.getuserinfo(editUrl.getuserinfo);
}
// editObj.editList = function(url){
//     var hyId =  $.cookie("userId");
//     var params = {
      
//   } 
//     $.ajax({
//       type : "POST",
//       url : APIGATEWAY + url,
//       xhrFields: {
//         withCredentials: true
//     },
//       data : params,
//       success : function(result) {
//           var data = result.body.vo;
//           data.apigateway = APIGATEWAY;
//           var userinfo = $('#userinfo').render(data)
          
//           console.log('cjsj',result.body)
//           $('.qmcy-right-box').html(userinfo);
//       },
//       error : function(e){
//           console.log(e.status);
//           console.log(e.responseText);
//       }
//     });
// }
//  var list = editObj.pageModule = function(url){
  
// }
//获取个人信息
editObj.getuserinfo= function(url){
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
        //  nickname = data.nickname;
         ownerId  = data.ownerId;
         orderNo = data.orderNo
         ownerId = data.ownerId
         nickname = data.nickname
         var params = {
          orgCode:'ecyoa',  
      }
      $.templates('tmlSelect', '#select');
      $.ajax({
          type:"POST",
          url : APIGATEWAY + '/bbsw/getBbsHomePageModule',
          data : params,
          dataType:'json',
          success : function(result) {
            var data = result.body.vo;
            console.log('aaa',data.length);
            for(var i=0; i<data.length; i++){
              moduleId = data[i].id;
            }
            var template = $.render.tmlSelect(data);
            $(".select-list").html(template);
             $(document).on("change",'select.select-list',function(){
                  modelname = $(this).find("option:selected").text()
                    $('.button').on('click','.button-tiezi',function(){
                      var sensitiveWords = $(".note-editable>p").html()
                      var postTitle = $('.input-90').val();
                      console.log('111',$(".panel-body>p").val());
                      console.log('2222',$('.input-90').val());
                      var userName = $.cookie("userName");
                      var userId = $.cookie("userId")
                      var params = {
                          author:nickname,
                          ownerId:ownerId,
                          content: sensitiveWords,
                          moduleId: moduleId,
                          moduleName:modelname,
                          deviceType: 0,
                          title: postTitle,
                          publishStatus:1,
                          status: 1
                      }
                          console.log('params',params)
                      $.ajax({
                        type : "POST",
                        url : APIGATEWAY + '/bbs/forumPost/insert',
                        xhrFields: {
                          withCredentials: true
                      },
                      dataType:'json',
                      contentType:'application/json',
                        data : JSON.stringify(params),
                        success : function(result) {
                            var data = result.body.vo;
                            // window.navigate("luntanbk.html");
                            self.location='luntanbk.html';
                            console.log('result',result);
                        },
                        error : function(e){
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                      });
                    })
               });
             
          },
          error : function(e){
              console.log(e.status);
              console.log(e.responseText);
          }
      })
      
    },
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
  });
}

$('.button-quxiao').click(function(){
    history.go(-1)
 })
$(function(){
  editObj.init();
})