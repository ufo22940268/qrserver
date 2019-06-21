/**
 * Created by cc on 2019-06-13.
 */
"use strict";
const router = require('koa-router')();
const db = require('../db');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/redirection/add', async (ctx) => {
  let {url} = ctx.request.body;
  let r;
  if ((r = await db.redirection.findOne({from: url})) === null) {
    r = await db.redirection.create({from: url});
  }
  ctx.body = {to: r.to}
});

router.get('/redirection/summary/:id', async (ctx) => {
  let summary = await db.log.aggregate([
    {$match: {redirection: ObjectId(ctx.params.id)}},
    {$group: {_id: {$dateToString: {date: "$createdAt", format: "%Y-%m-%d"}}, count: {$sum: 1}}},
    {$project: {date: '$_id', count: 1, _id: 0}},
    {$sort: {date: -1}}
  ]).exec();
  ctx.body = {
    summary
  }
});

router.get('/redirection/:id', async (ctx) => {
  let redirection = await db.redirection.findById(ctx.params.id).exec();
  if (!redirection) {
    throw new Error('id not found')
  }
  
  await db.log.create({redirection: ctx.params.id});
  ctx.redirect(redirection.from)
});


module.exports = router;