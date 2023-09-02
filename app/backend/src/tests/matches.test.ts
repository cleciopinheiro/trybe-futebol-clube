import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/match.model';
import MatchesMock from '../tests/mocks/matches.mock';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const acess = {email: 'admin@admin.com'};
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzYzMzUzNn0.z8gRlSqj_i8cV1IEmjx7qy6z0RuRws8kGAQf2I1vWKQ';

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

  it('Teste se é possível criar uma partida', async function () {
    const match = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    sinon.stub(jwt, 'verify').returns(acess as any);
    const response = await chai.request(app).post('/matches')
    .set('Authorization', token)
    .send(match);
    expect(response.status).to.be.equal(201);
  });

  it('Teste se não é possível criar uma partida com dois times iguais', async function () {
    const match = {
      "homeTeamId": 16,
      "awayTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    sinon.stub(jwt, 'verify').returns(acess as any);
    const response = await chai.request(app).post('/matches')
    .set('Authorization', token)
    .send(match);
    expect(response.status).to.be.equal(422);
  });

  it('Teste se não é possível criar uma partida com um time inexistente', async function () {
    const match = {
      "homeTeamId": 16,
      "awayTeamId": 100,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    sinon.stub(jwt, 'verify').returns(acess as any);
    const response = await chai.request(app).post('/matches')
    .set('Authorization', token)
    .send(match);
    expect(response.status).to.be.equal(404);
  });

  it('Teste se é possível atualizar uma partida', async function () {
    const match = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    sinon.stub(MatchesModel, 'update').resolves({} as any);
    sinon.stub(jwt, 'verify').returns(acess as any);
    const response = await chai.request(app).patch('/matches/1')
    .set('Authorization', token)
    .send(match);
    expect(response.status).to.be.equal(200);
  });

  it('Teste se é possível finalizar uma partida', async function () {
    sinon.stub(MatchesModel, 'update').resolves({} as any);
    sinon.stub(jwt, 'verify').returns(acess as any);
    const response = await chai.request(app).patch('/matches/1/finish')
    .set('Authorization', token);
    expect(response.status).to.be.equal(200);
  });
});