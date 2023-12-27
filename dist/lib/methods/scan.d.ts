import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { BaseQuery } from "./base-query";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class Scan extends BaseQuery implements Executable {
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): ScanCommandInput;
    /**
     * Execute the scan.
     */
    exec(): Promise<any>;
}
