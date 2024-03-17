const challengersModel = require("../models/ModelChallengers");

const ServiceSessions = {
    createOrUpdateChallengers: async (IdUser) => {
        return await challengersModel.createOrUpdateChallengers(IdUser);
    },
    selectChallengers: async (IdUser) => {
        return await challengersModel.selectChallengers(IdUser);
    },
    deleteChallengers: async (IdUser) => {
        return await challengersModel.deleteChallengers(IdUser);
    },
};
module.exports = ServiceSessions;
