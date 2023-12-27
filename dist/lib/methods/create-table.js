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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const delay_1 = __importDefault(require("delay"));
const method_1 = require("./method");
class CreateTable extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.shouldWait = false;
        this.waitMs = 1000;
    }
    /**
     * Initialize the `CreateTable` object.
     *
     * @param	schema			The schema of the table.
     */
    initialize(schema) {
        // Set the schema as params object
        this.schema = schema;
        // Return the object so that it can be chained
        return this;
    }
    /**
     * Make sure the exec method returns when the table is created entirely.
     *
     * @param	ms		The number of milliseconds the poll mechanism should wait. Default is 1000ms.
     */
    wait(ms) {
        this.shouldWait = true;
        this.waitMs = ms || 1000;
        // Return the object so that it can be chained
        return this;
    }
    /**
     * Builds and returns the raw DynamoDB query object.
     */
    buildRawQuery() {
        return Object.assign(Object.assign({}, this.schema), { TableName: this.table.name });
    }
    /**
     * This method will execute the create table request that was built up.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            return client
                .send(new client_dynamodb_1.CreateTableCommand(this.buildRawQuery()))
                .then(() => {
                if (this.shouldWait === true) {
                    // Start polling if await is set to true
                    return this.poll();
                }
            })
                .catch((err) => {
                if (err && err.name !== "ResourceInUseException") {
                    // If it is a ResourceInUseException, throw it further down the chain
                    throw err;
                }
            });
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pollHelper();
            if (!result.Table || !result.Table.TableStatus) {
                return;
            }
            if (result.Table.TableStatus.toLowerCase() === "active") {
                return;
            }
            return yield this.poll();
        });
    }
    pollHelper() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            yield delay_1.default(this.waitMs);
            const output = yield client.send(new client_dynamodb_1.DescribeTableCommand({ TableName: this.table.name }));
            return output;
        });
    }
}
exports.CreateTable = CreateTable;
//# sourceMappingURL=create-table.js.map