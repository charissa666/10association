//输入框140字限制
$('#chat_txt').on('input',function(){
	var tval = $('#chat_txt').val();
	var reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

	if(reg.test(tval)){
		var tval_url = String(tval.match(reg));
		var tval_arr = tval.split(reg);
		var tval_url_cont = tval.match(reg);
		for(var i = 0; i < tval_url_cont.length; i++){
			var tval_url_a = '</a><a class="message_url" href="' + tval_url_cont[i] + '">网页链接</a><a>';
			tval_arr.splice(tval_arr.indexOf('http'),1,tval_url_a);
		};
		var tval_string = tval_arr.join('');
		var tval_a_leng = 140 + tval_url.length;
		$('#tval_st').val(tval_string);
		if(tval.length > tval_a_leng){
			$('#chat_txt').val(tval.substr(0,tval_a_leng));
		}	
	}else{
		$('#tval_st').val(tval);
		if(tval.length > 140){
			$('#chat_txt').val(tval.substr(0,140));
		}
	};
});

//判断当前是否已经上传图片
function if_pic(){
	if($('.upload_pic>dl').size() == 10){
		$('.add_pic').hide();
	}
/*	else if($('.upload_pic>dl').size() > 10){
		alert('最多能选9张照片');
		return false;
	}*/
	else{
		$('.add_pic').show();
	};
};

//图片上传 显示缩略图 
$(document).on('change','.b_input',function(){
	var id = $(this).attr('id');
	if($('.upload_pic>dl').size() <= 9){
		var mine = $(this).val();
		if(mine != ''){
			mine = mine.toLowerCase().substring(mine.lastIndexOf('.'));
			if(mine != '.jpg' && mine != '.png' && mine != '.jpeg' && mine != '.gif' && mine != '.bmp' && mine != '.webp'){
				alert('暂不支持' + mine + '格式的图片，请上传(jpg/png/gif/bmp/webp)的图片');
			}else{
				var f = document.getElementById(id).files[0];
				var src = window.URL.createObjectURL(f);
				var dl = '<dl><dt><img src="' + src + '"/></dt><dd onclick="del_pic(this);"></dd></dl>';
				$(dl).insertBefore($('.add_pic'));
				$(this).hide();
				var input_str = '<input type="file" accept="image/*" name="pic[]" class="add_pic_input b_input" id="i' + id + '"/>';
				$(input_str).appendTo($('.add_pic'));
			}
		}
	}
	if_pic();
});

//删除图片
function del_pic(obj){
	var ind = $(obj).parent('dl').index();
	$(obj).parent('dl').remove();
	$('.add_pic>input').eq(ind).remove();
};

//发交流
$('.head_r_btn01').click(function(){
	$('.chat-wrapper').fadeIn('fast');
	$('#chat_txt').val('');					
	$('.upload_pic').html('<dl class="add_pic"><input type="file" accept="image/*" name="pic[]" class="add_pic_input b_input" id="up2"/></dl>');
});

//取消按钮
$('.chat_btn1').click(function(){
	$('.chat-wrapper').fadeOut('fast');
});


//发布按钮
$('#chat_send').click(function( ev ){
	/*if($('.upload_pic>dl').size() > 9){
		alert('最多可以上传9张照片');
		ev.preventDefault();
	};*/
	if($('#chat_txt').val() == ''){
		$(".top_hint").html('<p>内容不能为空</p><p>请填写要发布的内容</p>').show();
		setTimeout(function(){
			$(".top_hint").hide();
		},1500);
		ev.preventDefault();
	}else{
		var Cpho = '../../images/user_pho.png';
		var Cuser = '犬言我';
		var Ctime = new Date().getFullYear() + '-' + new Date().format('MM-dd hh:mm:ss');
		var Ctxt = $('#tval_st').val();
		var Chref = '../交流详情/chat_detail.html';
		var Chref_pl = '../查看评论/see_comment.html';
		var Cpic = '';
		$('.upload_pic img').each(function(){
			var Cimg = '<div><img src="' + $(this).attr("src") + '"/></div>'
			Cpic += Cimg;
		});	
		var Cdiv = '<div class="message"><div class="m_cont"><div class="message_tit"><img class="mtit_l" src="' + Cpho + '"/><div class="mtit_c"><p><span>' + Cuser + '</span><span class="set_top">置顶</span></p><p>' + Ctime + '</p></div><div class="mtit_r"></div></div><p class="message_txt"><a href="' + Chref + '">' + Ctxt + '</a></p></div><div class="message_pic">' + Cpic + '</div><div class="message_btn"><a class="mes_btn01" href="javascript:;"><img src="../../images/btn_send.jpg"/></a><a class="mes_btn02" href=" + Chref_pl + "><img src="../../images/btn_comment.jpg"/><span>0</span></a><a class="mes_btn03" href="javascript:;" onclick="zan(this);"><img src="../../images/btn_zan01.jpg"/><span>0</span></a></div></div>';
		$(Cdiv).prependTo($('.asso_detail_01>div'));
		$('.chat-wrapper').fadeOut('fast');
		showImg();
	}
});
