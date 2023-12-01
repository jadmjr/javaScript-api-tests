import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/")

const TOKEN = 'f55621b105654be7e6ac4dc0ac94c09b5c6e5699d8599a084fa754f9b44eb83c'

describe('Users', () => {
  let userId;
  describe('POST', () => {
    it('/users', () => {
      const data = {
        email: `test-${Math.floor(Math.random() * 9999)}@faxada.com.br`,
        name: 'Test name',
        gender: 'male',
        status: 'inactive',
      };

      return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body).to.deep.include(data);
          userId = res.body.id;
        });
    });


  })

  describe('GET', () => {
    it('/users', () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty;

      });
    });

    it('users/:id', () => {
      return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
        expect(res.body.id).to.be.eq(userId);
      });
    });

    it('users with query params', () => {
      const url = `users?access-token=${TOKEN}&page=1&gender=female&status=inactive`;

      return request.get(url).then((res) => {
        expect(res.body).to.not.be.empty;
        res.body.forEach((data) => {
          expect(data.gender).to.eq('female');
          expect(data.status).to.eq('inactive');
        });
      });
    });
  })
  describe('PUT', () => {
    it('users/:id', () => {
      const data = {
        status: 'active',
        name: `Juli - ${Math.floor(Math.random() * 9999)}`,
      };

      return request
        .put(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {          
          expect(res.body).to.deep.include(data);
        });
    });

  })

  describe('DELETE', () => {
    it('users/:id', () => {
      return request
        .delete(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {        
          expect(res.statusCode).to.be.eq(204);
        });
    });

  })
})
