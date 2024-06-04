import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/Invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";


const invoice = new Invoice({
    id: new Id("1"),
    name: "any_name",
    document: "any_document",
    address: new Address(
        "any_street",
        "1",
        "any_complement",
        "any_city",
        "any_state",
        "any_zipCode"
    ),
    items: [
        new InvoiceItems({
            id: new Id("1"),
            idInvoice: new Id("1"),
            name: "any_name",
            price: 1
        })
    ]
});



const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
  };



describe("Generate Invoice usecase unit test", () => {
    it("should find an invoice", async () => {

        const  invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);
        
        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items.length).toEqual(1);
        expect(result.items[0].id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.total).toEqual(invoice.total);       
    });
});