import { TransactWriteCommandInput, TransactWriteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Method } from "../../method";
import { Executable } from "../../executable";
import { DynamoDB } from "../../../dynamodb";
import { InsertItem } from "../../insert-item";
import { UpdateItem } from "../../update-item";
import { DeleteItem } from "../../delete-item";
import { Query } from "../../query";
export declare type WriteItem = InsertItem | UpdateItem | DeleteItem;
export declare class TransactWrite extends Method implements Executable {
    private readonly actions;
    private conditions;
    constructor(dynamodb: DynamoDB, actions: WriteItem[]);
    /**
     * Apply conditions to an item that is not being modified by the transaction.
     *
     * @param	query	List of query conditions.
     */
    withConditions(...query: Query[]): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): TransactWriteCommandInput;
    /**
     * Execute the write transaction.
     */
    exec(): Promise<TransactWriteCommandOutput>;
}
