import { EntityRepository, MongoRepository } from 'typeorm';

import { Product } from '../models/Product';

@EntityRepository(Product)
export class ProductRepository extends MongoRepository<Product> {}
