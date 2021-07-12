
const Router = require('@koa/router')

const router = Router()
const project = require('../../config/project')

// page router
router.get('/', async (ctx) => {
  await ctx.render('index', project.makefuture)
  return
})

router.get('/makeh5/component/:cid', async (ctx) => {
  const { cid = '' } = ctx.params
  if (!cid) {
    await ctx.render('404')
    return
  }
  let comp = await model.component.findById(cid).lean()
  let files
  if (comp && comp._id && comp.files) {
    files = await model.file.find({
      _id: { $in: comp.files },
    })
  }
  comp.files = files
  ;(project.makeh5.data = JSON.stringify(comp)),
    await ctx.render('make', project.makeh5)
  return
})

router.get('/makepc/component/:cid', async (ctx) => {
  if (!cid) {
    await ctx.render('404')
    return
  }
  await ctx.render('make', project.makeh5)
  return
})

router.get('/makeapp/component/:cid', async (ctx) => {
  if (!cid) {
    await ctx.render('404')
    return
  }
  await ctx.render('make', project.makeh5)
  return
})

module.exports = router