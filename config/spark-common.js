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