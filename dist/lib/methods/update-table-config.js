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
exports.UpdateTableConfig = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const delay_1 = __importDefault(require("delay"));
const method_1 = require("./method");
class UpdateTableConfig extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.shouldWait = false;
        this.waitMs = 1000;
        this.input = {};
    }
    /**
     * Initialize the `UpdateTableConfig` object.
     *
     * @param	schema			The schema of the table.
     */
    initialize(_input) {
        // Set the schema as params object
        this.input = _input;
        // Return the object so that it can be chained
        return this;
    }
    /**
     * Make sure the exec method returns when the table is deleted entirely.
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
        return Object.assign(Object.assign({}, this.input), { TableName: this.table.name });
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dynamodb.client) {
                throw new Error("Call .connect() before executing queries.");
            }
            const { client } = this.dynamodb;
            return this.runQuery(() => client.send(new client_dynamodb_1.UpdateTableCommand(this.buildRawQuery())))
                .then(() => {
                if (this.shouldWait === true) {
                    // If await is true, start polling
                    return this.poll();
                }
            })
                .catch((err) => {
                if (err && err.name !== "ResourceNotFoundException") {
                    throw err;
                }
            });
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isUpdating()) {
                return yield this.poll();
            }
        });
    }
    isUpdating() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            yield delay_1.default(this.waitMs);
            const output = yield client.send(new client_dynamodb_1.DescribeTableCommand({ TableName: this.table.name }));
            return ((_a = output.Table) === null || _a === void 0 ? void 0 : _a.TableStatus) !== "ACTIVE";
        });
    }
}
exports.UpdateTableConfig = UpdateTableConfig;
//# sourceMappingURL=update-table-config.js.map