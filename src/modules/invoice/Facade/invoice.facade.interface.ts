export interface GenerateInvoiceFacadeInputDto {
    id?: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface FindInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipcode: string;
    items: any;
    createdAt: Date;
    updatedAt: Date;
}

export default interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<void>;
    findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
