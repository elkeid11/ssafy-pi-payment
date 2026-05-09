module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId) return res.status(400).json({ error: 'paymentId is required' });
    if (!txid) return res.status(400).json({ error: 'txid is required' });

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'PI_API_KEY environment variable is missing' });

    const response = await fetch(`https://api.minepi.com/v2/payments/${encodeURIComponent(paymentId)}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (_) { data = { raw: text }; }
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || String(error) });
  }
};
