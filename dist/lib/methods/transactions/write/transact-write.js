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
exports.TransactWrite = void 0;
const method_1 = require("../../method");
const insert_item_1 = require("../../insert-item");
const update_item_1 = require("../../update-item");
const delete_item_1 = require("../../delete-item");
const transact_update_item_1 = require("./transact-update-item");
const transact_delete_item_1 = require("./transact-delete-item");
const transact_insert_item_1 = require("./transact-insert-item");
const condition_check_1 = require("../utils/condition-check");
class TransactWrite extends method_1.Method {
    constructor(dynamodb, actions) {
        super(null, dynamodb);
        this.actions = actions;
        this.conditions = [];
    }
    /**
     * Apply conditions to an item that is not being modified by the transaction.
     *
     * @param	query	List of query conditions.
     */
    withConditions(...query) {
        this.conditions = query;
        return this;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        const items = this.actions.map((action) => {
            if (action instanceof update_item_1.UpdateItem) {
                return new transact_update_item_1.TransactUpdateItem(action);
            }
            if (action instanceof insert_item_1.InsertItem) {
                return new transact_insert_item_1.TransactInsertItem(action);
            }
            if (action instanceof delete_item_1.DeleteItem) {
                return new transact_delete_item_1.TransactDeleteItem(action);
            }
            throw new Error("Unknown TransactWrite action provided");
        });
        const conditions = this.conditions.map((condition) => {
            return {
                ConditionCheck: condition_check_1.generateConditionCheck(condition),
            };
        });
        return {
            TransactItems: [
                ...conditions,
                ...items.map((item) => item.buildRawQuery()),
            ],
        };
    }
    /**
     * Execute the write transaction.
     */
    exec() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            const query = this.buildRawQuery();
            if (((_b = (_a = query.TransactItems) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) === 0) {
                throw new Error("No transaction items provided");
            }
            if (query.TransactItems.length > 25) {
                throw new Error(`Number of transaction items should be less than or equal to "25", got "${query.TransactItems.length}"`);
            }
            return client.transactWrite(query);
        });
    }
}
exports.TransactWrite = TransactWrite;
//# sourceMappingURL=transact-write.js.map