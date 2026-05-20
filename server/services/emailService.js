import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

export const sendOpportunityAlert = async (opportunity) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.ALERT_EMAIL,

      subject: `New Opportunity: ${opportunity.title}`,

      html: `
        <h2>${opportunity.title}</h2>

        <p>${opportunity.description}</p>

        <p><strong>Type:</strong> ${opportunity.type}</p>

        <p><strong>Location:</strong> ${opportunity.location}</p>

        <a href="${opportunity.sourceUrl}">
          View Opportunity
        </a>
      `,
    });

    console.log("Alert email sent.");
  } catch (error) {
    console.log(error.message);
  }
};
