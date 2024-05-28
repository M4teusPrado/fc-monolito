import GenerateInvoiceUseCase from "./generate-Invoice.usecase";


const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    };
  };

describe("Generate Invoice usecase unit test", () => {
    it("should generate an invoice", async () => {
        const  invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
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

        const result = await usecase.execute(input);

        expect(invoiceRepository.generate).toHaveBeenCalled();

        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBeDefined
        expect(result.items[0].name).toBe("Product 1");
        expect(result.items[0].price).toBe(100);
        expect(result.items[1].id).toBeDefined
        expect(result.items[1].name).toBe("Product 2");
        expect(result.items[1].price).toBe(200);
        expect(result.total).toBe(300);
        
    });
});