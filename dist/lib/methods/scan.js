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
exports.Scan = void 0;
const base_query_1 = require("./base-query");
class Scan extends base_query_1.BaseQuery {
    constructor(table, dynamodb) {
        super(table, dynamodb);
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const limit = this.params.Limit;
        const result = Object.assign(Object.assign({}, this.params), { ConsistentRead: this.consistentRead, TableName: this.table.name });
        if (limit === 1 && result.FilterExpression) {
            delete result.Limit;
        }
        return result;
    }
    /**
     * Execute the scan.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            const limit = this.params.Limit;
            const scanInput = this.buildRawQuery();
            return this.runQuery(() => client.scan(this.buildRawQuery())).then((data) => {
                if (scanInput.Select === "COUNT") {
                    // Return the count property if Select is set to count.
                    return data.Count || 0;
                }
                if (!data.Items) {
                    return [];
                }
                if (limit === 1) {
                    // If the limit is specifically set to 1, we should return the object instead of the array.
                    if (this.rawResult === true) {
                        data.Items = [data.Items[0]];
                        return data;
                    }
                    return data.Items[0];
                }
                // Resolve all the items
                return this.rawResult === true ? data : data.Items;
            });
        });
    }
}
exports.Scan = Scan;
//# sourceMappingURL=scan.js.map