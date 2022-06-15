const userDatamapper = require('../../models/userDatamapper');
const jwt = require('../../services/token');

const userController = {
    async getAll(_, res) {
        const users = await userDatamapper.getAll();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userDatamapper.login(email, password);
        if (user) {
            const token = jwt.generateToken(user.email);
            res.status(200).json({
                user,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },

    async logout(req, res) {
        const token = req.headers.authorization;
        await userDatamapper.logout(token);
        res.status(200).json('User logged out');
    },

    async updatePassword(req, res) {
        const { password, passwordConfirmation } = req.body;
        const { id } = req.params;
        if (password === passwordConfirmation) {
            const user = await userDatamapper.updatePassword(id, password);
            if (user) {
                res.status(200).json({ message: 'Password updated' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Passwords do not match' });
        }
    },

    async updateEmail(req, res) {
        const { email, emailNew, emailConfirmation } = req.body;
        const { id } = req.params;
        if (email === emailNew) {
            res.status(401).json({ message: 'Email is the same' });
        }
        if (emailNew === emailConfirmation) {
            const user = await userDatamapper.updateEmail(id, emailNew);
            if (user) {
                res.status(200).json({ message: 'Email updated' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Emails do not match' });
        }
    },

    async createUser(req, res) {
        const data = req.body;
        if (data.password === data.passwordConfirmation) {
            const user = await userDatamapper.createUser(data);
            res.json(user);
        } else {
            res.status(401).json({ message: 'Passwords do not match' });
        }
    },

    async getOneUser(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.getOneUser(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
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
        res.json(user);
    },

    async getActivity(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.getUserActivity(id);
        if (user.length > 0) {
            res.status(200).json(user);
        }
        res.status(404).json({ message: 'No activity found' });
    },
};

module.exports = userController;
