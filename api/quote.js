function readText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (readText(body.website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const lead = {
    name: readText(body.name, 120),
    email: readText(body.email, 254),
    phone: readText(body.phone, 80),
    company: readText(body.company, 160),
    country: readText(body.country, 100),
    quantity: readText(body.quantity, 100),
    message: readText(body.message, 4000) || 'No message provided.',
    source: readText(body.source, 500)
  };

  if (!lead.name || !lead.email || !lead.company || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return res.status(422).json({ error: 'Please complete the required inquiry fields.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const recipient = process.env.LEAD_RECIPIENT_EMAIL;
  if (!apiKey || !from || !recipient) {
    return res.status(503).json({ error: 'Lead delivery is not configured yet.' });
  }

  const text = [
    'New FrostPaw wholesale inquiry',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone || 'Not provided'}`,
    `Company: ${lead.company}`,
    `Country / Region: ${lead.country || 'Not provided'}`,
    `Estimated Quantity: ${lead.quantity || 'Not provided'}`,
    `Message: ${lead.message}`,
    '',
    `Source: ${lead.source || 'Not provided'}`
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: lead.email,
        subject: `Wholesale inquiry from ${lead.company}`,
        text
      })
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Lead delivery could not be completed.' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Lead delivery could not be completed.' });
  }
}
