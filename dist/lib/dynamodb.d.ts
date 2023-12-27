/// <reference types="node" />
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandlerOptions } from "@smithy/node-http-handler";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { AgentOptions } from "http";
import { Options as RetryOptions } from "p-retry";
import { Table, TableOptions } from "./table";
import { ListTables, DeleteTable, CreateTable, TransactWrite, WriteItem, TransactRead, ReadItem, BatchWrite } from "./methods";
import { Schema } from "./types";
import { BatchItem } from "./methods/batch";
export declare type DynamoDBOptions = Pick<DynamoDBClientConfig, "endpoint" | "region"> & Partial<Pick<AwsCredentialIdentity, "accessKeyId" | "secretAccessKey" | "sessionToken">> & Pick<AgentOptions, "keepAlive"> & {
    httpOptions?: Omit<NodeHttpHandlerOptions, "httpAgent" | "httpsAgent">;
} & {
    local?: boolean;
    host?: string;
    localPort?: number;
    prefix?: string;
    prefixDelimiter?: string;
    retries?: number | RetryOptions;
};
export declare class DynamoDB {
    client?: DynamoDBDocument;
    private options;
    private _retries?;
    connect(_options?: DynamoDBOptions): void;
    get delimiter(): string;
    get prefix(): string;
    get retries(): number | RetryOptions;
    /**
     * Returns the table that can be used to interact with it.
     *
     * @param  name		The name of the table that is being interacted with.
     * @param  options	Options object.
     */
    table(name: string, options?: TableOptions): Table;
    /**
     * Returns the table that can be used to interact with. The table name will not be prefixed automatically.
     *
     * @param  name		The name of the table that is being interacted with.
     */
    rawTable(name: string): Table;
    /**
     * Instantiate a dropped table object.
     *
     * @param	name		The name of the table that should be dropped.
     * @param	options		Options object.
     */
    dropTable(name: string, options?: TableOptions): DeleteTable;
    /**
     * Instantiate a raw dropped table object. The table name will not be prefixed automatically.
     *
     * @param	name		The name of the table that should be dropped.
     */
    dropRawTable(name: string): DeleteTable;
    /**
     * Instantiate a create table object.
     *
     * @param	schema		The schema of the table that should be created.
     * @param	options		Options object.
     */
    createTable(schema: Schema, options?: TableOptions): CreateTable;
    /**
     * Instantiate a create table object.
     *
     * @param	schema		The schema of the table that should be created.
     */
    createRawTable(schema: Schema): CreateTable;
    /**
     * Instantiate a list tables object.
     */
    listTables(): ListTables;
    /**
     * Start a write transaction with the provided actions.
     *
     * @param	actions		List of transaction actions.
     */
    transactWrite(...actions: WriteItem[]): TransactWrite;
    /**
     * Start a read transaction with the provided actions.
     *
     * @param	actions		List of transaction actions.
     */
    transactRead(...actions: ReadItem[]): TransactRead;
    batchWrite(...items: BatchItem[]): BatchWrite;
}
