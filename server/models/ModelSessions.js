const PostgreSQL = require("../database/PostgreSQLConnect");

const modelAuth = {
    createOrUpdateSessions: async (IdUser,Token) => {
        try {
            const queryStringSessions = `INSERT INTO sessions (Id_User, Signed_At,Verified_At,Token) 
            VALUES (${IdUser}, NOW(), NOW()+ INTERVAL '24 hours', '${Token}') 
            ON CONFLICT (Id_User) DO UPDATE SET Verified_At = NOW() + INTERVAL '24 hours', Token = '${Token}'`;
            const request = await PostgreSQL.queryDBAccount(queryStringSessions);
            return (request.msg = "Create Or Update Sessions Successfully");
        } catch (error) {
            return null;
        }
    },

   
    selectSessions: async (IdUser) => {
        try {
            const queryString = `SELECT * from sessions WHERE Id_User = ${IdUser}`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    checkLogout: async (IdUser,Token) => {
        try {
            const queryString = `SELECT * from sessions WHERE Id_User = ${IdUser} AND Token = '${Token}'`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    deleteSessions: async (IdUser) => {
        try {
            const queryString = `DELETE FROM sessions WHERE Id_User = '${IdUser}'`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return (request.msg = "Successful deletion");
        } catch (error) {
            return null;
        }
    },

    selectToken: async (Token) => {
        try {
            const queryString = `SELECT * from sessions WHERE Token= '${Token}'`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },
};
module.exports = modelAuth;
