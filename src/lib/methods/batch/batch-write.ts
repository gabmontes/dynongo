import { BatchWriteCommandInput } from "@aws-sdk/lib-dynamodb";
import { Executable } from "../executable";
import { DynamoDB } from "../../dynamodb";
import { BatchItem } from "./batch-item";
import { BaseMethod } from "../base-method";
import { UnprocessedItemsException } from "../../errors/unprocessed-items-exception";

export class BatchWrite extends BaseMethod implements Executable {
	constructor(dynamodb: DynamoDB, private items: BatchItem[]) {
		super(null, dynamodb);
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): BatchWriteCommandInput {
		const request = {
			RequestItems: {},
		};

		for (const item of this.items) {
			const table = request.RequestItems[item.table];
			if (!table) {
				request.RequestItems[item.table] = [item.buildRawQuery()];
			} else {
				(request.RequestItems[item.table] as any[]).push(item.buildRawQuery());
			}
		}
		return request;
	}

	/**
	 * Execute the batch write request.
	 */
	async exec(): Promise<any> {
		const client = this.dynamodb.client;

		if (!client) {
			throw new Error("Call .connect() before executing queries.");
		}

		if (this.items.length < 1) {
			throw new Error("Items can not be empty.");
		}

		if (this.items.length > 25) {
			throw new Error("Can not insert more than 25 items at a time.");
		}

		if (!this.items) {
			throw new Error("params object was undefined.");
		}

		let query = this.buildRawQuery();
		return this.runQuery(async () => {
			const { UnprocessedItems } = await client.batchWrite(query);

			if (UnprocessedItems && Object.keys(UnprocessedItems).length > 0) {
				query = { RequestItems: UnprocessedItems };
				throw new UnprocessedItemsException(
					`${Object.keys(UnprocessedItems).length} could not be processed`
				);
			}
		});
	}
}
