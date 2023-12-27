import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { TransactMethod } from '../transact-method';
import { DeleteItem } from '../../delete-item';
export declare class TransactDeleteItem extends TransactMethod {
    private readonly query;
    constructor(query: DeleteItem);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactWriteItem;
}
