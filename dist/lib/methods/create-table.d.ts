import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { Schema } from "../types";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class CreateTable extends Method implements Executable {
    private shouldWait;
    private waitMs;
    private schema;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the `CreateTable` object.
     *
     * @param	schema			The schema of the table.
     */
    initialize(schema: Schema): this;
    /**
     * Make sure the exec method returns when the table is created entirely.
     *
     * @param	ms		The number of milliseconds the poll mechanism should wait. Default is 1000ms.
     */
    wait(ms?: number): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): CreateTableCommandInput;
    /**
     * This method will execute the create table request that was built up.
     */
    exec(): Promise<void>;
    private poll;
    private pollHelper;
}
