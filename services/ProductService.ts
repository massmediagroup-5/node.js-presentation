import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { ProductRepository } from '../repositories/ProductRepository';
import { Product } from '../models/Product';

@Service()
export class ProductService {

    constructor(
        @OrmRepository() private productRepository: ProductRepository
    ) { }

    /**
     * Get products with filter
     *
     * @param params
     * @return {Promise<Product[]>}
     */
    public find(params: any): Promise<Product[]> {
        const query: any = Object.keys(params).length > 0 ? { where: params } : {};

        if (query.where && query.where.name) {
            query.where.name = {$regex: query.where.name, $options: 'i'};
        }

        return this.productRepository.find(query);
    }

    /**
     * Get product by ID
     *
     * @param {string} id
     * @return {Promise<Product | undefined>}
     */
    public findOne(id: string): Promise<Product | undefined> {
        return this.productRepository.findOne( id );
    }
}
