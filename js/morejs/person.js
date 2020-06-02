var personList = {}
var logoData = null
var logoName = null
var file = null
var personUrl = {
  // 下载文件
  getUerId:'/gqt/grzx/user/getById',
  dounloadlist: '/gqt/grzx/user/download',
  getbyidlist:'/gqt/grzx/user/getById',// 根据id查询用户信息
  updatelist:'/gqt/grzx/user/update', // 修改编辑保存
  uploadlist: '/gqt/grzx/user/upload',//上传图片
  colectlist:'/gqt/grzx/collection/listdata',//收藏列表
  asklist:'/gqt/grzx/activity/listdata',//申请列表
  tesklist:'/gqt/grzx/task/listdata',//事务表
  talklist:'/gqt/grzx/interactManage/listdata',//互动
}
personList.init = function() {
  // personList.getDownload(personUrl.dounloadlist);
  // personList.getById(personUrl.getbyidlist);
  personList.getUerId(personUrl.getUerId)
  // personList.getUpdate(personUrl.updatelist);
  // personList.getUpload(personUrl.uploadlist);
  personList.getColect(personUrl.colectlist,1);
  personList.getAsklist(personUrl.asklist,1);
  personList.gettesklist(personUrl.tesklist,1);
  personList.gettalklist(personUrl.talklist,1);
}

// 获取用户id
personList.getUerId = function(url){
  var userId = $.cookie("userId");
  var params = {
    id: userId
} 
$.ajax({
  type : "GET",
  url : APIGATEWAY + url,
  xhrFields: {
    withCredentials: true
},

  data : params,
  success : function(result) {
      var cjsj = result.body.vo;
      var html = $("#userInfor").render(cjsj);
      $('#inform').html(html);
      if(cjsj.nc == null){
        cjsj.nc = cjsj.ms
      }
      // cjsj.dz = $("#dz")
      console.log('cjsj',cjsj)
      //图片上传
      $('.collrct-pic>input').on('change',function(){
        $('.xgbc-yss').show();  
        logoData = cjsj.logoData
        logoName = cjsj.logoName
        file = this.files[0]; 
        var reader = new FileReader();
        reader.readAsDataURL(file);                    
        reader.onload = function(e) {
            var newUrl = this.result;
            $('.pic-1-8')[0].src =  newUrl;
            $('.pic-1-8')[1].src =  newUrl;
        };
        $('.zl-box').on('click','.xgbc-yss',function(){
          
          console.log('cjsj',cjsj)
          logoData = cjsj.logoData
          console.log('logoData',logoData)
          logoName = cjsj.logoName
          console.log('logoName',logoName)
          var userId = $.cookie("userId");
        
        var fd = new FormData();
        fd.append("id", userId);
        fd.append("dataField",'logoData');
        fd.append("nameField",'logoName');
        fd.append("file",file);
        $.ajax({
          type:"PUT",
          url : APIGATEWAY + '/gqt/grzx/user/upload',
          data : fd,
          processData:false,
          contentType: false,
          success : function(result) {
            var data = result;
            console.log('获取首页板块',data);
          },
          error : function(e){
              console.log(e.status);
              console.log(e.responseText);
          }
      })
      
        })          
      })

      // 编辑文件文本接口
      $('#userInfoForm').on('click','#submitBtn',function(){
        cjsj.nc = $("#nc").val();
        cjsj.ms = $("#ms").val();
        cjsj.yx = $("#yx").val();
        cjsj.xm = $("#xm").val();
        cjsj.zjhm = $("#zjhm").val();
        cjsj.dz = $("#dz").val();
        var params = cjsj;
        console.log('cjsj',cjsj);
          $.ajax({
            type:"PUT",
            url : APIGATEWAY + '/gqt/grzx/user/update',
            data : JSON.stringify(params),
            dataType:'json',
            contentType:'application/json',
            success : function(result) {
              var data = result;
              console.log('获取编辑部分',data);
        
            },
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        })
        })
  },
  error : function(e){
      console.log(e.status);
      console.log(e.responseText);
  }
});
},
//收藏列表
personList.getColect = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'createTime desc',
    listpageId: '',
    searchAndOr: 'and'
}
  params["searchMap"] = {};
   
  if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'createTime>:' + searchTime;
}
$.templates('tmlcollectList', '#collectList');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    xhrFields: {
      withCredentials: true
  },
    data : params,
    success : function(result) {
        var data = result.body.pageInfo;
        // console.log('收藏列表',data);
        var template = $.render.tmlcollectList(data.list);
        $(".collect-pro").html(template);
        
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
//申请列表
personList.getAsklist = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'fbsj desc',
    listpageId: '',
    searchAndOr: 'and'
}
  params["searchMap"] = {};
   
  if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'fbsj>:' + searchTime;
}
$.templates('tmlZyzhdList', '#zyzhdList');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    xhrFields: {
      withCredentials: true
  },
    data : params,
    success : function(result) {
        var data = result.body.pageInfo;
         for(var i=0;i<data.list.length;i++){
        if(data.list[i].zt == 1){
          data.list[i].zt = "已审核"
        } else{
          data.list[i].zt = "未审核"
        }
      }
        var template = $.render.tmlZyzhdList(data.list);
            $(".person-pro").html(template);
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
personList.gettesklist = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'fbsj desc',
    listpageId: '',
    searchAndOr: 'and'
}
  params["searchMap"] = {};
   
  if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'fbsj>:' + searchTime;
}
$.templates('tmltestList', '#testList');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    xhrFields: {
      withCredentials: true
  },
    data : params,
    success : function(result) {
        var data = result.body.pageInfo;
        console.log('事务',data);
        for(var i=0;i<data.list.length;i++){
          if(data.list[i].zt == 1){
            // debugger
            data.list[i].zt = "已审核"
          } else{
            data.list[i].zt = "未审核"
          }
        }
        var template = $.render.tmltestList(data.list);
        $(".test-list").html(template);
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
// 互动部分
personList.gettalklist = function(url,nPage,searchObj,searchTime){
  var params = {
    pageNum: nPage,
    pageSize: 12,
    orderBy: 'createTime desc',
    listpageId: '',
    searchAndOr: 'and'
}
  params["searchMap"] = {};
   
  if(searchObj){
    for(item in searchObj){
        params["searchMap"][item] = searchObj[item];
    }
}
if(searchTime){
    params["urlsearch"] = 'createTime>:' + searchTime;
}
$.templates('tmlHdlist', '#hdlist');
$.ajax({
    type : "POST",
    url : APIGATEWAY + url,
    xhrFields: {
      withCredentials: true
  },
    data : params,
    success : function(result) {
        var data = result.body.pageInfo;
        console.log('互动列表',data);
         for(var i=0;i<data.list.length;i++){
        if(data.list[i].zt == 1){
          data.list[i].zt = "已回复"
        } else{
          data.list[i].zt = "未回复"
        }
      }
        var template = $.render.tmlHdlist(data.list);
            $(".hudong").html(template);
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
//图片上传
// personList.getUpload = function(url){
//   var userId = $.cookie("userId");
//   var params = {
//     dataField:logoData,
//     file:'',
//     id:userId ,
//     nameField:logoName
// }
//   $.ajax({
//     type:"PUT",
//     url : APIGATEWAY + url,
//     data : params,
//     dataType:'json',
//     success : function(result) {
//       var data = result;
//       console.log('获取首页板块',data);

//     },
//     error : function(e){
//         console.log(e.status);
//         console.log(e.responseText);
//     }
// })

// }

$(function(){
    personList.init();
})