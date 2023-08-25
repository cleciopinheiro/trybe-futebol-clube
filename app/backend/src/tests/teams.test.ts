import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import TeamModel from '../database/models/team.model';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('##GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste se é possível listar todos os produtos', async function () {
    const response = await chai.request(app)
      .get('/teams');

    expect(response).to.have.status(200);
  });
});
