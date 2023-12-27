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
exports.UpdateTimeToLive = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const method_1 = require("./method");
class UpdateTimeToLive extends method_1.Method {
    constructor(table, dynamodb) {
        super(table, dynamodb);
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
    buildRawQuery() {
        return Object.assign(Object.assign({}, this.input), { TableName: this.table.name, TimeToLiveSpecification: {
                AttributeName: this.input.attribute,
                Enabled: this.input.enabled,
            } });
    }
    /**
     * This method will execute the delete table request that was built up.
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.dynamodb.client;
            if (!client) {
                throw new Error("Call .connect() before executing queries.");
            }
            return this.runQuery(() => client.send(new client_dynamodb_1.UpdateTimeToLiveCommand(this.buildRawQuery())));
        });
    }
}
exports.UpdateTimeToLive = UpdateTimeToLive;
//# sourceMappingURL=update-time-to-live.js.map