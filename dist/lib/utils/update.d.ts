import { Map, UpdateQuery } from "../types";
interface ParseResult {
    UpdateExpression: string;
    ExpressionAttributeNames: Map<string>;
    ExpressionAttributeValues: Map<any>;
}
export declare const operators: string[];
export declare function parse(query: UpdateQuery): ParseResult;
export {};
