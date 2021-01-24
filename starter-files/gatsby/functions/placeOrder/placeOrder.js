// common js require - can only use this for serverless functions
const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over. We will have your order ready within the next 20 minutes.</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
          <h4>${item.size} ${item.name} - ${item.price}</h4>
          <img src="${item.thumbnail}" alt="${item.name}" />
        </li>`
          )
          .join('')}
      </ul>
      <h4>Your total due at checkout: ${total}</h4>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>
  `;
}

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
  // validate the data coming in is correct
  // need to unstringify the stringified object
  const body = JSON.parse(event.body);
  console.log(body);

  const requiredFields = ['name', 'email', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking if ${field} is good`);

    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You're missing the ${field} field!`,
        }),
      };
    }
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `<${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  console.log(info);

  // send the success or error message
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
