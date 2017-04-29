//标签高度
/*var h = parseInt($('.spe_tag').css('height'));
alert(h)
if(h > 0 && h < 41){
	console.log(23)
	$('.tag_more').hide();
	$('.spe_tag').css('height','0.7rem')
}else if(h > 40 && h < 67){
	$('.tag_more').hide();
	$('.spe_tag').css('height','1.5rem')
}else if(h > 66){
	$('.tag_more').show();
	$('.spe_tag').css({'height':'1.5rem'})
}

//标签点击更多
var t_onoff = true;
$('.tag_more').click(function(){
	if(t_onoff){
		$('.spe_tag').css({'height':'3rem','overflow':'auto'});
		$(this).html('收起');
		t_onoff = false;
	}else{
		$('.spe_tag').css('height','1.5rem');
		$(this).html('更多');
		t_onoff = true;
	}
});
*/

//图片变形问题
function speImg(){
	$(".spe_dl dt img").each(function(){
		if($(this).width() >= $(this).height()){
			$(this).css('height','1.71rem');
		}else{
			$(this).css('width','1.74rem');
		}
	});
};
speImg();

