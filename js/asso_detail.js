//关注按钮
$('.head_r_btn02').click(function() {
	if($(this).hasClass('head_r_btn02 on')) {
		if(confirm('确定要取消该关注')){
			$(this).removeClass('on');
			$(this).html('+关注');
		}
	} else {
		$(this).addClass('on');
		$(this).html('已关注');
	}
});


//跳转交流详情
/*touch.on($('.m_cont'), 'tap', function() {
	window.open('../交流详情/chat_detail.html', '_self');
});
*/

//成员span宽度
var w = '';
$('.m_tag').prev().each(function(){
	w += $(this).width() + ',';
});
var mw = w.split(',').slice(0,-1);
var max = mw[0];
for(var i=1;i<mw.length;i++){ 
  if(parseInt(max)<parseInt(mw[i])){
	   max=mw[i];
  }	 
};
$('.m_tag').prev().css('width',max/15 + 'rem');

//生成社群二维码
$(".head_c").click(function(){
	$(".w_shade").show();
});
$(".w_shade").click(function(){
	$(this).hide();
})
$(function () {
	var str = document.URL;
	$("#weima").qrcode({ 
		render: "canvas", //table模式
		width: 200, //宽度
		height:200, //高度
		text: str,
		src:'../../images/asso_logo.jpg'
	});
})







