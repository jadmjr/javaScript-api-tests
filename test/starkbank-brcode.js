require("dotenv").config();
import { before, describe, it } from "mocha";
const starkbank = require('starkbank');
var faker = require('faker-br');

let privateKeyContent = `
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEINyLtvEkzuGqBOTEu0qFPbMFwN6UfPFGAfbrJs3NJUN3oAcGBSuBBAAK
oUQDQgAEgBEJQJH5SmnkufXxYIrLRK8WrUsSaVu3Z4b0OgtDmV/usTPye7uBqzgU
w/IbT1FuttsyVhGE01tmZEg0vL7E5A==
-----END EC PRIVATE KEY-----
`
let user = new starkbank.Project({
  environment: 'sandbox',
  id: '6211482849116160',
  privateKey: privateKeyContent
});

describe.only('Spark BRCODE payment', () => {
  before(async () => {
    starkbank.user = user;
  });

  it('Create Brcode Payments', async () => {

    const paymentsData = [];
    for (let i = 0; i < 10; i++) {
      var scheduledSoonDate = faker.date.soon();

      paymentsData.push({
        brcode: "00020101021226890014br.gov.bcb.pix2567brcode-h.sandbox.starkinfra.com/v2/ace289aac1ce453b9ca64fb12ec525855204000053039865802BR5925Stark Bank S.A. - Institu6009Sao Paulo62070503***63044DDF",
        taxId: faker.br.cpf(),
        description: "automationTest",
        scheduled: scheduledSoonDate.toISOString().substring(0, 10),
        tags: ['pix', 'qrcode', faker.hacker.adjective()],
        amount: Math.floor(Math.floor(Math.random() * 7982.90) + 1),
        rules: [
          {
            key: 'resendingLimit',
            value: 5
          }
        ]
      });
    }

    (async () => {
      let payments = await starkbank.brcodePayment.create(paymentsData);
      /*       for (let payment of payments) {
              console.log(payment.id);        
            } */
      expect(payments).to.not.be.empty;
    })();

  });

});


