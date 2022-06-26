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
      mailData = {
        from: 'totum.ovh',
        to: 'contact@totum.ovh',
        subject: `Message de ${data.email}`,
        text: data.message,
      };
      const send = transporter.sendMail(mailData);
      if (send) {
        return true;
      }
      throw new Error('Mail not sent');
    } catch (error) {
      throw new Error(error);
    }
  },

  sendPassword: async (data) => {
    console.log(data);
    try {
      mailData = {
        from: 'totum.ovh',
        to: data.email,
        subject: 'Réinitialisation de votre mot de passe',
        text: `Votre nouveau mot de passe est : ${data.password},
        merci de le changer à la prochaine connexion.`,
      };
      const send = await transporter.sendMail(mailData);
      if (send) {
        return send;
      }
      throw new Error('Mail not sent');
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = sendMail;
