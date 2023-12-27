"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactQuery = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const transact_method_1 = require("../transact-method");
const key_parser_1 = require("../utils/key-parser");
class TransactQuery extends transact_method_1.TransactMethod {
    constructor(query) {
        super();
        this.query = query;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const build = this.query.buildRawQuery();
        if (build.IndexName) {
            throw new Error('Can not use a Global Secondary Index in a read transaction');
        }
        if (build.FilterExpression) {
            throw new Error('Can not use a where clause in a read transaction');
        }
        const key = key_parser_1.keyParser(build);
        return {
            Get: {
                TableName: build.TableName,
                Key: util_dynamodb_1.marshall(key.Key),
                ExpressionAttributeNames: key.AttributeNames,
                ProjectionExpression: build.ProjectionExpression,
            },
        };
    }
}
exports.TransactQuery = TransactQuery;
//# sourceMappingURL=transact-query.js.map