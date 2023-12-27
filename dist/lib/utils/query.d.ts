import { Map } from '../types';
interface ParseResult {
    ConditionExpression: string;
    ExpressionAttributeNames: Map<string>;
    ExpressionAttributeValues: Map<any>;
}
export declare function parse(query: {
    $or?: any[];
    $and?: any[];
    [key: string]: any;
}, values?: any): ParseResult;
export {};
