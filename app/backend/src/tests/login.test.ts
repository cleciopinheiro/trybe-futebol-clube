import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../database/models/user.model';
import LoginMock from '../tests/mocks/login.mock';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const acess = {email: 'admin@admin.com'};

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzYzMzUzNn0.z8gRlSqj_i8cV1IEmjx7qy6z0RuRws8kGAQf2I1vWKQ';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzAxNzY0MX0.dNTY0ZaJ0Vw-A9FSz2npz8myWEaUJghtMmcuCaIUJcA'

describe('Teste a rota /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste se é possível logar com sucesso', async function () {
    sinon.stub(UserModel, 'findOne').resolves(LoginMock as any);
    sinon.stub(jwt, 'sign').returns(token as any);

    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
  });

  it('Teste se retorna um erro caso o usuário não preencha o campo email', async function () {
    sinon.stub(UserModel, 'findOne').resolves();

    const response = await chai.request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
  });

  it('Teste se retorna um erro caso o usuário não preencha o campo password', async function () {
    sinon.stub(UserModel, 'findOne').resolves();

    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
  });

  it('Teste se o usuário não informa email válido', async () => {
    const response = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'admin@teste.com',
              password: 'secret_admin'
            });

    expect(response.status).to.be.equal(401);
  });

  it('Teste se o usuário não informa senha válida', async () => {
    const response = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'admin@teste.com',
              password: 'password'
            });

    expect(response.status).to.be.equal(401);
  });

  it('Teste se é possível logar com formato de email inválido', async () => {
    sinon.stub(UserModel, 'findOne').resolves(LoginMock as any);

    const response = await chai
            .request(app)
            .post('/login')
            .send({ email: 'adminadmin', password: 'secret_admin' });

    expect(response.status).to.be.equal(401);
  });

  it('Teste se é possível logar com a senha com menos de 6 caracteres', async () => {
    sinon.stub(UserModel, 'findOne').resolves(LoginMock as any);

    const response = await chai
            .request(app)
            .post('/login')
            .send({ email: 'admin@admin.com', password: '12345' });
            
    expect(response.status).to.be.equal(401);
  });
  

  it('Teste se é possível logar com sucesso com a role correta', async function () {
    sinon.stub(jwt, 'verify').returns(acess as any);
    sinon.stub(UserModel, 'findOne').resolves(LoginMock as any);
  
    const response = await chai.request(app)
    .get('/login/role')
    .set('Authorization', auth);
  
    expect(response).to.have.status(200);
  });
  
});
