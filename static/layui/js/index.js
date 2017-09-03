layui.define(['element', 'common', 'jqmenu'], function(exports) {
	var common = layui.common,
		element = layui.element,
		menu = layui.jqmenu,
		mainMenu = new menu();
	jqIndex = function() {};

	/**
	 *初始化方法
	 */
	jqIndex.prototype.init = function() {

		mainMenu.init('#submenu-tpl',{icon:true,fresh:false});
		this.showMenu();
		this.showMenuMobile();
		this.initDateAndTime();
		this.initWeather();
		this.initNewsTicker();
	}
	/**
	 * 初始化轮播插件
	 */
	jqIndex.prototype.initNewsTicker = function(){
		var nt_title = $('#nt-title').newsTicker({
			row_height: 30,
			max_rows: 1,
			duration: 5000,
			pauseOnHover: 0
		});
	}
	/**
	 * 初始化时间
	 */
	jqIndex.prototype.initDateAndTime = function(){
		common.setDate('#Date');
		common.setTime('#Time');
		setInterval(function() {
			common.setDate('#Date')
		}, 60000);
		setInterval(function() {
			common.setTime('#Time')
		}, 1000);
	}
	/**
	 * 加载天气信息
	 */
	jqIndex.prototype.initWeather = function(){
		tpwidget("init", {
			"flavor": "slim",
			"location": "WX4FBXXFKE4F",
			"geolocation": "enabled",
			"language": "auto",
			"unit": "c",
			"theme": "chameleon",
			"container": "tp-weather-widget",
			"bubble": "enabled",
			"alarmType": "badge",
			"color": "#FFFFFF",
			"uid": "U41C5B006E",
			"hash": "5f750df6e383777549478801d17f81fd"
		});
		tpwidget("show");
	}
	/**
	 * 适配手机端
	 */
	jqIndex.prototype.showMenuMobile = function() {
		//手机设备的简单适配
		var treeMobile = $('.site-tree-mobile'),
			shadeMobile = $('.site-mobile-shade')

		treeMobile.on('click', function() {
			$('body').addClass('site-mobile');
			$('#menuDiv').removeClass('layui-bg-transparent').addClass('layui-bg-black');
		});

		shadeMobile.on('click', function() {
			$('body').removeClass('site-mobile');
		});
	}
	/**
	 *绑定左侧菜单显示隐藏按钮单击事件
	 */
	jqIndex.prototype.showMenu = function() {
		$('.hideMenu').bind("click", function() {
			var locationShowType = layui.data('showType');
			var showType = locationShowType.moveType ? locationShowType.moveType == 1 ? 2 : 1 : 2;
			layui.data('showType', {
				key: 'moveType',
				value: showType
			});
          	mainMenu.menuShowType();
		})
	}
	var index = new jqIndex();
	index.init();
	exports('index', {});
});