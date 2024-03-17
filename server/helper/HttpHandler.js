const errorHandler = require("../config/ErrorHandler");
require("dotenv").config({ path: __dirname + "/properties.dev.env" });
module.exports = {
    success: (res, data, message = "") => {
        return res.status(errorHandler.CODE_200).json({
            data: data,
            message: message || errorHandler.MSG_200,
            code: errorHandler.CODE_200,
        });
    },

    serverError: (res, data, message) => {
        return res.status(errorHandler.CODE_500).json({
            data: data,
            message: message || errorHandler.MSG_500,
            code: errorHandler.CODE_500,
        });
    },
    forbidden: (res, message) => {
        console.log(message);
        return res.status(errorHandler.CODE_403).json({
            message: message || errorHandler.MSG_403,
            code: errorHandler.CODE_403,
        });
    },

    fail: (res, data, message = "") => {
        const logMsg = message !== "" ? message : data;
        console.log(logMsg);
        return res.status(errorHandler.CODE_400).json({
            data: data,
            message: message || errorHandler.MSG_400,
            code: errorHandler.CODE_400,
        });
    },

    unauthorized: (res) => {
        return res.status(errorHandler.CODE_401).json({
            message: errorHandler.MSG_401,
            code: errorHandler.CODE_401,
        });
    },

    notFound : (res, data) => {
        return res.status(errorHandler.CODE_404).json({
            data: data,
            message: errorHandler.CODE_404,
            code: errorHandler.CODE_404,
        });
    },
};
