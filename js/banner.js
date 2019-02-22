define(["jquery"], function($){
	function banner(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`../data/banner.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>`).appendTo(".banner-content")
					}	

				},
				error:function(error){
					console.log("加载数据失败");
				}
			})		
		})
	}
	return {
		banner: banner
	}
})
