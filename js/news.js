define(["jquery"], function($){
	function news(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`../data/news.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<li class="fans-itme">
								<a href=""><img src="${arr[i].img}" alt=""></a>
								<div class="fans-box">
									<div class="fans-title">
										<span class="fans-news">${arr[i].title}</span>${arr[i].desc}
									</div>
									<div class="fans-describe">${arr[i].describe}</div>
									<a href="" class="fans-details" target="_blank">${arr[i].details}</a>
								</div>
							</li>`).appendTo("#news");
					}	

				},
				error:function(error){
					console.log("加载数据失败");
				}
			})		
		})
	}
	return {
		news: news
	}
})
