const authModel = require("../models/ModelAuth");

const ServiceAuth = {
    registerUser: async (FullName, Email, Image, IsAdmin, Password) => {
        return await authModel.registerUser(
            FullName,
            Email,
            Image,
            IsAdmin,
            Password,
        );
    },
    getUser: async (Email) => {
        return await authModel.getUser(Email);
    },
    signIn: async (account, username, password) => {
        return await authModel.checkSignIn(account, username, password);
    },
};
module.exports = ServiceAuth;
