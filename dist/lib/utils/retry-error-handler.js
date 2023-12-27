"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryErrorHandler = void 0;
const p_retry_1 = require("p-retry");
const whitelistedErrors = new Set([
    'ThrottlingException',
    'ServiceUnavailable',
    'ItemCollectionSizeLimitExceededException',
    'LimitExceededException',
    'ProvisionedThroughputExceededException',
    'RequestLimitExceeded',
    'InternalServerError',
    'ResourceInUseException',
    'UnprocessedItemsException'
]);
exports.retryErrorHandler = err => {
    if (whitelistedErrors.has(err.code)) {
        throw err;
    }
    throw new p_retry_1.AbortError(err);
};
//# sourceMappingURL=retry-error-handler.js.map