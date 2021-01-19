// common js require - can only use this for serverless functions
const nodemailer = require('nodemailer');

// create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// handler
exports.handler = async (event, context) => {
  // test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>your new pizza order is here!</p>`,
  });

  console.log(info);

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
