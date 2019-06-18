/**
 * Created by cc on 2019-06-14.
 */
"use strict";

const host = process.env.NODE_ENV === 'production' ? "http://106.12.82.179:3000" : String.raw`http://192.168.31.77:3000`;

function composeImageUrl(fileName) {
  return host +'/image/' + fileName
}

let composeImagePage = (fileName) => {
  return `${host}/page/image/${fileName}`
};

module.exports = {host, composeImagePage, composeImageUrl}
