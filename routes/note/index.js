const router = require('koa-router')()
const path = require('path')
const ejsPath = 'note/'

router.prefix('/note')

router.get('/', async(ctx, next)=> {
    await ctx.render(path.join(ejsPath,'index'))
})
router.post('/create-folder',async(ctx,next)=>{
    ctx.body = ctx.request.body
})

module.exports = router
