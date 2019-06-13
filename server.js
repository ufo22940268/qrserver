/**
 * Created by cc on 2019-06-11.
 */
"use strict";

const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const mount = require('koa-mount');
const KoaBody = require('koa-body');
const render = require('koa-ejs');
let app = new Koa();
const cdn = require('./cdn');
const path = require('path');
const compose = require('koa-compose');

const router = Router();

let combineRouters = (...routers) => {
  return compose(routers.map(r => r.routes()))
};

app.use(combineRouters(router, require('./router/recordRouter.js')));
// app.use(router.routes());
render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
});


let upload = async ctx => {
  console.log('upload');
  if (ctx.request.files) {
    let filePath = ctx.request.files[Object.keys(ctx.request.files)[0]].path;
    let fileName = path.basename(filePath);
    let url = await cdn.saveFile(fileName);
    ctx.body = {url, filePath}
  }
};

router.get('/test', ctx => {
  ctx.body = "testaaaaaaa"
});

router.post('/upload', KoaBody(
  {
    multipart: true,
    formLimit: "2mb",
    formidable: {
      uploadDir: __dirname + '/uploads'
    }
  }
), upload);

router.get('/page/image/:id', async ctx => {
  await ctx.render('image', {image: {url: cdn.composeImageUrl(ctx.params.id)}})
});

app.use(mount('/image', KoaStatic(__dirname + "/uploads")));

if (!module.parent) app.listen(3000);

module.exports = app
