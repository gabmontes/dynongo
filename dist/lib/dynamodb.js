"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDB = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const node_http_handler_1 = require("@smithy/node-http-handler");
const http_1 = require("http");
const table_1 = require("./table");
const methods_1 = require("./methods");
const utils_1 = require("./utils");
class DynamoDB {
    constructor() {
        this.options = {};
    }
    connect(_options) {
        const mergedOptions = Object.assign({
            // //docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html
            keepAlive: true,
            local: false,
            prefix: "",
            prefixDelimiter: ".",
            host: "localhost",
            localPort: 8000,
        }, _options !== null && _options !== void 0 ? _options : {});
        const { accessKeyId, endpoint = mergedOptions.local
            ? `http://${mergedOptions.host}:${mergedOptions.localPort}`
            : undefined, httpOptions, keepAlive, local, prefix, prefixDelimiter, retries, region, secretAccessKey, sessionToken, } = mergedOptions;
        this.options = {
            prefix,
            prefixDelimiter,
        };
        this._retries = utils_1.configureRetryOptions(retries);
        const requestHandler = new node_http_handler_1.NodeHttpHandler(Object.assign(Object.assign({}, httpOptions), { [local ? "httpAgent" : "httpsAgent"]: new http_1.Agent({
                keepAlive,
            }) }));
        this.client = lib_dynamodb_1.DynamoDBDocument.from(new client_dynamodb_1.DynamoDBClient(Object.assign(Object.assign({}, (accessKeyId && secretAccessKey
            ? {
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                    sessionToken,
                },
            }
            : {})), { endpoint,
            region,
            requestHandler, 
            // maxRetries property has been renamed from v2 https://github.com/aws/aws-sdk-js-v3/issues/4049
            maxAttempts: typeof retries === "number" ? retries : undefined })));
    }
    get delimiter() {
        return this.options.prefixDelimiter;
    }
    get prefix() {
        return this.options.prefix;
    }
    get retries() {
        return this._retries;
    }
    /**
     * Returns the table that can be used to interact with it.
     *
     * @param  name		The name of the table that is being interacted with.
     * @param  options	Options object.
     */
    table(name, options) {
        return new table_1.Table(name, this, options);
    }
    /**
     * Returns the table that can be used to interact with. The table name will not be prefixed automatically.
     *
     * @param  name		The name of the table that is being interacted with.
     */
    rawTable(name) {
        return new table_1.Table(name, this, { raw: true });
    }
    /**
     * Instantiate a dropped table object.
     *
     * @param	name		The name of the table that should be dropped.
     * @param	options		Options object.
     */
    dropTable(name, options) {
        return this.table(name, options).drop();
    }
    /**
     * Instantiate a raw dropped table object. The table name will not be prefixed automatically.
     *
     * @param	name		The name of the table that should be dropped.
     */
    dropRawTable(name) {
        return this.dropTable(name, { raw: true });
    }
    /**
     * Instantiate a create table object.
     *
     * @param	schema		The schema of the table that should be created.
     * @param	options		Options object.
     */
    createTable(schema, options) {
        if (typeof schema !== "object") {
            throw new TypeError(`Expected \`schema\` to be of type \`object\`, got \`${typeof schema}\``);
        }
        if (!schema.TableName) {
            throw new Error("Schema is missing a `TableName`");
        }
        return this.table(schema.TableName, options).create(schema);
    }
    /**
     * Instantiate a create table object.
     *
     * @param	schema		The schema of the table that should be created.
     */
    createRawTable(schema) {
        return this.createTable(schema, { raw: true });
    }
    /**
     * Instantiate a list tables object.
     */
    listTables() {
        return new methods_1.ListTables(this);
    }
    /**
     * Start a write transaction with the provided actions.
     *
     * @param	actions		List of transaction actions.
     */
    transactWrite(...actions) {
        return new methods_1.TransactWrite(this, actions);
    }
    /**
     * Start a read transaction with the provided actions.
     *
     * @param	actions		List of transaction actions.
     */
    transactRead(...actions) {
        return new methods_1.TransactRead(this, actions);
    }
    batchWrite(...items) {
        return new methods_1.BatchWrite(this, items);
    }
}
exports.DynamoDB = DynamoDB;
//# sourceMappingURL=dynamodb.js.map