import { Service } from 'typedi';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { OrderRepository } from '../repositories/OrderRepository';
import { toHexString } from '../../lib/helpers';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { events } from '../subscribers/events';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Jwt } from '../../lib/jwt/Jwt';
import { OrderRequest } from '../validators/OrderRequest';
import { Product } from '../models/Product';
import { TwitchTokenVerifyError } from '../errors/TwitchTokenVerifyError';

@Service()
export class OrderService {

    constructor(
        @OrmRepository() private orderRepository: OrderRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {}

    /**
     * Save new order
     *
     * @param {Order} order
     * @return {Promise<Order>}
     */
    public async buy(order: Order): Promise<Order> {
        const newOrder = await this.orderRepository.save(order);

        this.eventDispatcher.dispatch(events.order.created, newOrder);

        return newOrder;
    }

    /**
     * Get order type from Twitch receipt message
     *
     * @param {string} twitchReceiptMessage
     * @param {string} extensionId
     * @return {{twitchOrder: object, orderType: "demo" | "live"} | undefined}
     */
    public checkTwitchOrder(twitchReceiptMessage: string, extensionId: string): {twitchOrder: {transactionId: string}} | undefined {
        try {
            return Jwt.verify(twitchReceiptMessage, extensionId).data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Creates new Order instance and fills it with data
     *
     * @param {OrderRequest} data
     * @param {User} user
     * @param {Product} product
     * @throws TwitchTokenVerifyError
     * @return {Order}
     */
    public prepareOrderData(data: OrderRequest, user: User, product: Product): Order {
        const orderData = this.checkTwitchOrder(data.twitchReceiptMessage, data.extensionId);

        if (!orderData) {
            throw new TwitchTokenVerifyError();
        }

        const order = new Order();
        order.userMessage = data.message;
        order.userId = user._id;
        order.userDetails = user;
        order.itemType = 'product';
        order.gotShot = true;
        order.used = true;
        order.streamerPageName = data.streamerId;
        order.receiptId = orderData.twitchOrder.transactionId;
        order.extensionId = data.extensionId;
        order.price = product.price;

        order.itemId = toHexString(product._id);
        order.itemDetails = product;

        return order;
    }
}
