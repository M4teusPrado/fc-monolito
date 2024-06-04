import InvoiceItems from "../domain/Invoice-items.entity";
import InvoiceItemsGateway from "../gateway/invoice-items.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";


export default class InvoiceItemsRepository implements InvoiceItemsGateway {
   
    async add(invoiceItems: InvoiceItems): Promise<void> {
        await InvoiceItemsModel.create({
            id: invoiceItems.id.id,
            invoiceId: invoiceItems.idInvoice,
            name: invoiceItems.name,
            price: invoiceItems.price
        });
    }


    find(id: string): Promise<InvoiceItems> {
        throw new Error("Method not implemented.");
    }
    
    
  
}
