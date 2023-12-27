import { UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
import { Executable } from "./executable";
import { InsertItem } from "./insert-item";
export declare class UpdateItem extends InsertItem implements Executable {
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Create a conditional update item object where the condition should be satisfied in order for the item to be
     * updated. This should be used if you want to update a record but not insert one if the index does not exist.
     *
     * @param	condition           A condition that must be satisfied in order for a conditional UpdateItem to succeed.
     */
    where(condition: any): this;
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery(): UpdateCommandInput;
    /**
     * This method will execute the update item request that was built up.
     */
    exec(): Promise<any>;
}
