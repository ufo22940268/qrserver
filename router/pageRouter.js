/**
 * Created by cc on 2019-06-13.
 */
"use strict";
const router = require('koa-router')();
const {composeStaticUrl} = require('../config');

router.get('/page/image/:id', async ctx => {
  await ctx.render('image', {image: {url: composeStaticUrl(ctx.params.id)}})
});

router.get('/page/video/:file', async ctx => {
  await ctx.render('video', {video: {url: `/stream/${ctx.params.file}`}})
});

module.exports = router;