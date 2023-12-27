import { QueryBuilder } from '../../types/query-builder';
export declare abstract class TransactMethod implements QueryBuilder {
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    abstract buildRawQuery(): any;
}
