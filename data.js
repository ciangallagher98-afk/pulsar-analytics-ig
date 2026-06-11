// netlify/functions/data.js
// Proxies GraphQL requests to data.pulsarplatform.com (results/analytics)

const https = require('https');

exports.handler = async function(event) {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: 'Method not allowed' };
  }

  try {
    const result = await proxyTo('data.pulsarplatform.com', '/graphql/trac', event);
    return {
      statusCode: result.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: result.body,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Proxy error: ' + err.message }),
    };
  }
};

function proxyTo(host, path, event) {
  return new Promise((resolve, reject) => {
    const body = event.body || '';
    const options = {
      hostname: host,
      path,
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...(event.headers?.authorization
          ? { Authorization: event.headers.authorization }
          : {}),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
