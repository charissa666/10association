//底部点赞
$('.com_btn03').click(function(){
	if($(this).find('img').attr('src') == '../../images/btn_zan01.jpg'){
		$(this).find('img').attr('src','../../images/btn_zan02.jpg');
		$(this).find('span').html('取消赞');
	}else{
		$(this).find('img').attr('src','../../images/btn_zan01.jpg');
		$(this).find('span').html('赞');
	}
});

//专题详情底部分享
$('.spe_btn01').click(function(){
	$('.share_shade').show();
});

//交流、专题详情底部评论
$('.f_com').click(function(){
	$('.w_comment_div').show();
	$('#w_textarea').focus();
});

//底部分享
$('.com_btn01').click(function(){
	$('.share_shade').show();
});
$('.share_shade').click(function(){
	$('.share_shade').hide();
});

//写评论字数控制
$('#w_textarea').on('input',function(){
	var vl = $(this).val();
	$('#w_span').html(vl.length);
	if(vl.length >= 139){
		$('#w_textarea').val(vl.substring(0,140));
		$('#w_span').html(140);
	}
});

//写评论发布按钮
$('.w_btn02').click(function( ev ){
	if($('#w_textarea').val() == ''){
		alert('请填写评论');
		ev.preventDefault();
	}else{
		var now = new Date();
		var nowStr = now.format('MM-dd hh:mm');
		var vl = $('#w_textarea').val();
		var dl = '<dl class="com_dl"><dt><img src="../../images/com_img04.jpg"/></dt><dd><h3><span>哈哈哈</span><span class="c_zan" onclick="zan(this)"><img src="../../images/btn_zan01.jpg"/><span>3</span></span></h3><span>' + nowStr + '</span><p>' + vl + '</p></dd></dl>';
		$(dl).prependTo($('.com_list'));
		$('.w_comment_div').hide();
		$('#w_textarea').val('');
		$('#w_span').html(0);
		$('.f_com').show();
	}
});

//写评论取消按钮
$('.w_btn01').click(function(){
	$('.w_comment_div').hide();
	$('.f_com').show();
});

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

