module.exports = (sequelize, DataTypes) => {
    const ProductSold = sequelize.define(
        "ProductSold",
        {
            invoice_no: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            item_name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: "Invoice no must be greater than or equal to 1",
                    },
                },
            },
            total_cost: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: "Invoice no must be greater than or equal to 1",
                    },
                },
            },
            total_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: "Invoice no must be greater than or equal to 1",
                    },
                },
            },
        },
        {
            tableName: "product_sold",
            timestamps: false,
        }
    );

    return ProductSold;
};
