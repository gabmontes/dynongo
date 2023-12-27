import { Map } from '../types';
interface KeyNameResult {
    Expression: string;
    ExpressionAttributeNames: Map<string>;
}
interface ValueNameResult {
    Expression: string | string[];
    ExpressionAttributeValues: Map<any>;
}
/**
 * Parse a key to an expression statement that can be used directly in an expression and to an
 * object that maps the keyname to the original name.
 *
 * @param	key			The key that should be converted to a valid name
 */
export declare function generateKeyName(key: string): KeyNameResult;
/**
 * Generates a unique name, based on the key, for the value provided.
 *
 * @param	key			The key that should be converted to a valid name
 * @param	value		The value associated with the key.
 * @param	values		The map of values already generated.
 * @param	raw			If set to true, it will handle the value as is and will not convert if it is an array.
 */
export declare function generateValueName(key: string, value: any, values?: {
    [key: string]: any;
}, raw?: boolean): ValueNameResult;
export {};
