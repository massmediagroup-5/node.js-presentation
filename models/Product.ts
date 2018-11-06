import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { toHexString } from '../../lib/helpers';

@Entity()
export class Product {
    @ObjectIdColumn()
    @Transform(toHexString, { toPlainOnly: true })
    public _id: ObjectID;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column()
    public description: string;

    @IsNotEmpty()
    @Column()
    public type: 'award' | 'credits' | 'avatar' | 'character' | 'sticker';

    @IsNotEmpty()
    @Column()
    public createdDate: Date;

    @IsNotEmpty()
    @Column()
    public price: number;

    @IsNotEmpty()
    @Column()
    public currencyId: number;

    @IsNotEmpty()
    @Column({ enum: [ 'active', 'deleted' ] })
    public status: 'active' | 'deleted';

    @Column({ default: '' })
    public thumbnail: string;

    @Column({ default: '' })
    public twitchSKU: string;

    @IsNotEmpty()
    @Column({ enum: [ 'common', 'super', 'legendary', 'epic', 'rare' ], default: 'common' })
    public productLevel: 'common' | 'super' | 'legendary' | 'epic' | 'rare';

    @IsNotEmpty()
    @Column({ default: '0' })
    public parentId: string;

    @Column({ default: '' })
    public thumbnailWhite: string;

    @Column({ default: '' })
    public animated: string;
}
