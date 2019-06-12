/**
 * Created by cc on 2019-06-12.
 */
"use strict";

const db = require('./db');
const host = String.raw`http://127.0.0.1:3000`

function composeImageUrl(fileName) {
  return host +'/image/' + fileName
}

let saveToDb = async (fileName) => {
  await db.file.create({name: fileName})
  return composeImageUrl(fileName)
};



module.exports = {saveFile: saveToDb, composeImageUrl};