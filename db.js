/**
 * Created by cc on 2019-06-12.
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {host} = require('./config')

const dbName = process.env['test'] ? 'qrserver_test' : 'qrserver'
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true});

let fileSchema = new Schema({name: String}, {timestamps: true});
const file = mongoose.model('file', fileSchema);

let redirectionSchema = new Schema({
  from: String,
}, {timestamps: true});
redirectionSchema.virtual("to").get(() => {
  return `${host}/redirect/${this._id}`
});

const redirection = mongoose.model('redirection', redirectionSchema);

module.exports = {
  file,
  redirection,
  mongoose
};
