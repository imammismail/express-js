const readXlsxFile = require("read-excel-file/node");
const db = require("../models");
const Invoice = db.invoice;
const ProductSold = db.ProductSold;

exports.insertDataFromXlsx = async (req, res) => {
    let response = {
        status: true,
        code: "S01",
        message: "",
        data: {},
    };
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = __basedir + "/api-widatech/src/uploads/" + req.file.filename;

        // Array to store data from sheet 1
        const arrSheet1 = readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let i = 2;
            const data = rows.map((row) => ({
                invoice_no: row[0],
                date: convertToDate(row[1]),
                customer_name: row[2],
                salesperson_name: row[3],
                payment_type: row[4],
                notes: row[5],
            }));
            return data;
        });

        // Array to store data from sheet 2
        const arrSheet2 = readXlsxFile(path, { sheet: 2 }).then((rows) => {
            // skip header
            rows.shift();

            let i = 2;
            const data = rows.map((row) => ({
                // row: i++,
                invoice_no: row[0],
                item_name: row[1],
                quantity: row[2],
                total_cost: row[3],
                total_price: row[4],
            }));
            return data;
        });

        Promise.all([arrSheet1, arrSheet2]).then(([InvoiceSheet, ProductSoldSheet]) => {
            try {
                // console.log("Data from sheet 1:", InvoiceSheet);
                // console.log("Data from sheet 2:", ProductSoldSheet);
                const foundInvoiceNos = {};
                // Loop through the data array
                for (let i = 0; i < InvoiceSheet.length; i++) {
                    const entry = InvoiceSheet[i];

                    // Check if invoice_no already exists
                    if (foundInvoiceNos[entry.invoice_no]) {
                        throw new Error(`Duplikat invoice_no: ${entry.invoice_no}`);
                    } else {
                        foundInvoiceNos[entry.invoice_no] = true;
                    }

                    // Loop through each property of the entry
                    for (const key in entry) {
                        if (Object.hasOwnProperty.call(entry, key)) {
                            if (entry[key] === null) {
                                throw new Error(`Invoice ${entry.invoice_no}: Kolom '${key}' memiliki nilai null.`);
                            }
                        }
                    }
                }

                const foundInvoiceNosDuplicate = {};

                for (let i = 0; i < ProductSoldSheet.length; i++) {
                    const entry = ProductSoldSheet[i];

                    if (foundInvoiceNosDuplicate[entry.invoice_no]) {
                        throw new Error(`Duplikat invoice_no: ${entry.invoice_no}`);
                    } else {
                        foundInvoiceNosDuplicate[entry.invoice_no] = true;
                    }

                    // Loop through each property of the entry
                    for (const key in entry) {
                        if (Object.hasOwnProperty.call(entry, key)) {
                            if (entry[key] === null) {
                                throw new Error(
                                    `ProductSoldSheet ${entry.invoice_no}: Kolom '${key}' memiliki nilai null.`
                                );
                            }
                        }
                    }
                }

                Invoice.bulkCreate(InvoiceSheet);
                ProductSold.bulkCreate(ProductSoldSheet);

                response.code = "S01";
                response.message = "Uploaded the file successfully: " + req.file.originalname;
                response.data = true;
                res.json(response);
            } catch (e) {
                response = {
                    status: false,
                    code: e.code || "error",
                    message: e.message || "internal server error",
                    data: null,
                };
                res.status(e.status_code || 500).json(response);
            }
        });
    } catch (e) {
        response = {
            status: false,
            code: e.code || "error",
            message: e.message || "internal server error",
            data: null,
        };
        res.status(e.status_code || 500).json(response);
    }
};

function convertToDate(inputDate) {
    const dateObject = new Date(inputDate);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
