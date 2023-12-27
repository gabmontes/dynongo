import {
	CreateTableCommand,
	CreateTableCommandInput,
	DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import delay from "delay";
import { Method } from "./method";
import { Executable } from "./executable";
import { Schema } from "../types";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";

export class CreateTable extends Method implements Executable {
	private shouldWait = false;
	private waitMs: number = 1000;
	private schema: any;

	constructor(table: Table, dynamodb: DynamoDB) {
		super(table, dynamodb);
	}

	/**
	 * Initialize the `CreateTable` object.
	 *
	 * @param	schema			The schema of the table.
	 */
	initialize(schema: Schema) {
		// Set the schema as params object
		this.schema = schema;

		// Return the object so that it can be chained
		return this;
	}

	/**
	 * Make sure the exec method returns when the table is created entirely.
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
	buildRawQuery(): CreateTableCommandInput {
		return {
			...this.schema,
			TableName: this.table!.name,
		};
	}

	/**
	 * This method will execute the create table request that was built up.
	 */
	async exec(): Promise<void> {
		const client = this.dynamodb.client;

		if (!client) {
			throw new Error("Call .connect() before executing queries.");
		}

		return client
			.send(new CreateTableCommand(this.buildRawQuery()))
			.then(() => {
				if (this.shouldWait === true) {
					// Start polling if await is set to true
					return this.poll();
				}
			})
			.catch((err) => {
				if (err && err.name !== "ResourceInUseException") {
					// If it is a ResourceInUseException, throw it further down the chain
					throw err;
				}
			});
	}

	private async poll() {
		const result = await this.pollHelper();

		if (!result.Table || !result.Table.TableStatus) {
			return;
		}

		if (result.Table.TableStatus.toLowerCase() === "active") {
			return;
		}

		return await this.poll();
	}

	private async pollHelper() {
		const client = this.dynamodb.client!;

		await delay(this.waitMs);

		const output = await client.send(
			new DescribeTableCommand({ TableName: this.table!.name })
		);

		return output;
	}
}
