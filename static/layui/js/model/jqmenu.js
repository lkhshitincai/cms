/*
 * @Author: Paco
 * @Date:   2017-03-12
 * @lastModify 2017-05-08
 * +----------------------------------------------------------------------
 * | jqadmin [ jq酷打造的一款懒人后台模板 ]
 * | Copyright (c) 2017 http://jqadmin.jqcool.net All rights reserved.
 * | Licensed ( http://jqadmin.jqcool.net/licenses/ )
 * | Author: Paco <admin@jqcool.net>
 * +----------------------------------------------------------------------
 */

layui.define(['laytpl', 'jqajax', 'form', 'layer', 'jqelem', 'tabmenu'], function(exports) {
	var $ = layui.jquery,
		tpl = layui.laytpl,
		element = layui.jqelem(),
		layer = layui.layer,
		jqajax = layui.jqajax,
		form = layui.form,
		init = true,
		tabmenu = layui.tabmenu(),
		jqmenu = function() {
			this.options = {
				showIcon: true
			}
		};

	/**
	 *@todo 初始化数据
	 */
	jqmenu.prototype.init = function(tplid) {
		var ajax = new jqajax(),
			options = ajax.params($(tplid), this.options),
			_this = this;
		_this.options = options;
		tabmenu.set(options);
		tabmenu.init();
		ajax.complete = function(ret, options) {
			if(ret.status == 200) {
				ret.data.showIcon = options.showIcon;
				_this.render(ret.data, tplid);
			} else {
				layer.msg("获取菜单数据失败")
			}

		}
		ajax.ajax(options);
		this.openOldMenu();
	}

	/**
	 * 将tabmenu类附到jqmenu上，方法tab的接口调用与重写
	 */
	jqmenu.prototype.tabmenu = tabmenu;

	/**
	 *@todo 数据绑定到模板视图
	 *@param json data 后台取得的数据
	 */
	jqmenu.prototype.render = function(data, tplid) {

		var _this = this;
		if("" != data || undefined != data) {
			//加载菜单数据
			var getTpl = $(tplid).html();
			tpl(getTpl).render(data, function(html) {
				$('#submenu').html(html);
			});
			//加载快速前往数据
			getTpl = $("#search-list-tpl").html();
			tpl(getTpl).render(data, function(html) {
				$('#searchList').html(html);
				form.render();
				$('.layui-unselect').addClass('layui-bg-transparent');
			});
		}

		_this.resize();
		_this.menuBind();
		element.init();
		_this.menuShowType();
	}

	/**
	 *@todo 自适应窗口
	 */
	jqmenu.prototype.resize = function() {
		$(window).on('resize', function() {
			tabmenu.init();
			tabmenu.tabMove(0, 1);
			if($("body").width() > 750) {
				$('#menuDiv').removeClass('layui-bg-black').addClass('layui-bg-transparent');
			}
		}).resize();
	}

	/**
	 *@todo 初始化菜单 
	 */
	jqmenu.prototype.menuBind = function() {
		var _this = this;

		//绑定左侧树菜单的单击事件
		$('#submenu .layui-nav-item, .menu-list li').bind("click", function() {
			var obj = $(this);

			$('.menu-list').slideUp();

			if(obj.find('dl').length > 0) {
				if(obj.attr('data-bind') == 1) {
					return;
				}
				obj.attr('data-bind', '1');
				obj.find('dd').bind("click", function() {
					_this.menuSetOption($(this));
				});
			} else {
				_this.menuSetOption(obj);
			}
		});

		//绑定更多按钮事件
		$('.tab-move-btn').bind("click", function() {
			var show = $('.menu-list').css('display');
			if(show == "none") {
				_this.menulist();
				$('.menu-list li').bind("click", function() {
					_this.menuSetOption($(this));
				});
				$('.menu-list').slideDown();
			} else {
				$('.menu-list').slideUp();
			}
		})

		//绑定快速导航事件按钮
		form.on('select(search)', function(data) {
			var _opt = data.elem.selectedOptions[0];
			if(_opt.value) {
				_this.menuOpen({
					href: _opt.value,
					icon: $(_opt).data('icon'),
					title: _opt.innerHTML
				});
			}

		});
		//禁止双击选中
		$('span.move-left-btn,span.move-right-btn').bind("selectstart", function() {
			return false;
		});

	}

	/**
	 *@todo 设置菜单项
	 */
	jqmenu.prototype.menuSetOption = function(obj) {
		var $a = obj.children('a'),
			href = $a.data('url'),
			icon = $a.children('i:first').data('icon'),
			title = $a.data('title'),
			data = {
				href: href,
				icon: icon,
				title: title
			}
		this.menuOpen(data);
	}

	/**
	 *@todo 打开菜单项
	 */
	jqmenu.prototype.menuOpen = function(data) {
		tabmenu.tabAdd(data, this.options.fresh);
	}

	/**
	 * 刷新后打开原打开的菜单
	 */
	jqmenu.prototype.openOldMenu = function() {
		element.on('tab(tabmenu)', function() {
			var layId = $(this).attr("lay-id");

			$('.menu-list').slideUp();
			var data = {
				layId: layId
			}
			if(!init) {
				tabmenu.storage(data, "change");
			}

			if($(this).attr("fresh")) {
				$(this).removeAttr("fresh");
				tabmenu.fresh(layId);
			}

		});
		var sStorage = window.sessionStorage;
		var explorer = navigator.userAgent;
		if(sStorage.menu) {
			var menulist = sStorage.menu;
			menulist = menulist.split("|");
			for(index in menulist) {
				if(index == "remove") {
					continue;
				}
				if(typeof menulist[index] === 'string') {
					var menu = JSON.parse(menulist[index]);

				}

				menu.nodo = true;

				if(explorer.indexOf("Firefox") >= 0) {
					menu.old = true;
				}
				this.menuOpen(menu);
			}
		}
		if(sStorage.curMenu && sStorage.curMenu != "undefined") {
			var menu = sStorage.curMenu;
			if(typeof menu === 'string') {
				menu = JSON.parse(menu);
			}
			if(explorer.indexOf("Firefox") >= 0) {
				menu.old = true;
			}
			this.menuOpen(menu);
		}
		init = false;
	}

	jqmenu.prototype.menulist = function() {

		var storage = window.sessionStorage,
			menulist = storage.menu;
		if(menulist) {
			var menulist = menulist.split("|"),
				list = [],
				data = {};

			for(index in menulist) {
				if(index == "remove") {
					continue;
				}
				if(typeof menulist[index] === 'string') {
					var menu = JSON.parse(menulist[index])
				}

				list.push(menu);
			}
			data.list = list;
			if("" != data || undefined != data) {
				var getTpl = $('#menu-list-tpl').html();
				tpl(getTpl).render(data, function(html) {
					$('#menu-list').html(html);
				})
			}
		}
	}

	jqmenu.prototype.menuShowType = function() {

		var locationShowType = layui.data('showType');
		var showType = locationShowType.moveType ? locationShowType.moveType : 2;

		var bar = $('.jqamdin-left-bar'),
			_this = this,
			minWidth = 50,
			maxWidth = 160;

		switch(showType) {
			case 1:
				$('.jqadmin-body').animate({
					left: minWidth
				});
				bar.animate({
					width: minWidth
				});
				$('.jqadmin-foot').animate({
					left: minWidth
				});
				$('#submenu').find("span").hide();
				$('#submenu').find("ul li").css("width", minWidth).css("padding-left", "0");
				$('#submenu').find("ul li").find("a").css("padding-left", "4px").find('i').css("font-size", "14px");
				$('#submenu').find("ul li dd a").css("padding-left", "0").find('i').css("font-size", "12px");
				$('#submenu').find("ul li dl dd").css("text-indent", "8px");
				$('#submenu').find("ul li").find("a").on('mouseenter', function() {
					layer.tips($(this).data("title"), $(this));
				});

				if(!_this.options.showIcon) {
					$('#submenu').find('i').removeClass("hide-icon");
				}
				break;
			default:
				$('.jqadmin-body').animate({
					left: maxWidth
				});
				bar.animate({
					width: maxWidth
				});
				$('.jqadmin-foot').animate({
					left: maxWidth
				});
				$('#submenu,.tab-menu').find("span").show();
				$('#submenu').find("ul li").css("width", maxWidth).find("a").css("padding-left", "10px").find('i').css("font-size", "16px");
				$('#submenu').find("ul li dd a").css("padding-left", "0").find('i').css("font-size", "14px");
				$('#submenu').find("ul li").find("a").off('mouseenter');
				if(!_this.options.showIcon) {
					$('#submenu').find('i').addClass("hide-icon");
				}
				$('#submenu').find("ul li dl dd").css("text-indent", "20px");
				break;
		}
	}

	exports('jqmenu', jqmenu);
});