import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { TransactMethod } from '../transact-method';
import { InsertItem } from '../../insert-item';
export declare class TransactInsertItem extends TransactMethod {
    private readonly query;
    constructor(query: InsertItem);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactWriteItem;
}
