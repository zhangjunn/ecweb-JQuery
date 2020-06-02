
var volunteer = {};

volunteer.oDataUrl = {
    zyzhdList:'/gqt/mh/zysHd/listdata'
}

volunteer.init = function(){
    var channel = volunteer.getUrlParam("type");
    if(channel){
        var dTarget2 = $('.filter-condition').find('.column2').find('a');
        dTarget2.removeClass('active');
        dTarget2.eq(channel).addClass('active');
        var parmas = {
            fl: dTarget2.eq(channel).html()
        }
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,parmas);
    }else{
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1);
    }
    
    volunteer.events();
}

volunteer.getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	
	if (r != null) return unescape(r[2]);
	return null; //返回参数值

}
volunteer.events = function(){
    volunteer.toFilterList();
    volunteer.toSearch();
}

// 获取时间过滤
volunteer.getTime = function(type){
    if (type == 'taday'){
        var t = new Date(new Date().toLocaleDateString()).getTime(),time;
        var time = new Date(t).format("yyyy-MM-dd hh:mm:ss");
        return time;
    }
    else if (type == 'tomorrow'){
        var t = new Date(new Date().toLocaleDateString()).getTime(),time;
        t = t + (24*60*60*1000);
        var time = new Date(t).format("yyyy-MM-dd hh:mm:ss");
        return time;
        
    }
    else if (type == 'week'){
        var t = new Date(new Date().toLocaleDateString()),time;
        t.setTime(t.getTime() - 3600 * 1000 * 24 * 7);
        time = t.getTime();
        time =  new Date(time).format("yyyy-MM-dd hh:mm:ss");
        return time;
    }
    else if (type == 'month'){
        var t = new Date(new Date().toLocaleDateString()),time;
        t.setTime(t.getTime() - 3600 * 1000 * 24 * 30);
        time = t.getTime();
        time =  new Date(time).format("yyyy-MM-dd hh:mm:ss");
        return time;
    }
}

// 获取搜索过滤参数
volunteer.getParms = function(){
    var dataObj = {},filterObj = {},searchTime;
    var dTarget1 = $('.filter-condition').find('.column1').find('a');
    var dTarget2 = $('.filter-condition').find('.column2').find('a');

    var dSelects1 = $('.select-filter').find('.selects').eq(0).find('select');
    var dSelects2 = $('.select-filter').find('.selects').eq(1).find('select');
    var dSelects3 = $('.select-filter').find('.selects').eq(2).find('select');
    dTarget1.each(function(i){
        if(dTarget1.eq(i).hasClass('active')){
            var filterStr = dTarget1.eq(i).attr('data-val');
            filterObj.xz = filterStr;
        }
    })
    dTarget2.each(function(i){
        if(dTarget2.eq(i).hasClass('active')){
            var filterStr = dTarget2.eq(i).attr('data-val');
            filterObj.fl = filterStr;
        }
    })
    if(dSelects1.val() > 0){
        filterObj.zt = dSelects1.val();
    }
    else if(dSelects1.val() == 0){
        filterObj.zt = '';
    }
    if(dSelects2.val() > 0){
        switch(dSelects2.val()){
            case "1":
                searchTime = volunteer.getTime('taday'); 
                break;
            case "2":
                searchTime = volunteer.getTime('tomorrow');
                break;
            case "3":
                searchTime = volunteer.getTime('week');
                break;
            case "4":
                searchTime = volunteer.getTime('month');
                break;
        }
    }
    else if(dSelects2.val() == 0){
        searchTime = ''
    }
    if(dSelects3.val() != 1){
        filterObj.hddz = dSelects3.val();
    }else{
        filterObj.hddz = '';
    }
    dataObj.filterObj = filterObj;
    dataObj.searchTime = searchTime;
    return dataObj
}

// 根据过滤参数执行请求
volunteer.toFilterList = function(){
    var filterObj = {},searchTime;
    var dTarget1 = $('.filter-condition').find('.column1').find('a');
    var dTarget2 = $('.filter-condition').find('.column2').find('a');

    var dSelects1 = $('.select-filter').find('.selects').eq(0).find('select');
    var dSelects2 = $('.select-filter').find('.selects').eq(1).find('select');
    var dSelects3 = $('.select-filter').find('.selects').eq(2).find('select');
    dTarget1.bind('click',function(){
        filterObj = {};
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
        var paramsObj = volunteer.getParms();
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,paramsObj.filterObj,paramsObj.searchTime)
    })
    dTarget2.bind('click',function(){
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');

        var paramsObj = volunteer.getParms();
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,paramsObj.filterObj,paramsObj.searchTime)
    })

    dSelects1.bind('change',function(){
        var paramsObj = volunteer.getParms();
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,paramsObj.filterObj,paramsObj.searchTime)
    })
    dSelects2.bind('change',function(){
        var paramsObj = volunteer.getParms();
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,paramsObj.filterObj,paramsObj.searchTime)
    })
    dSelects3.bind('change',function(){
        var paramsObj = volunteer.getParms();
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,paramsObj.filterObj,paramsObj.searchTime)
    })

}

// 搜索功能
volunteer.toSearch = function(){
    var dSearch = $('.search-box').find('.search').find('a');
    var filterObj = {}
    dSearch.bind('click',function(){
        var searchStr = $(this).parent().find('input').val();
        filterObj.bt = searchStr;
        volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,1,filterObj);
    })
}

// 请求方法，成功后调用分页
volunteer.getZyshdData = function(url,nPage,searchObj,searchTime){
    var params = {
        pageNum: nPage,
        pageSize: 12,
        orderBy: 'cjsj desc',
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
        params["urlsearch"] = 'cjsj>:' + searchTime;
    }

    $.templates('tmlZyzhdList', '#zyzhdList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.pageInfo;
            var template = $.render.tmlZyzhdList(data);
            $(".volunteer-pro").html(template);
            if(data.list.length <= 12){
                if(data.total == 0){
                    $("#nodata").show();
                }else{
                    $("#nodata").hide();
                }
            }
            if(data.pages == 0){
                $("#myPage").hide();
                return;
            }else{
                $("#myPage").show();
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
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    var paramsObj = volunteer.getParms();
                    volunteer.getZyshdData(volunteer.oDataUrl.zyzhdList,page,paramsObj.filterObj,paramsObj.searchTime)
                    // getDSelectformData();
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
    // var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
    
    volunteer.init();
})