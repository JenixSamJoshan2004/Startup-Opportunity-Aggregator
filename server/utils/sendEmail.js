import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailAlert = async (title) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: process.env.EMAIL_USER,

    subject: "New Startup Opportunity",

    text: `New opportunity added: ${title}`,
  });
};
