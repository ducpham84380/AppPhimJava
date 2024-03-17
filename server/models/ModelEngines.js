const PostgreSQL = require("../database/PostgreSQLConnect");

const modelEngines = {
    // -------------------------Media--------------------------------- //
    createOrUpdateMedia: async (Title) => {
        try {
            const queryStringMedia = `
            INSERT INTO Media (Title) VALUES ('${Title}') 
            ON CONFLICT (Id_Media) DO UPDATE SET Title = '${Title}';`;
            const request = await PostgreSQL.queryDBMovies(queryStringMedia);
            return (request.msg = "Create Or Update Media Successfully");
        } catch (error) {
            return null;
        }
    },

    selectIdMedia: async (IdMedia) => {
        try {
            const queryString = `SELECT Title from Media WHERE Id_Media = '${IdMedia}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    selectMedia: async () => {
        try {
            const queryString = `SELECT Id_Media as Id, Title from Media`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    deleteMedia: async (IdMedia) => {
        try {
            const queryString = `DELETE FROM Media WHERE Id_Media = '${IdMedia}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return (request.msg = "Successful deletion");
        } catch (error) {
            return null;
        }
    },
    // -------------------------Category--------------------------------- //
    createCategory: async (IdMedia, NameCategory) => {
        try {
            const queryStringCategory = `
            INSERT INTO Category (Id_Media,Name_Category) VALUES (${IdMedia},'${NameCategory}');`;
            const request = await PostgreSQL.queryDBMovies(queryStringCategory);
            return (request.msg = "Create Category Successfully");
        } catch (error) {
            return null;
        }
    },

    updateCategory: async (IdMedia, NameCategory, IdCategory) => {
        try {
            const queryStringCategory = `
            UPDATE Category SET Name_Category = '${NameCategory}', Id_Media = ${IdMedia} WHERE Id_Category = ${IdCategory};`;
            const request = await PostgreSQL.queryDBMovies(queryStringCategory);
            return (request.msg = "Update Category Successfully");
        } catch (error) {
            return null;
        }
    },

    selectIdCategory: async (IdMedia) => {
        try {
            const queryString = `SELECT Id_Category as Id, Name_Category as Title from Category WHERE Id_Media = '${IdMedia}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    selectCategory: async () => {
        try {
            const queryString = `SELECT category.Id_Category as Id, category.Name_Category as Title ,media.Title as Media from Media media, Category category WHERE media.Id_Media = category.Id_Media ORDER BY category.Id_Category;`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    deleteCategory: async (IdCategory) => {
        try {
            const queryString = `DELETE FROM Category WHERE Id_Category = '${IdCategory}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return (request.msg = "Successful deletion");
        } catch (error) {
            return null;
        }
    },
    // -------------------------Film--------------------------------- //
    createFilm: async (
        Title,
        TitleImage,
        Image,
        Language,
        Year,
        Reviews,
        Views,
    ) => {
        try {
            const queryStringFilm = `INSERT INTO Movies (Title,Title_Image,Image,Language,Year,Reviews,Views) VALUES ('${Title}','${TitleImage}','${Image}','${Language}','${Year}','${Reviews}',${Views});`;
            const request = await PostgreSQL.queryDBMovies(queryStringFilm);
            return (request.msg = "Create Film Successfully");
        } catch (error) {
            return null;
        }
    },

    selectIdFilm: async (IdMovies) => {
        try {
            const queryString = `SELECT *from Movies WHERE Id_Movies = '${IdMovies}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    selectFilm: async () => {
        try {
            const queryString = `
            SELECT m.id_movies as id, 
            COALESCE(string_agg(c.name_category::text, ', '), NULL) AS categories, 
            m.title as title, 
            m.title_image as title_image, 
            m.image as image, 
            m.language as language, 
            m.year as year, 
            m.reviews as reviews, 
            m.views as views
            FROM Movies m
            LEFT JOIN MovieCategory mc ON m.id_movies = mc.id_movies
            LEFT JOIN Category c ON mc.id_category = c.id_category
            GROUP BY m.id_movies, m.title, m.title_image, m.image, m.language, m.year, m.reviews, m.views
            ORDER BY  m.id_movies;`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    selectFilmShow: async () => {
        try {
            const queryString = `
            SELECT m.id_movies as id, 
            string_agg(c.name_category::text, ', ') AS categories, 
            m.title as title, 
            m.title_image as title_image, 
            m.image as image, 
            m.language as language, 
            m.year as year, 
            m.reviews as reviews, 
            m.views as views
            FROM Movies m
            JOIN MovieCategory mc ON m.id_movies = mc.id_movies
            JOIN Category c ON mc.id_category = c.id_category
            GROUP BY m.id_movies, m.title, m.title_image, m.image, m.language, m.year, m.reviews, m.views
            ORDER BY  m.id_movies;`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    deleteFilm: async (IdMovies) => {
        try {
            const queryString = `DELETE FROM Movies WHERE Id_Movies = '${IdMovies}'`;
            const request = await PostgreSQL.queryDBMovies(queryString);
            return (request.msg = "Successful deletion");
        } catch (error) {
            return null;
        }
    },
    // -------------------------MovieCategory--------------------------------- //
    createOrUpdateMovieCategory: async (IdMovies, IdCategory) => {
        try {
            const queryStringCategory = `
            INSERT INTO MovieCategory (Id_Movies,Id_Category) VALUES (${IdMovies},${IdCategory});`;
            const request = await PostgreSQL.queryDBMovies(queryStringCategory);
            return (request.msg = "Create Or Update Category Successfully");
        } catch (error) {
            return null;
        }
    },
};
module.exports = modelEngines;
