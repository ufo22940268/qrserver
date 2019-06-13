/**
 * Created by cc on 2019-06-12.
 */
"use strict";


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const dbName = process.env['test'] ? 'qrserver_test' : 'qrserver'
const dbName = 'qrserver'
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true});

let fileSchema = new Schema({name: String}, {timestamps: true});
const file = mongoose.model('file', fileSchema);

module.exports = {
  file,
  mongoose
};
