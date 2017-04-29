//添加标签
$('.add_tag').click(function(){
	$('.p_tag').show();
	$('.p_tag>input').focus();
});
$('#p_btn1').click(function(){
	$('.p_tag').hide();
	$('.p_tag>input').val('');
});
$('#p_btn2').click(function(){
	var vl = $('.p_tag>input').val();
	var li = '<li flg="' + vl + '" onclick="select_tag(this)">' + vl + '<span class="tag_span"></span></li>';
	$(li).insertBefore($('.add_tag'));
	$('.p_tag').hide();
	$('.p_tag>input').val('');
});

//编辑标签
function select_tag( obj , ev ){
	var oEvent = ev || window.event;
	var target = oEvent.srcElement ? oEvent.srcElement : oEvent.target;
	//如果是删除
	if(target.tagName == 'SPAN'){
		if($(obj).hasClass('get')){
			return false;
		}else{
			$(obj).remove();
		}
	//如果是选择
	}else{
		$('.spe_inp_hint').hide();
		if($(obj).hasClass('get')){
			$(obj).removeClass('get');
			$('<span class="tag_span"></span>').appendTo($(obj));
			$('#sel_tag').children('li[flg=' + $(obj).attr('flg') + ']').remove();
		}else{
			if($('#sel_tag').children('li').size() < 4){
				$(obj).addClass('get').children('span').remove();
				var li = $(obj).clone().removeClass('get').removeAttr('onclick');
				li.children('span').remove().end().appendTo('#sel_tag');
			}	
		}
	}
};

//专题内容
$('#spe_text').click(function(){
	$(this).focus();
	$(this).prev().hide();
});
$(document).on('focus','.s_input',function(){
	$(this).parent().siblings('span').hide();
});

$(document).on('change','.s_input',function(){
	var mine = $(this).val();
	var id = $(this).attr('id');
	if(mine != ''){
		mine = mine.toLowerCase().substring(mine.lastIndexOf('.'));
		if(mine != '.jpg' && mine != '.png' && mine != '.jpeg' && mine != '.gif' && mine != '.bmp' && mine != '.webp'){
			alert('暂不支持' + mine + '格式的图片，请上传(jpg/png/gif/bmp/webp)的图片');
		}else{
			var f = document.getElementById(id).files[0];
			var src = window.URL.createObjectURL(f);
			var dl = '<img src="' + src + '" flg="' + $(this).attr('flg') + '"/>';
			$(this).hide().appendTo($('#img_inp'));
			$(dl).appendTo($('#spe_text'));
			var inp = '<input type="file" accept="image/*" name="pic[]" class="add_pic_input s_input" id="' + id + 'i" flg="' + id + '"/>';
			$(inp).appendTo($("#add_p"));
		}
	}
	$('#spe_text').focus();
});

//发布按钮
$('#spe_send').click(function( ev ){
	//获取标签的value
	var v_inp = '';
	$('#sel_tag').children('li:not(.spe_inp_hint)').each(function(){
		v_inp += $(this).attr('flg') + ',';
	});
	$('#tag_inp').val(v_inp);
	
	//获取文章内容
	var f_inp = '';
	var f_inp_a = '';
	var f_img = '';
	var f_img_a = '';
	$('#img_inp').children('input').each(function(){
		if($(this).attr('flg')){
			f_inp += $(this).attr('flg') + ',';
			 f_inp_a = f_inp.split(',').slice(0,-1).sort();
		}
		 
	});	
	$('#spe_text').children('img').each(function(){
		 f_img += $(this).attr('flg') + ',';
		 f_img_a = f_img.split(',').slice(0,-1).sort();	 
	});

	var a=f_inp_a;
	var b=f_img_a;
	var c=[];
	for(var i in a){
	c[a[i]]=a[i];
	}
	for(var i in b){
		if(c[b[i]]){
			delete c[b[i]];
		}else{
			c[b[i]]=b[i];
		}
	}
	for(var i in c){
		$('#img_inp').children('input[flg="' + c[i] + '"]').remove();
		$('#spe_text').children('img[flg="' + c[i] + '"]').remove();
	}
	$("#art_inp").val($("#spe_text").html());

	//发布条件判断
	if($('#sep_tit').val() == ''){
		alert('请填写标题');
		return false;
	}else if($('#sel_tag').children().size() == 1){
		alert('请选择标签');
		return false;
	}else if($("#spe_text").html() == ''){
		alert('请发布内容');
		return false;
	}else{
		$('#sep_tit').val('');
		$("#spe_text").html('');
	}
	
/*	if($('#sep_tit').val() == '' || $("#spe_text").html() == '' || $('#sel_tag').children().size() == 1){
		alert('请发布内容')
		ev.preventDefault();
	}else{
		$('#sep_tit').val('');
		$("#spe_text").html('');
	};*/
});
