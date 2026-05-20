export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, txid } = req.body || {};

    if (!paymentId || !txid) {
      return res.status(400).json({ error: 'Missing paymentId or txid' });
    }

    const apiKey = (process.env.PI_API_KEY || '').trim();

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing PI_API_KEY environment variable' });
    }

    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${apiKey}`
      },
      body: JSON.stringify({ txid })
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { raw: text };
    }

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message || String(error)
    });
  }
}
