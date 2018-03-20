const captchapng = require('captchapng');

const mongoose = require('mongoose');

// 生成图片验证码
exports.captcha=function(ctx,next){
	var code = parseInt(Math.random() * 9000 + 1000);
    ctx.session.checkcode = code;
    console.info(ctx.session.checkcode)
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var base64 = p.getBase64();
    ctx.status =200;
    ctx.body = {
      code: 'data:image/png;base64,' + base64
    }
}

exports.main = (ctx,next)=>{
	ctx.body = 'cuizhen'
}

exports.login = (ctx,next)=>{
	const User = mongoose.model('user');
	var user = new User({
		username:'yuchen',
		password:'123456',
		realname:'崔震',
		phone:'18311346723',
		status:'0'
	})
	user.save(function(err){
		if(err){
			return
		}else{
			ctx.body = '成功'
		}
	})
}