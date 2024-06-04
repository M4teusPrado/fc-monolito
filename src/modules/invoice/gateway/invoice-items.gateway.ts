import InvoiceItems from "../domain/Invoice-items.entity";



export default interface InvoiceItemsGateway {
    find(id: string): Promise<InvoiceItems>;
    add(invoiceItems: InvoiceItems): Promise<void>;

}