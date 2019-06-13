/**
 * Created by cc on 2019-06-13.
 */
"use strict";
const router = require('koa-router')();
const db = require('../db');

router.post('/record/add', async (ctx) => {
  let {url} = ctx.request;
  let r = await db.redirection.create({from: url})
  ctx.body = {to: r.to}
});

module.exports = router;