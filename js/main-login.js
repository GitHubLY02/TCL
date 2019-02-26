console.log("加载完毕");

/*
	配置当前html页面要用到的所有的js文件
	路径：自己定义名字：路径
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"login":"login"
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
require(["login"], function(login){
	login.login()
})