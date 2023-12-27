import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { TransactMethod } from '../transact-method';
import { UpdateItem } from '../../update-item';

export class TransactUpdateItem extends TransactMethod {
	constructor(private readonly query: UpdateItem) {
		super();
	}

	/**
	 * Builds and returns the raw DynamoDB query object.
	 */
	buildRawQuery(): TransactWriteItem {
		const result = this.query.buildRawQuery();

		return {
			Update: {
				TableName: result.TableName,
				Key: marshall(result.Key),
				ConditionExpression: result.ConditionExpression,
				UpdateExpression: result.UpdateExpression!,
				ExpressionAttributeNames: result.ExpressionAttributeNames,
				ExpressionAttributeValues: result.ExpressionAttributeValues
					? marshall(result.ExpressionAttributeValues)
					: undefined,
			},
		};
	}
}
