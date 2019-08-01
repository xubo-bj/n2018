const router = require('koa-router')()
const path = require('path')
const ejsPath = 'baidu/'

router.prefix('/baidu')

router.get('/', async(ctx, next)=> {
    await ctx.render(path.join(ejsPath,'index'))
})

module.exports = router
