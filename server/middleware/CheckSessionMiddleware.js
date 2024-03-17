const httpHandler = require("../helper/HttpHandler");
const ServiceSessions = require("../services/ServiceSessions");
const { constants } = require("../config/index");

const privateKey = constants.PRIVATE_KEY;
const tokenUtil = require("../utils/TokenUtils");
module.exports = {
    /**
     * Check session middleware
     * @param {request} req
     * @param {response} res
     * @param {next} next
     * @return {void}
     */

    checkAuth: async (req, res, next) => {
        const date = new Date();
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        const refreshToken =
            req.body.refreshToken ||
            req.query.refreshToken ||
            req.headers["x-access-refreshToken"];
        if (!token) {
            return httpHandler.fail(res, {
                errMsg: "Token not available",
                time_fail: date,
            });
        } else {
            const decode = await tokenUtil.decodeToken(token, privateKey);
            if (!decode) {
                return httpHandler.fail(res, {
                    errMsg: "Token not available",
                    time_fail: date,
                });
            } else {
                const user = await ServiceSessions.getUser(
                    decode.payload.Email,
                );
                const sessions = await ServiceSessions.selectSessions(
                    decode.payload.Id_User,
                );
                if (sessions.length === 0) {
                    return httpHandler.unauthorized(res);
                } else {
                    if (user.length === 0) {
                        return httpHandler.unauthorized(res);
                    } else {
                        if (refreshToken === sessions[0].token) {
                            const dataForToken = {
                                Id_User: decode.payload.Id_User,
                                Email: decode.payload.Email,
                                Name: user[0].full_name,
                            };
                            const data = {
                                Id_User: decode.payload.Id_User,
                                Email: decode.payload.Email,
                                Name: user[0].full_name,
                                Avatar: user[0].image,
                            };
                            if( Date.parse(sessions[0].verified_at) < Date.now()) {
                                return httpHandler.fail(res, {
                                    errMsg: "token timed out",
                                    time_fail: date,
                                });
                            } else {
                                if (decode.exp * 1000 < Date.now()) {
                                    const refreshTokenLife = 60 * 60 * 12;
                                    const accessTokenNew =
                                        await tokenUtil.registerToken(
                                            dataForToken,
                                            privateKey,
                                            refreshTokenLife,
                                        );

                                    if (!accessTokenNew) {
                                        return httpHandler.unauthorized(res);
                                    } else {
                                        await ServiceSessions.createOrUpdateSessions(
                                            decode.Id_User,
                                            refreshToken,
                                        );

                                        res.cookie("token", accessTokenNew, {
                                            maxAge: 900000,
                                            httpOnly: true,
                                        });
                                        req.user = {
                                            accessTokenNew: accessTokenNew,
                                            user: data,
                                        };
                                        return next();
                                    }
                                } else {
                                    req.user = {
                                        user: data,
                                    };
                                    return next();
                                }
                            }
                        } else {
                            return httpHandler.unauthorized(res);
                        }
                    }
                }
            }
        }
    },
};
