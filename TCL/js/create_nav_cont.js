$(function(){
	var aBtn = $(".bannerBox").find(".banner-nav").find("bannner-navgation").find("ul").find("li");
	var oUl = $(".bannerBox").find(".banner-nav").find("bannner-navgation").find(".ban-nav-box").find("ban-nav-cont").find(".cont").find("li");
	for(var i = 0; i <aBtn.length; i++){
		$(aBtn[i]).click(function(){
			var i = i;
			getList();
		})
	}
	function getList(i){
		ajax({
			url:"data_nav.json",
			success:function(arr){
				for(var j = 0; j <arr.length; j++){
					if(j = i){
						//创建li标签
						var obj = arr[i];
						for(var attr in obj){
							$(`<li>
								<a href=""><img src="${obj[attr].img}" alt="">
										<div><p>${obj[attr].p}</p><button>${obj[attr].b}</button></div>
								</a>
							</li>`).appendTo(oUl)
						} 
						
					}
				}
			},
			error:function(error){
				alert("请求数据失败");
			}
		})
	}

})