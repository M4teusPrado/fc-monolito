import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductAdmModel } from     "../../modules/product-adm/repository/product.model";
import { ProductModel as ProductCatalogModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel as ProductCheckoutModel} from "../../modules/checkout/repository/product.model";
import { productRoute } from "./routes/product.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { clientRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import OrderItemModel from "../../modules/checkout/repository/order.item.model";


export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);
app.use("/client", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });
    await sequelize.addModels([ProductCatalogModel, ProductCheckoutModel, ProductAdmModel, ClientModel, 
                               TransactionModel, InvoiceModel, InvoiceItemsModel, OrderModel, OrderItemModel]);
    await sequelize.sync();
}

setupDb();
