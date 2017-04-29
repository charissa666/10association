//分享
$(document).on('click','.mes_btn01',function(){
	$('.share_shade').show();
//	$('body,html').css({height:'100%',overflow:'hidden'});
});
$('.share_shade').click(function(){
	$('.share_shade').hide();
});

//评论
$(document).on('click','.mes_btn02',function(){
	$('.w_comment_div').show();
	$('#w_textarea').focus();
});
//图片展示
function showImg(){
	$('.message_pic').each(function(){
	/*$('.message_pic').each(function(key, obj){
		var divLists = obj.children;
		$.each(divLists, function(key,value) {
			console.log(value.children[0].width)
		});*/
		//console.log(obj.children[0].children[0].width, obj.children[0].children[0].height)
		var pic_num = $(this).children().length;
		if(pic_num == 1){
			$(this).addClass('pic1');
			var w = parseInt($(this).find('img').width())/100;
			var h = parseInt($(this).find('img').height())/100;
			if(w >= h){
				var p = (w - 5.5)/w;
				h = (h - p*h).toFixed(2);
				w = 5.5;
				$(this).find('img').css({'width':w + 'rem'});
				$(this).find('div').css({'width':w + 'rem','height':h + 'rem'});
				$(this).css('height',h + 'rem');
			}else{
				var p = (w -3.5)/w;
				h = (h - p*h).toFixed(2);
				if(h > 5){h = 5}
				w = 3.5;
				$(this).find('img').css({'width':w + 'rem'});
				$(this).find('div').css({'width':'3.5rem','height':h + 'rem'});
				$(this).css('height',h + 'rem');
			}		
		}else if(pic_num == 2 || pic_num == 4){
			$(this).addClass('pic4');
			$('.pic4 img').each(function(){
				if($(this).width() >= $(this).height()){
					$(this).css('height','3rem');
				}else{
					$(this).css('width','3rem');
				}
			});
		}else{
			$(this).addClass('pic9');
			$('.pic9 img').each(function(){
				if($(this).width() >= $(this).height()){
					$(this).css('height','2.1rem');
				}else{
					$(this).css('width','2.1rem');
				}
			});	
		};
	});
};
showImg();


//图片放大
$(document).on('click','.message_pic img',function( ev ){
	ev.stopPropagation();
	var index = $(this).parent().index();
	var _this = $(this);
	
	$('.shade').show();
	$('.shade_img').attr('src',$(this).attr('src'));
	
	
	
	/*var pic_length = $(this).parent().siblings().length+1;
	var pic_li = '';
	for(var i = 0; i < pic_length; i++){
		var li ='<li><img src="' + _this.parents('.message_pic').children().eq(i).children().attr('src') + '"/></li>';
		pic_li += li;
	}
	$(pic_li).appendTo($("#pic_ul"));*/
	
	
	
	
	
	touch.on($('.shade_img'),'swipeleft',function(){
		if(index < _this.parent().siblings().length){
			index++;
		}else{
			return false;
		}
		//console.log(index,_this)
		$('.shade_img').attr('src',_this.parent().siblings().eq(index).children().attr('src'));
	});
	
	touch.on($('.shade_img'),'swiperight',function(){
		
		if(index > 0){
			index--;
		}else{
			return false;
		}
		//console.log(index);
		$('.shade_img').attr('src',_this.parent().siblings().eq(index).children().attr('src'));
	});

});
$('.shade').click(function(){
	$('.shade').hide();
});


//写评论字数控制
$('#w_textarea').on('input',function(){
	var vl = $(this).val();
	$('#w_span').html(vl.length);
	if(vl.length >= 139){
		$('#w_textarea').val(vl.substring(0,139));
		$('#w_span').html(140);
	}
});

//写评论发布按钮
$('.w_btn02').click(function( ev ){
	if($('#w_textarea').val() == ''){
		alert('请填写评论');
		ev.preventDefault();
	}else{
		$('#tijiao').submit(); 
	}
});

//写评论取消按钮
$('.w_btn01').click(function(){
	$('.w_comment_div').hide();
});

//页面加载判断有没有评论
if($('.com_list').children().size() == 0){
	$('.com_list').hide();
}else{
	$('.com_list').show();
	
}



