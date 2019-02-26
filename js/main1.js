console.log("加载完毕");

/*
	配置当前html页面要用到的所有的js文件
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"tab1": "tab1",
	},
	shim: {
		//配置jquery-cookie依赖于jquery
		"jquery-cookie": ["jquery"],

		//声明不适用AMD规范的模块
		/*"parabola": {
			exports: "_"
		}*/
	}
})


//调用首页的代码
require(["tab1"], function(tab1){
	//实现选项卡
	tab1.tab1();
})