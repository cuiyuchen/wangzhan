const route = require('koa-router');

const router = new route();

const controller = require('../controller');
console.info(controller);

//router.get('/login',controller.main)

router.get('/captcha',controller.captcha)

router.get('/login',controller.login)

module.exports = router
