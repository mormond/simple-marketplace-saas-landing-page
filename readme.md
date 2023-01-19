# Marketplace SaaS Offer Landing Page

## Overview

This is a simple (crude) landing page implementation for a Microsoft commercial marketplace SaaS offer landing page. Implemented as a static web app (SWA), it will authenticate with the Marketplace fulfillment APIs, acquire an access token and then call the `resolve` API to decode and display the marketplace token. It also exposes a webhook, allowing you to trace webhook calls from marketplace.

## Instructions

* Clone or fork the repo so you have your own copy
* Create a static web app resource in Azure
* Link your SWA to your new repo
* Create a new AAD app registration
* Populate the SWA Configuration with the following App Settings (from your app registration)
  * CLIENT_ID
  * CLIENT_SECRET
  * TENANT_ID
* In Partner Center, update the offer technical configuration with landing page and app registration details
* Re-publish for the changes to take effect

## Example Site

### Initial Landing Page

![Landing page before token decode.](./.media/landingpage1.png)

### After Token Decode

![Landing page after token decode.](./.media/landingpage2.png)

## References

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build JavaScript apps in minutes. Use [this repo](https://github.com/staticwebdev/vanilla-basic) with the [quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript) to build and customize a new static site.
