define(["jquery","jquery-cookie"], function($){
	function banner(){
		$(function(){
			sc_car()
			//通过ajax下载数据
		/*	$.ajax({
				url:`data/banner.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>`).appendTo(".banner-content")
					}	

				},
				error:function(error){
					console.log("加载数据失败");
				}
			})*/

			function sc_car(){
				var cookieStr = $.cookie("goods");
				if(cookieStr){
					var arr = eval(cookieStr);
					var sum = 0; //求和数
					for(var i = 0; i < arr.length; i++){
						sum += arr[i].num;
					}
					$(".top-bar-right").find("li").eq(1).find("span").html(`(${sum})`);
				}else{
					$(".top-bar-right").find("li").eq(1).find("span").html(`(0)`);
				}

			}		
		})
	}
	return {
		banner: banner
	}
})
