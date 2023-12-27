import { DynamoDB } from '../dynamodb';
import { Table } from '../table';
import { Params } from '../types';
import { BaseMethod } from './base-method';
export declare abstract class Method extends BaseMethod {
    protected params: Params;
    protected constructor(table: Table | null, dynamodb: DynamoDB);
}
