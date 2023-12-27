import { DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class DeleteItem extends Method implements Executable {
    private rawResult;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the `DeleteItem` object.
     *
     * @param	query			The query for the index to filter on.
     * @param	opts			Additional param options.
     */
    initialize(query: any, opts?: {
        result: boolean;
    }): this;
    /**
     * Create a conditional delete item object where the condition should be satisfied in order for the item to be
     * deleted.
     *
     * @param	condition		A condition that must be satisfied in order for a conditional DeleteItem to succeed.
     */
    where(condition: any): this;
    /**
     * Returns the raw result.
     */
    raw(): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): DeleteCommandInput;
    /**
     * This method will execute the delete item request that was built up.
     */
    exec(): Promise<any>;
}
