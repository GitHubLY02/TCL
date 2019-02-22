define(["jquery"], function($){
	function color(){
		$(function(){
			var aBtn = $(".bannerBox").find(".banner-nav").find(".bannner-navgation").find(".ban_ul").find("li");
			var aAs = aBtn.find("a");
			var aLis =  $(".bannerBox").find(".banner-nav").find(".bannner-navgation").find(".ban-nav-box").find("ban-nav-cont").find(".cont").find("li");
			
			for(var i = 0; i < aBtn.length; i++){		
				$(aBtn[i]).mouseover(function(){
					// alert($(this).index());
					
					$(this).css({
						"backgroundColor":"#fff",
						"color":"red"
					})
					var aAs = $(this).find("a");
					aAs.css({
						"color":"red"
					})
				})
				$(aBtn[i]).mouseout(function(){
					/*$(this).index() = i;
							alert(i);*/
					// alert($(this).index());
					$(this).css({
						"backgroundColor":"",
						"color":""
					})
					var aAs = $(this).find("a");
					aAs.css({
						"color":""
					})
				})
			}
			
		})
	}
	return {
		color:color
	}
	
})
