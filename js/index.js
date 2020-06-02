/* 
    首页脚本
*/
var homeObj = {}
homeObj.init = function(){
    var oDataUrl = {
        newsTab1:'/gqt/mh/qnsc/getMhQnsc',
        newsTab2: '/gqt/mh/articlemh/getByLb',
        zysListData: '/gqt/mh/zys/getZysMhInfo',//志愿时
        qcListData: '/gqt/mh/qc/getQcMhInfo',
        uyyData: '/gqt/mh/uyy/getById',
        uyyListData:'/gqt/mh/uyy/getUyyMhInfo',
        forumBriskUser: '/gqt/mh/bbsHyyh/getBbsHyyh',
        hotBBs: '/gqt/mh/bbs/getBbs'
    }
    homeObj.events();
    homeObj.bannerAnimate();
    homeObj.getHomeNewsData1(oDataUrl.newsTab1);
    homeObj.getHomeNewsData2(oDataUrl.newsTab2);
    homeObj.getZysListData(oDataUrl.zysListData);
    homeObj.getQcListData(oDataUrl.qcListData);
    homeObj.getUyyListData(oDataUrl.uyyListData);
    homeObj.getRollNews(oDataUrl.newsTab1);
    homeObj.getForumBriskUser(oDataUrl.forumBriskUser);
    homeObj.getHotBBs(oDataUrl.hotBBs);
}

// home事件
homeObj.events = function(){
    homeObj.headNewsToggle();
}

// news toggle
homeObj.headNewsToggle = function(){
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

// 焦点图特效
homeObj.bannerAnimate = function(){
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        loop : true,
        autoplay : 5000,
        autoplayDisableOnInteraction : false,
    })
}

// 获取 news
homeObj.getHomeNewsData1 = function(url){
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
            console.log(result);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

homeObj.getHomeNewsData2 = function(url){
    var params = {
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.articleList;
            var html = $("#news-tab2").render(data);
            $(".news").find('.news-list').eq(1).html(html);
            console.log(result);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
// 获取志愿时数据
homeObj.getZysListData = function(url){
    var  params = {
        countNumber: 4
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body;
			console.log('222',data)
            var voHtml = $("#zyzMsg").render(data.zysVo);
            var listHtml = $("#zysList").render(data.zysHdList);
            $(".column1").find('.text-info').html(voHtml);
            $('.column1').find('.img-list').prepend(listHtml);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

// 获取青创汇数据
homeObj.getQcListData = function(url){
    var  params = {
        countNumber: 4
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body;
            var voHtml = $("#qcMsg").render(data.qcVo);
            var listHtml = $("#qchList").render(data.qcJycyList);
            $('.column2').find('.text-info').html(voHtml);
            $('.column2').find('.img-list').prepend(listHtml);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

// 获取u友缘数据
homeObj.getUyyListData = function(url){
    var  params = {
        countNumber: 2
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body;
            // var data = result.body.uyyHdMhList;
			console.log('data',data);
            var voHtml = $("#uuyMsg").render(data.uyyVo);
            var listHtml = $("#uuyList").render(data.uyyHdMhList);
            $('.column3').find('.text-info').html(voHtml);
            $('.column3').find('.img-list').prepend(listHtml);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

// 获取团务资讯
homeObj.getRollNews = function(url){
    var params = {
        lxs: '通知公告;文件资料;部门工作;直属单位快讯'
    }
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        data : params,
        success : function(result) {
            var data = result.body.qnsc;
            var tzgg,wjzl,bmgz,zsdwkx,tzggobj = null,wjzlobj = null,bmgzobj = null,zsdwkxobj = null;
            for(var i=0;i<data.length;i++){
                if(data[i][0].lx === '通知公告'){
                    tzgg = data[i];
                }else if(data[i][0].lx === '文件资料'){
                    wjzl = data[i];
                }else if(data[i][0].lx === '部门工作'){
                    bmgz = data[i];
                }else if(data[i][0].lx === '直属单位快讯'){
                    zsdwkx = data[i];
                }
            }
            if(tzgg.length>3){
                tzgg.length = 3;
            }
            if(wjzl.length>3){
                wjzl.length = 3;
            }
            if(bmgz.length>3){
                bmgz.length = 3;
            }
            if(zsdwkx.length>3){
                zsdwkx.length = 3;
            }
            tzggobj = {
                tzgg:tzgg
            };
            wjzlobj = {
                wjzl: wjzl
            }
            bmgzobj = {
                bmgz: bmgz
            }
            zsdwkxobj = {
                zsdwkx: zsdwkx
            }
            var dzggHtml = $("#tzggList").render(tzggobj);
            var wjzlHtml = $("#wjzlList").render(wjzlobj);
            var bmgzHtml = $("#bmgzList").render(bmgzobj);
            var zsdwkxHtml = $("#zsdwkxList").render(zsdwkxobj);
            var renderTarget = $('.column4').find('.news').find('ul');
            renderTarget.append(dzggHtml);
            renderTarget.append(wjzlHtml);
            renderTarget.append(bmgzHtml);
            renderTarget.append(zsdwkxHtml);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

// 获取论坛活跃用户
homeObj.getForumBriskUser = function(url){
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        success : function(result) {
            var data = result.body.bbsHyyhList;
            if(data.length>4){
                data.length = 4;
            }
            var html = $("#forumBriskUser").render(data);
            $('.column5').find('.user-list').append(html);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

// 获取论坛活热帖
homeObj.getHotBBs = function(url){
    $.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : APIGATEWAY + url,
        success : function(result) {
            var data = result.body.bbsList;
            if(data.length > 9){
                data.length = 9;
            }
            var html = $("#hotBBs").render(data);
            $('.column5').find('.forum-right').find('ul').html(html)
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

$(function(){
    homeObj.init();
})

