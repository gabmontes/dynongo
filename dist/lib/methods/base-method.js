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
exports.BaseMethod = void 0;
const p_retry_1 = __importDefault(require("p-retry"));
const utils_1 = require("../utils");
class BaseMethod {
    constructor(table, dynamodb) {
        this.table = table;
        this.dynamodb = dynamodb;
    }
    retry(retries) {
        this.retries = retries;
        return this;
    }
    runQuery(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const retries = this.retries || this.dynamodb.retries;
            const retryOptions = utils_1.configureRetryOptions(retries);
            return retries
                ? p_retry_1.default(() => operation().catch(utils_1.retryErrorHandler), retryOptions)
                : operation();
        });
    }
}
exports.BaseMethod = BaseMethod;
//# sourceMappingURL=base-method.js.map