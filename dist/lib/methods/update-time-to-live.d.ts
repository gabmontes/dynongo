import { UpdateTimeToLiveInput, UpdateTimeToLiveCommandOutput } from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class UpdateTimeToLive extends Method implements Executable {
    private input;
    constructor(table: Table, dynamodb: DynamoDB);
    /**
     * Initialize the `UpdateTableConfig` object.
     *
     * @param	schema			The schema of the table.
     */
    initialize(_input: {
        attribute: string;
        enabled: boolean;
    }): this;
    buildRawQuery(): UpdateTimeToLiveInput;
    /**
     * This method will execute the delete table request that was built up.
     */
    exec(): Promise<UpdateTimeToLiveCommandOutput>;
}
