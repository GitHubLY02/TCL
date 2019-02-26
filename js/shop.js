define(["jquery","jquery-cookie"], function($){
	function shop(){
		$(function(){
			sc_car()
			$.ajax({
					url: "../data/shop.json",
					success: function(goodsArr){
						if($.cookie("goods")){
							//取出购物车里面存储的商品内容
							var cookieStr = $.cookie("goods");
							var cookieArr = eval(cookieStr);

							var newArr = []; //存储
							//筛选出，加入购物车的商品
							for(var i = 0; i < goodsArr.length; i++){
								for(var j = 0; j < cookieArr.length; j++){
									if(goodsArr[i].id == cookieArr[j].id){
										//还需要将商品数量添加进入
										goodsArr[i].num = cookieArr[j].num;
										newArr.push(goodsArr[i]);
									}
								}
							}

							//通过循环，加载我们添加购物车里面的商品
							for(var i = 0; i < newArr.length; i++){
								$(` <dl class="materials-box">
										<dd class="shop-item sel-wid"><span></span></dd>
										<dd class="shop-item pro-wid">
											<span class="left"><a href=""><img src="${newArr[i].img}" alt=""></a></span>
											<span class="right"><p>${newArr[i].title}</p></span>
										</dd>
										<dd class="shop-item pri-wid"><span>${newArr[i].price}</span></dd>
										<dd class="shop-item num-wid">
											<strong id = "${newArr[i].id}">-</strong>
											<input type="text" value="${newArr[i].num}">
											<strong id = "${newArr[i].id}">+</strong>
										</dd>
										<dd class="shop-item sub-wid">
											<span class="new">${newArr[i].price}</span>
											<span class="old">${newArr[i].old}</span>
										</dd>
										<dd class="shop-item ope-wid" id="del"><button id = "${newArr[i].id}">删除</button></dd>
									</dl> `).appendTo(".materials-list")
							}
						}
					},
					error: function(error){
						alert("error");
					}
			})
			//购物车数量
			function sc_car(){
				var cookieStr = $.cookie("goods");
				if(cookieStr){
					var arr = eval(cookieStr);
					var sum = 0; //求和数
					for(var i = 0; i < arr.length; i++){
						sum += arr[i].num;
					}
					$(".top-bar-right").find("li").eq(1).find("span").html(`(${sum})`);
					$(".pay-text-count").find("em").html(`(${sum})`);
				}else{
					$(".top-bar-right").find("li").eq(1).find("span").html(`(0)`);
					$(".pay-text-count").find("em").html(0);
				}

			}
			//点击删除按钮，删除购物车里面的这条商品
			$(".materials-list").on("click","button",function(){
				// alert(this.id);
				/*
					1、html页面上 删除这个商品
					2、cookie中也要删除 [{id:id,num:num},{id:id,num:num}]
				*/
				var id = this.id; //删除商品的id
				$(this).closest("dl").remove();

				if($.cookie("goods")){
					var cookieStr = $.cookie("goods");
					var cookieArr = eval(cookieStr);
					for(var i = 0; i < cookieArr.length; i++){
						if(cookieArr[i].id == id){
							//删除数组中的元素
							cookieArr.splice(i, 1);
							break;
						}
					}

					//判断删除完毕以后是否是空数组
					if(cookieArr.length == 0){
						$.cookie("goods", null);
					}else{
						$.cookie("goods", JSON.stringify(cookieArr), {
							expires: 7
						})
					}
				}

				//重新计算购物车中商品的数量
				sc_car();
			})
			//通过事件委托实现增加和删除
			$(".materials-list").on("click", "strong", function(){
				var id = this.id; //商品的id

				//1、把增减的商品找到
				var cookieStr = $.cookie("goods");
				var cookieArr = eval(cookieStr);
				for(var i = 0; i < cookieArr.length; i++){
					if(id == cookieArr[i].id){
						//2、判断是要+还是-
						if(this.innerHTML == "+"){
							cookieArr[i].num++;
							$(this).prevAll("input").val(cookieArr[i].num);

							$.cookie("goods", JSON.stringify(cookieArr), {
										expires: 7
									})
							break;
						}else{
							//判断数量是否是1
							if(cookieArr[i].num == 1){
								$(this).closest("li").remove();

								//删除
								cookieArr.splice(i, 1);
								if(cookieArr.length == 0){
									$.cookie("goods", null);
								}else{
									$.cookie("goods", JSON.stringify(cookieArr), {
										expires: 7
									})
								}


							}else{
								cookieArr[i].num--;
								$(this).next("input").val(cookieArr[i].num);
								$.cookie("goods", JSON.stringify(cookieArr), {
									expires: 7
								})
							}

						}

					}
				}
				sc_car();

			})

		})
		
	}
	return {
		shop: shop
	}
})
