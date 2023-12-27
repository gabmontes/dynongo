import { TransactGetCommandInput } from "@aws-sdk/lib-dynamodb";
import { Method } from "../../method";
import { Executable } from "../../executable";
import { DynamoDB } from "../../../dynamodb";
import { Query } from "../../query";
export declare type ReadItem = Query;
export declare class TransactRead extends Method implements Executable {
    private readonly actions;
    constructor(dynamodb: DynamoDB, actions: ReadItem[]);
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactGetCommandInput;
    /**
     * Execute the get transaction.
     */
    exec(): Promise<any[]>;
}
