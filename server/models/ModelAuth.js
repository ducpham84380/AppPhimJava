const PostgreSQL = require("../database/PostgreSQLConnect");

const modelAuth = {
    registerUser: async (FullName, Email, Image, IsAdmin,Password) => {
        try {
            const queryString = `INSERT INTO users (Full_Name, Email, Image, Is_Admin, Password)
            VALUES ('${FullName}', '${Email}', '${Image}', ${IsAdmin}, '${Password}');`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return (request.msg = "Register User Successfully");
        } catch (error) {
            return null;
        }
    },
    getUser: async (Email) => {
        try {
            const queryString = `SELECT *
            FROM Users
            WHERE Email = '${Email}';`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },
   
};
module.exports = modelAuth;
