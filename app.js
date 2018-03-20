const koa = require('koa');

const config = require('./config')

const app = new koa();

const session = require('koa-session');  //缓存

const koabody = require('koa-body');  //处理post请求体

const mongoose = require('mongoose');

mongoose.connect(config.mongodburi,(err)=>{
	if(err){
		console.info('连接失败')
	}else{
		require('./model/index.js')
		console.info('连接成功')
	}
})

app.use(koabody());
const router = require('./router/index.js'); //路由
app.use(router.routes());

app.use(session({
	key:'yuchen',
	maxAge:'8640000',
	overwrite:true,
	httpOnly:true,
	signed:true,
	rolling:false,
	renew:false
},app))

app.use(async ctx=>{
	ctx.body = 'hellow World'
});

app.listen(config.port,() => console.info('listen in'+config.port));