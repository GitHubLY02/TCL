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
								$(` <dl class="materials-box" id = "${newArr[i].id}">
										<dd class="shop-item sel-wid"><input type="checkbox" class="checkbox" checked="checked"></dd>
										<dd class="shop-item pro-wid">
											<span class="left"><a href=""><img src="${newArr[i].img}" alt=""></a></span>
											<span class="right"><p>${newArr[i].title}</p></span>
										</dd>
										<dd class="shop-item pri-wid"><span id="price">${newArr[i].price}</span></dd>
										<dd class="shop-item num-wid">
											<strong id = "${newArr[i].id}">-</strong>
											<input type="text" value="${newArr[i].num}" id="num">
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
							expires: 7,
							 path: '/'
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
										expires: 7,
										 path: '/'
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
										expires: 7,
										 path: '/'
									})
								}


							}else{
								cookieArr[i].num--;
								$(this).next("input").val(cookieArr[i].num);
								$.cookie("goods", JSON.stringify(cookieArr), {
									expires: 7,
									 path: '/'
								})
							}

						}

					}
				}
				sc_car();

			})
		

			$('.car').find('input').change(function(){
	            // 获取全选框的状态
	            is_checked = $(this).prop('checked');
	            // 遍历商品对应的checkbox，设置的选中状态和全选的保持一致
	            $('.materials').find(".sel-wid").find('input').each(function () {
	                $(this).prop('checked', is_checked)
	            });
	            // 更新页面信息 
	            update_page_info();
	        });
			alert($('.materials').find(".sel-wid").find('input').attr("class"))
			
  			/*$('.materials').find(".sel-wid").find('input').click(function(){
  				alert(9)
  			})*/

	        // 商品对应的checkbox状态发生改变时候，设置全选checkbox的状态
	       /* $('.materials').find(".sel-wid").find('input').change(function(){
	        	alert(1)
	            // 获取页面上所有的商品数目
	            all_len = $('.materials').length;
	            alert(all_len)
	            // 获取页面上所有被选中的商品的数目
	            checked_len = $('.materials').find(".sel-wid").find('input').length;
	            alert(checked_len)
	            is_checked = true;
	            //　判断如果页面上的所有被选中的商品数目小于页面上所有的商品数目，设置全选框架状态
	            if (checked_len < all_len){
	                $('.car').find('input').prop('checked', false);
	            }
	            else {
	                $('.car').find('input').prop('checked', true);
	            }
	 
	            // 更新页面信息
	            update_page_info()
	        });*/



			// 计算被选中的商品的总件数和总价格
	        function update_page_info() {
	            // 获取所有被选中的商品的checkbox
	            // 获取所有被选中的商品所在的ul元素,从而获取被选中的商品的数量和价格，计算小计
	            total_count = 0;
	            total_price = 0;
	            $('.materials').find(".sel-wid").find('input').parents('dl').each(function () {
	                // 获取商品数目和小计
	                // alert(typeof($(this)));
	                // alert($(this).attr("class"))
	                count = $(this).find("#num").val();
	                // 商品价格
	                amount = $(this).find("#price").html();
	                // 累加计算商品总数目和价格
	                count = parseInt(count);
	                // alert(count)
	                amount = parseFloat(amount);
	                // alert(amount)
	                total_count += count;
	                total_price += amount;
	 
	            });
	            // 设置被选中的商品总数目和价格
	            $('.subtotal').find('#count').text(total_price.toFixed(2));
	            $('.subtotal').find('strong').text(total_count);
	            $(".price").find(".buy").attr("id","active")
	 
	        }

		})
		
	}
	return {
		shop: shop
	}
})
