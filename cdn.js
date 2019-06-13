/**
 * Created by cc on 2019-06-12.
 */
"use strict";

const db = require('./db');
const {composeImagePage} = require('./config')

let saveToDb = async (fileName) => {
  await db.file.create({name: fileName})
  return composeImagePage(fileName)
};



module.exports = {saveFile: saveToDb};