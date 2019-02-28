define(["jquery"], function($){
	function leftNav(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`data/leftnav.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
							$(`<div id="nav-c${i}" class="ban-nav-cont"></div>`).appendTo(".ban-nav-box");
							var arr1 = arr[i].desc;
							var i = i;
							for(var j = 0; j < arr1.length; j++){
								$(`<div>
										<a href=""><img src="${arr1[j].img}" alt="">
											<div class="cont"><p>${arr1[j].title}</p><button>立即购买</button></div>
										</a>
									</div>	`).appendTo($(".ban-nav-box").find("#nav-c"+i));								
							}
					}	
				},
				error:function(error){
					console.log("加载数据失败");
				}

			})
			//实现选项卡操作 通过事件委托
			$(".ban_ul").on("mouseover", "li", function(){
				//取消所有button的class样式
					var  kind = $(this).index();
					// alert(kind)
					$(".ban-nav-box").find(".ban-nav-cont").css("display", "none");
					$(".ban-nav-box").find(".ban-nav-cont").eq(kind).css("display", "none");
					$(".ban-nav-box").find(".ban-nav-cont").css("display", "none");
					$(".ban-nav-box").css("display", "block");
					$(".ban-nav-box").find(".ban-nav-cont").eq(kind).css("display", "block");
					$(".ban-nav-box").find(".ban-nav-cont").eq(kind).find("div").css("display", "block");
				
			})
			$(".ban_ul").on("mouseout", "li", function(){
				$(".ban-nav-box").find(".ban-nav-cont").css("display", "none");
				$(".ban-nav-box").find(".ban-nav-cont").find("div").css("display", "none");				
			})
		})
	}
	return {
		leftNav: leftNav
	}
})
