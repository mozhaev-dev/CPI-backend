import fs from 'fs';
import request from 'request';

const macaroon = fs
  .readFileSync('/Users/mozhaev/Projects/Work/cpi-backend/src/admin.macaroon')
  .toString('hex');

const sendRequest = (method, endpoint, body, callback) => {
  const url = 'https://87.120.144.26:10080';

  request(
    `${url}${endpoint}`,
    {
      method,
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
      json: true,
      rejectUnauthorized: false,
      form: JSON.stringify(body),
    },
    callback,
  );
};

const addinvoice = (amt) => {
  sendRequest(
    'post',
    '/v1/invoices',
    { amt_paid: amt },
    (error, response, body) => {
      console.log(body);
    },
  );
};

const listInvoices = () => {
  sendRequest('get', '/v1/invoices', {}, (error, response, body) => {
    console.log(body);
  });
};

const sendPayment = (req) => {
  sendRequest(
    'post',
    '/v1/channels/transactions',
    { payment_request: req },
    (error, response, body) => {
      console.log(body);
    },
  );
};

const connect = (pubkey, host) => {
  sendRequest(
    'post',
    '/v1/peers',
    { addr: { pubkey, host } },
    (error, response, body) => {
      console.log(body);
    },
  );
};

const disconnect = (pubkey) => {
  sendRequest('delete', `/v1/peers/${pubkey}`, {}, (error, response, body) => {
    console.log(body);
  });
};

const listPeers = () => {
  sendRequest('get', '/v1/peers', {}, (error, response, body) => {
    console.log(body);
  });
};

const openChannel = (pubkey, amt) => {
  sendRequest(
    'post',
    '/v1/channels',
    { node_pubkey_string: pubkey, local_funding_amount: amt },
    (error, response, body) => {
      console.log(body);
    },
  );
};

const listChannels = () => {
  sendRequest('get', '/v1/channels', {}, (error, response, body) => {
    console.log(body);
  });
};

const getInfo = () => {
  sendRequest('get', '/v1/getinfo', {}, (error, response, body) => {
    console.log(body);
  });
};

const listWallets = () => {
  sendRequest('get', '/v2/wallet/accounts', {}, (error, response, body) => {
    console.log(body);
  });
};

const walletBalance = () => {
  sendRequest('get', '/v1/balance/blockchain', {}, (error, response, body) => {
    console.log(body);
  });
};

// connect(
//   '037cc5f9f1da20ac0d60e83989729a204a33cc2d8e80438969fadf35c1c5f1233b',
//   '165.227.103.83:9735',
// );

// connect(
//   '02a606dad5dec0cebca903f02c0bd304f1aa5d3728812185ebd92633fc1a299af6',
//   'k3rhnrjoineh57af7jixdtbnp3qzl5s76f232tgxtckvd7ydfznaljad.onion:9735',
// );

// disconnect(
//   '03c2abfa93eacec04721c019644584424aab2ba4dff3ac9bdab4e9c97007491dda',
// );

// openChannel(
//   '02a606dad5dec0cebca903f02c0bd304f1aa5d3728812185ebd92633fc1a299af6',
//   20000,
// );
// walletBalance();

// listPeers();

// listChannels();
sendPayment(
  'lnbc1u1p394geapp50nk0c8s8dkdufmqc8uydywaxql3agddz5flrjrxxwl27c0kz08usdqqcqzpgxqyz5vqsp573dqudd2q3p5m2xd6w8hju9q59zvf4f7wr0pyupzevzgxptl0t3s9qyyssqj6ykd54csmuqneweg93t7rgk6s6wn8f0fqan6kxzm2y0gd72a22ss09wd4daqg4atu6umlk6u0a7e2eu54lysmcuay0gjrsfdjct47sq30h90a',
);
