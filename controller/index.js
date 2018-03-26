const captchapng = require('captchapng');

const mongoose = require('mongoose');

// 生成图片验证码
exports.captcha=function(ctx,next){
	console.info('1111111111')
	var code = parseInt(Math.random() * 9000 + 1000);
    ctx.session.checkcode = code;
    console.info(ctx.session.checkcode)
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var base64 = p.getBase64();
    ctx.status =200;
    ctx.body = 'data:image/png;base64,' + base64
}

exports.main = (ctx,next)=>{
	ctx.body = 'cuizhen'
}

exports.login = async (ctx,next)=>{
	let userinfo = ctx.request.body;
	let User = mongoose.model('user')
	console.info('登陆信息================='+JSON.stringify(userinfo));
	let checkcode = userinfo.checkcode;
	let password = userinfo.password;
	let username = userinfo.username;
	if(checkcode==ctx.session.checkcode){
		ctx.session.checkcode=''
		 var finduser = await User.find({'username':username}); 
		 if(finduser.length>0){
		 	if(password = finduser[0].password){
		 		ctx.session.user = finduser
		 		ctx.body={
		 		status:0,
		 		error_message:'登陆成功'
		 	}
		 	}
		 }else{
		 	ctx.body={
		 		status:002,
		 		error_message:'用户名不存在'
		 	}
		 }
	}else{
		ctx.session.checkcode=''
		ctx.body={
			status:001,
			error_message:'验证码不对'
		}
	}
	// var finduser = await User.find({'username':'cuizhen'});  //查询
	// var updateuser = await User.update({'username':'cuizhen'},{$set:{
	// 		username:"121321312132"
	// 	}})  // 更新
	// var userdata = await user.save();   //新增
	// var deleteuser = await User.remove({'username':'yuchen'})  //删除

	//ctx.body = 'cuizhen'
}

exports.register= async(ctx,next)=>{
	const User = mongoose.model('user');
	console.info(ctx.request.body)
	let userdata = ctx.request.body;
	let username = userdata.username;
	let password = userdata.password1;
	let realname = userdata.realname;
	let phone = userdata.phone;
	let email = userdata.email;
	let checkcode =userdata.checkcode;
	let user = new User({
		username:username,
		password:password,
		realname:realname,
		phone:phone,
		status:'0',
		email:email,
	})
	if(checkcode==ctx.session.checkcode){
		ctx.session.checkcode=''
		 var finduser = await User.find({'username':username}); 
		 if(finduser.length>0){
		 	ctx.body={
		 		status:002,
		 		error_message:'用户名已经存在'
		 	}
		 }else{
		 	try{
		 		var userstatus = await user.save();
				ctx.body = {status:0,error_message:'注册成功，需要管理员激活'}
		 	}catch(e){
		 		ctx.body={
					status:004,
					error_message:'系统错误'
				}
		 	}
		 	
		 }
	}else{
		ctx.session.checkcode=''
		ctx.body={
			status:001,
			error_message:'验证码不对'
		}
	}
}
// 获取个人信息
exports.userinfo= async(ctx,next)=>{
	if(ctx.session.user){
		ctx.body = {
			status:0,
			userinfo:ctx.session.user
		}
	}else{
		ctx.body={
			status:001,
			error_message:'请重新登录'
		}
	}
}
// 退出接口
exports.exit= async(ctx,next)=>{
	ctx.session.user = '';
	ctx.body={
		status:0,
		error_message:'退出成功'
	}
}

