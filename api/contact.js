export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    console.log(`Contact message received from ${name} (${email}): ${message}`);

    // For now, just log and return success
    // TODO: Integrate with email service (SendGrid, Resend, etc.) for actual delivery
    res.status(200).json({
        success: true,
        message: "Message received! We'll get back to you soon."
    });
}
