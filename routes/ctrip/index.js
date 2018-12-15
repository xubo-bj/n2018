const router = require('koa-router')()
const path = require('path')
const ejsPath = 'ctrip/'

router.prefix('/ctrip')

router.get('/', async(ctx, next)=> {
    await ctx.render(path.join(ejsPath,'index'))
})

module.exports = router

/*
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

*/