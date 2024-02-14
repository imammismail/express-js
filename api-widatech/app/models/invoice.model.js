module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define(
        "invoice",
        {
            invoice_no: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
                validate: {
                    notNull: {
                        msg: "Please enter your invoice no",
                    },
                    min: {
                        args: [1],
                        msg: "Invoice no must be greater than or equal to 1",
                    },
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            customer_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            salesperson_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            payment_type: {
                type: DataTypes.ENUM("CASH", "CREDIT"),
                allowNull: false,
            },
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            tableName: "invoice",
            timestamps: true,
        }
    );

    return Invoice;
};
