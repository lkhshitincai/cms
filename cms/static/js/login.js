layui.config({
	base: '../static/js/model/',
	version: new Date().getTime()
}).use(['form', 'user'], function() {
	var form = layui.form,
		user = layui.user;
	//监听提交
	form.on('submit(login_form)', function(data) {
		user.login('login_form');
		return false;
	});
});