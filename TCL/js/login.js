define(["jquery"], function($){
	function login(){
		$(function(){
			$(".login-btn").click(function(){
				var str = `${oUsername.name}=${oUsername.value}&${oPassword.name}=${oPassword.value}`;

					//2、通过ajax发送数据到php页面
					ajax({
						method: 'post',
						url: "php/login.php",
						data: str,
						success: function(data){
							alert(data);
						},
						error: function(msg){
							alert(msg);
						}

					}) 
			})
			var oBtn = $("#btn");
			var oUsername = $("#username");
			var oPassword = $("#password");
				oBtn.click(function(){
					//登录
					//1、拿到输入框的数据  查询字符串  name1=value1&name2=value2
					var str = `${oUsername.attr("name")}=${oUsername.val()}&${oPassword.attr("name")}=${oPassword.val()}`;

					//2、通过ajax发送数据到php页面
					$.ajax({
						method: 'post',
						url: "php/login.php",
						data: str,
						success: function(data){
							alert(data);
							if(data == "登录成功"){
								window.location = "index.html";
							}
						},
						error: function(msg){
							alert(msg);
						}

					})
				})
		})
	}
	return{
		login:login
	}
})