"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactDeleteItem = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const transact_method_1 = require("../transact-method");
class TransactDeleteItem extends transact_method_1.TransactMethod {
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
            Delete: {
                TableName: result.TableName,
                Key: util_dynamodb_1.marshall(result.Key),
                ConditionExpression: result.ConditionExpression,
                ExpressionAttributeNames: result.ExpressionAttributeNames,
                ExpressionAttributeValues: result.ExpressionAttributeValues
                    ? util_dynamodb_1.marshall(result.ExpressionAttributeValues)
                    : undefined,
            },
        };
    }
}
exports.TransactDeleteItem = TransactDeleteItem;
//# sourceMappingURL=transact-delete-item.js.map