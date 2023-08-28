import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchModel from '../database/models/match.model';
import LeaderMock from './mocks/leader.mock';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota /leaderboard', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste se é possível retornar as informações de desempenho do time dos times da casa', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(LeaderMock as any);
    const response = await chai.request(app)
      .get('/leaderboard/home');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  it('Teste se é possível retornar as informações de desempenho do time dos times visitantes', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(LeaderMock as any);
    const response = await chai.request(app)
      .get('/leaderboard/away');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  it('Teste se é possível retornar as informações de desempenho de todos os times', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(LeaderMock as any);
    const response = await chai.request(app)
      .get('/leaderboard');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });
});
