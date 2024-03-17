require("dotenv").config({ path: __dirname + "/properties.dev.env" });
const constants = {
    TIME_ZONE:
        process.env.TIME_ZONE ||
        new Intl.DateTimeFormat().resolvedOptions().timeZone,
    PG_HOST: process.env.POSTGRE_HOST,
    PG_PORT: process.env.POSTGRE_PORT,
    PG_USER: process.env.POSTGRE_USER,
    PG_PASSWORD: process.env.POSTGRE_PASSWORD,
    PG_TIMEOUT: process.env.POSTGRE_TIMEOUT,
    PG_MAXPOOL: process.env.POSTGRE_MAXPOOL,
    PG_DB_ACCOUNT: process.env.POSTGRE_ACCOUNT,
    PG_DB_MOVIE: process.env.POSTGRE_MOVIE,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    DATE_FORMAT: "YYYY-MM-DDTHH:mm:ssZ",
};
module.exports = constants;
