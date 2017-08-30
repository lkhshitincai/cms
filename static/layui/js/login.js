layui.define(['form', 'common'], function(exports) {
	var form = layui.form,
		common = layui.common;

	form.on('submit(login_form)', function(data) {
		location.href = "index.html";
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
//          			common.msgError(result.msg);
//          		}
//          	}
//          });
		return false;
	});
	exports('login', {});
});