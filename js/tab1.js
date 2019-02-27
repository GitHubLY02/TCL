define(["jquery","jquery-cookie"], function($){
	function tab1(){
		$(function(){
			sc_car()
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
					console.log("加载数据失败");
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
			$(".imgLoad").on("mouseenter",".purc-t",function(){
				$(".imgLoad").find("#mask").css("display","block");
				$(".imgLoad-big").css("display","block");
				var index = $(this).index();
				$(".imgLoad-big").find(".purc-big").css("display","none");
				$(".imgLoad-big").find(".purc-big").eq(index).css("display","block");
			})
			$(".imgLoad").on("mouseleave",".purc-t",function(){
				$(".imgLoad").find("#mask").css("display","none");
				$(".imgLoad-big").css("display","none");
			})
			$(".imgLoad").on("mousemove",".purc-t",function(ev){
				var l = ev.pageX - $(this).offset().left;
				var t = ev.pageY - $(this).offset().top;
				if(l <= 0){
					l = 0;
				}
				if(l >= 320){
					l = 320;
				}
				if(t <= 0){
					t = 0;
				}
				if(t >= 320){
					t = 320;
				}
				$("#mask").css("left",l);
				$("#mask").css("top",t);
				var left = -$("#mask").offset().left;
				var top = -$("#mask").offset().top;
				$(".imgLoad-big").find(".purc-big").css("left",left);
				$(".imgLoad-big").find(".purc-big").css("top",top);
			})
			$(window).scroll(function(){
				var top = $(window).scrollTop();
				if(top >= 757){
					$(".fixed-buy").css("margin-top","0px");
				}else{
					$(".fixed-buy").css("margin-top","-60px");
				}

			})


			$(".details-r").find("ul").on("click","li",function(){
				$(".details-r").find("ul").find("li").attr("class","");
				$(this).attr("class","active");
			})

			$(window).scroll(function(){
				var t = $(window).scrollTop();
				if(t < 757){
					$(".details-r").css("top","0px");
					$(".details-r").css("display","block");
				}else{
					var t = t - 757;
					$(".details-r").css("top",`${t}px`);
					$(".details-r").css("display","block");
				}
			})

			$.ajax({
				url:"../data/product.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<p><img src="${arr[i].img}" alt=""></p>`).appendTo($("#details-l"));
					}
				},
				error:function(error){
					console.log("加载数据失败");
				}
			})

			$.ajax({
				url:"../data/product1.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						if(i == 0){
							$(`<li class="active">${arr[i].title}</li>`).appendTo(".y_servicetab");
							$(`<div style="display:block"><img src="${arr[i].img}" alt=""></div>`).appendTo("#y_sercecontent");
						}else{
							$(`<li>${arr[i].title}</li>`).appendTo(".y_servicetab");
							$(`<div><img src="${arr[i].img}" alt=""></div>`).appendTo("#y_sercecontent");
						}
						
					}
					$(".y_servicetab").on("click","li",function(){
						$(".y_servicetab").find("li").attr("class","");
						$(this).attr("class","active");
						var index = $(this).index();
						$("#y_sercecontent").find("div").css("display","none")
						$("#y_sercecontent").find("div").eq(index).css("display","block");
					})
				},
				error:function(error){
					console.log("加载数据失败");
				}
			})

			$.ajax({
				url:"../data/product2.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<tr>
								<td style="word-break: break-all;" valign="top" width="350">
									<p><span style="font-family: 微软雅黑,Microsoft YaHei; color: rgb(0, 0, 0);">${arr[i].one.title}</span></p>
								</br>
									<p><span style="font-family: 微软雅黑,Microsoft YaHei; font-size: 12px; color: rgb(165, 165, 165);">${arr[i].one.desc}</span></p>
									</br>
								</td>
								<td style="word-break: break-all;" valign="top" width="350">
									<p><span style="font-family: 微软雅黑,Microsoft YaHei; color: rgb(0, 0, 0);">${arr[i].two.title}</span></p>
								</br>
									<p><span style="font-family: 微软雅黑,Microsoft YaHei; font-size: 12px; color: rgb(165, 165, 165);">${arr[i].two.desc}</span></p>
									</br>
								</td>
							</tr>`).appendTo("tbody");
					}
				},
				error:function(error){
					console.log("加载数据失败");
				}
			})

			$(".details-r").find("ul").on("click","li",function(){
				if($(this).index() == 0){
					$("html, body").animate({
				      scrollTop: $("#productad").offset().top });
				    return false;
				}
				if($(this).index() == 1){
					$("html, body").animate({
				      scrollTop: $("#productadTail").offset().top });
				    return false;
				}
				if($(this).index() == 2){
					$("html, body").animate({
				      scrollTop: $("#y_servicebox").offset().top });
				    return false;
				}
				if($(this).index() == 3){
					$("html, body").animate({
				      scrollTop: $("#question").offset().top });
				    return false;
				}
			})

			//点击+点击-
			$(".mun").on("click","a",function(){
				if($(this).index() == 0){
					var count = parseInt($(".select").find("input").val()) + 1;
					$("input").val(count);
				}
				if($(this).index() == 1){
					if(parseInt($(".select").find("input").val()) <= 1){
						$("input").val(1);
					}else{
						var count = parseInt($(".select").find("input").val()) - 1;
						$("input").val(count);
					}
					
				}				
			})

			var url = window.location.search;
			var object = {};
		    if(url.indexOf("?") != -1){ //url中存在问号，也就说有参数。    
		      var str = url.substr(1);  //得到?后面的字符串
		      var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
		      for(var i = 0; i < strs.length; i ++){
		      	object[strs[i].split("=")[0]]=strs[i].split("=")[1];
		      }				// alert(object.id);
				$(".b-car").click(function(){
					$(this).attr("href",`shop.html?id=${object.id}`);
				})
				var id = object.id;
				// 加入cookie
				$(".b-car").click(function(){
					var first = $.cookie("goods") == null ? true : false;
					if(first){
						//第一次添加
						var arr = [{id: id,num:1}];
						$.cookie("goods", JSON.stringify(arr), {
							expires: 7,
							 path: '/'
						})
					}else{
						//2、判断之前是否添加过
						var cookieStr = $.cookie("goods");
						var arr = eval(cookieStr);
						var isSame = false;
						for(var i = 0; i < arr.length; i++){
							if(id == arr[i].id){
								isSame = true;
								//<1>添加过
								arr[i].num++;
								break;
							}
						}
						//<2>没有添加过
						if(!isSame){
							var obj = {id: id, num: 1};
							arr.push(obj);
						}

						//重新存储在数据库中
						$.cookie("goods", JSON.stringify(arr), {
							expires: 7,
							path: '/'
						})
					}
				})
				
		　　}

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
		tab1: tab1
	}
})
