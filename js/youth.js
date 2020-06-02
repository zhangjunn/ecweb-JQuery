/* 
*   青创汇对象 
*   管理青创汇  
*/

// 青创汇对象
var youth = {};

youth.oDataUrl = {
    jycyhdList:'/gqt/mh/qcJycy/listdata',
    jyzpList: '/gqt/ph/qcJy/listdata',
    qnrcList: '/gqt/ph/qcRck/listdata'
}


// youth对象初始化
youth.init = function(){
    youth.event()
    youth.getjycyhdData(youth.oDataUrl.jycyhdList,1);
    youth.getjyzpData(youth.oDataUrl.jyzpList,1);
    youth.getqnrcData(youth.oDataUrl.qnrcList,1)
    youth.toSearch();
}

// youth对象事件
youth.event = function(){
    youth.toggle();
    youth.showMore();
    youth.toFilterList1();
    youth.toFilterList2();
    youth.toFilterList3();
}

// youth对象选项卡
youth.toggle = function(){
    var tabBtns = $('.volunteer-main').find('.wrapper').find('.title').find('a'),
        tabBoxs = $('.volunteer-main').find('.wrapper').find('.tab-box');
    tabBtns.each(function(index,item){
        tabBtns.eq(index).bind('click',function(){
            $(item).siblings().removeClass('active');
            $(item).addClass('active');
            tabBoxs.hide();
            tabBoxs.eq(index).show();
        })
    })
}

// youth对象更多筛选toggle
youth.showMore = function(){
    var nCount = 3,
        isShow = false,
        oMore = $('.select-filter').find('.more'),
        oTarget = $('.tab2').find('.filter-condition').find('.column');
    oTarget.each(function(i){
        if(i>nCount){
            oTarget.eq(i).hide(); 
        }
    })
    oMore.bind('click',function(){
        if (isShow){
            oTarget.each(function(i){
                if(i>nCount){
                    oTarget.eq(i).hide(); 
                }
            })
            $(this).html('更多筛选');
            isShow = false;
        } else{
            oTarget.show();
            $(this).html('收起筛选');
            isShow = true;
        }
    })
}
// 获取选项卡1参数
youth.getParms1 = function(){
    var dataObj = {},filterObj = {},searchTime;
    var dTarget1 = $('.tab1').find('.column1').find('a');
    var dTarget2 = $('.tab1').find('.column2').find('a');
    dTarget1.each(function(i){
        if(dTarget1.eq(i).hasClass('active')){
            var filterStr = dTarget1.eq(i).attr('data-val');
            filterObj.hd = filterStr;
        }
    })
    dTarget2.each(function(i){
        if(dTarget2.eq(i).hasClass('active')){
            var filterStr = dTarget2.eq(i).attr('data-val');
            filterObj.lx = filterStr;
        }
    })
    dataObj.filterObj = filterObj;
    return dataObj
}
// 获取选项卡2参数
youth.getParms2 = function(){
    var dataObj = {},filterObj = {},searchTime;
    var dTarget1 = $('.tab2').find('.column1').find('a')
        ,dTarget2 = $('.tab2').find('.column2').find('a')
        ,dTarget3 = $('.tab2').find('.column3').find('a')
        ,dTarget4 = $('.tab2').find('.column4').find('a')
        ,dTarget5 = $('.tab2').find('.column5').find('a')
        ,dTarget6 = $('.tab2').find('.column6').find('a')
        ,dTarget7 = $('.tab2').find('.column7').find('a')
        ,dTarget8 = $('.tab2').find('.column8').find('a')

    setFilter(dTarget1,'cjsj',filterObj);
    setFilter(dTarget2,'xz',filterObj);
    setFilter(dTarget3,'qyxz',filterObj);
    setFilter(dTarget4,'gzlx',filterObj);
    setFilter(dTarget5,'gznx',filterObj);
    setFilter(dTarget6,'xl',filterObj);
    setFilter(dTarget7,'qyly',filterObj);
    setFilter(dTarget8,'hyly',filterObj);
    dataObj.filterObj = filterObj;
    return dataObj;
    function setFilter(target,attr,dataObj){
        target.each(function(i){
            if(target.eq(i).hasClass('active')){
                var filterStr = target.eq(i).attr('data-val');
                dataObj[attr] = filterStr;
            }
        })
    }
}
// 获取选项卡3参数
youth.getParms3 = function(){
    var dataObj = {},filterObj = {},searchTime;
    var dTarget1 = $('.tab3').find('.column1').find('a')
        ,dTarget2 = $('.tab3').find('.column2').find('a')
        ,dTarget3 = $('.tab3').find('.column3').find('a')
        ,dTarget4 = $('.tab3').find('.column4').find('a')
        ,dTarget5 = $('.tab3').find('.column5').find('a')
        ,dTarget6 = $('.tab3').find('.column6').find('a')

    setFilter(dTarget1,'xb',filterObj);
    setFilter(dTarget2,'qwgzxz',filterObj);
    setFilter(dTarget3,'gzjy',filterObj);
    setFilter(dTarget4,'zgxl',filterObj);
    setFilter(dTarget5,'qdcshy',filterObj);
    setFilter(dTarget6,'rclx',filterObj);
    dataObj.filterObj = filterObj;
    return dataObj;
    function setFilter(target,attr,dataObj){
        target.each(function(i){
            if(target.eq(i).hasClass('active')){
                var filterStr = target.eq(i).attr('data-val');
                dataObj[attr] = filterStr;
            }
        })
    }
}
// 选项卡1搜索
youth.toSearch = function(){
    var dSearch = $('.tab1').find('.search-box').find('.search').find('a');
    var filterObj = {}
    dSearch.bind('click',function(){
        var searchStr = $(this).parent().find('input').val();
        filterObj.bt = searchStr;
        youth.getjycyhdData(youth.oDataUrl.jycyhdList,1,filterObj);
    })
}
// 选项卡1点击过滤
youth.toFilterList1 = function(){
    var dTarget1 = $('.tab1').find('.column1').find('a');
    var dTarget2 = $('.tab1').find('.column2').find('a');
    dTarget1.bind('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var paramsObj = youth.getParms1();
        youth.getjycyhdData(youth.oDataUrl.jycyhdList,1,paramsObj.filterObj);
    })
    dTarget2.bind('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var paramsObj = youth.getParms1();
        youth.getjycyhdData(youth.oDataUrl.jycyhdList,1,paramsObj.filterObj);
    })
}
// 选项卡2点击过滤
youth.toFilterList2 = function(){
    var dTarget = $('.tab2').find('.column').find('a');
    dTarget.bind('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var paramsObj = youth.getParms2();
        youth.getjyzpData(youth.oDataUrl.jyzpList,1,paramsObj.filterObj);
    })
}
// 选项卡3点击过滤
youth.toFilterList3 = function(){
    var dTarget = $('.tab3').find('.column').find('a');
    dTarget.bind('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var paramsObj = youth.getParms3();
        youth.getqnrcData(youth.oDataUrl.qnrcList,1,paramsObj.filterObj);
    })
}

