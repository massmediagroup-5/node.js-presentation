import {
    Authorized, Get, JsonController, QueryParams
} from 'routing-controllers';
import { Product } from '../models/Product';
import { ProductService } from '../services/ProductService';

@Authorized()
@JsonController('/products')
export class ProductController {

    constructor(
        private productService: ProductService
    ) {}

    /**
     * Get products with filters
     *
     * @param {object} params
     * @return {Promise<Product[]>}
     */
    @Get()
    public find(@QueryParams() params: object): Promise<Product[]> {
        return this.productService.find(params);
    }
}
