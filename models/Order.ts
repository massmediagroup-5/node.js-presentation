import { BeforeInsert, Column, CreateDateColumn, Entity, Index, ObjectIdColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { toHexString } from '../../lib/helpers';
import { Product } from './Product';
import { User } from './User';
import { ObjectID } from 'mongodb';

@Entity()
export class Order {
    @ObjectIdColumn()
    @Transform(toHexString)
    public _id: ObjectID;

    @Index()
    @Column()
    public userId: ObjectID;

    @Column()
    public userDetails: User;

    @Column()
    public receiptId: string;

    @Column()
    public itemType: string;

    @Index()
    @Column()
    public price: number;

    @Index()
    @Column()
    public itemId: string;

    @Column()
    public itemDetails: Product;

    @Column()
    public userMessage: string;

    @Index()
    @Column()
    public streamerPageName: string;

    @Column()
    public gotShot: boolean;

    @Index()
    @Column()
    public extensionId: string;

    @Column()
    public used: boolean;

    @Index()
    @Column()
    public type: 'demo' | 'live';

    @Index()
    @CreateDateColumn()
    public createdDate: Date;

    @BeforeInsert()
    public createDateColumn(): void {
        this.createdDate = new Date();
    }
}