// 选项卡1请求分页
youth.getjycyhdData = function(url,nPage,searchObj,searchTime){
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

    $.templates('tmlJycyhdList', '#jycyhdList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.pageInfo;
            var template = $.render.tmlJycyhdList(data.list);
            $(".tab1").find('.youth-pro').html(template);
            if(data.list.length <= 12){
                if(data.total == 0){
                    $(".nodata1").show();
                }else{
                    $(".nodata1").hide();
                }
            }
            if(data.pages == 0){
                $("#myPage1").hide();
                return;
            }else{
                $("#myPage1").show();
            }
            $("#myPage1").sPage({
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
                    volunteer.getZyshdData(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 选项卡2请求分页
youth.getjyzpData = function(url,nPage,searchObj,searchTime){
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

    $.templates('tmlJyzpList', '#jyzpList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            
            var data = result.body.pageInfo;
            var template = $.render.tmlJyzpList(data);
            $(".tab2").find('.recruit-pro').html(template);
            if(data.list.length <= 12){
                if(data.total == 0){
                    $(".nodata2").show();
                }else{
                    $(".nodata2").hide();
                }
            }
            if(data.pages == 0){
                $("#myPage2").hide();
                return;
            }else{
                $("#myPage2").show();
            }
            $("#myPage2").sPage({
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
                    youth.getjyzpData(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 选项卡3请求分页
youth.getqnrcData = function(url,nPage,searchObj,searchTime){
    var params = {
        pageNum: nPage,
        pageSize: 9,
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

    $.templates('tmlQnrcList', '#qnrcList');
    $.ajax({
        type : "POST",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.pageInfo;
            var template = $.render.tmlQnrcList(data);
            $(".tab3").find('.talents-pro').html(template);
            if(data.list.length <= 9){
                if(data.total == 0){
                    $(".nodata3").show();
                }else{
                    $(".nodata3").hide();
                }
            }
            if(data.pages == 0){
                $("#myPage3").hide();
                return;
            }else{
                $("#myPage3").show();
            }
            $("#myPage3").sPage({
                page:nPage,//当前页码，必填
                total:data.total,//数据总条数，必填
	            pageSize:9,//每页显示多少条数据，默认10条
	            showTotal:true,//是否显示总条数，默认关闭：false
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
	            showSkip:true,//是否显示跳页，默认关闭：false
	            showPN:true,//是否显示上下翻页，默认开启：true
	            prevPage:"←",//上翻页文字描述，默认“上一页”
	            nextPage:"→",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                	//点击分页按钮回调函数，返回当前页码
                    youth.getqnrcData(url,page);
                }
            });
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}


// load加载完成
$(function(){
    youth.init();
})