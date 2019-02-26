define(["jquery"], function($){
	function login(){
		$(function(){
			$(".login-btn").click(function(){
				var str = `${oUsername.name}=${oUsername.value}&${oPassword.name}=${oPassword.value}`;

					//2、通过ajax发送数据到php页面
					ajax({
						method: 'post',
						url: "../php/login.php",
						data: str,
						success: function(data){
							alert(data);
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