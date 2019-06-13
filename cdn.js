/**
 * Created by cc on 2019-06-12.
 */
"use strict";

const db = require('./db');
const host = String.raw`http://127.0.0.1:3000`

function composeImageUrl(fileName) {
  return host +'/image/' + fileName
}

let composeImagePage = (fileName) => {
  return `${host}/page/image/${fileName}`
};

let saveToDb = async (fileName) => {
  await db.file.create({name: fileName})
  return composeImagePage(fileName)
};



module.exports = {saveFile: saveToDb, composeImageUrl, composeImagePage};