import { IsDefined, IsMongoId, IsNotEmpty } from 'class-validator';

export class OrderRequest {
    @IsNotEmpty()
    public streamerId: string;

    @IsMongoId()
    @IsNotEmpty()
    public productId: string;

    @IsDefined()
    public message: string;

    @IsNotEmpty()
    public twitchReceiptMessage: string;

    @IsNotEmpty()
    public extensionId: string;
}
