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
exports.BaseQuery = void 0;
const queryUtil = __importStar(require("../utils/query"));
const method_1 = require("./method");
class BaseQuery extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.rawResult = false;
        this.consistentRead = false;
    }
    /**
     * Initialize the query object.
     *
     * @param	query			The query for the index to filter on.
     * @param	indexName		The name of the global secondary index.
     */
    initialize(query, indexName) {
        // Parse the query
        const parsedQuery = queryUtil.parse(query, this.params.ExpressionAttributeValues);
        // Add the parsed query attributes to the correct properties of the params object
        this.params.KeyConditionExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), parsedQuery.ExpressionAttributeNames);
        this.params.ExpressionAttributeValues = Object.assign(Object.assign({}, this.params.ExpressionAttributeValues), parsedQuery.ExpressionAttributeValues);
        if (indexName) {
            // If the index name is provided, add it to the params object
            this.params.IndexName = indexName;
        }
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Filter the records more fine grained.
     *
     * @param	query			The query to filter the records on.
     */
    where(query) {
        if (!query) {
            return this;
        }
        // Parse the query
        const parsedQuery = queryUtil.parse(query, this.params.ExpressionAttributeValues);
        // Add the parsed query attributes to the correct properties of the params object
        this.params.FilterExpression = parsedQuery.ConditionExpression;
        this.params.ExpressionAttributeNames = Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), parsedQuery.ExpressionAttributeNames);
        const expressionAttributeValues = Object.assign(Object.assign({}, this.params.ExpressionAttributeValues), parsedQuery.ExpressionAttributeValues);
        // `ExpressionAttributeValues` should not be empty
        if (Object.keys(expressionAttributeValues).length > 0) {
            this.params.ExpressionAttributeValues = expressionAttributeValues;
        }
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Select a subset of the result.
     *
     * projection		The projection string that defines which fields should be returned.
     */
    select(projection) {
        if (!projection) {
            return this;
        }
        // Convert space separated or comma separated lists to a single comma
        projection = projection.replace(/,? +/g, ',');
        // Split the projection by space
        const splittedProjection = projection.split(',');
        // Reconstruct the expression
        const expression = splittedProjection.map(p => `#k_${p}`).join(', ');
        // Construct the names object
        const names = {};
        for (const token of splittedProjection) {
            names[`#k_${token}`] = token;
        }
        // Add the projection expression and add the list of names to the attribute names list
        this.params.ProjectionExpression = expression;
        this.params.ExpressionAttributeNames = Object.assign(Object.assign({}, this.params.ExpressionAttributeNames), names);
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Start querying from the provided key. Ideally for paging.
     *
     * @param lastEvaluatedKey 	The primary key of the first item that this operation will evaluate. Use the value that was returned for L`astEvaluatedKey` in the previous operation.
     */
    startFrom(lastEvaluatedKey) {
        this.params.ExclusiveStartKey = lastEvaluatedKey;
        return this;
    }
    /**
     * Limit the number of items returned. If the limit is set to 1, the exec method
     * will return the first object instead of an array with one object.
     *
     * @param	limit			The limit of items that should be returned.
     */
    limit(limit) {
        // Set the limit of returned items
        this.params.Limit = limit;
        // Return the query so that it can be chained
        return this;
    }
    /**
     * Returns the number of documents that match the query.
     */
    count() {
        // Set the count parameter to true.
        this.params.Select = 'COUNT';
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
     * Make the read strongly consistent.
     */
    consistent() {
        this.consistentRead = true;
        return this;
    }
}
exports.BaseQuery = BaseQuery;
//# sourceMappingURL=base-query.js.map