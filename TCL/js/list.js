define(["jquery"], function($){
	function list(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`data/list.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						var i = i;
						$(`<div class="c_series series${i}" id="${i}">
								<div class="clear">
									<h2>${arr[i].title}</h2>
									<ul></ul>
									<a href="" id="more">${arr[i].more}<i class="iconfont">${arr[i].iconfont}</i></a>
								</div>
								<div class="series-content">
									<div class="sec-left">
										<a href=""><img src="${arr[i].img}" alt=""></a>
									</div>
									<div class="sec-right">
									</div>
								</div>
							</div>`).appendTo(".series");
						var arr1 = arr[i].nav;
						for(var j = 0; j <arr1.length; j++){
							$(`<li><a href="">${arr1[j]}</a></li>`).appendTo($(".series").find(".series" + i).find("ul"));
						}
						var arr2 = arr[i].desc;
						for(var k = 0; k < arr2.length; k++){
							$(`<div><a>
										<img src="${arr2[k].img}" alt="">
										<p class="caption">${arr2[k].title}</p>
										<p class="dice">${arr2[k].introduce}</p>
										<p class="price">${arr2[k].price}</p>
									</a>
								</div>`).appendTo($(".series").find(".series" + i).find(".sec-right"));
						}
					}	

				},
				error:function(error){
					console.log("加载数据失败");
				}
			})		
		})
		$(".series").on("click",".c_series",function(){
			var id =this.id;
			// alert(id);
			/*$.ajax({
					method: 'get',
					url: "../index.html",
					data: `${id}`,
					success: function(data){
						alert(data);
					},
					error: function(msg){
						alert(msg);
					}

			}) */
			$(location).attr("href",`product.html?id=${id}`);
		})

		$(window).scroll(function(){
				var t = $(window).scrollTop();
				if(t < 790){
					$(".float_nav").css("display","none");
				}else{
					var t = t - 790;
					$(".float_nav").css("display","block");
				}
		})

		$(".float_nav").on("click","li",function(){
				if($(this).index() == 0){
					$("html, body").animate({
				      scrollTop: $(".series0").offset().top });
				    return false;
				}
				if($(this).index() == 1){
					$("html, body").animate({
				      scrollTop: $(".series1").offset().top });
				    return false;
				}
				if($(this).index() == 2){
					$("html, body").animate({
				      scrollTop: $(".series2").offset().top });
				    return false;
				}
				if($(this).index() == 3){
					$("html, body").animate({
				      scrollTop: $(".series3").offset().top });
				    return false;
				}
			})


	}
	return {
		list: list
	}
})
