import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamModel from '../database/models/team.model';
import TeamsMock from './mocks/teams.mock';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota /teams', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste se é possível listar todos os times', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(TeamsMock as any);
    const response = await chai.request(app)
      .get('/teams');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  it('Teste se é possível achar um um time pelo id', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(TeamsMock[0] as any);
    const response = await chai.request(app)
      .get('/teams/1');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
  });
});
