/* 
*   U友缘
*/
var activity = {};
activity.oDataUrl = {
    uUyList:'/gqt/mh/uyyHdMh/listdata'
}
activity.init = function(){
    activity.events();
    activity.getUuyList(activity.oDataUrl.uUyList,1)
}
activity.events = function(){

}


activity.getUuyList = function(url,nPage){
    var params = {
        pageNum: nPage,
        pageSize: 6,
        order: 'cjsj asc',
        listpageId: '',
        searchAndOr: 'and'
    }
    $.templates('tmlUuyList', '#uUyList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.pageInfo;
            var template = $.render.tmlUuyList(data);
            $('.activity-pro').html(template);
            if(data.list.length < 6){
                if(data.total == 0){
                    $("#nodata").show();
                }else{
                    $("#nodata").hide();
                }
                return;
            }
            $("#nodata").hide();
            $("#myPage").show();
            $("#myPage").sPage({
                page:nPage,//当前页码，必填
                total:data.total,//数据总条数，必填
	            pageSize:6,//每页显示多少条数据，默认10条
	            showTotal:true,//是否显示总条数，默认关闭：false
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
	            showSkip:true,//是否显示跳页，默认关闭：false
	            showPN:true,//是否显示上下翻页，默认开启：true
	            prevPage:"←",//上翻页文字描述，默认“上一页”
	            nextPage:"→",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                	//点击分页按钮回调函数，返回当前页码
                    activity.getUuyList(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

$(function(){
    activity.init(); 
})