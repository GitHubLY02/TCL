$(function(){
	var aBtns = $(".headerBox").find(".header").find(".nav").find(".nav-content").find(".nav-left").find("div");
	var oUl = $(".menu-list").find("ul");
	var oDiv = $(".headerBox").find(".header").find(".nav").find(".menu-list");
	for(var i = 0; i <aBtns.length; i++){
		aBtns[i].index = i;	
	}

	function getLi(index){
			$.ajax({
				url:`../data/data_nav.json`,
				success:function(arr){
					// alert(index);
					// alert(arr);
					for(var i = 0; i < arr.length; i++){
						// oDiv.attr("display","none");
						if(i == (index - 1)){
							var arr1 = arr[i].desc;
							// alert(arr1);
							
							for(var j = 0; j < arr1.length; j++){
								// alert(arr1[j].title)
								// oDiv.attr("display","block");
								$(`
									<li>
										<img src="${arr1[j].img}" alt="">
										<p class="m_tit">${arr1[j].title}</p>
										<p class="red">${arr1[j].pice}</p>
									</li>`).appendTo(oUl);
							}
						}
					}
					
				},
				error:function(error){
					console.logo("加载数据失败");
				}

			})
		}
})
define(["jquery"], function($){
	function tabSwitch(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`../data/data_nav.json`,
				success:function(arr){
					// alert(index);
					// alert(arr);
					for(var i = 0; i < arr.length; i++){
						// oDiv.attr("display","none");
						if(i == (index - 1)){
							var arr1 = arr[i].desc;
							// alert(arr1);
							
							for(var j = 0; j < arr1.length; j++){
								// alert(arr1[j].title)
								// oDiv.attr("display","block");
								$(`
									<li>
										<img src="${arr1[j].img}" alt="">
										<p class="m_tit">${arr1[j].title}</p>
										<p class="red">${arr1[j].pice}</p>
									</li>`).appendTo(oUl);
							}
						}
					}
					
				},
				error:function(error){
					console.logo("加载数据失败");
				}

			})
			//实现选项卡操作 通过事件委托
			$("#div1").on("mouseover", "button", function(){
				//取消所有button的class样式
					$("#div1").find("button").attr("class", "");
					$("#div1").find("div").css("display", "none")
					.eq($(this).index()).css("display", "block");

					//将当前被点击按钮变成选中的
					$(this).attr("class", "active");
			})
		})
	}
	return {
		tabSwitch: tabSwitch
	}
})