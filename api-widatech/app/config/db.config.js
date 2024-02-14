module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: Number(process.env.DB_MAX_CONNECTION_POOL),
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
