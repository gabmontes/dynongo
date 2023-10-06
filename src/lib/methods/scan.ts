import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { BaseQuery } from "./base-query";
import { Executable } from "./executable";
import { DynamoDB } from "../dynamodb";
import { Table } from "../table";

export class Scan extends BaseQuery implements Executable {
	constructor(table: Table, dynamodb: DynamoDB) {
		super(table, dynamodb);
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): ScanCommandInput {
		const limit = this.params.Limit;

		const result: ScanCommandInput = {
			...this.params,
			ConsistentRead: this.consistentRead,
			TableName: this.table!.name,
		};

		if (limit === 1 && result.FilterExpression) {
			delete result.Limit;
		}

		return result;
	}

	/**
	 * Execute the scan.
	 */
	async exec(): Promise<any> {
		const db = this.dynamodb.raw;

		if (!db) {
			throw new Error("Call .connect() before executing queries.");
		}

		const limit = this.params.Limit;

		const scanInput = this.buildRawQuery();

		return this.runQuery(() => db.scan(this.buildRawQuery())).then((data) => {
			if (scanInput.Select === "COUNT") {
				// Return the count property if Select is set to count.
				return data.Count || 0;
			}

			if (!data.Items) {
				return [];
			}

			if (limit === 1) {
				// If the limit is specifically set to 1, we should return the object instead of the array.
				if (this.rawResult === true) {
					data.Items = [data.Items[0]];
					return data;
				}

				return data.Items[0];
			}

			// Resolve all the items
			return this.rawResult === true ? data : data.Items;
		});
	}
}
