import { DescribeTimeToLiveCommandOutput } from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";
export declare class DescribeTimeToLive extends Method implements Executable {
    constructor(table: Table, dynamodb: DynamoDB);
    buildRawQuery(): {};
    /**
     * This method will execute the delete table request that was built up.
     */
    exec(): Promise<DescribeTimeToLiveCommandOutput>;
}
