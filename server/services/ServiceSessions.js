const sessionsModel = require("../models/ModelSessions");
const authModel = require("../models/ModelAuth");
const ServiceSessions = {
    createOrUpdateSessions: async (IdUser, Token) => {
        return await sessionsModel.createOrUpdateSessions(IdUser, Token);
    },
    selectSessions: async (IdUser) => {
        return await sessionsModel.selectSessions(IdUser);
    },
    checkLogout: async (IdUser, Token) => {
        return await sessionsModel.checkLogout(IdUser, Token);
    },
    deleteSessions: async (IdUser) => {
        return await sessionsModel.deleteSessions(IdUser);
    },
    selectToken: async (Token) => {
        return await sessionsModel.selectToken(Token);
    },
    getUser: async (Email) => {
        return await authModel.getUser(Email);
    },
};
module.exports = ServiceSessions;
