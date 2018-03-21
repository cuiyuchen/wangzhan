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

router.get('/captcha',controller.captcha)  //验证码

router.post('/login',controller.login)  //登陆

module.exports = router
