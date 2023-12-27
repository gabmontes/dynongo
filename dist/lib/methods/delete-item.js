"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DeleteItem = void 0;
const method_1 = require("./method");
const queryUtil = __importStar(require("../utils/query"));
class DeleteItem extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.rawResult = false;
    }
    /**
     * Initialize the `DeleteItem` object.
     *
     * @param	query			The query for the index to filter on.
     * @param	opts			Additional param options.
     */
    initialize(query, opts) {
        // Set the query as key
        this.params.Key = query;
        if (opts && opts.result === true) {
            this.params.ReturnValues = "ALL_OLD";
        }
        // Return the object so that it can be chained
        return this;
    }
    /**
     * Create a conditional delete item object where the condition should be satisfied in order for the item to be
     * deleted.
     *
     * @param	condition		A condition that must be satisfied in order for a conditional DeleteItem to succeed.
     */
    where(condition) {
        if (!condition) {
            return this;
        }
        // Parse the query
        const parsedQuery = queryUtil.parse(condition, this.params.ExpressionAttributeValues);
        // Add the parsed query attributes to the correct properties of the params object
        this.params.ConditionExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign(Object.assign({}, this.params.ExpressionAttributeValues), parsedQuery.ExpressionAttributeValues);
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Returns the raw result.
     */
    raw() {
        // Set the raw parameter to true.
        this.rawResult = true;
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        var _a;
        return Object.assign(Object.assign({}, this.params), { TableName: (_a = this.table) === null || _a === void 0 ? void 0 : _a.name });
    }
    /**
     * This method will execute the delete item request that was built up.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            return this.runQuery(() => client.delete(this.buildRawQuery())).then((data) => {
                if ((this.params.ReturnValues = "ALL_OLD")) {
                    return this.rawResult === true ? data : data.Attributes;
                }
                return undefined;
            });
        });
    }
}
exports.DeleteItem = DeleteItem;
//# sourceMappingURL=delete-item.js.map