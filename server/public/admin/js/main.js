$(function(){

	var $loginBox = $("#login-box");

	$loginBox.find(".btn").click(function(){
		$.ajax({
			type : 'post',
			url : 'api/user/login',
			data : {
				username : $loginBox.find('[name="username"]').val(),
				password : $loginBox.find('[name="password"]').val(),
				code : $loginBox.find('[name="code"]').val()
			},
			dataType : 'json',
			success : function(result){
				$loginBox.find(".err").html(result.message);
				if(result.code === 0){
					//登录成功
					setTimeout(function(){
						window.location = 'cms';
					},1000);
				}
			}
		});
	});
	
});