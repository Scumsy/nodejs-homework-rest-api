const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "dmitry.koschavka@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// const { MAIL_PASSWORD } = process.env;

// async function sendMail({ to, subject, html }) {
//   try {
//     const nodemailerConfig = {
//       host: "smtp.meta.ua",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "dimakoschavka@meta.ua",
//         pass: MAIL_PASSWORD,
//       },
//     };

//     const transporter = nodemailer.createTransport(nodemailerConfig);

//     const email = {
//       from: "dimakoschavka@meta.ua",
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(email);
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = sendMail;
