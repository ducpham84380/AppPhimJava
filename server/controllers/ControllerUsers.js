// const serviceUsers = require("../services/ServiceUsers");
const httpHandler = require("../helper/HttpHandler");
const controllerUsers = {
    /**
     * Get all data guidance
     * @param {request} req
     * @param {response} res
     * @return {response}
     */
    getProfile: async (req, res) => {
        try {
            return httpHandler.success(res, req.user);
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },
};

module.exports = controllerUsers;
