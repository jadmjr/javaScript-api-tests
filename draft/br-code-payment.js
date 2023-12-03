console.log("br-code-payments");
const starkbank = require('starkbank');

// This is only an example of a private key content. You should use your own key.
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

// for project users:
let user = new starkbank.Project({
    environment: 'sandbox',
    id: '6211482849116160',
    privateKey: privateKeyContent
});

starkbank.user = user;

console.log("br-code-user");

const paymentId = '';

(async () => {
    let payments = await starkbank.brcodePayment.create([
        {
            brcode: "00020101021226890014br.gov.bcb.pix2567brcode-h.sandbox.starkinfra.com/v2/ace289aac1ce453b9ca64fb12ec525855204000053039865802BR5925Stark Bank S.A. - Institu6009Sao Paulo62070503***63044DDF",
            taxId: '012.345.678-90',
            description: "this will be fast",
            scheduled: '2023-12-02',
            tags: ['pix', 'qrcode'],
            amount: 661,
            rules: [
                {
                    key: 'resendingLimit',
                    value: 5
                }
            ]
        },
    ]);

    for (let payment of payments) {
        console.log(payment);
        paymentId = payment;
    }

    console.log("aa");
    console.log(paymentId);
})()

//
/* let transfer = new starkbank.Transfer({
    amount: 100000000,
    taxId: "594.739.480-42",
    name: "Daenerys Targaryen Stormborn",
    bankCode: "341",
    branchCode: "2201",
    accountNumber: "76543-8"
});

let requests = [
    new starkbank.PaymentRequest({
        centerId: '4855981804617728',
        payment: transfer,
        tags: ["daenerys", "request/1234"],
    })
];

(async() => {
    requests = await starkbank.paymentRequest.create(requests);

    for await (let request of requests){
        console.log(request);
    }
})(); */
