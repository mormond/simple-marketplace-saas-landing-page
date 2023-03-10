import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { get_access_token } from '../helpers/helpers';
import fetch = require('node-fetch');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  if (req.body?.marketplace_token === undefined) {
    context.res = {
      status: 400,
      body: JSON.stringify({
        error: 'No valid marketplace token found in request body.'
      })
    };

    return;
  }

  const marketplaceToken = req.body.marketplace_token;
  const decodedToken = decodeURIComponent(marketplaceToken);

  const token = await get_access_token();
  const accessToken: string = token.access_token;

  const resolveUrl =
    'https://marketplaceapi.microsoft.com/api/saas/subscriptions/resolve?api-version=2018-08-31';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'x-ms-marketplace-token': `${decodedToken}`
  };

  const response = await fetch(resolveUrl, {
    headers,
    method: 'POST'
  });

  if (response.ok !== true) {
    context.res = {
      status: response.status,
      body: JSON.stringify({ error: response.statusText })
    };

    return;
  }

  const resolvedToken = await response.json();

  context.res = {
    status: response.status,
    body: JSON.stringify(resolvedToken)
  };
};

export default httpTrigger;
