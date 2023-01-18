import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { get_access_token } from '../helpers/helpers';
import fetch = require('node-fetch');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  context.log(`Request body: ${req.body as string}`);

  if (req.body === undefined || typeof req.body !== 'object') {
    context.res = {
      status: 400
    };
    return;
  }

  const token = await get_access_token();
  const accessToken: string = token.access_token;

  const subscriptionId: string = req.body.subscriptionId;
  const operationId: string = req.body.id;

  const operationsUrl = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/${subscriptionId}/operations/${operationId}?api-version=2018-08-31`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };
  const data = { status: 'Failure' };

  context.log(`Calling operations.patch(Failure): ${operationsUrl}`);

  const response = await fetch(operationsUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (response.ok !== true) {
    context.log(
      `Patch operation failed. Status code, Status text: ${
        response.status as string
      }, ${response.statusText as string}`
    );
    context.res = {
      status: response.status,
      body: 'Error calling patch operation'
    };
    return;
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: 'OK'
  };
};

export default httpTrigger;
