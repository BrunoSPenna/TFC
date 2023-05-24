import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { App } from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/Users';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mock = {
    email: 'xalaug@gmail.com',
    password: 'xablau'
}

const modelMock = {
    id: 1,
    username: 'xablau',
    email: 'xablau@gmail.com',
    password: 'xablau',
    role: 'xablau',
}

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY3MDUzNTE0MywiZXhwIjoxNjcwNjIxNTQzfQ.l7K-nivevzF8qKZEQl9lQzY2FcfU9mdTrawI0dTFmY8`

const createTokenMock = async () => {
  let response: Response;
  sinon
      .stub(UserModel, "findOne")
      .resolves(modelMock as UserModel);
  sinon.stub(bcrypt, 'compareSync').returns(true);
  response = await chai.request(app).post('/login').send(mock);
  return response.body.token;
}

describe('Verifica a rota login', () => {
  let response: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(modelMock as UserModel);
  });

  afterEach(sinon.restore);
  it('Verifica se o login está correto', async () => {
    sinon.stub(bcrypt, 'compareSync').returns(true);
    response = await chai.request(app).post('/login').send(mock);
    expect(response.status).to.be.eq(200);
    token = response.body.token;

  });  

 });   

export { createTokenMock };