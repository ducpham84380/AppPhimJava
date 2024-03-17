const httpHandler = require("../helper/HttpHandler");
const ServiceEngines = require("../services/ServiceEngines");

const ControllerEngines = {
    createOrUpdateMedia: async (req, res) => {
        try {
            const Title = req.body.Title;
            const createOrUpdateMedia =
                await ServiceEngines.createOrUpdateMedia(Title);
            if (!createOrUpdateMedia) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res,  {msg:createOrUpdateMedia});
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    getAllMedia: async (req, res) => {
        try {
            const result = { media: []};
            result.media =
                await ServiceEngines.selectMedia();
            if (!result.media) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, result);
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    createCategory: async (req, res) => {
        try {
            const IdMedia = req.body.idMedia;
            const NameCategory = req.body.nameCategory;
            const createCategory =
                await ServiceEngines.createCategory(IdMedia, NameCategory);
            if (!createCategory) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, {msg:createCategory});
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    updateCategory: async (req, res) => {
        try {
            const IdMedia = req.body.idMedia;
            const NameCategory = req.body.nameCategory;
            const IdCategory = req.body.idCategory;
            const updateCategory =
                await ServiceEngines.updateCategory(IdMedia, NameCategory,IdCategory);
            if (!updateCategory) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, {msg:updateCategory});
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },


    deleteCategory: async (req, res) => {
        try {
            const IdCategory = req.body.idCategory;
            const updateCategory =
                await ServiceEngines.deleteCategory(IdCategory);
            if (!updateCategory) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, {msg:updateCategory});
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },


    getAllCategory: async (req, res) => {
        try {
            const result = { category: []};
            result.category =
                await ServiceEngines.selectCategory();
            if (!result.category) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, result                          );
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    getCategory: async (req, res) => {
        try {
            const result = { category: []};
            const idMedia = req.body.idMedia;
            result.category =
                await ServiceEngines.selectIdCategory(idMedia);
            if (!result.category) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, result                          );
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    createFilm: async (req, res) => {
        try {
            const Title = req.body.Title;
            const TitleImage = req.body.Title_Image;
            const Image = req.body.Image;
            const Language = req.body.Language;
            const Year = req.body.Date;
            const Reviews = req.body.Reviews;
            const Views = req.body.Views;
            const createFilm =
                await ServiceEngines.createFilm(Title, TitleImage, Image, Language, Year, Reviews, Views);
            if (!createFilm) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, createFilm);
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    getAllFilm: async (req, res) => {
        try {
            const result = { film: []};
            result.film =
                await ServiceEngines.selectFilm();
            if (!result.film) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, result);
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

    getFilmShow: async (req, res) => {
        try {
            const result = { film: []};
            result.film =
                await ServiceEngines.selectFilmShow();
            if (!result.film) {
                return httpHandler.unauthorized(res);
            } else {
                return httpHandler.success(res, result);
            }
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },

};
module.exports = ControllerEngines;
