const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

global.__basedir = __dirname + "/..";

const getEnv = () => {
    const strDomain = process.env.CORS_ORIGIN || "*";
    let listDomain = strDomain.split(",");

    if (listDomain.length == 0) {
        listDomain = strDomain;
    }
    if (strDomain == "*") {
        return strDomain;
    }
    return listDomain;
};

var corsOptions = {
    origin: getEnv(),
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

if (process.env.NODE_ENV === "DEVELOPMENT") {
    db.sequelize
        .sync({
            alter: { drop: false },
        })
        .then(() => {
            console.log("Synced db.");
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });
}

// simple route
app.get("/", (req, res) => {
    let response = {
        status: true,
        code: "S01",
        message: `welcome ${process.env.APP_NAME || "WidaTech-API"}`,
        data: null,
    };
    res.json(response);
});

require("./app/routes/invoices.routes")(app);
require("./app/routes/excels.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
