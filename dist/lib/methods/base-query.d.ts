import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
import { Method } from './method';
export declare abstract class BaseQuery extends Method {
    protected rawResult: boolean;
    protected consistentRead: boolean;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the query object.
     *
     * @param	query			The query for the index to filter on.
     * @param	indexName		The name of the global secondary index.
     */
    initialize(query: any, indexName?: string): this;
    /**
     * Filter the records more fine grained.
     *
     * @param	query			The query to filter the records on.
     */
    where(query: any): this;
    /**
     * Select a subset of the result.
     *
     * projection		The projection string that defines which fields should be returned.
     */
    select(projection: string | undefined): this;
    /**
     * Start querying from the provided key. Ideally for paging.
     *
     * @param lastEvaluatedKey 	The primary key of the first item that this operation will evaluate. Use the value that was returned for L`astEvaluatedKey` in the previous operation.
     */
    startFrom(lastEvaluatedKey: any): this;
    /**
     * Limit the number of items returned. If the limit is set to 1, the exec method
     * will return the first object instead of an array with one object.
     *
     * @param	limit			The limit of items that should be returned.
     */
    limit(limit: number): this;
    /**
     * Returns the number of documents that match the query.
     */
    count(): this;
    /**
     * Returns the raw result.
     */
    raw(): this;
    /**
     * Make the read strongly consistent.
     */
    consistent(): this;
}
