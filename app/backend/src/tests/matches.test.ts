import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/match.model';
import MatchesMock from '../tests/mocks/matches.mock';
import JWT from '../utils/JWT';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota /matches', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste se é possível listar todas as partidas', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(MatchesMock as any);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
  });

  it('Teste se filtrar as partidas em progresso', async function () {
    const matchesInProgress = MatchesMock.filter((match) => match.inProgress === true);
    sinon.stub(MatchesModel, 'findAll').resolves(MatchesMock as any);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
  });

  it('Teste se filtrar as partidas finalizadas', async function () {
    const matchesInProgress = MatchesMock.filter((match) => match.inProgress === false);
    sinon.stub(MatchesModel, 'findAll').resolves(MatchesMock as any);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
  });

  // it('Teste se é possível atualizar uma partida', async function () {
  //   sinon.stub(JWT, 'verify').returns({ email: 'admin@admin.com' });
  //   sinon.stub(MatchesModel, 'update').resolves();
  //   const response = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 1, awayTeamGoals: 0 });
  //   expect(response.status).to.be.equal(200);
  // });

  // it('Teste se é possível atualizar uma partida como finalizada', async function () {
  //   sinon.stub(MatchesModel, 'update').resolves();
  //   const response = await chai.request(app)
  //   .patch('/matches/1/finish').send({ homeTeamGoals: 1, awayTeamGoals: 0 });
  //   expect(response.status).to.be.equal(200);
  // });
});