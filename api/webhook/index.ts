import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { get_access_token } from "../helpers/helpers";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    context.log(`Request body: ${req.body}`);

    if (!(req.body && typeof (req.body) == 'object')) {
        context.res = {
            status: 400,
        };
    } else {

        const token = await get_access_token();
        const access_token = token['access_token'];

        const subscriptionId = req.body['subscriptionId'];
        const operationId = req.body['id'];

        const operations_url = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/${subscriptionId}/operations/${operationId}?api-version=2018-08-31`;
        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        };
        const data = { status: 'Failure' };

        context.log(`Calling operations.patch(Failure): ${operations_url}`);

        const response = await fetch(operations_url,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(data)
            });

        if (!response.ok) {
            context.log(`Patch operation failed. Status code, Status text: ${response.status}, ${response.statusText}`)
            context.res = {
                status: response.status,
                body: "Error calling patch operation"
            };
        } else {

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "OK"
            };
        }
    }
};

export default httpTrigger;