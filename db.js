/**
 * Created by cc on 2019-06-12.
 */
"use strict";


const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/qrserver', {useNewUrlParser: true});

let fileSchema = new Schema({name: String}, {timestamps: true});
const file = mongoose.model('file', fileSchema);

module.exports = {
  file
};
