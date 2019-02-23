console.log("加载完毕");

/*
	配置当前html页面要用到的所有的js文件
	路径：自己定义名字：路径
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"slide": "slide",
		"tab": "tab",
		"color":"color",
		"leftNav":"leftNav",
		"list":"list",
		"news":"news",
		"banner":"banner"
	},
	/*shim: {
		//配置jquery-cookie依赖于jquery
		"jquery-cookie": ["jquery"],

		//声明不适用AMD规范的模块
		"parabola": {
			exports: "_"
		}
	}*/
})


//调用首页的代码
//上面自定义的名字，参数是引入的模块对外暴露的接口（引入文件return后面的对象）
require(["slide", "tab","color","leftNav","list","news","banner"], function(slide, tab,color,leftNav,list,news,banner){
	slide.slide();
	color.color();
	leftNav.leftNav();
	list.list();
	news.news();
	banner.banner();
	$(function(){
		$("#deleteCar").click(function(){
			index.deleteCar();
		})
	})
	//实现选项卡
	tab.tabSwitch()
})