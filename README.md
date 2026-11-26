# PayPal IPN forwarder for SellAuth

A Cloudflare Worker that gives you your own PayPal IPN URL and forwards every notification to SellAuth. Use it with the [PayPal Friends & Family](https://docs.sellauth.com/guides/payment-methods/paypal-ff) payment method, so your PayPal account points at an address that belongs only to you.

It runs on Cloudflare's free plan.

## Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sellauth-com/sellauth-paypal-ipn-forwarder)

1. Click the button and sign in to Cloudflare.
2. Connect a GitHub or GitLab account. Cloudflare copies this repository into it.
3. Choose a Worker name. The name becomes part of your URL, so pick your own.
4. Start the deployment and wait for it to finish.
5. Copy the Worker URL. It looks like `https://your-worker-name.your-subdomain.workers.dev`.

## Point PayPal at it

1. Open [PayPal's IPN settings](https://www.paypal.com/merchantnotification/ipn/preference/edit).
2. Enter your Worker URL in **Notification URL**.
3. Select **Receive IPN messages (Enabled)**.
4. Save.

## Check that it works

Open your Worker URL in a browser. `Only POST allowed` means the Worker is live.

Then place a small test order in your shop and pay it with Friends & Family. The order should complete on its own. [PayPal's IPN history](https://www.paypal.com/merchantnotification/ipn/history) lists every notification PayPal sent and whether it was delivered.

## How it works

PayPal sends each notification to your Worker as a `POST` request. The Worker passes the body, unchanged, to `https://webhooks.sellauth.com/v1/paypal-ff` and returns SellAuth's answer to PayPal. SellAuth confirms the notification with PayPal before it processes the order. The Worker stores nothing.

All of the code is in [src/index.js](src/index.js).

## Deploy from your computer

If you would rather not connect a Git account:

```bash
npm install
npx wrangler deploy
```

Wrangler asks you to sign in to Cloudflare the first time.
