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
exports.BatchWrite = void 0;
const base_method_1 = require("../base-method");
const unprocessed_items_exception_1 = require("../../errors/unprocessed-items-exception");
class BatchWrite extends base_method_1.BaseMethod {
    constructor(dynamodb, items) {
        super(null, dynamodb);
        this.items = items;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const request = {
            RequestItems: {},
        };
        for (const item of this.items) {
            const table = request.RequestItems[item.table];
            if (!table) {
                request.RequestItems[item.table] = [item.buildRawQuery()];
            }
            else {
                request.RequestItems[item.table].push(item.buildRawQuery());
            }
        }
        return request;
    }
    /**
     * Execute the batch write request.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            if (this.items.length < 1) {
                throw new Error("Items can not be empty.");
            }
            if (this.items.length > 25) {
                throw new Error("Can not insert more than 25 items at a time.");
            }
            if (!this.items) {
                throw new Error("params object was undefined.");
            }
            let query = this.buildRawQuery();
            return this.runQuery(() => __awaiter(this, void 0, void 0, function* () {
                const { UnprocessedItems } = yield client.batchWrite(query);
                if (UnprocessedItems && Object.keys(UnprocessedItems).length > 0) {
                    query = { RequestItems: UnprocessedItems };
                    throw new unprocessed_items_exception_1.UnprocessedItemsException(`${Object.keys(UnprocessedItems).length} could not be processed`);
                }
            }));
        });
    }
}
exports.BatchWrite = BatchWrite;
//# sourceMappingURL=batch-write.js.map