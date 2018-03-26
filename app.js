const koa = require('koa');

const config = require('./config')

const app = new koa();

const session = require('koa-session');  //缓存

const koabody = require('koa-body');  //处理post请求体

const mongoose = require('mongoose');

const path =require('path');

var views = require('koa-views');
var serve = require('koa-static');
app.use(serve(__dirname + '/pubic')) 
// Must be used before any router is used
app.use(views(__dirname + '/view', {}));
mongoose.connect(config.mongodburi,(err)=>{
	if(err){
		console.info('连接失败')
	}else{
		require('./model/index.js')
		console.info('连接成功')
	}
})
app.keys = config.key;

app.use(session({
	key:'yuchen',
	maxAge:'8640000',
	overwrite:true,
	httpOnly:true,
	signed:true,
	rolling:false,
	renew:false
},app))

app.use(koabody());

// 校验是不是登陆状态

app.use(async (ctx,next)=>{
	let user = ctx.session.user;
	let url = ctx.url
	if(!user){
		if(url=='/login'||url=='/register'){
			await next()
		}else{
			ctx.status=200;
			if(url!='/captcha'){
				ctx.redirect('/login')
			}else{
				await next()
			}
		}
	}else{
		await next()
	}
});


const router = require('./router/index.js'); //路由
app.use(router.routes());


app.listen(config.port,() => console.info('listen in'+config.port));