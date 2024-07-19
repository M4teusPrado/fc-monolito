import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PlaceOrderFacade from "../facade/place-order.facade";
import OrderRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecases/place-order/place-order.usecase";


export default class PlaceOrderFacadeFactory {
    static create() {
      const clientFacade = ClientAdmFacadeFactory.create();
      const productFacade = ProductAdmFacadeFactory.create();
      const catalogFacade = StoreCatalogFacadeFactory.create();
      const repository = new OrderRepository();
      const invoiceFacade = InvoiceFacadeFactory.create();
      const paymentFacade = PaymentFacadeFactory.create();

      const placeOrderUseCase = new PlaceOrderUseCase(clientFacade, productFacade, catalogFacade, paymentFacade, invoiceFacade, repository);
      const placeOrderFacade = new PlaceOrderFacade(placeOrderUseCase);
      return placeOrderFacade;
    }
  }
