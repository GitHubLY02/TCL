<?php 
	header('content-type:text/html;charset="utf-8"');
	//1、取出post提交过来的数据
	$username = $_POST['username'];
	$password = $_POST['password'];

	//2、链接数据库，插入当前注册的用户

	$link = mysql_connect("localhost", "root", "");

	if(!$link){
		echo "链接数据库失败";
		exit;
	}

	mysql_set_charset("utf8");

	mysql_select_db("tcl");

	$sql = "SELECT * FROM tcl WHERE username='{$username}' AND password='{$password}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if($row){
		echo "登录成功";
	}else{
		echo "用户名或密码错误";

	}

	mysql_close($link);


 ?>