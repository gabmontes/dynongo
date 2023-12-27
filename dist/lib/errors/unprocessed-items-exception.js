"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessedItemsException = void 0;
class UnprocessedItemsException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessedItemsException';
        this.code = 'UnprocessedItemsException';
        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnprocessedItemsException = UnprocessedItemsException;
//# sourceMappingURL=unprocessed-items-exception.js.map