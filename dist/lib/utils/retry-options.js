"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRetryOptions = void 0;
const defaultRetryOptions = {
    retries: 5,
    factor: 1,
    minTimeout: 300,
    maxTimeout: 2000,
    randomize: true,
};
/**
 * Configures the retry policy
 *
 * @param retries - Retry configuration.
 */
exports.configureRetryOptions = (retries) => {
    if (retries === undefined) {
        return undefined;
    }
    return typeof retries === "number"
        ? Object.assign(Object.assign({}, defaultRetryOptions), { retries }) : Object.assign(Object.assign({}, defaultRetryOptions), retries);
};
//# sourceMappingURL=retry-options.js.map