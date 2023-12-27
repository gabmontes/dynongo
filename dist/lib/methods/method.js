"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const base_method_1 = require("./base-method");
class Method extends base_method_1.BaseMethod {
    constructor(table, dynamodb) {
        super(table, dynamodb);
        this.params = {};
    }
}
exports.Method = Method;
//# sourceMappingURL=method.js.map