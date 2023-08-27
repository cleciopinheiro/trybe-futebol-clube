import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; // Certifique-se de importar os tipos corretos para req, res e next
import verifyToken from '../middlewares/token.middleware'; // Substitua pelo caminho correto
import { app } from '../app'; // Substitua pelo caminho correto

chai.use(chaiHttp);

const { expect } = chai;

describe('verifyToken Function', function () {
  let req: any, res: any, next: any;
  const validToken = 'validToken';
  const invalidToken = 'invalidToken';

  beforeEach(function () {
    sinon.restore();
    req = { headers: {}, body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  it('should pass with a valid token', async function () {
    req.headers.authorization = `Bearer ${validToken}`;
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com' } as any);

    await verifyToken(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(req.body.user).to.deep.equal({ email: 'admin@admin.com' });
  });

  it('should return 401 with an invalid token', async function () {
    req.headers.authorization = `Bearer ${invalidToken}`;
    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    await verifyToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should return 401 when no token is provided', async function () {
    await verifyToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token not found' })).to.be.true;
    expect(next.called).to.be.false;
  });
});
