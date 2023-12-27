import { Options as RetryOptions } from "p-retry";
/**
 * Configures the retry policy
 *
 * @param retries - Retry configuration.
 */
export declare const configureRetryOptions: (retries: number | RetryOptions | undefined) => {
    onFailedAttempt?: (error: import("p-retry").FailedAttemptError) => void;
    retries: number;
    factor: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
};
