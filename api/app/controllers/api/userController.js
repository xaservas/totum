const userDatamapper = require('../../models/userDatamapper');

const userController = {
    getAll: () => userDatamapper.getAll(),
    login: (email, password) => userDatamapper.login(email, password),
    createUser: (data) => userDatamapper.createUser(data),
    getOneUser: (id) => userDatamapper.getOneUser(id),
    updateUser: (id, data) => userDatamapper.updateUser(id, data),
    removeUser: (id) => userDatamapper.removeUser(id),
};

module.exports = userController;
