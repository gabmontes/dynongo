import { UpdateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "../dynamodb";
import { Executable } from "./executable";
import { Method } from "./method";
import { Table } from "../table";
export declare class UpdateTableConfig extends Method implements Executable {
    private shouldWait;
    private waitMs;
    private input;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the `UpdateTableConfig` object.
     *
     * @param	schema			The schema of the table.
     */
    initialize(_input: Omit<UpdateTableCommandInput, "TableName">): this;
    /**
     * Make sure the exec method returns when the table is deleted entirely.
     *
     * @param	ms		The number of milliseconds the poll mechanism should wait. Default is 1000ms.
     */
    wait(ms?: number): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): UpdateTableCommandInput;
    exec(): Promise<void>;
    private poll;
    private isUpdating;
}
