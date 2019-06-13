/**
 * Created by cc on 2019-06-13.
 */
"use strict";

const app = require('../server');
const server = app.listen();
const request = require('supertest').agent(server);
const expect = require('chai').expect;
const fs = require('fs');
const db = require('../db')

describe('it', function () {
  
  beforeEach(async () => {
    await db.file.collection.drop()
  });
  
  it('should be ok', async () => {
    const {body} = await request.post('/upload')
      .attach('file', `${__dirname}/fixture/01_Cuppy_smile.png`)
    expect(body).to.have.property('url');
    expect(body).to.have.property('filePath');
    fs.unlinkSync(body.filePath)
  });
});
