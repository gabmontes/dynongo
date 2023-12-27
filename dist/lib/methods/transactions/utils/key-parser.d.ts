import { QueryCommandInput } from '@aws-sdk/client-dynamodb';
/**
 * Parses the key out of the `KeyConditionExpression` and returns the key together with the adjusted attribute names and values.
 *
 * @param	query	Query that should be parsed.
 */
export declare const keyParser: (query: QueryCommandInput) => {
    Key: {};
    AttributeNames: {
        [x: string]: string;
    };
    AttributeValues: {
        [x: string]: import("@aws-sdk/client-dynamodb/dist-types/").AttributeValue;
    };
};
