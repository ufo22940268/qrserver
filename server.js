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
const range = require('koa-range');
const fs = require('fs');

const router = Router();

let combineRouters = (...routers) => {
  return compose(routers.map(r => r.routes()))
};

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
});
app.use(KoaBody());
app.use(range)
app.use(combineRouters(router,
  require('./router/redirectionRouter'),
  require('./router/pageRouter')));


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
  ctx.body = {a: 'jjjjj'}
});

router.post('/upload', KoaBody(
  {
    multipart: true,
    formLimit: "2mb",
    formidable: {
      uploadDir: __dirname + '/uploads',
    }
  }
), upload);

router.post('/upload/video', KoaBody(
  {
    multipart: true,
    formLimit: "7mb",
    formidable: {
      uploadDir: __dirname + '/uploads',
      onFileBegin: function (name, file) {
        let folder = path.dirname(file.path);
        let fileName = path.basename(file.path);
        fileName = fileName.replace(/^upload/, "video")
        file.path = path.join(folder, fileName);
      }
    }
  }
), upload);

router.get('/stream/:file', async ctx => {
  const filePath = `${__dirname}/uploads/${ctx.params.file}`;
  ctx.length = fs.statSync(filePath).size
  ctx.type = 'video/mp4';
  ctx.body = fs.createReadStream(filePath)
});


app.use(mount('/static', KoaStatic(__dirname + "/uploads")));

if (!module.parent) app.listen(3000);

module.exports = app;
