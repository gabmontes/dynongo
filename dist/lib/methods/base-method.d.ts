import { Options as RetryOptions } from 'p-retry';
import { Table } from '../table';
import { DynamoDB } from '../dynamodb';
import { QueryBuilder } from '../types';
export declare abstract class BaseMethod implements QueryBuilder {
    protected readonly table: Table | null;
    protected readonly dynamodb: DynamoDB;
    protected retries?: number | RetryOptions;
    protected constructor(table: Table | null, dynamodb: DynamoDB);
    /**
     * Configure the number of retries.
     *
     * @param retries - Number of retries
     */
    retry(retries: number): any;
    /**
     * Configure the retry policy.
     *
     * @param options - Retry configuration options.
     */
    retry(options: RetryOptions): any;
    protected runQuery<T>(operation: () => Promise<T>): Promise<T>;
    abstract buildRawQuery(): any;
}
