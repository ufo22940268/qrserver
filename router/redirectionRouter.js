/**
 * Created by cc on 2019-06-13.
 */
"use strict";
const router = require('koa-router')();
const db = require('../db');

router.post('/redirection/add', async (ctx) => {
  let {url} = ctx.request.body;
  let r;
  if ((r = await db.redirection.findOne({from: url})) === null) {
    r = await db.redirection.create({from: url});
  }
  ctx.body = {to: r.to}
});

router.get('/redirection/:id', async (ctx) => {
  
  let redirection = await db.redirection.findById(ctx.params.id).exec();
  if (!redirection) {
    throw new Error('id not found')
  }
  
  await db.log.create({redirection: ctx.params.id});
  ctx.redirect(redirection.to)
});

module.exports = router;