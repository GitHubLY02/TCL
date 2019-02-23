define(["jquery"], function($){
	function tab1(){
		$(function(){
			//通过ajax下载数据
			$.ajax({
				url:`../data/data_nav1.json`,
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						if(i == 0){
							$(`<a>${arr[i].title}</a>`).appendTo($(".title"));
						}else{
							$(`<a>${arr[i].title}</a>`).appendTo($(".title"));
						}
					}
					for(var i = 0; i < arr.length; i++){
							$(`<div id="all${i}" class="all"></div>`).appendTo(".list");
							var arr1 = arr[i].desc;
							var i = i;
							for(var j = 0; j < arr1.length; j++){
									$(`
									<div>
										<img src="${arr1[j].img}" alt="">
										<p class="m_tit">${arr1[j].title}</p>
										<p class="red">${arr1[j].price}</p>
									</div>`).appendTo($(".list").find("#all"+i));								
							}
					}	
				},
				error:function(error){
					console.logo("加载数据失败");
				}

			})
			//实现选项卡操作 通过事件委托
			$(".nav-left").on("mouseover", "a", function(){
				//取消所有button的class样式
					var  kind = $(this).index();
					$(".nav-left").find(".list").find(".all").css("display", "none");
					$(".nav-left").find(".list").find(".all").eq(kind).css("display", "none");
					$(".nav-left").find("title").find("a").attr("class", "");
					if(kind == 0){
						$(".nav-left").find(".list").find("div").css("display", "none");
						$(".nav-left").find(".list").css("display", "none");
						$(".nav-left").find("title").find("a").attr("class", "");
					}else{
						$(".nav-left").find("title").find("a").attr("class", "active");
						$(".nav-left").find(".list").find(".all").css("display", "none");
						$(".nav-left").find(".list").find(".all").eq(kind).css("display", "block");
						$(".nav-left").find(".list").find(".all").eq(kind).find("div").css("display", "block");
						$(".nav-left").find(".list").css("display", "block");
					}
					//将当前被点击按钮变成选中的
					$(this).attr("class", "active");
			})
			$(".nav-left").on("mouseout", "a", function(){
				$(this).attr("class", "");
			})
			$(".nav-left").on("mouseout", ".list", function(){
				$(".nav-left").find("a").attr("class", "");
				$(".nav-left").find(".list").css("display", "none");
				$(".nav-left").find(".list").find("div").css("display", "none");				
			})
			//点击改变颜色
			
			$(".purc-list").on("click","span",function(){
				$(".purc-list").find(".purc-b").attr("id","");
				$(this).attr("id","active");
				var index = $(this).index();
				$(".imgLoad").find(".purc-t").css("display","none");
				$(".imgLoad").find(".purc-t").eq(index).css("display","block");
			})
			$(".options").on("click","span",function(){
				$(".options").find("span").attr("class","");
				$(this).attr("class","active");
			})
			//点击+点击-
			/*$(".mun").on("click","a",function(){
				var count = 0;
				count++;
				for(var i = 0; i < count; i++){
					if($(this).index() == 0){
						count++;
						// alert(count);
						$("input").val(count);
					}else{
						count--;
						// alert(count);
						if(count <= 0){
							$("input").val(0);
						}else{
							$("input").val(count);
						}
						
					}
				}
				
			})*/

		})
	}
	return {
		tab1: tab1
	}
})
