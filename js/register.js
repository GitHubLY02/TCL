define(["jquery"], function($){
	function register(){
		$(function(){
			$("#username").blur(function(){
				if($("#username").val().length != 11){
					$("#username").next("span").html("请输入正确的手机号！");
					$("#username").val("");
					$("#password").val("");
				}else{
					var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
					if(!myreg.test($("#username").val())){
						$("#username").next("span").html("请输入正确的手机号！");
						$("#username").val("");
						$("#password").val("");
					}else{
						$("#username").next("span").html("输入正确！");
					}
				}
			})
			$("#password").blur(function(){
				if(!($("#password").val())){
					$("#password").next("span").html("");
				}else{
						/*if(/^\d+$/.test($("#password")) || /^[a-z]+$/.test($("#password")) || /^[A-Z]+$/.test($("#password"))){
								$("#password").next("span").html("强");
							}else if(/\d/.test($("#password")) && /[a-z]/.test($("#password")) && /[A-Z]/.test($("#password"))){
								$("#password").next("span").html("中");
							}else{
								$("#password").next("span").html("弱");
							}*/
							var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
							var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
							var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
							if (false == enoughRegex.test($(this).val())) { 
							  $("#password").next("span").html("弱");
							    //密码小于六位的时候，密码强度图片都为灰色 
							  } 
							  else if (strongRegex.test($(this).val())) { 
							  $("#password").next("span").html("强");
							    //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
							  } 
							  else if (mediumRegex.test($(this).val())) { 
							  $("#password").next("span").html("中");
							    //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
							  } 
							  else { 
							  $("#password").next("span").html("弱");
							    //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
							  } 

				}
			})
			
			
			
		})
	}
	return{
		register:register
	}
})