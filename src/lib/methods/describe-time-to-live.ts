import {
	DescribeTimeToLiveCommand,
	DescribeTimeToLiveCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";

export class DescribeTimeToLive extends Method implements Executable {
	constructor(table: Table, dynamodb: DynamoDB) {
		super(table, dynamodb);
	}

	buildRawQuery() {
		return {};
	}

	/**
	 * This method will execute the delete table request that was built up.
	 */
	async exec(): Promise<DescribeTimeToLiveCommandOutput> {
		const client = this.dynamodb.client;

		if (!client) {
			throw new Error("Call .connect() before executing queries.");
		}

		return this.runQuery(() =>
			client.send(
				new DescribeTimeToLiveCommand({ TableName: this.table!.name })
			)
		);
	}
}
