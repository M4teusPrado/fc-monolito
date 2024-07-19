import PlaceOrderUseCase from "../usecases/place-order/place-order.usecase";
import PlaceOrderFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./place-order.facade.interface";


export default class PlaceOrderFacade implements PlaceOrderFacadeInterface {

    constructor(private processPlaceOrderUseCase: PlaceOrderUseCase) { }
  
    process(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
      return this.processPlaceOrderUseCase.execute(input);
    }
  
  }
  