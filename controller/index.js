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
	console.info('登陆信息================='+JSON.stringify(userinfo));
	let checkcode = userinfo.checkcode;
	let password = userinfo.password;
	let username = userinfo.username;
	if(checkcode==ctx.session.checkcode){
		
	}else{
		ctx.body={
			status:0,
			erorr_message:'验证码不对'
		}
	}
	// var finduser = await User.find({'username':'cuizhen'});  //查询
	// var updateuser = await User.update({'username':'cuizhen'},{$set:{
	// 		username:"121321312132"
	// 	}})  // 更新
	// var userdata = await user.save();   //新增
	// var deleteuser = await User.remove({'username':'yuchen'})  //删除

	ctx.body = 'cuizhen'
}

exports.register= async(ctx,next)=>{
	const User = mongoose.model('user');
	var user = new User({
		username:'yuchen',
		password:'123456',
		realname:'崔震',
		phone:'18311346723',
		status:'0'
	})
}