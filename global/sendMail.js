const nodemailer = require("nodemailer");

const sendMail = async (req, resp) => {
  let transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      //   type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      //   clientId: process.env.CLIENT_ID,
      //   clientSecret: process.env.CLIENT_SECRET,
      //   refreshToken: process.env.MAIL_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: "ak707148@gmail.com",
    to: "4bhis1@gmail.com",
    subject: "new Nodemailer Project check",
    text: `
    <html>
        <h1>Hello this is the man behind everything</h1>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully", data);
    }
  });

  resp.status(200).json({ message: "chla gya" });
};

module.exports = {
  sendMail,
};
