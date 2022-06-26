const userDatamapper = require('../../models/userDatamapper');
const geoloc = require('../../config/revertGeo');
const bcrypt = require('../../services/bcrypt');
const jwt = require('../../services/token');
const nodemailer = require('../../config/nodemailer');
const fetch = require('node-fetch');
const generator = require('generate-password');

const userController = {
  async getAll(_, res) {
    const users = await userDatamapper.getAll();
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: 'No users found' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await userDatamapper.login(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.generateToken(user.email);
        return res.status(200).json({
          user,
          token,
        });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  },

  async logout(req, res) {
    const token = req.headers.authorization;
    console.log(token);
    await userDatamapper.logout(token);
    return res.status(200).json('User logged out');
  },

  async updatePassword(req, res) {
    const { password, passwordConfirmation } = req.body;
    const { id } = req.params;
    if (password === passwordConfirmation) {
      const hash = await bcrypt.hash(password);
      const user = await userDatamapper.updatePassword(id, hash);
      if (user) {
        return res.status(200).json({ message: 'Password updated' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Passwords do not match' });
    }
  },

  async updateEmail(req, res) {
    const { email, emailNew, emailConfirmation } = req.body;
    const { id } = req.params;
    if (email === emailNew) {
      return res.status(401).json({ message: 'Email is the same' });
    }
    if (emailNew === emailConfirmation) {
      const user = await userDatamapper.updateEmail(id, emailNew);
      if (user) {
        return res.status(200).json({ message: 'Email updated' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Emails do not match' });
    }
  },

  async createUser(req, res) {
    const data = req.body;
    // check if password and passwordConfirmation match
    if (data.password === data.passwordConfirmation) {
      const hash = await bcrypt.hash(data.password);
      data.password = hash;
      // if user not use geoloc, use revert api to get coordinates
      if (data.landmark === 'false') {
        const query = `${data.address} ${data.zip_code} ${data.city} ${data.country}`;
        const geo = await geoloc.revertGeo(query);
        data.coordinate = JSON.stringify(geo);
      }
      // finally create user
      const user = await userDatamapper.createUser(data);
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: 'Passwords do not match' });
    }
  },

  async getOneUser(req, res) {
    const { id } = req.params;
    const user = await userDatamapper.getOneUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    const user = await userDatamapper.updateUser(id, data);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  },

  async removeUser(req, res) {
    const { id } = req.params;
    const user = await userDatamapper.removeUser(id);
    return res.status(200).json(user);
  },

  async getActivity(req, res) {
    const { id } = req.params;
    const user = await userDatamapper.getUserActivity(id);
    if (user.length > 0) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'No activity found' });
  },

  async sendMail(req, res) {
    const data = req.body;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.BACK_CAPTCHA}&response=${data.token}`;

    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const transporter = nodemailer.sendMail(data);
      if (transporter) {
        return res.status(200).json({ message: 'Mail sent' });
      }
      return res.status(401).json({ message: 'Mail not sent' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  },

  async resetPassword(req, res) {
    const email = req.body.email;
    const user = await userDatamapper.getUserByEmail(email);
    if (user.status === 404) {
      return res.status(404).json({ message: 'User not found' });
    }
    const password = generator.generate({ length: 10, numbers: true });
    const hash = await bcrypt.hash(password);
    const userUpdate = await userDatamapper.updatePassword(user.id, hash);
    const prepareEmail = {
      email: user.email,
      password,
    };
    if (userUpdate) {
      const transporter = nodemailer.sendPassword(prepareEmail);
      console.log(password);
      if (transporter) {
        return res.status(200).json({ message: 'Mail sent' });
      }
      return res.status(401).json({ message: 'Mail not sent' });
    }
    return res
      .status(401)
      .json({ message: 'Impossible de changer le mot de passe' });
  },
};

module.exports = userController;
