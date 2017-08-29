layui.define(['form', 'user'], function(exports) {
	var form = layui.form,
		user = layui.user;
		
	form.on('submit(login_form)', function(data) {
		user.login('login_form');
		return false;
	});
	exports('login', {});
});