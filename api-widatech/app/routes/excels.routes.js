module.exports = (app) => {
    const excel = require("../controllers/excel.controller.js");
    const upload = require("../middleware/upload.middleware.js");

    var router = require("express").Router();

    router.post("/upload", upload.single("file"), excel.insertDataFromXlsx);

    app.use("/api/v1/excel", router);
};
