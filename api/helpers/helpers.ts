const fetch = require("node-fetch")

const get_access_token = async () => {

    const tenant_id = process.env['TENANT_ID'];
    const client_id = process.env['CLIENT_ID'];
    const client_secret = process.env['CLIENT_SECRET'];

    const auth_url = `https://login.microsoftonline.com/${tenant_id}/oauth2/token`;
    const auth_headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    const auth_data = new URLSearchParams(
        {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'client_credentials',
            'resource': '20e940b3-4c77-4b0b-9a53-9e16a1b010a7'
        });

    const response = await fetch(auth_url,
        {
            headers: auth_headers,
            body: auth_data,
            method: 'POST',
        });

    return response.json();
}

export { get_access_token }