/**
 * Created by cc on 2019-06-11.
 */
"use strict";

const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
let app = new Koa();
const cdn = require('./cdn');
const path = require('path')

const router = Router();

app.use(router.routes());

let upload = async ctx => {
  console.log('ctx.request.files: ' + JSON.stringify(ctx.request.files, null, 4) + '\n');
  if (ctx.request.files) {
    let filePath = ctx.request.files[Object.keys(ctx.request.files)[0]].path
    let fileName = path.basename(filePath)
    let url = await cdn.saveFile(fileName)
    ctx.body = JSON.stringify({url: url})
  }
};

router.post("/upload", KoaBody(
  {
    multipart: true,
    formLimit: "2mb",
    formidable: {
      uploadDir: __dirname + '/uploads'
    }
  }
), upload);


app.listen(3000);
