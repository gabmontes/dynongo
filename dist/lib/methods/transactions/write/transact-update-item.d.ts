import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { TransactMethod } from '../transact-method';
import { UpdateItem } from '../../update-item';
export declare class TransactUpdateItem extends TransactMethod {
    private readonly query;
    constructor(query: UpdateItem);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactWriteItem;
}
