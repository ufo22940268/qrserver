/**
 * Created by cc on 2019-06-14.
 */
"use strict";

const host = process.env.NODE_ENV === 'production' ? "http://106.12.82.179:3000" : String.raw`http://192.168.31.77:3000`;

function composeStaticUrl(fileName) {
  return host +'/static/' + fileName
}

function isVideo(fileName) {
  return /^video_/.test(fileName)
}

let composePage = (fileName) => {
  if (isVideo(fileName)) {
    return `${host}/page/video/${fileName}`
  } else {
    return `${host}/page/image/${fileName}`
  }
};

module.exports = {host, composePage: composePage, composeStaticUrl: composeStaticUrl};
