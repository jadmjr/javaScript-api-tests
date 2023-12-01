import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/")

import { Faker, es, pt_BR } from '@faker-js/faker';
const faker = new Faker({locale : [pt_BR]});

const TOKEN = 'f55621b105654be7e6ac4dc0ac94c09b5c6e5699d8599a084fa754f9b44eb83c'

export const createRandonUser = async () => {
    const userData = {
        email: `test-${Math.floor(Math.random() * 9999)}@faxada.com.br`,
        name: 'Test name',
        gender: 'male',
        status: 'inactive',
    };

    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData)
    return res.body.id;

};

export const createRandonUserWithFaker = async () => {    
    const userData = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        gender: 'male',
        status: 'inactive',
    };

    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData)
    return res.body.id;

};