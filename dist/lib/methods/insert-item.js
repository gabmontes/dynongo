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
exports.InsertItem = void 0;
const queryUtil = __importStar(require("../utils/query"));
const updateUtil = __importStar(require("../utils/update"));
const method_1 = require("./method");
class InsertItem extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.rawResult = false;
        this.params.ReturnValues = "ALL_NEW";
    }
    /**
     * Initialize the `InsertItem` object.
     *
     * @param	query			The key of the item to insert.
     * @param	data			The insert data object.
     */
    initialize(query, data) {
        // Set the query as key
        this.params.Key = query;
        // Parse the data
        const parsedData = updateUtil.parse(data);
        // Append the attributes to the correct properties
        this.params.UpdateExpression = parsedData.UpdateExpression;
        this.params.ExpressionAttributeNames = Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), parsedData.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign(Object.assign({}, this.params.ExpressionAttributeValues), parsedData.ExpressionAttributeValues);
        // Return the object so that it can be chained
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
        // Parse the query to add a negated condition expression https://github.com/SamVerschueren/dynongo/issues/3
        const parsedQuery = queryUtil.parse(this.params.Key || {});
        const result = Object.assign(Object.assign({}, this.params), { TableName: this.table.name, ConditionExpression: `NOT (${parsedQuery.ConditionExpression})`, ExpressionAttributeNames: Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), parsedQuery.ExpressionAttributeNames), ExpressionAttributeValues: Object.assign(Object.assign({}, this.params.ExpressionAttributeValues), parsedQuery.ExpressionAttributeValues) });
        if (result.UpdateExpression === "") {
            delete result.UpdateExpression;
        }
        return result;
    }
    /**
     * Execute the insert item request.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            const insertInput = this.buildRawQuery();
            return this.runQuery(() => client.update(insertInput))
                .then((data) => {
                // Return the attributes
                return this.rawResult === true ? data : data.Attributes;
            })
                .catch((err) => {
                if (err.code === "ConditionalCheckFailedException") {
                    err.message =
                        "Duplicate key! A record with key `" +
                            JSON.stringify(insertInput.Key) +
                            "` already exists.";
                }
                throw err;
            });
        });
    }
}
exports.InsertItem = InsertItem;
//# sourceMappingURL=insert-item.js.map