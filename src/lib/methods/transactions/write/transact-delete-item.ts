import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { TransactMethod } from '../transact-method';
import { DeleteItem } from '../../delete-item';

export class TransactDeleteItem extends TransactMethod {
	constructor(private readonly query: DeleteItem) {
		super();
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): TransactWriteItem {
		const result = this.query.buildRawQuery();

		return {
			Delete: {
				TableName: result.TableName,
				Key: marshall(result.Key),
				ConditionExpression: result.ConditionExpression,
				ExpressionAttributeNames: result.ExpressionAttributeNames,
				ExpressionAttributeValues: result.ExpressionAttributeValues
					? marshall(result.ExpressionAttributeValues)
					: undefined,
			},
		};
	}
}
