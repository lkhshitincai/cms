layui.define(['layer','common'], function(exports) {
	"use strict";

	var $ = layui.jquery,
		common = layui.common;

	var user = {
        login:function(_form){
        	location.href="index.html";
//          $.ajax({
//          	type:"post",
//          	url:"",
//          	beforeSend:function(){
//          		
//          	},
//          	error:function(a,b,c){
//          		common.msgError(b);
//          	},
//          	success:function(result){
//          		if(result.success){
//          			location.href="index.html";
//          		}else{
//          			common.msgError(b);
//          		}
//          	}
//          });
		}
	};
	exports('user', user);
});