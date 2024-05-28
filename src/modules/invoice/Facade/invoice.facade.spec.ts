import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-Invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import { GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";
import InvoiceFacadeFactory from "../factory/facade.factory";


describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
    })

    sequelize.addModels([InvoiceModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it("should create a invoice", async () => {

        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            document: "123456789",
            street: "Street 1",
            number: "10",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 200
                }
            ]
        };

        await facade.generateInvoice(input)

        const invoice = await InvoiceModel.findOne({ where: { id: "1" } })

        console.log(invoice)

        expect(invoice).toBeDefined()
        expect(invoice.name).toBe(input.name)
        // expect(invoice.document).toBe(input.document)
        // expect(invoice.street).toBe(input.street)
        // expect(invoice.number).toBe(input.number)
        // expect(invoice.complement).toBe(input.complement)
        // expect(invoice.city).toBe(input.city)
        // expect(invoice.state).toBe(input.state)
        // expect(invoice.zipcode).toBe(input.zipCode)
        //expect(invoice.createdAt).toStrictEqual(invoice.createdAt)
        //expect(invoice.updatedAt).toStrictEqual(invoice.updatedAt)
        //expect(invoice.items).toStrictEqual(invoice.items)

    })


    // it("should find a invoice", async () => {
            
    //         const repository = new InvoiceRepository()
    //         const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository)
    //         const findInvoiceUseCase = new FindInvoiceUseCase(repository)
    //         const facade = new InvoiceFacade({
    //             generateUsecase: generateInvoiceUseCase,
    //             findUsecase: findInvoiceUseCase
    //         })
    

    //        const input = {
    //             name: "any_name",
    //             document: "any_document",
    //             street: "any_street",
    //             number: "1",
    //             complement: "any_complement",
    //             city: "any_city",
    //             state: "any_state",
    //             zipcode: "any_zipCode",
    //             items: [{
    //                 name: "any_name",
    //                 price: 1
    //             }]
    //        }


    //         await facade.generateInvoice(input);

    //         const invoice = await InvoiceModel.findOne({ where: { id: "1" } })
    
    //         expect(invoice).toBeDefined()
    //         // expect(invoice.id).toBe(input.id)
    //         expect(invoice.name).toBe(input.name)
    //         expect(invoice.document).toBe(input.document)
    //         expect(invoice.street).toBe(input.street)
    //         expect(invoice.number).toBe(input.number)
    //         expect(invoice.complement).toBe(input.complement)
    //         expect(invoice.city).toBe(input.city)
    //         expect(invoice.state).toBe(input.state)
    //         //expect(invoice.address.zipCode).toBe(input.zipCode)
    //         //expect(invoice.createdAt).toStrictEqual(invoice.createdAt)
    //         //expect(invoice.updatedAt).toStrictEqual(invoice.updatedAt)
    //         //expect(invoice.items).toStrictEqual(invoice.items)
    
    //     })
});