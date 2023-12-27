import { ConditionCheck } from '@aws-sdk/client-dynamodb';
import { Query } from '../../query';
/**
 * Generate a transaction `ConditionCheck` based on a `Query`.
 *
 * @param	query Query to generate the check.
 */
export declare const generateConditionCheck: (query: Query) => ConditionCheck;
