"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRequest = void 0;
const batch_item_1 = require("./batch-item");
class DeleteRequest extends batch_item_1.BatchItem {
    constructor(props, key) {
        super(props, key);
    }
    buildRawQuery() {
        return { DeleteRequest: { Key: this.key } };
    }
}
exports.DeleteRequest = DeleteRequest;
//# sourceMappingURL=batch-delete.js.map