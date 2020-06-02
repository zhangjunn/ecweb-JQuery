
// 接口地址调用，挂载window下
// var APIGATEWAY = 'http://192.168.1.107:8071/ecweb';
//var APIGATEWAY = 'http://192.168.1.205:8091/ecweb'
var APIGATEWAY = 'http://192.168.1.194:8091/ecweb'
// date format
Date.prototype.format = function(fmt){
    var o = {
        "M+": this.getMonth()+1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds()
    }
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        }
    }
    return fmt;
}

// 头部底部公共对象
var commonality = {};
commonality.init = function(){
    commonality.event();
}

commonality.event = function(){
    commonality.weChatToggle();
}
commonality.weChatToggle = function(){
    var weCharBtn = $('.r-linkbox').find('li').eq(0);
    var weCharCode = $('.r-linkbox').find('.wechat_code');

    weCharBtn.bind('click',function(){
        if(weCharCode.is(':hidden')){
            weCharCode.fadeIn();
        } else{
            weCharCode.fadeOut();
        }
        return false;
    })

    $(document).bind('click',function(){
        weCharCode.fadeOut();
    })
}

$(function(){
    commonality.init();
})  
var dialogMenuIndex = 0; //编辑弹出框 左侧菜单选中下标
var curEditLayout = null; //当前点击编辑的布局模块；
var curEditId = ''; //当前点击编辑的布局模块的id；
var curModuleId = '';     //当前点击编辑的布局模块的id；
var curTypeStr = '';     //当前模板类型；
var pageMoldOptions = [];   //页面中已添加的模块信息；
var orgCode = "plat:"; //单应用机构代码
var sysCode = "ecycms"; //登录系统代码,登录主系统不需要指定
var userInfo = getUserInfo();
$.ajaxSetup({crossDomain: true, xhrFields:{withCredentials:true}});

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function getUserInfo() {
	var jwtStr = getCookie('ECWEB-JWTSSO-TOKEN');
	var userInfo = null;
	if(jwtStr){
		jwtStr = b64DecodeUnicode(jwtStr.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'));
		try{
			userInfo = JSON.parse(jwtStr);
		}catch(e){
			console.error(e);
			//jwtStr后面有两个空格会导致解析报错，截取之后可以正常解析
			userInfo = JSON.parse(jwtStr.substr(0,jwtStr.length-2));
		}
	}
	return userInfo;
}
// js生产uuid方法
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "";

	var uuid = s.join("");
	return uuid;
}

//判断pc端和移动端
function checkDevice() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			return 1;  //phone
	} else {
			return 0; //pc
	}
}
//获取url中？后面的参数 
function getUrlParam (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
 }

/**
 * 动态载入弹窗内容js
 * @param js 的脚本路径， 要写绝对路径（起始位置用 ${prefix} 代替)
 * @param fn 回调；
 *  */
function loadJS(js, fn) {
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = js;
	if (oScript.addEventListener) {
		oScript.addEventListener('load', function () {
		  typeof fn === 'function' && fn();
		}, false);
	} else if (oScript.attachEvent) {
		oScript.attachEvent('onreadystatechange', function () {
		  var target = window.event.srcElement;
		  if (target.readyState == 'loaded') {
			typeof fn === 'function' && fn();
		  }
		});
	}
	document.body.appendChild( oScript);
}