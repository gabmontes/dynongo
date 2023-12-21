import {
	DescribeTableCommand,
	UpdateTableCommand,
	UpdateTableCommandInput,
} from "@aws-sdk/client-dynamodb";
import delay from "delay";
import { DynamoDB } from "../dynamodb";
import { Executable } from "./executable";
import { Method } from "./method";
import { Table } from "../table";

export class UpdateTableConfig extends Method implements Executable {
	private shouldWait = false;
	private waitMs: number = 1000;
	private input: Omit<UpdateTableCommandInput, "TableName"> = {};

	constructor(table: Table, dynamodb: DynamoDB) {
		super(table, dynamodb);
	}

	/**
	 * Initialize the `UpdateTableConfig` object.
	 *
	 * @param	schema			The schema of the table.
	 */
	initialize(_input: Omit<UpdateTableCommandInput, "TableName">) {
		// Set the schema as params object
		this.input = _input;

		// Return the object so that it can be chained
		return this;
	}

	/**
	 * Make sure the exec method returns when the table is deleted entirely.
	 *
	 * @param	ms		The number of milliseconds the poll mechanism should wait. Default is 1000ms.
	 */
	wait(ms?: number) {
		this.shouldWait = true;
		this.waitMs = ms || 1000;

		// Return the object so that it can be chained
		return this;
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): UpdateTableCommandInput {
		return {
			...this.input,
			TableName: this.table!.name,
		};
	}

	async exec(): Promise<void> {
		if (!this.dynamodb.client) {
			throw new Error("Call .connect() before executing queries.");
		}
		const { client } = this.dynamodb;
		return this.runQuery(() =>
			client.send(new UpdateTableCommand(this.buildRawQuery()))
		)
			.then(() => {
				if (this.shouldWait === true) {
					// If await is true, start polling
					return this.poll();
				}
			})
			.catch((err) => {
				if (err && err.name !== "ResourceNotFoundException") {
					throw err;
				}
			});
	}

	private async poll() {
		if (await this.isUpdating()) {
			return await this.poll();
		}
	}

	private async isUpdating() {
		const client = this.dynamodb.client!;

		await delay(this.waitMs);

		const output = await client.send(
			new DescribeTableCommand({ TableName: this.table!.name })
		);

		return output.Table?.TableStatus !== "ACTIVE";
	}
}
