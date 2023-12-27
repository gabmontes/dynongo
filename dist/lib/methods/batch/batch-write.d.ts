import { BatchWriteCommandInput } from "@aws-sdk/lib-dynamodb";
import { Executable } from "../executable";
import { DynamoDB } from "../../dynamodb";
import { BatchItem } from "./batch-item";
import { BaseMethod } from "../base-method";
export declare class BatchWrite extends BaseMethod implements Executable {
    private items;
    constructor(dynamodb: DynamoDB, items: BatchItem[]);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): BatchWriteCommandInput;
    /**
     * Execute the batch write request.
     */
    exec(): Promise<any>;
}
