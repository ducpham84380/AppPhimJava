const express = require("express");
const router = new express.Router();
const ControllerEngines = require("../controllers/ControllerEngines");
const { apiConstants } = require("../config/index");

// Media
// Api create or update media
router.post(apiConstants.API_CREATE_ENGINES_MEDIA, ControllerEngines.createOrUpdateMedia);
router.post(apiConstants.API_ENGINES_MEDIA_ALL, ControllerEngines.getAllMedia);

// Category
router.post(apiConstants.API_CREATE_ENGINES_CATEGORY, ControllerEngines.createCategory);
router.post(apiConstants.API_UPDATE_ENGINES_CATEGORY, ControllerEngines.updateCategory);
router.post(apiConstants.API_ENGINES_CATEGORY_ALL, ControllerEngines.getAllCategory);
router.post(apiConstants.API_ENGINES_CATEGORY, ControllerEngines.getCategory);
router.post(apiConstants.API_DELETE_ENGINES_CATEGORY, ControllerEngines.deleteCategory);
// Film
router.post(apiConstants.API_CREATE_ENGINES_FILM, ControllerEngines.createFilm);
router.post(apiConstants.API_ENGINES_FILM_ALL, ControllerEngines.getAllFilm);
router.post(apiConstants.API_ENGINES_FILM_SHOW, ControllerEngines.getFilmShow);
module.exports = router;
