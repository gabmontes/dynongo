"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactUpdateItem = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const transact_method_1 = require("../transact-method");
class TransactUpdateItem extends transact_method_1.TransactMethod {
    constructor(query) {
        super();
        this.query = query;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const result = this.query.buildRawQuery();
        return {
            Update: {
                TableName: result.TableName,
                Key: util_dynamodb_1.marshall(result.Key),
                ConditionExpression: result.ConditionExpression,
                UpdateExpression: result.UpdateExpression,
                ExpressionAttributeNames: result.ExpressionAttributeNames,
                ExpressionAttributeValues: result.ExpressionAttributeValues
                    ? util_dynamodb_1.marshall(result.ExpressionAttributeValues)
                    : undefined,
            },
        };
    }
}
exports.TransactUpdateItem = TransactUpdateItem;
//# sourceMappingURL=transact-update-item.js.map