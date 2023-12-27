"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutRequest = void 0;
const batch_item_1 = require("./batch-item");
class PutRequest extends batch_item_1.BatchItem {
    constructor(props, key, body) {
        super(props, key);
        this.body = body;
    }
    buildRawQuery() {
        return { PutRequest: { Item: Object.assign(Object.assign({}, this.key), this.body) } };
    }
}
exports.PutRequest = PutRequest;
//# sourceMappingURL=batch-put.js.map