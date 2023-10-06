import {
	ListTablesCommand,
	ListTablesCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "../dynamodb";
import { Executable } from "./executable";
import { Method } from "./method";

export class ListTables extends Method implements Executable {
	constructor(dynamodb: DynamoDB) {
		super(null, dynamodb);
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): ListTablesCommandInput {
		return {};
	}

	/**
	 * Execute the `ListTables` request.
	 */
	async exec(): Promise<string[]> {
		if (!this.dynamodb.raw) {
			throw new Error("Call .connect() before executing queries.");
		}

		return this.execHelper(this.buildRawQuery());
	}

	private async execHelper(
		params: ListTablesCommandInput,
		previousResult: string[] = []
	): Promise<string[]> {
		let result = previousResult;

		const db = this.dynamodb.raw!;
		const prefix = this.dynamodb.prefix;

		const data = await db.send(new ListTablesCommand(params));
		result = result.concat(data.TableNames || []);

		if (data.LastEvaluatedTableName) {
			params.ExclusiveStartTableName = data.LastEvaluatedTableName;

			return this.execHelper(params, result);
		}

		return prefix === undefined
			? result
			: result.filter((table) => table.indexOf(prefix) === 0);
	}
}
