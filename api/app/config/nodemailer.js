const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: '172.29.0.4',
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = {
  sendMail: async (data) => {
    try {
      (mailData = {
        from: 'totum.ovh',
        to: 'contact@totum.ovh',
        subject: `Message de ${data.email}`,
        text: data.message,
      }),
        transporter.sendMail(mailData, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            return info;
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = sendMail;
