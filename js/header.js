$(function(){
	var aBtns = $(".headerBox").find(".header").find(".nav").find(".nav-content").find(".nav-left").find("div");
	var oUl = $(".headerBox").find(".header").find(".nav").find(".menu-list").find("ul");
	var oDiv = $(".headerBox").find(".header").find(".nav").find(".menu-list");
	for(var i = 0; i <aBtns.length; i++){
		aBtns[i].index = i;	
		aBtns[i].onmouseover = getLi(i);
	}

	function getLi(index){
		// $(this).find("a").attr("class","active");

		return function(){
			$.ajax({
				url:`../data/data_nav.json`,
				success:function(arr){
					// alert(index);
					// alert(arr);
					for(var i = 0; i < arr.length; i++){
						oDiv.attr("display","none");
						if(i == (index - 1)){
							var arr1 = arr[i].desc;
							// alert(arr1);
							
							for(var j = 0; j < arr1.length; j++){
								// alert(arr1[j].title)
								oDiv.attr("display","block");
								$(`
									<li>
										<img src="${arr1[j].img}" alt="">
										<p class="m_tit">${arr1[j].title}</p>
										<p class="red">${arr1[j].pice}</p>
									</li>`).appendTo(oDiv)
							}
						}
					}
					
				},
				error:function(error){
					console.logo("加载数据失败");
				}

			})
		}
	}
})
/*<div class="menu-list" style="height: 210px; overflow: hidden; display: none;">
						<ul>
							<li>
								<img src="images/banner/header/tv0.jpg" alt="">
								<p class="m_tit">65Q1 65英寸哈曼卡顿剧院电视</p>
								<p class="red">4799.00元</p>
							</li>
						</ul>
					</div>*/