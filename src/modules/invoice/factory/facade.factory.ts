import InvoiceFacade from "../Facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-Invoice.usecase";


export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const invoiceFacade = new InvoiceFacade({
      generateUsecase: generateInvoiceUseCase,
      findUsecase: findInvoiceUseCase,
    });

    return invoiceFacade;
  }
}