const { where } = require("sequelize");
const db = require("../models");
const Invoice = db.invoice;
const ProductSold = db.ProductSold;
const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");

exports.getAllInvoice = async (req, res) => {
    let response = {
        status: true,
        code: "S00",
        message: "",
        data: {},
    };

    let { page, pageSize } = req.query;

    let date = req.query.date || null;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        const whereClause = {};
        if (date) {
            whereClause.date = {
                [Op.and]: [{ [Op.gt]: date }, { [Op.lt]: convertToDate(tomorrow) }],
            };
        }

        const Invoices = await Invoice.findAll({
            include: [
                {
                    model: ProductSold,
                    as: "product_sold",
                },
            ],
            where: whereClause,
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        let totalCashTransactions = 0;
        for (const invoice of Invoices) {
            let totalProfit = 0;
            const productSold = invoice.product_sold;
            if (productSold) {
                totalProfit = productSold.total_price - productSold.total_cost;
            }
            invoice.dataValues.profit = totalProfit;
            totalCashTransactions += totalProfit;
        }

        const totalCount = await Invoice.count({
            where: whereClause,
        });

        const count = totalCount;
        const totalPages = Math.ceil(count / pageSize);

        const resData = {
            rows: Invoices,
            totalCashTransactions: totalCashTransactions,
            count: count,
            totalPages: totalPages,
            currentPage: page,
        };

        response.code = "S01";
        response.message = "success";
        response.status = true;
        response.data = resData;
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
};

exports.createInvoice = [
    body("invoice_no").notEmpty().withMessage("invoice no is required"),
    body("date").notEmpty().withMessage("date is required"),
    body("customer_name")
        .notEmpty()
        .withMessage("customer name is required")
        .isString()
        .withMessage("total cost must be a number"),
    body("salesperson_name")
        .notEmpty()
        .withMessage("salesperson_name is required")
        .isString()
        .withMessage("total cost must be a string"),
    body("payment_type").notEmpty().withMessage("payment_type is required"),
    body("item_name")
        .notEmpty()
        .withMessage("item_name is required")
        .isString()
        .withMessage("item_name must be a string"),
    body("quantity")
        .notEmpty()
        .withMessage("quantity is required")
        .isNumeric()
        .withMessage("quantity must be a number"),
    body("total_cost")
        .notEmpty()
        .withMessage("total_cost is required")
        .isNumeric()
        .withMessage("total cost must be a number"),
    body("total_price")
        .notEmpty()
        .withMessage("total price is required")
        .isNumeric()
        .withMessage("total price must be a number"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                code: "E01",
                message: errors.array(),
                data: null,
            });
        }

        let response = {
            status: true,
            code: "S01",
            message: "",
            data: {},
        };

        try {
            let isValidEmail = await Invoice.findOne({
                where: { invoice_no: req.body.invoice_no },
            });
            if (!isValidEmail) {
                let InvoiceData = {
                    invoice_no: req.body.invoice_no,
                    date: req.body.date,
                    customer_name: req.body.customer_name,
                    salesperson_name: req.body.salesperson_name,
                    notes: req.body.notes,
                    payment_type: req.body.payment_type,
                };

                let savedInvoice = await Invoice.create(InvoiceData);

                let ProductSoldData = {
                    invoice_no: savedInvoice.invoice_no,
                    item_name: req.body.item_name,
                    quantity: req.body.quantity,
                    total_cost: req.body.total_cost,
                    total_price: req.body.total_price,
                };

                await ProductSold.create(ProductSoldData);

                response.code = "S01";
                response.message = "Invoice Created.";
                response.status = true;
                response.data = true;
                res.json(response);
            } else {
                throw {
                    status_code: 400,
                    code: "E01",
                    message: "invoice_no already in use",
                };
            }
        } catch (e) {
            response = {
                status: false,
                code: e.code || "error",
                message: e.message || "internal server error",
                data: null,
            };
            res.status(e.status_code || 500).json(response);
        }
    },
];

exports.updateInvoice = async (req, res) => {
    let response = {
        status: true,
        code: "S00",
        message: "",
        data: {},
    };

    try {
        let invoice_no = req.query.invoice_no;

        console.log(invoice_no, "invoice_no");

        var getDataInvoice = await Invoice.findOne({
            where: {
                invoice_no: invoice_no,
            },
        });

        if (getDataInvoice == null) {
            throw new Error("Cannot update, data is not ready");
        }

        let InvoiceDataUpdate = {
            date: req.body.date,
            customer_name: req.body.customer_name,
            salesperson_name: req.body.salesperson_name,
            notes: req.body.notes,
            payment_type: req.body.payment_type,
        };

        await getDataInvoice.update(InvoiceDataUpdate);

        var getDataProductSold = await ProductSold.findOne({
            where: {
                invoice_no: invoice_no,
            },
        });

        let ProductSoldDataUpdate = {
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            total_cost: req.body.total_cost,
            total_price: req.body.total_price,
        };

        await getDataProductSold.update(ProductSoldDataUpdate);

        response.code = "S01";
        response.message = "Invoice updated.";
        response.status = true;
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
};

exports.deleteInvoice = async (req, res) => {
    let response = {
        status: true,
        code: "S00",
        message: "",
        data: {},
    };

    try {
        let invoice_no = req.query.invoice_no;

        await Invoice.destroy({
            where: { invoice_no: invoice_no },
        });

        await ProductSold.destroy({
            where: { invoice_no: invoice_no },
        });

        response.code = "S01";
        response.message = "Invoice deleted.";
        response.status = true;
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
};

exports.createSolving = async (req, res) => {
    let response = {
        status: true,
        code: "S00",
        message: "",
        data: {},
    };

    try {
        const combinations = [];

        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const findCombinations = (currentCombination, remainingDigits, length, targetSum) => {
            if (length === 0 && targetSum === 0) {
                combinations.push([...currentCombination]);
                return;
            }

            for (let i = 0; i < remainingDigits.length; i++) {
                console.log("remainingDigits[i]", remainingDigits[i]);
                const digit = remainingDigits[i];
                if (digit > targetSum) continue;
                if (length * 9 < targetSum) break;
                console.log("digit", digit);

                currentCombination.push(digit);
                findCombinations(currentCombination, remainingDigits.slice(i + 1), length - 1, targetSum - digit);
                currentCombination.pop();
            }
        };

        findCombinations([], digits, parseInt(req.body.l), parseInt(req.body.t));

        response.code = "S01";
        response.message = "solving created.";
        response.status = true;
        response.data = combinations;
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
};

function convertToDate(inputDate) {
    const dateObject = new Date(inputDate);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
