import { EntityRepository, MongoRepository } from 'typeorm';

import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends MongoRepository<Order> {}
