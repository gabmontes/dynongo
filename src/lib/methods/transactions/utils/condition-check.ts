import { ConditionCheck } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Query } from '../../query';
import { keyParser } from './key-parser';

/**
 * Generate a transaction `ConditionCheck` based on a `Query`.
 *
 * @param	query Query to generate the check.
 */
export const generateConditionCheck = (query: Query): ConditionCheck => {
	const build = query.buildRawQuery();

	if (!build.FilterExpression) {
		// A `ConditionCheck` requires a `FilterExpression`
		throw new Error('No `where` clause provided in transaction ConditionCheck');
	}

	const result = keyParser(build);

	return {
		TableName: build.TableName,
		Key: marshall(result.Key),
		ConditionExpression: build.FilterExpression,
		ExpressionAttributeNames: result.AttributeNames,
		ExpressionAttributeValues: marshall(result.AttributeValues),
	};
};
