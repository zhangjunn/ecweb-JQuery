var ssoCodeUrl = "http://tyrztest.gd.gov.cn/tif/sso/connect/page/oauth2/authorize";
var ssoTokenUrl = "http://tyrztest.gd.gov.cn/tif/sso/connect/page/oauth2/access_token";
var ssoUserUrl = "http://tyrztest.gd.gov.cn/tif/sso/connect/page/oauth2/tokeninfo";
var client_id = "zwfwtest01";		//申请的ID
var client_secret = "1qazzaq1";	//申请的密码
var service = "initService";
var scope  = "all";
var response_type = "code";
var redirect_uri = "";
var grant_type = "authorization_code";

var jwtCookieName = "ECWEB-JWTSSO-TOKEN";
var serviceUrl = "http://127.0.0.1:8848/ecweb/index.html";

/**
 * 获取返回的参数
 */
function getQueryVariable(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
   }
   return null;
}
/**
 * 跳转原来页面
 */
function jumpOrign(){
	window.location.href = orignUrl;
}
/**
 * 跳转统一认证平台登陆
 */
function ssoLogin(flag){
	//判断是否有登陆
	var cookie = $.cookie(jwtCookieName);
	if(cookie != null){
		//其他操作
	}else{
		//跳转登陆
		if(flag == 1){
			$.cookie("ssoUrlBack",window.location.href);
		}
		/* var toUrl = ssoCodeUrl+"?service="+service+"&response_type="+response_type
			+"&client_id="+client_id+"&scope="+scope+"&redirect_uri="+backUrl;
		window.location.href = toUrl; */
		checkUserInfo();
	}
}

/**
 * 获取token
 */
function ssoGetToken(code){
	var param = {};
	param.client_id = client_id;
	param.client_secret = client_secret;
	param.code = code;
	param.scope = scope;
	param.redirect_uri = backUrl;
	param.grant_type = "authorization_code";
	//var url = ssoTokenUrl+"?client_id="+client_id+"&code="+code+"&scope="+scope+"&redirect_uri="+ssoBackUrl+"&grant_type="+grant_type;
	//window.location.href = url;
	$.ajax({
		url:ssoTokenUrl,
		type:"get",
		dataType:"json",
		data:param,
		success:function(data){
			console.log(data);
			//ssoGetUserInfo(data.access_token);
		},
		error:function(e){
			//console.log(e);
		}
	})
}

/**
 * 获取人员信息
 */
function ssoGetUserInfo(token){
	var param = {};
	param.access_token = token;
	$.ajax({
		url:ssoUserUrl,
		type:"get",
		dataType:"json",
		data:param,
		success:function(data){
			ssoGetUserInfo(data);
		},
		error:function(e){
			console.log(e);
		}
	})
}
/**
 * 检查本地账号是否存在
 */
function checkUserInfo(){
	//console.log(data);
	var data = {};
	data.useridcode = '1234';
	data.uid = 'cs00';
	data.telephonenumber = '123';
	data.cn = '测试';
	data.sex = '1';
	data.area = 'THQ';
	data.mail = '1@qq.com';
	data.idcardnumber = '104';
	data.idcardtype = '1';
	$.ajax({
		url:APIGATEWAY+"/gqt/login",
		type:"post",
		dataType:"json",
		data:data,
		success:function(response){
			console.log(response);
			//$cookies[jwtCookieName] = response.data[jwtCookieName];
			//console.log(response.jwtCookieName);
			//$.cookie(jwtCookieName,response[jwtCookieName],{path: '/'});
			document.cookie = 'ECWEB-JWTSSO-TOKEN=' + response[jwtCookieName] + ';path=/';
			$.cookie("userId",response.user.id);
			$.cookie("userName",'cs');
			jumpOrign();
			checkBbsUser(data.useridcode,data.cn);
		},
		error:function(e){
			console.log(e);
		}
	})
}
/**
 * 检查bbs会员信息
 */
function checkBbsUser(id,name){
	var data = {};
	data.id = id;
	data.name = name;
	data.sysCode = "ecyoa";
	data.sysName = "广州共青团";
	data.orgCode = "plat";
	data.orgName = "广州共青团";
	$.ajax({
		url:APIGATEWAY+"/bbs/login",
		type:"post",
		dataType:"json",
		data:data,
		success:function(response){
		},
		error:function(e){
		}
	})
}

/**
 * 退出登陆
 */
function ssoLogout(){
	$.removeCookie(jwtCookieName,{path: '/'});
}