export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    projectInfo
  } = req.body;

  if (!firstName || !lastName || !email || !projectInfo) {
    return res.status(400).json({
      success: false,
      message: "Please complete all required fields."
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Gaegane Website <onboarding@resend.dev>",
        to: ["info@gaegane.co.za"],
        reply_to: email,
        subject: "New Project Enquiry - Gaegane Group",
        html: `
          <h2>New Project Enquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Project Information:</strong></p>
          <p>${projectInfo}</p>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({
        success: false,
        message: error.message || "Email failed to send."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been sent successfully."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
}
