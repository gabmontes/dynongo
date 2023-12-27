import { DeleteTableCommandInput } from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class DeleteTable extends Method implements Executable {
    private shouldWait;
    private waitMs;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Make sure the exec method returns when the table is deleted entirely.
     *
     * @param	ms		The number of milliseconds the poll mechanism should wait. Default is 1000ms.
     */
    wait(ms?: number): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): DeleteTableCommandInput;
    /**
     * This method will execute the delete table request that was built up.
     */
    exec(): Promise<void>;
    private poll;
    private pollHelper;
}
