import { TransactGetItem } from '@aws-sdk/client-dynamodb';
import { TransactMethod } from '../transact-method';
import { Query } from '../../query';
export declare class TransactQuery extends TransactMethod {
    private readonly query;
    constructor(query: Query);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactGetItem;
}
