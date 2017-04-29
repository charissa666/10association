//宣言30字
$('#xuanyan').on('input',function(){
	var tval = $('#xuanyan').val();
	if(tval.length > 29){
		$('#xuanyan').val(tval.substr(0,29));
	}
});

//简介100字
$('#jianjie').on('input',function(){
	var tval = $('#jianjie').val();
	if(tval.length > 99){
		$('#jianjie').val(tval.substr(0,99));
	}
});

//上传社群Logo
$("#upload").change(function(){
	var mine = $('#upload').val();
	if(mine != ''){
		mine = mine.toLowerCase().substring(mine.lastIndexOf('.'));
		if(mine != '.jpg' && mine != '.png' && mine != '.jpeg' && mine != '.gif' && mine != '.bmp' && mine != '.webp'){
			alert('暂不支持' + mine + '格式的图片，请上传(jpg/png/gif/bmp/webp)的图片');
		}else{
			var s = document.getElementById('upload').files[0].size;
			if( s > 1024*1024*5 ){
				alert('社群Logo不能超过5M');
			}else{
				var f = document.getElementById('upload').files[0];
				var src = window.URL.createObjectURL(f);
				$('#user_photo').attr('src',src);
			}
		}
		
	}
});

//正则
var time = false;
$('#contact_tel').blur(function(){
	if($(this).val() == ''){
		$(this).css('border','');
		time = false;
		return;
	}else{
		if(!(/^1[3|4|5|7|8]\d{9}$/.test($(this).val()))){
			$(this).css('border','1px solid #f00');	
			time = false;
		}else{
			$(this).css('border','');
			time = true;
		}
	}
});

//完成按钮
$('#crea_btn').click(function(){
	var val1 = $('#cre_name').val();
	var val2 = $('#cre_type').val();
	var val3 = $('#xuanyan').val();
	var val4 = $('#jianjie').val();
	var val5 = $('#contact_name').val();
	var val6 = $('#contact_tel').val();
	if(val1 == '' || val2 == '' || val3 == '' || val4 == '' || val5 == '' || val6 == '' || time == false || $('#user_photo').attr('src') == '../../images/user_photo.png' ){
		alert('请正确填写信息');
		return false;
	}
});

$('input').blur(function(){
	var val1 = $('#cre_name').val();
	var val2 = $('#cre_type').val();
	var val3 = $('#xuanyan').val();
	var val4 = $('#jianjie').val();
	var val5 = $('#contact_name').val();
	var val6 = $('#contact_tel').val();
	if(val1 == '' || val2 == '' || val3 == '' || val4 == '' || val5 == '' || val6 == '' || time == false || $('#user_photo').attr('src') == '../../images/user_photo.png'){
		return false;
	}else{
		$('#crea_btn').css('background','#f15c46');
	}
});

