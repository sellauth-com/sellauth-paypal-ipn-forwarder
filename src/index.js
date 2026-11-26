const TARGET_URL = 'https://webhooks.sellauth.com/v1/paypal-ff';

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Only POST allowed', {
        status: 405,
        headers: { Allow: 'POST' },
      });
    }

    try {
      const upstream = await fetch(TARGET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': request.headers.get('Content-Type') ?? 'application/x-www-form-urlencoded',
        },
        body: await request.arrayBuffer(),
      });

      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          'Content-Type': upstream.headers.get('Content-Type') ?? 'text/plain',
        },
      });
    } catch {
      return new Response('Forwarding error', { status: 502 });
    }
  },
};
