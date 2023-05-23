import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/Team';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockBody = {
    email: 'xablau@hotmail.com',
    password: 'xablau'
}

const teamsMock = [
    {
      id: 1,
      teamName: "Fluminense"
    },
    {
      id: 2,
      teamName: "Vasco"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
  ];

describe('testa a rota teams', () => {
  let response: Response;
  afterEach(sinon.restore);
  it('testa se retorna a lista de teams', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsMock as TeamModel[]);
    response = await chai.request(app).get('/teams').send();
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsMock);
  });
  it('testa se retorna teams por id', async () => {
    sinon
      .stub(TeamModel, "findOne")
      .resolves(teamsMock[1] as TeamModel);
    response = await chai.request(app).get('/teams/1').send();
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsMock[1]);
  });  
});   