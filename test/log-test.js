/**
 * Created by cc on 2019-06-13.
 */
"use strict";

const app = require('../server');
const server = app.listen();
const request = require('supertest').agent(server);
const expect = require('chai').expect;
const fs = require('fs');
const db = require('../db');

describe('Log router', function () {
  
  beforeEach(async () => {
    await db.mongoose.connection.dropDatabase()
  });
  
  it('should save log when visit redirection', async () => {
    let r = await db.redirection.create({url: 'kk'});
    await request.get(`/redirection/${r.id}`).expect(302);
    expect(await db.log.count()).to.equals(1);
  
    let body;
    ({body} = await request.get(`/redirection/summary/${r.id}`));
    expect(body).to.have.property('summary')
      .and.to.have.length.above(0)
  });
});

