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

describe('Redirection router', function () {
  
  beforeEach(async () => {
    await db.mongoose.connection.dropDatabase()
  });
  
  it('should create redirection ', async () => {
    let body;
    ({body} = await request.post('/upload')
      .attach('file', `${__dirname}/fixture/01_Cuppy_smile.png`));
    expect(body).to.have.property('url');
    expect(body).to.have.property('filePath');
    fs.unlinkSync(body.filePath);
    
    let url = body.url;
    ({body} = await request.post('/redirection/add')
      .send({url}));
    expect(body).to.have.property('to')
      .and.not.contains("undefined");
    expect(await db.redirection.countDocuments(), 1);
  });
  
  it('should reuse redirection', async () => {
    let o = await db.redirection.create({from: 'kk'});
    let {body} = await request.post('/redirection/add')
      .send({url: 'kk'});
    expect(body).to.have.property('to').and.to.contains(o._id.toString())
  });
});

