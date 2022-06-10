const userDatamapper = require('../../models/userDatamapper');

const userController = {
    async getAll(_, res) {
        const users = await userDatamapper.getAll();
        res.json(users);
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userDatamapper.login(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },

    logout(req, res) {
        res.json({ message: 'Logout successful' });
    },

    async createUser(req, res) {
        const data = req.body;
        const user = await userDatamapper.createUser(data);
        res.json(user);
    },

    async getOneUser(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.getOneUser(id);
        res.json(user);
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        const user = await userDatamapper.updateUser(id, data);
        res.json(user);
    },

    async removeUser(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.removeUser(id);
        res.json(user);
    },
};

module.exports = userController;
