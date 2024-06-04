import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import InvoiceItems from "../domain/Invoice-items.entity"
import InvoiceRepository from "./invoice.repository"
import { InvoiceItemsModel } from "./invoice-items.model"


describe("Invoice Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([InvoiceModel, InvoiceItemsModel])
      await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a invoice", async () => {
       
        const props = {
            id: new Id("1"),
            name: "any_name",
            document: "any_document",
            address: new Address(
                "any_street",
                "1",
                "any_complement",
                "any_city",
                "any_state",
                "any_zipCode",
            ),
            items: [new InvoiceItems({
                idInvoice: new Id("1"),
                name: "any_name",
                price: 1
            })]
        };

        const invoice = new Invoice(props);
        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({ 
            where: { id: "1" }, 
            include: [InvoiceItemsModel],
        });

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.id).toEqual(invoice.id.id);
        expect(invoiceDb.name).toEqual(invoice.name);
        expect(invoiceDb.document).toEqual(invoice.document);
        expect(invoiceDb.street).toEqual(invoice.address.street);
        expect(invoiceDb.number).toEqual(invoice.address.number);
        expect(invoiceDb.complement).toEqual(invoice.address.complement);   
        expect(invoiceDb.city).toEqual(invoice.address.city);
        expect(invoiceDb.state).toEqual(invoice.address.state);
        expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode);
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
        //expect(invoiceDb.items.length).toEqual(1);
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    });
    


})