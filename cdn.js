/**
 * Created by cc on 2019-06-12.
 */
"use strict";

const db = require('./db');
const {composePage} = require('./config')

let saveFile = async (fileName) => {
  await db.file.create({name: fileName})
  return composePage(fileName)
};



module.exports = {saveFile: saveFile};