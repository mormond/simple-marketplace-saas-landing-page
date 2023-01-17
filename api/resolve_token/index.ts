import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { get_access_token } from "../helpers/helpers";
const fetch = require("node-fetch")

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    if (!(req.body && req.body['marketplace_token'])) {
        context.res = {
            status: 400,
            body: "No marketplace token found in request body."
        };
    }
    else {

        const marketplace_token = req.body.marketplace_token;
        const decoded_mp_token = decodeURIComponent(marketplace_token);

        const token = await get_access_token();
        const access_token = token['access_token'];

        const resolve_url = 'https://marketplaceapi.microsoft.com/api/saas/subscriptions/resolve?api-version=2018-08-31'
        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'x-ms-marketplace-token': `${decoded_mp_token}`
        }

        const response = await fetch(resolve_url,
            {
                headers: headers,
                method: 'POST'
            });
            
        const resolved_token = await response.json()

        if (!response.ok) {
            context.res = {
                status: response.status_code,
                body: response.status
            };
        }
        else {
            context.res = {
                status: response.status_code,
                body: JSON.stringify(resolved_token)
            };
        }
    }
}

export default httpTrigger;