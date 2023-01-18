import fetch = require('node-fetch');

const getAccessToken = async (): Promise<any> => {
  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  if (
    tenantId === undefined ||
    clientId === undefined ||
    clientSecret === undefined
  ) {
    throw new Error('TenantId, ClientId and ClientSecret are required');
  }

  const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded'
  };

  const data = new URLSearchParams([
    ['client_id', clientId],
    ['client_secret', clientSecret],
    ['grant_type', 'client_credentials'],
    ['resource', '20e940b3-4c77-4b0b-9a53-9e16a1b010a7']
  ]);

  const response = await fetch(authUrl, {
    headers,
    body: data,
    method: 'POST'
  });

  return response.json();
};

export { getAccessToken as get_access_token };
