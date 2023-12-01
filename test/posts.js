require("dotenv").config();
import { expect } from "chai";
import { before, describe, it } from "mocha";
import { createRandonUser, createRandonUserWithFaker } from "../helper/user_helper";

import request  from "../config/common";

import { Faker, es, pt_BR } from '@faker-js/faker';
const faker = new Faker({locale : [pt_BR]});

const TOKEN = process.env.USER_TOKEN;

describe('User Posts', () => {
  let postId, userId;
  before(async () => {
    userId = await createRandonUserWithFaker();
  });

  it('/posts', async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs()
    }

    const postRes = await request
      .post('posts')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data);

    console.log(postRes.body);  
    expect(postRes.body).to.deep.include(data);
    postId = postRes.body.id;
    console.log(postId);
  });

  it('GET /posts/:id', async () => {
    await request
      .get(`posts/${postId}`)
      .set('Authorization', `Bearer ${TOKEN}`).expect(200);
  });

  describe('Negative Tests', () => {
    it('401 Authentication Failed', async () => {
      const data = {
        user_id: userId,
        title: "Usitas amissio clarus tibi deripio.",
        body: "Curto e Grosso"
      }

      const postRes = await request
        .post('posts')
        .send(data);     
      
      expect(postRes.statusCode).to.eq(401);
      expect(postRes.body.message).to.eq('Authentication failed');

    });

    it('422 Validation Failed', async () => {
      const data = {
        user_id: userId,
        title: "Usitas amissio clarus tibi deripio."        
      }

      const postRes = await request
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);     
      
      expect(postRes.statusCode).to.eq(422);
      expect(postRes.body[0].message).to.eq("can't be blank");
      expect(postRes.body[0].field).to.eq('body');
    });

  });

});


