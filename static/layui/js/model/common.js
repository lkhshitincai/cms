/** common.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.define(['layer'], function(exports) {
	"use strict";

	var $ = layui.jquery,
		layer = layui.layer,
		weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

	var common = {
		/**
		 * 抛出一个异常错误信息
		 * @param {String} msg
		 */
		throwError: function(msg) {
			throw new Error(msg);
		},
		/**
		 * 弹出一个错误提示
		 * @param {String} msg
		 */
		msgError: function(msg) {
			layer.msg(msg, {
				icon: 5
			});
		},
		/**
		 * 提示信息
		 * @param {Object} msg
		 */
		msgSuccess: function(msg){
			layer.msg(msg,{
				icon:1
			});
		},
        /**
		 * 获取url参数值
		 * @param {String}key
         */
        getQueryString:function(key){
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
		},
		/**
		 * 设置年月日
		 * @param {String} target
		 */
		setDate:function(target){
			var newDate = new Date();
			$(target).html(newDate.getFullYear() + '年' + (newDate.getMonth() + 1) + '月' + newDate.getDate() + '日  ' + weekDay[newDate.getDay()]);
		},
		/**
		 * 设置时间
		 * @param {Object} target
		 */
		setTime:function(target){
			var newDate = new Date();
			$(target).html(newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds()+' '+(newDate.getHours()<12?'AM':'PM'));
		}
	};
	exports('common', common);
});