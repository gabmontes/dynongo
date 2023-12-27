import { ListTablesCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "../dynamodb";
import { Executable } from "./executable";
import { Method } from "./method";
export declare class ListTables extends Method implements Executable {
    constructor(dynamodb: DynamoDB);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): ListTablesCommandInput;
    /**
     * Execute the `ListTables` request.
     */
    exec(): Promise<string[]>;
    private execHelper;
}
