//gulp任务
var gulp = require("gulp");

gulp.task("copy-indexhtml", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("TCL"))
	.pipe(connect.reload())
})

gulp.task("copy-iconfont", function(){
	return gulp.src("iconfont/*")
	.pipe(gulp.dest("TCL/iconfont"))
	.pipe(connect.reload())
})
gulp.task("copy-php", function(){
	return gulp.src("php/*")
	.pipe(gulp.dest("TCL/php"))
	.pipe(connect.reload())
})
//拷贝图片
gulp.task("images", function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("TCL/images"))
	.pipe(connect.reload())
})

//拷贝js代码
gulp.task("scripts", function(){
	return gulp.src(["js/*", "!gulpfile.js", "!index.js"])
	.pipe(gulp.dest("TCL/js"))
	.pipe(connect.reload())
})

//拷贝index.js
/*
	gulp-uglify
	gulp-rename
*/
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("scripts-index", function(){
	return gulp.src("index.js")
	.pipe(gulp.dest("TCL/js"))
	.pipe(uglify())
	.pipe(rename("index.min.js"))
	.pipe(gulp.dest("TCL/js"))
	.pipe(connect.reload());
})

/*
	拷贝数据
*/
gulp.task("data", function(){
	return gulp.src("data/*")
	.pipe(gulp.dest("TCL/data"))
	.pipe(connect.reload());
})

/*
	处理css文件
	gulp-sass
	gulp-minify-css
*/
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
gulp.task("sass", function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(sass())
	.pipe(gulp.dest("TCL/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("TCL/css"))
	.pipe(connect.reload());
})
gulp.task("css", function(){
	return gulp.src(["stylesheet/*.scss","!index.scss"])
	.pipe(sass())
	.pipe(gulp.dest("TCL/css"));
})
gulp.task("copy-css", function(){
	return gulp.src("css/*")
	.pipe(gulp.dest("TCL/css"))
	.pipe(connect.reload())
})


/*
	在运行程序之前，启动监听之前
	先要将上述所有的任务都运行一遍
	build 一次性执行多个任务
*/
gulp.task("build", ["copy-indexhtml","copy-iconfont","copy-php", "images", "scripts-index", "scripts", "data", "sass","copy-css", "scripts-index","css"], function(){
	console.log("任务执行完成，项目已建立");
})
/*
	监听  实时刷新(服务)
*/

gulp.task("watch", function(){
	gulp.watch("*.html", ["copy-indexhtml"]);
	gulp.watch("iconfont/*", ["copy-iconfont"]);
	gulp.watch("images/**/*", ["images"]);
	gulp.watch(["js/*", "!gulpfile.js", "!index.js"], ["scripts"]);
	gulp.watch(["data/*"], ['data']);
	gulp.watch("stylesheet/index.scss", ["sass"]);
	gulp.watch("css/*", ["copy-css"]);
	gulp.watch("index.js", ['scripts-index']);
	gulp.watch(["stylesheet/*.scss","!index.scss"],["css"]);
	gulp.watch("php/*", ["copy-php"]);
})

var connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: "TCL",
		port: 8000,
		livereload: true
	})
})

//设置默认任务
gulp.task("default", ["watch", "server"]);