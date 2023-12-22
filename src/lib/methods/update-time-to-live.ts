import {
	UpdateTimeToLiveCommand,
	UpdateTimeToLiveInput,
	UpdateTimeToLiveCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { Method } from "./method";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";

export class UpdateTimeToLive extends Method implements Executable {
	private input: { attribute: string; enabled: boolean } | undefined;

	constructor(table: Table, dynamodb: DynamoDB) {
		super(table, dynamodb);
	}

	/**
	 * Initialize the `UpdateTableConfig` object.
	 *
	 * @param	schema			The schema of the table.
	 */
	initialize(_input: { attribute: string; enabled: boolean }) {
		// Set the schema as params object
		this.input = _input;

		// Return the object so that it can be chained
		return this;
	}

	buildRawQuery(): UpdateTimeToLiveInput {
		return {
			...this.input,
			TableName: this.table!.name,
			TimeToLiveSpecification: {
				AttributeName: this.input!.attribute,
				Enabled: this.input!.enabled,
			},
		};
	}

	/**
	 * This method will execute the delete table request that was built up.
	 */
	async exec(): Promise<UpdateTimeToLiveCommandOutput> {
		const client = this.dynamodb.client;

		if (!client) {
			throw new Error("Call .connect() before executing queries.");
		}

		return this.runQuery(() =>
			client.send(new UpdateTimeToLiveCommand(this.buildRawQuery()))
		);
	}
}
