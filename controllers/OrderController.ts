import {
    Authorized, Body, CurrentUser, JsonController, Post,
} from 'routing-controllers';
import { Order } from '../models/Order';
import { OrderService } from '../services/OrderService';
import { User } from '../models/User';
import { ValidationError } from '../errors/ValidationError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { Validator } from 'class-validator';
import { OrderRequest } from '../validators/OrderRequest';
import { ProductService } from '../services/ProductService';

@Authorized()
@JsonController('/orders')
export class OrderController {

    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private validator: Validator
    ) {}

    /**
     * Create new order
     *
     * @param {OrderRequest} data
     * @param {User} user
     * @throws ResourceNotFoundError
     * @throws ValidationError
     * @return {Promise<Order>}
     */
    @Post()
    public async create(@Body() data: OrderRequest, @CurrentUser() user?: User): Promise<Order> {
        const errors = this.validator.validateSync(data);
        
        if (errors.length > 0) {
            throw new ValidationError(errors);
        }

        const product = await this.productService.findOne(data.productId);

        if (!product) {
            throw new ResourceNotFoundError();
        }

        const order = await this.orderService.prepareOrderData(data, user, product);

        return this.orderService.buy(order);
    }
}
