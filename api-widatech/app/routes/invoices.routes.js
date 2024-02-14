module.exports = (app) => {
    const invoice = require("../controllers/invoice.controller.js");

    var router = require("express").Router();

    router.get("/all", invoice.getAllInvoice);
    router.post("", invoice.createInvoice);
    router.put("", invoice.updateInvoice);
    router.delete("", invoice.deleteInvoice);
    router.post("/solving", invoice.createSolving);

    app.use("/api/v1/invoice", router);
};
