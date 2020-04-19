const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  send: (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // eslint-disable-next-line prefer-const
    let response = [];
    // const link = `${process.env.URL_EMAIL_CONFIRM}?encrypt=${data.encrypt}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Email Confirmation',
      text: 'Pesan ini berhasil dikirim',
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        response.message = 'email failed';
      } else {
        response.error = false;
        response.message = 'Successfully send email nodemailer';
      }
    });
    return response;
  },
};
