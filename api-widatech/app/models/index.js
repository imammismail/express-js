const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.ProductSold = require("./product_sold.model.js")(sequelize, Sequelize);

db.invoice.belongsTo(db.ProductSold, {
    foreignKey: "invoice_no",
    as: "product_sold",
});

module.exports = db;
