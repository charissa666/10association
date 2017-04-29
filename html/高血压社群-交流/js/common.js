//判断是否为微信浏览器
window.onload = function(){
 /*   if(IsPC()){
    	window.location.href="../提示页/hint.html";
    }else{
    	if(!isWeiXin()){
	        window.location.href="../提示页/hint.html";
	    }
    }*/
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

function IsPC(){    
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
    var flag = true;    
    for (var v = 0; v < Agents.length; v++) {    
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
    }    
    return flag;    
} 


//点赞加1
function zan(obj) {
	var vl = $(obj).find('span').html();
	if($(obj).find('img').attr('src') == '../../images/btn_zan01.jpg') {
		vl++;
		$(obj).find('img').attr('src', '../../images/btn_zan02.jpg');
	} else {
		vl--;
		$(obj).find('img').attr('src', '../../images/btn_zan01.jpg');
	}
	$(obj).find('span').html(vl);
};


//日期格式化
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};


////下拉刷新 上拉加载
var myScroll,
	pullDownEl,
	pullDownOffset,
	pullUpEl,
	pullUpOffset,
	generatedCount = 0;

//初始化iScroll控件
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	//pullUpOffset = 10;
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		
		useTransition: true,
		topOffset: pullDownOffset,
		
		onRefresh: function() {
			if(pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			}
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}

//			document.getElementById("pullUp").style.display = "none";
		},
		onScrollMove: function() {
			if(this.y > 0 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始刷新...';
				this.minScrollY = 0;
			}else if(this.y < 0 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			}
			
			if(this.scrollerH < this.wrapperH && this.y < (this.minScrollY - pullUpOffset) || this.scrollerH > this.wrapperH && this.y < (this.maxScrollY - pullUpOffset)) {
				document.getElementById("pullUp").style.display = "";
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始刷新...';
			}else if(this.scrollerH < this.wrapperH && this.y > (this.minScrollY - pullUpOffset) && pullUpEl.className.match('flip') || this.scrollerH > this.wrapperH && this.y > (this.maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
				document.getElementById("pullUp").style.display = "none";
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
				pullDownAction(); // Execute custom function (ajax call?)
			}
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	//setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
//初始化绑定iScroll控件
/*document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);*/
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);





function del_inf(){
	$(".del_shade").css('opacity','1');
	$(".del_shade").show();
	$("#del").slideDown('fast');
};
//删除交流按钮
$(document).on('click','.mtit_r',function(){
	del_inf();
	$(this).parents('.message').attr('del','0');
	$(".del_shade").attr('flg','jl');
});

//删除评论按钮
$(document).on('click','.com_dl p',function(){
	del_inf();
	$(this).parents('.com_dl').attr('del','0');
	$(".del_shade").attr('flg','pl');
});

//管理专题按钮
$(".art_control").click(function(){
	del_inf();
	$(".del_shade").attr('flg','zt');
});

//点击遮罩
$(".del_shade").click(function(){
	$('[del=0]').removeAttr('del');
	$(".del_shade").animate({'opacity':'0'},function(){
		$(".del_shade").hide();
	});
	$("#sure_del").slideUp('fast');
	$("#del").slideUp('fast');
});

//删除
$("#del").click(function( ev ){
	var oEvent = ev || window.event;
	var target = oEvent.srcElement ? oEvent.srcElement : oEvent.target;
	if(target.tagName == 'LI'){
		if(target.innerHTML == '删除'){
			$("#del").slideUp('fast',function(){
				$("#sure_hint").html('确认删除');
				setTimeout(function(){
					$("#sure_del").slideDown();
				},200);
			});
		}else if(target.innerHTML == '取消'){
			$('[del=0]').removeAttr('del');
			$(".del_shade").animate({'opacity':'0'},function(){
				$(".del_shade").hide();
			});
			$("#del").slideUp('fast');
		}else if(target.innerHTML == '置顶'){
			$(".del_shade").animate({'opacity':'0'},function(){
				$(".del_shade").hide();
			});
			$("#del").slideUp('fast',function(){
				target.innerHTML = '取消置顶';
			});
			$('.message[del="0"]').find('.set_top').show();
			$(".top_hint").html('<p>置顶成功</p><p>请刷新页面查看</p>').show();
			setTimeout(function(){
				$(".top_hint").hide();
			},1200);
			
		}else if(target.innerHTML == '取消置顶'){
			
			$('.message[del="0"]').find('.set_top').hide();
			$('[del=0]').removeAttr('del');
			$(".del_shade").animate({'opacity':'0'},function(){
				$(".del_shade").hide();
			});
			$("#del").slideUp('fast',function(){
				target.innerHTML = '置顶';
			});
			$(".top_hint").html('<p>取消置顶成功</p><p>请刷新页面查看</p>').show();
			setTimeout(function(){
				$(".top_hint").hide();
			},1200);
//			$("#del").slideUp('fast',function(){
//				$("#sure_hint").html('确认取消置顶');
//				setTimeout(function(){
//					$("#sure_del").slideDown();
//				},200);
//			});
		}
	}
});

//确认删除
$("#sure_del").click(function( ev ){
	var oEvent = ev || window.event;
	var target = oEvent.srcElement ? oEvent.srcElement : oEvent.target;
	if(target.tagName == 'LI'){
		if(target.innerHTML == '确认删除'){
			if($(".del_shade").attr('flg') == 'jl'){				//删除交流
				$('.message[del=0]').slideUp('1000',function(){
					$(this).remove();
				});
			}else if($(".del_shade").attr('flg') == 'pl'){				//删除评论
				$('.com_dl[del=0]').slideUp('1000',function(){
					$(this).remove();
				});
			}else if($(".del_shade").attr('flg') == 'zt'){				//删除专题
				
			}
			$(".del_shade").hide();
			$("#sure_del").slideUp('fast');
		}else if(target.innerHTML == '取消'){
			$('[del=0]').removeAttr('del');
			$(".del_shade").animate({'opacity':'0'},function(){
				$(".del_shade").hide();
			});
			$("#sure_del").slideUp('fast');
		}else if(target.innerHTML == '确认取消置顶'){
			$(".del_shade").animate({'opacity':'0'},function(){
				$(".del_shade").hide();
			});
			$("#sure_del").slideUp('fast',function(){
				$("#sure_hint").html('置顶');
			});
			
		}
	}
});


