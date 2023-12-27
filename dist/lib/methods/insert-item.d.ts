import { UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { Executable } from "./executable";
import { Method } from "./method";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
import { UpdateQuery } from "../types";
export declare class InsertItem extends Method implements Executable {
    protected rawResult: boolean;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the `InsertItem` object.
     *
     * @param	query			The key of the item to insert.
     * @param	data			The insert data object.
     */
    initialize(query: any, data: UpdateQuery): this;
    /**
     * Returns the raw result.
     */
    raw(): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): UpdateCommandInput;
    /**
     * Execute the insert item request.
     */
    exec(): Promise<any>;
}
