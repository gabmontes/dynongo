import { TransactGetCommandInput } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Method } from "../../method";
import { Executable } from "../../executable";
import { DynamoDB } from "../../../dynamodb";
import { Query } from "../../query";
import { TransactQuery } from "./transact-query";

export type ReadItem = Query;

export class TransactRead extends Method implements Executable {
	constructor(dynamodb: DynamoDB, private readonly actions: ReadItem[]) {
		super(null, dynamodb);
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): TransactGetCommandInput {
		const items = this.actions.map((action) => {
			if (action instanceof Query) {
				return new TransactQuery(action);
			}

			throw new Error("Unknown TransactRead action provided");
		});

		return {
			TransactItems: [...items.map((item) => item.buildRawQuery())],
		};
	}

	/**
	 * Execute the get transaction.
	 */
	async exec(): Promise<any[]> {
		const db = this.dynamodb.raw!;

		const transactGetItemsInput = this.buildRawQuery();

		if ((transactGetItemsInput.TransactItems?.length ?? 0) > 25) {
			throw new Error(
				`Number of transaction items should be less than or equal to \`25\`, got \`${
					transactGetItemsInput.TransactItems!.length
				}\``
			);
		}

		const result = await db.transactGet(transactGetItemsInput);

		return (result.Responses || []).map((response) =>
			response.Item ? unmarshall(response.Item) : undefined
		);
	}
}
