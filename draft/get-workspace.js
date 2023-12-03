console.log("oiaa");
const starkbank = require('starkbank');
import qa from "../config/spark-sandbox";

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
/* console.log("end");
console.log(user);

(async() => {
    let workspaces = await starkbank.workspace.query();

    for await (let workspace of workspaces) {
        console.log(workspace);
    }
})();

console.log("end1");

(async() => {
    let workspace = await starkbank.workspace.get('6271828389527552');
    console.log(workspace);
})();
console.log("end2");

(async() => {
    let balance = await starkbank.balance.get();

    console.log(balance);
})();

console.log("end3");

(async() => {
    let transactions = await starkbank.transaction.query({
        after: '2020-04-01',
        before: '2020-04-30'
    });

    for await (let transaction of transactions) {
        console.log(transaction);
    }
})();
console.log("end4");
(async() => {
    let transaction = await starkbank.transaction.get('5737863681409024');
    console.log(transaction);
})();
console.log("end5");
(async() => {
    let invoices = await starkbank.invoice.create([{
        amount: 400000,
        due: '2021-05-12T15:23:37.585+00:00',
        taxId: '012.345.678-90',
        name: 'Arya Stark',
        expiration: 123456789,
        fine: 2.5,
        interest: 1.3,
        discounts: [
            {
                'percentage': 10,
                'due': '2021-03-12T15:23:26.249976+00:00'
            }
        ],
        tags: ['War supply', 'Invoice #1234'],
        descriptions: [
            {
                'key': 'Arya',
                'value': 'Not today'
            }
        ],
        rules: [
            {
                'key': 'allowedTaxIds',
                'value': [
                    '012.345.678-90',
                    '45.059.493/0001-73'
                ]
            }
        ]
    }]);

    for (let invoice of invoices) {
        console.log(invoice);
    }
})();
console.log("end6");
(async() => {
    let invoices = await starkbank.invoice.query({
        after: '2020-10-01',
        before: '2020-10-30',
    });

    for await (let invoice of invoices) {
        console.log(invoice);
    }
})();
console.log("end7");
(async() => {
    let brcodes = await starkbank.dynamicBrcode.create([{
        amount: 4000,
        expiration: 123456789,
        tags: ['New sword', 'DynamicBrcode #1234']
    }]);

    for (let brcode of brcodes) {
        console.log(brcode);
    }
})();
console.log("end8");

(async() => {
    let brcodes = await starkbank.dynamicBrcode.query({
        after: '2023-02-01',
        before: '2024-02-28',
    });

    for await (let brcode of brcodes) {
        console.log("listing");
        console.log(brcode);
    }
})(); */

console.log("end9");

(async() => {
    let workspace = await starkbank.workspace.get('6271828389527552');
    console.log(workspace);
})();

(async() => {
    let transfers = await starkbank.transfer.create([
        {
            amount: 1000000,
            bankCode: '20018183',
            branchCode: '2201',
            accountNumber: '10000-0',
            taxId: '123.456.789-10',
            name: 'Daenerys Targaryen Stormborn',
            externalId: 'my-external-id',
            scheduled: '2023-12-02',
            tags: ['daenerys', 'invoice/1234'],
            rules: [
                {
                    key: 'resendingLimit',
                    value: 5
                }
            ]
        }
    ])

    for (let transfer of transfers) {
        console.log("log tranfer");
        console.log(transfer);
    }
})();

(async() => {
    let transfers = await starkbank.transfer.query({
        after: '2020-04-01',
        before: '2024-04-30',
    });

    for await (let transfer of transfers) {
        console.log(transfer);
    }
})();

(async() => {
    let transfer = await starkbank.transfer.get('5737863681409024');
    console.log(transfer);
})();
  

console.log("end10");
(async() => {
    let payments = await starkbank.brcodePayment.create([
        {
            brcode: "00020101021226890014br.gov.bcb.pix2567brcode-h.sandbox.starkinfra.com/v2/ace289aac1ce453b9ca64fb12ec525855204000053039865802BR5925Stark Bank S.A. - Institu6009Sao Paulo62070503***63044DDF",
            taxId: '012.345.678-90',
            description: "this will be fast",
            scheduled: '2023-12-02',
            tags: ['pix', 'qrcode'],
            amount: 666,
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
    }
})();
console.log("end11");
(async() => {
    let payments = await starkbank.brcodePayment.query({
        after: '2021-01-01',
        before: '2021-01-30'
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
console.log("end12");
(async() => {
    let log = await starkbank.brcodePayment.log.get('5624743520632832');
    console.log(log);
})();
console.log("end13");
let transfer = new starkbank.Transfer({
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
})();  
