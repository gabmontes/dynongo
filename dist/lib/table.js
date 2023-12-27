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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const methods_1 = require("./methods");
const table = __importStar(require("./utils/table"));
const update_1 = require("./utils/update");
const batch_1 = require("./methods/batch");
class Table {
    constructor(tableName, dynamodb, options) {
        this.tableName = tableName;
        this.dynamodb = dynamodb;
        this.options = Object.assign({ raw: false }, options);
    }
    get name() {
        if (this.options.raw === true) {
            return this.tableName;
        }
        return table.lookupName(this.tableName, this.dynamodb);
    }
    /**
     * Initialize a query builder.
     *
     * @param  query			The query for the index to filter on.
     * @param  indexName		The name of the global secondary index.
     */
    find(query, indexName) {
        if (query === undefined) {
            // If query is not provided, the caller wants to perform a full table scan.
            return new methods_1.Scan(this, this.dynamodb);
        }
        // Create a new query object
        const qry = new methods_1.Query(this, this.dynamodb);
        // Start by invoking the find method of the query
        return qry.initialize(query, indexName);
    }
    /**
     * Initialize a query builder that is limited to one result.
     *
     * @param  query			The query for the index to filter on.
     * @param  indexName		The name of the global secondary index.
     */
    findOne(query, indexName) {
        // Use the find method but limit the result to 1 and return the first object
        return this.find(query, indexName).limit(1);
    }
    /**
     * Return and remove a record.
     *
     * @param	query			The query for the index to filter on.
     */
    findOneAndRemove(query) {
        // Create a new delete item object
        const del = new methods_1.DeleteItem(this, this.dynamodb);
        // Start by invoking the remove method
        return del.initialize(query, { result: true });
    }
    /**
     * This method will insert a new item in the table.
     *
     * @param  key				The primary key of the record we want to insert.
     * @param  data				The data associated with the primary key.
     */
    insert(key, data) {
        // Create an insert item object
        const put = new methods_1.InsertItem(this, this.dynamodb);
        // Initialize the insert item object
        return put.initialize(key, { $set: data });
    }
    /**
     * This method will create a new put request item.
     *
     * @param  key			The primary key of the record we want to insert.
     * @param  data				The data associated with the primary key.
     */
    createBatchPutItem(key, data) {
        return new batch_1.PutRequest(this.name, key, data);
    }
    /**
     * This method will create a new delete request item.
     *
     * @param  key				The primary key of the record we want to insert.
     */
    createBatchDeleteItem(key) {
        return new batch_1.DeleteRequest(this.name, key);
    }
    /**
     * Update an already existing item associated with the key provided.
     *
     * @param	key				The key of the item we wish to update.
     * @param	data			The data of the item to update the item with.
     * @param	options			The extra options object.
     */
    update(key, data, options) {
        // Use a default empty object if options is not provided
        options = options || {};
        // Create a new update item object
        const update = new methods_1.UpdateItem(this, this.dynamodb);
        if (options.upsert && options.upsert === true) {
            const params = Object.create(null);
            for (const key of Object.keys(data)) {
                if (update_1.operators.indexOf(key) !== -1) {
                    params[key] = data[key];
                    delete data[key];
                }
            }
            // Merge `$set` with the other data values
            params["$set"] = Object.assign(Object.assign({}, params["$set"]), data);
            // If upsert is set to true, it does a update or insert
            return update.initialize(key, params);
        }
        // Initialize the update item object and use the conditional statement to make sure the item exists.
        return update.initialize(key, data).where(key);
    }
    /**
     * Update an already existing item or inserts a new item if the item does not yet exist.
     *
     * @param	key				The key of the item we wish to update.
     * @param	data			The data of the item to update the item with.
     */
    upsert(key, data) {
        // Use the update method but set `upsert` to true
        return this.update(key, data, { upsert: true });
    }
    /**
     * Remove an object.
     *
     * @param	query			The query for the index to filter on.
     */
    remove(query) {
        // Create a new delete item object
        const del = new methods_1.DeleteItem(this, this.dynamodb);
        // Start by invoking the remove method
        return del.initialize(query);
    }
    /**
     * Drop the table.
     */
    drop() {
        // Create a new DeleteTable object
        return new methods_1.DeleteTable(this, this.dynamodb);
    }
    /**
     * This method will create a new table.
     *
     * @param	schema The schema object.
     */
    create(schema) {
        if (typeof schema !== "object") {
            throw new TypeError(`Expected \`schema\` to be of type \`object\`, got \`${typeof schema}\``);
        }
        // Create a new CreateTable object
        return new methods_1.CreateTable(this, this.dynamodb).initialize(schema);
    }
    /**
     * This method will return the time to live status of the table.
     */
    describeTimeToLive() {
        return new methods_1.DescribeTimeToLive(this, this.dynamodb);
    }
    /**
     * This method updates the table configuration
     */
    updateConfig(params) {
        return new methods_1.UpdateTableConfig(this, this.dynamodb).initialize(params);
    }
    /**
     * This method updates the time to live configuration of the table
     */
    updateTimeToLive(params) {
        return new methods_1.UpdateTimeToLive(this, this.dynamodb).initialize(params);
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map