layui.define(['element', 'form', 'common'], function(exports) {
	var common = layui.common,
		form = layui.form,
		element = layui.element;

	common.setDate('#Date');
	common.setTime('#Time');
	setInterval(function() {
		common.setDate('#Date')
	}, 60000);
	setInterval(function() {
		common.setTime('#Time')
	}, 1000);

	$('.layui-unselect').addClass('layui-bg-transparent');
	var nt_title = $('#nt-title').newsTicker({
		row_height: 30,
		max_rows: 1,
		duration: 5000,
		pauseOnHover: 0
	});

	exports('index', {});
});