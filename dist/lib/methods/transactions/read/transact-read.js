"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactRead = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const method_1 = require("../../method");
const query_1 = require("../../query");
const transact_query_1 = require("./transact-query");
class TransactRead extends method_1.Method {
    constructor(dynamodb, actions) {
        super(null, dynamodb);
        this.actions = actions;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const items = this.actions.map((action) => {
            if (action instanceof query_1.Query) {
                return new transact_query_1.TransactQuery(action);
            }
            throw new Error("Unknown TransactRead action provided");
        });
        return {
            TransactItems: [...items.map((item) => item.buildRawQuery())],
        };
    }
    /**
     * Execute the get transaction.
     */
    exec() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            const transactGetItemsInput = this.buildRawQuery();
            if (((_b = (_a = transactGetItemsInput.TransactItems) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 25) {
                throw new Error(`Number of transaction items should be less than or equal to \`25\`, got \`${transactGetItemsInput.TransactItems.length}\``);
            }
            const result = yield client.transactGet(transactGetItemsInput);
            return (result.Responses || []).map((response) => response.Item ? util_dynamodb_1.unmarshall(response.Item) : undefined);
        });
    }
}
exports.TransactRead = TransactRead;
//# sourceMappingURL=transact-read.js.map