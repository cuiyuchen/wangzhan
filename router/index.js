const route = require('koa-router');

const router = new route();

const controller = require('../controller');
console.info(controller);

//router.get('/login',controller.main)


router.get('/login',async (ctx,next)=>{   //渲染登陆页面
	 await ctx.render('admin/login');
})

router.get('/admin',async (ctx,next)=>{  //渲染首页
	 await ctx.render('admin/index');
})

router.get('/register',async(ctx,next)=>{  //渲染注册页面
	await ctx.render('admin/register')
})

router.post('/captcha',controller.captcha)  //验证码

router.post('/login',controller.login)  //登陆

router.post('/register',controller.register)  //注册

router.post('/getuserinfo',controller.userinfo)  //获取用户基本信息

router.post('/exit',controller.exit)  //获取用户基本信息

module.exports = router
