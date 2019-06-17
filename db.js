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
  from: {type: String, unique: true},
}, {timestamps: true});
redirectionSchema.virtual("to").get(function() {
  return `${host}/redirection/${this._id}`
});
const redirection = mongoose.model('redirection', redirectionSchema);

let logSchema = new Schema({
  redirection: {
    type: Schema.Types.ObjectId, ref: 'redirection',
  },
  create: {type: Date, expires: '15d', default: Date.now}
}, {timestamps: true});
const log = mongoose.model('log', logSchema)


module.exports = {
  file,
  redirection,
  log,
  mongoose
};
