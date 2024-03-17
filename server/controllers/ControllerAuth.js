const { errors } = require("web3");
const httpHandler = require("../helper/HttpHandler");
const ServiceAuth = require("../services/ServiceAuth");
const ServiceChallengers = require("../services/ServiceChallengers");
// // const cookie = require("cookie-parse");
const ServiceSessions = require("../services/ServiceSessions");
const bcrypt = require("bcryptjs");
const { constants } = require("../config/index");
const privateKey = constants.PRIVATE_KEY;
const authMethod = require("../utils/TokenUtils");
const { formatTime } = require("../utils/DateUtils");

const controllerAuth = {
    registerUser: async (req, res) => {
        try {
            const FullName = req.body.FullName;
            const Email = req.body.Email;
            const Password = req.body.Password;
            const Image = req.body.Image;
            const result = { data: [], msg: String };
            if (!FullName || !Email || !Password) {
                return httpHandler.fail(
                    res,
                    {
                        errMsg: " Please enter complete information",
                    },
                    errors.message,
                );
            } else {
                const dataUser = await ServiceAuth.getUser(FullName);
                console.log(dataUser);
                if (dataUser.length === 0) {
                    const hashPassword = bcrypt.hashSync(Password, 10);
                    const newUser = await ServiceAuth.registerUser(
                        FullName,
                        Email,
                        Image,
                        false,
                        hashPassword,
                    );
                    if (!newUser) {
                        return httpHandler.fail(
                            res,
                            {
                                errMsg: " There was an error creating the account, please try again.",
                            },
                            errors.message,
                        );
                    } else {
                        result.data = newUser;
                        return httpHandler.success(res, result);
                    }
                } else {
                    return httpHandler.fail(
                        res,
                        {
                            errMsg: " Your account has been registered",
                        },
                        errors.message,
                    );
                }
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    signIn: async (req, res) => {
        try {
            const Email = req.body.email;
            const Password = req.body.password;
            if (!Email || !Password) {
                return httpHandler.fail(
                    res,
                    {
                        errMsg: " Please enter complete information",
                    },
                    errors.message,
                );
            } else {
                const dataUser = await ServiceAuth.getUser(Email);
                if (dataUser.length === 0) {
                    return httpHandler.fail(
                        res,
                        {
                            errMsg: "Your account is not registered",
                        },
                        errors.message,
                    );
                } else {
                    const selectSessions = await ServiceSessions.selectSessions(
                        dataUser[0].id,
                    );
                    if (selectSessions.length >= 1) {
                        return httpHandler.fail(
                            res,
                            {
                                errMsg: " Logging into another machine!!!",
                            },
                            errors.message,
                        );
                    } else {
                        const isPasswordValid = await bcrypt.compare(
                            Password,
                            dataUser[0].password,
                        );
                        const timeFail = new Date();
                        const selectChallengers =
                            await ServiceChallengers.selectChallengers(
                                dataUser[0].id,
                            );
                        if (!isPasswordValid) {
                            if (selectChallengers.length === 0) {
                                const createOrUpdateChallengers =
                                    await ServiceChallengers.createOrUpdateChallengers(
                                        dataUser[0].id,
                                    );
                                if (!createOrUpdateChallengers) {
                                    return httpHandler.unauthorized(res);
                                } else {
                                    return httpHandler.fail(
                                        res,
                                        {
                                            errMsg: " You entered the wrong password",
                                            time_fail: formatTime(timeFail),
                                            number_failed: 1,
                                        },
                                        errors.message,
                                    );
                                }
                            } else {
                                const failed =
                                    selectChallengers[0].number_failed;
                                const time = selectChallengers[0].time_fail;
                                const blockingTime = new Date(
                                    selectChallengers[0].blocking_time,
                                ).getTime();
                                const failing = failed + 1;
                                const currentTime = new Date().getTime();
                                if (failed < 10) {
                                    const createOrUpdateChallengers =
                                        await ServiceChallengers.createOrUpdateChallengers(
                                            dataUser[0].id,
                                        );
                                    if (!createOrUpdateChallengers) {
                                        return httpHandler.unauthorized(res);
                                    } else {
                                        return httpHandler.fail(
                                            res,
                                            {
                                                errMsg: " You entered the wrong password ",
                                                time_fail: time,
                                                number_failed: failing,
                                            },
                                            errors.message,
                                        );
                                    }
                                } else {
                                    if (blockingTime + 300000 <= currentTime) {
                                        const deleteChallengers =
                                            await ServiceChallengers.deleteChallengers(
                                                dataUser[0].id,
                                            );
                                        if (!deleteChallengers) {
                                            return httpHandler.unauthorized(
                                                res,
                                            );
                                        } else {
                                            const createOrUpdateChallengers =
                                                await ServiceChallengers.createOrUpdateChallengers(
                                                    dataUser[0].id,
                                                );
                                            if (!createOrUpdateChallengers) {
                                                return httpHandler.unauthorized(
                                                    res,
                                                );
                                            } else {
                                                return httpHandler.fail(
                                                    res,
                                                    {
                                                        errMsg: " You entered the wrong password",
                                                        time_fail:
                                                            formatTime(
                                                                timeFail,
                                                            ),
                                                        number_failed: 1,
                                                    },
                                                    errors.message,
                                                );
                                            }
                                        }
                                    } else {
                                        return httpHandler.fail(
                                            res,
                                            {
                                                errMsg: " Please wait 5 minutes because your password has been wrong more than ten times ",
                                                WaitingTime: formatTime(
                                                    blockingTime + 300000,
                                                ),
                                            },
                                            errors.message,
                                        );
                                    }
                                }
                            }
                        } else {
                            if (selectChallengers.length !== 0) {
                                const failed =
                                    selectChallengers[0].number_failed;
                                const blockingTime = new Date(
                                    selectChallengers[0].blocking_time,
                                ).getTime();
                                const currentTime = new Date().getTime();
                                if (failed > 9) {
                                    if (blockingTime + 300000 <= currentTime) {
                                        const deleteChallengers =
                                            await ServiceChallengers.deleteChallengers(
                                                dataUser[0].id,
                                            );
                                        if (!deleteChallengers) {
                                            return httpHandler.unauthorized(
                                                res,
                                            );
                                        } else {
                                            const createOrUpdateChallengers =
                                                await ServiceChallengers.createOrUpdateChallengers(
                                                    dataUser[0].id,
                                                );
                                            if (!createOrUpdateChallengers) {
                                                return httpHandler.unauthorized(
                                                    res,
                                                );
                                            } else {
                                                return httpHandler.fail(
                                                    res,
                                                    {
                                                        errMsg: " You entered the wrong password: 1",
                                                        time_fail:
                                                            formatTime(
                                                                timeFail,
                                                            ),
                                                        number_failed: 1,
                                                    },
                                                    errors.message,
                                                );
                                            }
                                        }
                                    } else {
                                        return httpHandler.fail(
                                            res,
                                            {
                                                errMsg: " Please wait 5 minutes because your password has been wrong more than ten times ",
                                                WaitingTime: formatTime(
                                                    blockingTime + 300000,
                                                ),
                                            },
                                            errors.message,
                                        );
                                    }
                                }
                            }
                            const dataForToken = {
                                Id_User: dataUser[0].id,
                                Email:Email,
                                Name:dataUser[0].full_name,
                            };
                            const refreshTokenLife = 60 * 60 * 24;
                            const refreshToken = await authMethod.registerToken(
                                dataForToken,
                                privateKey,
                                refreshTokenLife,
                            );
                            if (!refreshToken) {
                                return httpHandler.unauthorized(res);
                            } else {
                                const accessTokenLife = 60 * 60 * 12;
                                const accessToken =
                                    await authMethod.registerToken(
                                        dataForToken,
                                        privateKey,
                                        accessTokenLife,
                                    );
                                if (!accessToken) {
                                    return httpHandler.unauthorized(res);
                                } else {
                                    const deleteChallengers =
                                        await ServiceChallengers.deleteChallengers(
                                            dataUser[0].id,
                                        );
                                    if (!deleteChallengers) {
                                        return httpHandler.unauthorized(res);
                                    } else {
                                        res.cookie("token", refreshToken, {
                                            maxAge: 900000,
                                            httpOnly: true,
                                        });
                                        const createOrUpdateSessions =
                                            await ServiceSessions.createOrUpdateSessions(
                                                dataUser[0].id,
                                                refreshToken,
                                            ); // luu session
                                        if (!createOrUpdateSessions) {
                                            return httpHandler.unauthorized(
                                                res,
                                            );
                                        } else {
                                            return httpHandler.success(res, {
                                                msg: "Logged in successfully.",
                                                isAdmin:dataUser[0].is_admin,
                                                refreshToken: refreshToken,
                                                accessToken: accessToken,
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    LogOut: async (req, res) => {
        try {
            const idUser = req.body.idUser;
            const refreshToken = req.body.refreshToken;
            if (!idUser || !refreshToken) {
                return httpHandler.fail(
                    res,
                    {
                        errMsg: " Please enter complete information",
                    },
                    errors.message,
                );
            } else {
                const checkLogout = await ServiceSessions.checkLogout(
                    idUser,
                    refreshToken,
                );
                if (checkLogout.length === 0) {
                    return httpHandler.fail(
                        res,
                        {
                            errMsg: "Error id or token",
                        },
                        errors.message,
                    );
                } else {
                    const deleteSessions = await ServiceSessions.deleteSessions(
                        idUser,
                    );
                    if (!deleteSessions) {
                        return httpHandler.unauthorized(res);
                    } else {
                        return httpHandler.success(res, {
                            msg: "Logout in successfully.",
                        });
                    }
                }
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },
};
module.exports = controllerAuth;
