import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/")

const TOKEN = 'f55621b105654be7e6ac4dc0ac94c09b5c6e5699d8599a084fa754f9b44eb83c'

xdescribe('Users', () => {
    it('GET /users', () => {
        /*     request.get(`users?access-token=${TOKEN}`).end((err, res) => {
                expect(res.body).to.be.empty;
                done();
            }); */

        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body).to.not.be.empty;

        });
    });

    it('GET /users/:id', () => {
        return request.get(`users/5803251?access-token=${TOKEN}`).then((res) => {
            expect(res.body.id).to.be.eq(5803251);
        });
    });

    it('GET /users with query params', () => {
        const url = `users?access-token=${TOKEN}&page=1&gender=female&status=inactive`;
    
        return request.get(url).then((res) => {
          expect(res.body).to.not.be.empty;
          res.body.forEach((data) => {
            expect(data.gender).to.eq('female');
            expect(data.status).to.eq('inactive');
          });
        });
      });

      it('POST /users', () => {
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
          });
      });

      it('PUT /users/:id', () => {
        const data = {
          status: 'active',
          name: `Juli - ${Math.floor(Math.random() * 9999)}`,
        };
    
        return request
          .put('users/5803251')
          .set('Authorization', `Bearer ${TOKEN}`)
          .send(data)
          .then((res) => {
            console.log(res.body);
            expect(res.body).to.deep.include(data);
          });
      });

      it('DELETE /users/:id', () => {
        return request
          .delete('users/5803251')
          .set('Authorization', `Bearer ${TOKEN}`)
          .then((res) => {
            console.log(res.body);
            expect(res.statusCode).to.be.eq(204);
          });
      });
})
