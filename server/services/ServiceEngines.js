const enginesModel = require("../models/ModelEngines");

const ServiceSessions = {
    // -------------------------Media--------------------------------- //
    createOrUpdateMedia: async (Title) => {
        return await enginesModel.createOrUpdateMedia(Title);
    },

    selectIdMedia: async (IdMedia) => {
        return await enginesModel.selectIdMedia(IdMedia);
    },
    
    selectMedia: async () => {
        return await enginesModel.selectMedia();
    },

    deleteMedia: async (IdMedia) => {
        return await enginesModel.deleteMedia(IdMedia);
    },
    // -------------------------Category--------------------------------- //
    createCategory: async (IdMedia, NameCategory) => {
        return await enginesModel.createCategory(IdMedia, NameCategory);
    },

    updateCategory: async (IdMedia, NameCategory,IdCategory) => {
        return await enginesModel.updateCategory(IdMedia, NameCategory,IdCategory);
    },

    selectIdCategory: async (IdMedia) => {
        return await enginesModel.selectIdCategory(IdMedia);
    },
    selectCategory: async () => {
        return await enginesModel.selectCategory();
    },

    deleteCategory: async (IdCategory) => {
        return await enginesModel.deleteCategory(IdCategory);
    },

    // -------------------------Film--------------------------------- //
    createFilm: async ( Title, TitleImage, Image, Language, Year, Reviews, Views) => {
        return await enginesModel.createFilm( Title, TitleImage, Image, Language, Year, Reviews, Views);
    },

    selectIdFilm: async (IdMovies) => {
        return await enginesModel.selectIdFilm(IdMovies);
    },
    selectFilm: async () => {
        return await enginesModel.selectFilm();
    },

    selectFilmShow: async () => {
        return await enginesModel.selectFilmShow();
    },


    deleteFilm: async (IdMovies) => {
        return await enginesModel.deleteFilm(IdMovies);
    },
};
module.exports = ServiceSessions;
