import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { BaseQuery } from "./base-query";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class Query extends BaseQuery implements Executable {
    private error;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * The order in which to return the query results - either ascending (1) or descending (-1).
     *
     * @param	order		The order in which to return the query results.
     */
    sort(order: 1 | -1): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): QueryCommandInput;
    /**
     * Execute the query.
     */
    exec(): Promise<any>;
}
