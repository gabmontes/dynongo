"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConditionCheck = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const key_parser_1 = require("./key-parser");
/**
 * Generate a transaction `ConditionCheck` based on a `Query`.
 *
 * @param	query Query to generate the check.
 */
exports.generateConditionCheck = (query) => {
    const build = query.buildRawQuery();
    if (!build.FilterExpression) {
        // A `ConditionCheck` requires a `FilterExpression`
        throw new Error('No `where` clause provided in transaction ConditionCheck');
    }
    const result = key_parser_1.keyParser(build);
    return {
        TableName: build.TableName,
        Key: util_dynamodb_1.marshall(result.Key),
        ConditionExpression: build.FilterExpression,
        ExpressionAttributeNames: result.AttributeNames,
        ExpressionAttributeValues: util_dynamodb_1.marshall(result.AttributeValues),
    };
};
//# sourceMappingURL=condition-check.js.map