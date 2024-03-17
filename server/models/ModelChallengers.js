const PostgreSQL = require("../database/PostgreSQLConnect");

const modelAuth = {
    
    createOrUpdateChallengers: async (IdUser) => {
        try {
            const queryStringChallengers = `
            INSERT INTO Challengers (Id_User, Failed, Last_Failed_At) VALUES ('${IdUser}', 1, NOW()) 
            ON CONFLICT (Id_User) DO UPDATE SET Failed = Challengers.Failed + 1, Last_Failed_At = NOW();`;
            const request = await PostgreSQL.queryDBAccount(
                queryStringChallengers,
            );
            return (request.msg = "Create Or Update Sessions Successfully");
        } catch (error) {
            return null;
        }
    },

    selectChallengers: async (IdUser) => {
        try {
            const queryString = `SELECT Failed as number_failed, TO_CHAR(Last_Failed_At,'yyyy-mm-dd HH24:MI') as time_fail, Last_Failed_At as Blocking_Time from Challengers WHERE Id_User = '${IdUser}'`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return request;
        } catch (error) {
            return null;
        }
    },

    deleteChallengers: async (IdUser) => {
        try {
            const queryString = `DELETE FROM Challengers WHERE Id_User = '${IdUser}'`;
            const request = await PostgreSQL.queryDBAccount(queryString);
            return (request.msg = "Successful deletion");
        } catch (error) {
            return null;
        }
    },
};
module.exports = modelAuth;
