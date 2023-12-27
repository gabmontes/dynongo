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
exports.ListTables = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const method_1 = require("./method");
class ListTables extends method_1.Method {
    constructor(dynamodb) {
        super(null, dynamodb);
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        return {};
    }
    /**
     * Execute the `ListTables` request.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dynamodb.client) {
                throw new Error("Call .connect() before executing queries.");
            }
            return this.execHelper(this.buildRawQuery());
        });
    }
    execHelper(params, previousResult = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = previousResult;
            const client = this.dynamodb.client;
            const prefix = this.dynamodb.prefix;
            const data = yield client.send(new client_dynamodb_1.ListTablesCommand(params));
            result = result.concat(data.TableNames || []);
            if (data.LastEvaluatedTableName) {
                params.ExclusiveStartTableName = data.LastEvaluatedTableName;
                return this.execHelper(params, result);
            }
            return prefix === undefined
                ? result
                : result.filter((table) => table.indexOf(prefix) === 0);
        });
    }
}
exports.ListTables = ListTables;
//# sourceMappingURL=list-tables.js.map