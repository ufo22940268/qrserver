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

describe('record', function () {
  
  beforeEach(async () => {
    await db.mongoose.connection.dropDatabase()
  });
  
  it('should record image page is visited', async () => {
    let body;
    ({body} = await request.post('/upload')
      .attach('file', `${__dirname}/fixture/01_Cuppy_smile.png`));
    expect(body).to.have.property('url');
    expect(body).to.have.property('filePath');
    fs.unlinkSync(body.filePath);
    
    let url = body.url;
    ({body} = await request.post('/record/add')
      .send({url}));
    expect(body).to.have.property('to');
    expect(await db.redirection.countDocuments(), 1)
  });
});

